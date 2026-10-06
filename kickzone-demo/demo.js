/* KickZone Interactive Demo — fully functional client-side simulation.
   All CRUD operations work via localStorage. No server required. */
(function () {
  'use strict';

  /* ============ Toast notifications ============ */
  function ensureToast() {
    if (document.getElementById('demo-toast-wrap')) return;
    const wrap = document.createElement('div');
    wrap.id = 'demo-toast-wrap';
    wrap.style.cssText = 'position:fixed;top:70px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(wrap);
  }
  function toast(msg, type) {
    ensureToast();
    const wrap = document.getElementById('demo-toast-wrap');
    const el = document.createElement('div');
    const bg = type === 'error' ? '#dc3545' : type === 'warn' ? '#ffc107' : '#198754';
    const fg = type === 'warn' ? '#000' : '#fff';
    el.style.cssText = `background:${bg};color:${fg};padding:12px 18px;border-radius:8px;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,.2);max-width:320px;animation:demoSlideIn .3s ease;`;
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .4s'; setTimeout(() => el.remove(), 400); }, 2800);
  }
  const style = document.createElement('style');
  style.textContent = '@keyframes demoSlideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
  document.head.appendChild(style);

  /* ============ Storage ============ */
  const DB = {
    get(k) { try { const v = localStorage.getItem('kz_' + k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('kz_' + k, JSON.stringify(v)); } catch (e) {} },
    del(k) { localStorage.removeItem('kz_' + k); }
  };

  /* ============ Demo banner ============ */
  function addBanner() {
    if (document.getElementById('demo-banner')) return;
    const b = document.createElement('div');
    b.id = 'demo-banner';
    b.style.cssText = 'background:linear-gradient(90deg,#1a1a2e,#16213e);color:#fff;text-align:center;padding:8px 12px;font-size:13px;position:sticky;top:0;z-index:1050;';
    b.innerHTML = '🎮 <strong>Interactive Demo</strong> — All features fully work. Data is saved in your browser. ' +
      '<button id="demo-reset" style="margin-left:10px;background:#e94560;color:#fff;border:none;border-radius:4px;padding:2px 10px;font-size:12px;cursor:pointer;">Reset demo data</button>';
    document.body.prepend(b);
    document.getElementById('demo-reset').addEventListener('click', () => {
      if (confirm('Reset all demo changes?')) {
        Object.keys(localStorage).filter(k => k.startsWith('kz_')).forEach(k => localStorage.removeItem(k));
        location.reload();
      }
    });
  }

  /* ============ Login ============ */
  function wireLogin() {
    if (!location.pathname.includes('login')) return;
    const form = document.querySelector('form');
    if (!form) return;
    // prefill hint
    const hint = document.createElement('div');
    hint.style.cssText = 'margin-top:10px;font-size:12px;color:#6c757d;text-align:center;';
    hint.innerHTML = 'Demo login: <code>admin123@gmail.com</code> / <code>admin123</code> ' +
      '<button type="button" id="demo-autofill" style="margin-left:6px;font-size:11px;">Autofill</button>';
    form.appendChild(hint);
    document.getElementById('demo-autofill').addEventListener('click', () => {
      const em = form.querySelector('input[name="email"], input[type="email"]');
      const pw = form.querySelector('input[name="password"], input[type="password"]');
      if (em) em.value = 'admin123@gmail.com';
      if (pw) pw.value = 'admin123';
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = ((form.querySelector('input[name="email"], input[type="email"]') || {}).value || '').trim();
      const pass = (form.querySelector('input[name="password"], input[type="password"]') || {}).value || '';
      if (email === 'admin123@gmail.com' && pass === 'admin123') {
        DB.set('auth', { email, at: Date.now() });
        toast('Welcome back, Admin!', 'success');
        setTimeout(() => location.href = 'dashboard.html', 600);
      } else {
        toast('Invalid credentials. Try admin123@gmail.com / admin123', 'error');
      }
    });
    form.dataset.demoWired = '1';
  }

  /* ============ CRUD Engine ============ */
  const PAGE_CONFIG = {
    'teams.html': 'teams', 'players.html': 'players', 'sports.html': 'sports',
    'events.html': 'events', 'fixtures.html': 'fixtures',
    'announcements.html': 'announcements', 'schedules.html': 'schedules',
    'users.html': 'users', 'results.html': 'results', 'games.html': 'games',
  };

  function getPageKey() { return location.pathname.split('/').pop() || 'index.html'; }

  function scrapeTable(table) {
    const headers = [...table.querySelectorAll('thead th')].map(th => th.textContent.trim());
    const rows = [...table.querySelectorAll('tbody tr')];
    const records = rows.map(tr => {
      const cells = [...tr.querySelectorAll('td')];
      const rec = { _row: tr };
      headers.forEach((h, i) => {
        if (cells[i] && !/action/i.test(h)) rec['col' + i] = cells[i].textContent.trim();
      });
      const delForm = tr.querySelector('form');
      if (delForm) {
        const m = (delForm.getAttribute('action') || '').match(/\/(\d+)(?:[?#].*)?$/);
        if (m) rec._id = m[1];
      }
      if (!rec._id) {
        const editBtn = tr.querySelector('[data-bs-target]');
        if (editBtn) {
          const m = (editBtn.getAttribute('data-bs-target') || '').match(/(\d+)$/);
          if (m) rec._id = m[1];
        }
      }
      if (!rec._id) rec._id = 'r' + Math.random().toString(36).slice(2, 8);
      return rec;
    });
    return { headers, records };
  }

  const getChanges = (entity) => DB.get('crud_' + entity) || { added: [], edited: {}, deleted: [] };
  const saveChanges = (entity, ch) => DB.set('crud_' + entity, ch);

  function applyChanges(records, ch) {
    const del = new Set(ch.deleted.map(String));
    const out = records.filter(r => !del.has(String(r._id)));
    out.forEach(r => { const e = ch.edited[String(r._id)]; if (e) Object.assign(r, e); });
    ch.added.forEach(a => out.push(Object.assign({ _isNew: true }, JSON.parse(JSON.stringify(a)))));
    return out;
  }

  function buildLookups() {
    const lookups = {};
    document.querySelectorAll('select[name]').forEach(sel => {
      const opts = {};
      [...sel.querySelectorAll('option')].forEach(o => { if (o.value) opts[o.value] = o.textContent.trim(); });
      if (Object.keys(opts).length) lookups[sel.name] = opts;
    });
    return lookups;
  }
  function resolveDisplay(fieldName, value, lookups) {
    if (lookups[fieldName] && lookups[fieldName][value]) return lookups[fieldName][value];
    if (/_id$/.test(fieldName)) for (const k in lookups) if (lookups[k][value]) return lookups[k][value];
    return value;
  }
  function fieldToColIdx(fieldName, headers) {
    const fn = fieldName.toLowerCase().replace(/_id$/, '').replace(/[^a-z]/g, '');
    if (!fn) return -1;
    for (let i = 0; i < headers.length; i++) {
      const h = headers[i].toLowerCase().replace(/[^a-z]/g, '');
      if (h && (h.includes(fn) || fn.includes(h))) return i;
    }
    return -1;
  }

  function wireCrudPage(entity) {
    const tables = [...document.querySelectorAll('table')].filter(t => t.querySelector('tbody tr'));
    if (!tables.length) return;
    const lookups = buildLookups();

    tables.forEach(table => {
      const { headers, records } = scrapeTable(table);
      if (!records.length) return;
      const actionIdx = headers.findIndex(h => /action/i.test(h));
      const dataColCount = actionIdx >= 0 ? actionIdx : headers.length;
      const actionsHTML = actionIdx >= 0 && records[0]._row.cells[actionIdx]
        ? records[0]._row.cells[actionIdx].innerHTML : '';

      let ch = getChanges(entity);
      let allRecords = applyChanges(records, ch);
      let editTarget = null;

      const nextId = () => {
        let max = 0;
        allRecords.forEach(r => {
          const n = parseInt(String(r._id).replace(/\D/g, ''), 10);
          if (!isNaN(n) && n > max) max = n;
        });
        return String(max + 1);
      };

      function handleDelete(e, rec) {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm('Delete this record?')) return;
        ch = getChanges(entity);
        if (rec._isNew) ch.added = ch.added.filter(a => String(a._id) !== String(rec._id));
        else { ch.deleted.push(String(rec._id)); delete ch.edited[String(rec._id)]; }
        saveChanges(entity, ch);
        allRecords = allRecords.filter(r => String(r._id) !== String(rec._id));
        render();
        toast('Deleted successfully', 'success');
      }

      function wireDeleteIn(scope) {
        scope.querySelectorAll('form').forEach(form => {
          if (form.dataset.demoWired) return;
          const m = form.querySelector('input[name="_method"]');
          if (m && m.value === 'DELETE') {
            form.dataset.demoWired = '1';
            const tr = form.closest('tr');
            const idx = [...table.querySelectorAll('tbody tr')].indexOf(tr);
            const rec = allRecords[idx];
            form.addEventListener('submit', (e) => { if (rec) handleDelete(e, rec); else e.preventDefault(); });
          }
        });
      }

      function findAddModal() {
        return [...document.querySelectorAll('.modal')]
          .find(m => /add|create/i.test(m.id) && !/edit|update|delete/i.test(m.id));
      }
      function findEditModals() {
        return [...document.querySelectorAll('.modal')].filter(m => /edit|update/i.test(m.id));
      }

      function openEditModal(rec) {
        editTarget = rec;
        const modal = findEditModals()[0];
        if (!modal) { toast('Edit not available on this page', 'warn'); return; }
        const form = modal.querySelector('form');
        if (form) {
          form.querySelectorAll('input[name], select[name], textarea[name]').forEach(inp => {
            if (['_token', '_method'].includes(inp.name)) return;
            const ci = fieldToColIdx(inp.name, headers);
            if (ci >= 0 && rec['col' + ci] !== undefined) {
              if (inp.tagName === 'SELECT') {
                [...inp.options].forEach(o => { if (o.textContent.trim() === rec['col' + ci]) inp.value = o.value; });
              } else inp.value = rec['col' + ci];
            }
          });
        }
        bootstrap.Modal.getOrCreateInstance(modal).show();
      }

      function wireEditModals() {
        findEditModals().forEach(modal => {
          const form = modal.querySelector('form');
          if (!form || form.dataset.demoWired) return;
          form.dataset.demoWired = '1';
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!editTarget) { toast('Click the edit button on a row first', 'warn'); return; }
            const updates = {};
            form.querySelectorAll('input[name], select[name], textarea[name]').forEach(inp => {
              if (['_token', '_method'].includes(inp.name)) return;
              const ci = fieldToColIdx(inp.name, headers);
              if (ci >= 0) {
                updates['col' + ci] = inp.tagName === 'SELECT'
                  ? resolveDisplay(inp.name, inp.value, lookups) : inp.value;
              }
            });
            Object.assign(editTarget, updates);
            ch = getChanges(entity);
            if (editTarget._isNew) {
              const a = ch.added.find(x => String(x._id) === String(editTarget._id));
              if (a) Object.assign(a, JSON.parse(JSON.stringify(updates)));
            } else {
              ch.edited[String(editTarget._id)] = Object.assign(ch.edited[String(editTarget._id)] || {}, updates);
            }
            saveChanges(entity, ch);
            render();
            const inst = bootstrap.Modal.getInstance(modal);
            if (inst) inst.hide();
            toast('Updated successfully', 'success');
            editTarget = null;
          });
        });
      }

      function wireAddModal() {
        const modal = findAddModal();
        if (!modal) return;
        const form = modal.querySelector('form');
        if (!form || form.dataset.demoWired) return;
        form.dataset.demoWired = '1';
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const newRec = { _id: nextId(), _isNew: true };
          form.querySelectorAll('input[name], select[name], textarea[name]').forEach(inp => {
            if (['_token', '_method'].includes(inp.name) || !inp.value) return;
            const ci = fieldToColIdx(inp.name, headers);
            if (ci >= 0) {
              newRec['col' + ci] = inp.tagName === 'SELECT'
                ? resolveDisplay(inp.name, inp.value, lookups) : inp.value;
            }
          });
          for (let i = 0; i < dataColCount; i++) {
            if (newRec['col' + i] === undefined) {
              const h = (headers[i] || '').toLowerCase();
              if (/^(id|#)$/.test(h.trim())) newRec['col' + i] = newRec._id;
              else if (/date/.test(h)) newRec['col' + i] = new Date().toISOString().slice(0, 10);
              else newRec['col' + i] = '—';
            }
          }
          ch = getChanges(entity);
          const storable = {};
          Object.keys(newRec).forEach(k => { if (!k.startsWith('_')) storable[k] = newRec[k]; });
          storable._id = newRec._id;
          ch.added.push(storable);
          saveChanges(entity, ch);
          allRecords.push(newRec);
          render();
          form.reset();
          const inst = bootstrap.Modal.getInstance(modal);
          if (inst) inst.hide();
          toast('Added successfully', 'success');
        });
      }

      function render() {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        allRecords.forEach(rec => {
          const tr = document.createElement('tr');
          for (let i = 0; i < dataColCount; i++) {
            const td = document.createElement('td');
            td.textContent = rec['col' + i] !== undefined ? rec['col' + i] : '';
            tr.appendChild(td);
          }
          if (actionIdx >= 0) {
            const td = document.createElement('td');
            td.className = 'text-center';
            td.innerHTML = actionsHTML;
            // rewire edit button → our modal
            const editBtn = td.querySelector('[data-bs-toggle="modal"]');
            if (editBtn) {
              editBtn.removeAttribute('data-bs-target');
              editBtn.addEventListener('click', (ev) => { ev.preventDefault(); openEditModal(rec); });
            }
            const delForm = td.querySelector('form');
            if (delForm) delForm.addEventListener('submit', (e) => handleDelete(e, rec));
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        });
      }

      render();
      wireAddModal();
      wireEditModals();
      wireDeleteIn(table);

      const searchInput = document.querySelector('input[type="search"], input[placeholder*="earch" i]');
      if (searchInput && !searchInput.dataset.demoWired) {
        searchInput.dataset.demoWired = '1';
        searchInput.addEventListener('input', () => {
          const q = searchInput.value.toLowerCase();
          table.querySelectorAll('tbody tr').forEach(tr => {
            tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
          });
        });
      }
    });
  }

  function wireContactForm() {
    document.querySelectorAll('form').forEach(form => {
      if (form.dataset.demoWired) return;
      if (form.querySelector('textarea[name="message"]')) {
        form.dataset.demoWired = '1';
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          toast("Message sent! We'll get back to you soon.", 'success');
          form.reset();
        });
      }
    });
  }

  /* ============ Init ============ */
  document.addEventListener('DOMContentLoaded', () => {
    addBanner();
    wireLogin();
    wireContactForm();
    const entity = PAGE_CONFIG[getPageKey()];
    if (entity) { try { wireCrudPage(entity); } catch (e) { console.warn('CRUD init:', e); } }
    // catch-all for any other dead posts
    document.querySelectorAll('form[action*="127.0.0.1"]').forEach(f => {
      if (f.dataset.demoWired) return;
      f.addEventListener('submit', (e) => {
        if (!f.dataset.demoWired) { e.preventDefault(); toast('Preview mode: action disabled', 'warn'); }
      });
    });
  });
})();
