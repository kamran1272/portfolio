/* HMS interactive demo — client-side search/filter + demo banner + form handling */
(function () {
  'use strict';

  /* ---------- layout fixes: sticky header & sidebar, hide broken pagination ---------- */
  var style = document.createElement('style');
  style.textContent =
    'nav.navbar { position: sticky !important; top: 0; z-index: 1030; }' +
    'aside.sidebar { position: sticky !important; top: 56px; height: calc(100vh - 56px); overflow-y: auto; }' +
    'nav[aria-label="Pagination Navigation"] { display: none !important; }';
  document.head.appendChild(style);

  /* ---------- demo banner ---------- */
  var banner = document.createElement('div');
  banner.innerHTML =
    '<span style="display:inline-flex;align-items:center;gap:6px;background:#0d6efd;color:#fff;' +
    'font:500 12px/1.4 system-ui,sans-serif;padding:7px 14px;border-radius:999px;' +
    'box-shadow:0 4px 14px rgba(13,110,253,.35)">Interactive demo &mdash; explore freely</span>';
  banner.style.cssText =
    'position:fixed;bottom:14px;right:14px;z-index:9999;';
  document.body.appendChild(banner);

  /* ---------- generic table filter ---------- */
  function wireFilter(form) {
    if (!form || form.dataset.demoWired) return;
    form.dataset.demoWired = '1';
    // find the main table on the page
    var table = document.querySelector('table.table');
    if (!table) return;
    var tbody = table.querySelector('tbody');
    if (!tbody) return;
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    var emptyMsg = document.createElement('tr');
    emptyMsg.innerHTML = '<td colspan="20" class="text-center text-muted py-4">No matching records.</td>';
    emptyMsg.style.display = 'none';
    tbody.appendChild(emptyMsg);

    function apply() {
      var q = '';
      var searchInput = form.querySelector('input[name="search"]');
      if (searchInput) q = searchInput.value.trim().toLowerCase();
      var statusSel = form.querySelector('select[name="status"]');
      var status = statusSel ? statusSel.value : '';
      var visible = 0;
      rows.forEach(function (row) {
        var text = row.textContent.toLowerCase();
        var ok = (!q || text.indexOf(q) !== -1);
        if (ok && status) ok = text.indexOf(status.toLowerCase()) !== -1;
        row.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });
      emptyMsg.style.display = visible ? 'none' : '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      apply();
    });
    // live filtering as they type
    form.querySelectorAll('input,select').forEach(function (el) {
      el.addEventListener('input', apply);
      el.addEventListener('change', apply);
    });
    // apply query string on load (e.g. shared links)
    var params = new URLSearchParams(location.search);
    var sq = params.get('search');
    if (sq) {
      var si = form.querySelector('input[name="search"]');
      if (si) si.value = sq;
    }
    if (sq) apply();
  }

  document.querySelectorAll('form[method="GET"], form:not([method])').forEach(function (form) {
    var action = (form.getAttribute('action') || '').toLowerCase();
    if (action.indexOf('patient-list') !== -1 ||
        action.indexOf('appointment-schedule') !== -1 ||
        action.indexOf('pharmacy') !== -1 ||
        action.indexOf('billing') !== -1 ||
        action.indexOf('laboratory') !== -1 ||
        action.indexOf('prescriptions') !== -1) {
      wireFilter(form);
    }
  });

  /* ---------- login & register forms -> dashboard ---------- */
  document.querySelectorAll('form[method="POST"]').forEach(function (form) {
    var action = (form.getAttribute('action') || '').toLowerCase();
    if (action.indexOf('login') !== -1) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        location.href = 'dashboard.html';
      });
      var note = document.createElement('p');
      note.className = 'text-muted small mt-2';
      note.textContent = 'Demo mode: any credentials will sign you in.';
      form.appendChild(note);
    } else if (action.indexOf('register') !== -1) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var nameInput = form.querySelector('input[name="name"]');
        var name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'there';
        try { sessionStorage.setItem('hms_demo_user', name); } catch (err) {}
        location.href = 'dashboard.html?welcome=1';
      });
      var rnote = document.createElement('p');
      rnote.className = 'text-muted small mt-2';
      rnote.textContent = 'Demo mode: registration is instant, no email needed.';
      form.appendChild(rnote);
    } else {
      // demo request + other POST forms: fake success
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = document.createElement('div');
        ok.className = 'alert alert-success mt-3';
        ok.textContent = 'Thank you! Your request has been received. (Demo mode)';
        form.appendChild(ok);
      });
    }
  });

  /* ---------- welcome message after register ---------- */
  try {
    var params = new URLSearchParams(location.search);
    if (params.get('welcome') === '1') {
      var who = '';
      try { who = sessionStorage.getItem('hms_demo_user') || ''; } catch (err) {}
      var bar = document.createElement('div');
      bar.className = 'alert alert-success alert-dismissible fade show m-3';
      bar.setAttribute('role', 'alert');
      bar.innerHTML = '<strong>Welcome' + (who ? ', ' + who : '') +
        '!</strong> Your demo account is ready.' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
      document.body.insertBefore(bar, document.body.firstChild);
    }
  } catch (err) {}

  /* ---------- patient row links: point to available EHR pages ---------- */
  // links to /patients/N for N not exported -> map to patients-1.html
  document.querySelectorAll('a[href^="patients-"]').forEach(function (a) {
    var m = a.getAttribute('href').match(/^patients-(\d+)\.html/);
    if (m && ['1', '2', '3'].indexOf(m[1]) === -1) {
      a.setAttribute('href', 'patients-1.html');
    }
  });
  document.querySelectorAll('a[href^="billing-"]').forEach(function (a) {
    var m = a.getAttribute('href').match(/^billing-(\d+)\.html/);
    if (m && ['1', '2'].indexOf(m[1]) === -1) {
      a.setAttribute('href', 'billing-1.html');
    }
  });
})();
