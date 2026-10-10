
/* KickZone static demo — client-side demo auth + table search.
   There is no backend in the static demo, so login/register run fully
   in the browser using sessionStorage/localStorage. */

document.addEventListener('DOMContentLoaded', function() {
  var DEMO_EMAIL = 'admin123@gmail.com';
  var DEMO_PASS = 'admin123';

  function getUsers() {
    try { return JSON.parse(localStorage.getItem('kz_demo_users') || '[]'); }
    catch (e) { return []; }
  }
  function saveUser(u) {
    var users = getUsers().filter(function(x) { return x.email.toLowerCase() !== u.email.toLowerCase(); });
    users.push(u);
    try { localStorage.setItem('kz_demo_users', JSON.stringify(users)); } catch (e) {}
  }
  function startSession(user) {
    try { sessionStorage.setItem('kz_demo_user', JSON.stringify({ name: user.name, email: user.email, ts: Date.now() })); } catch (e) {}
    window.location.href = 'dashboard.html';
  }

  /* ---------- Login ---------- */
  var loginForm = document.getElementById('demo-login-form');
  if (loginForm) {
    var autofill = document.getElementById('demo-autofill');
    if (autofill) {
      autofill.addEventListener('click', function() {
        loginForm.querySelector('[name="email"]').value = DEMO_EMAIL;
        loginForm.querySelector('[name="password"]').value = DEMO_PASS;
      });
    }
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = (loginForm.querySelector('[name="email"]').value || '').trim().toLowerCase();
      var password = loginForm.querySelector('[name="password"]').value || '';
      if (email === DEMO_EMAIL && password === DEMO_PASS) {
        startSession({ name: 'Demo Admin', email: email });
        return;
      }
      var found = getUsers().find(function(u) {
        return (u.email || '').toLowerCase() === email && u.password === password;
      });
      if (found) { startSession(found); return; }
      alert('Invalid credentials. Use the demo account admin123@gmail.com / admin123, or register a new account.');
    });
  }

  /* ---------- Register ---------- */
  var regForm = document.getElementById('demo-register-form');
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = (regForm.querySelector('[name="name"]').value || '').trim();
      var email = (regForm.querySelector('[name="email"]').value || '').trim();
      var pw = regForm.querySelector('[name="password"]').value || '';
      var pw2 = regForm.querySelector('[name="password_confirmation"]').value || '';
      if (!name || !email) { alert('Please fill in your name and email.'); return; }
      if (pw.length < 6) { alert('Password must be at least 6 characters.'); return; }
      if (pw !== pw2) { alert('Passwords do not match.'); return; }
      var user = { name: name, email: email, password: pw };
      saveUser(user);
      startSession(user);
    });
  }

  /* ---------- Any other form: keep the demo-mode guard ---------- */
  document.querySelectorAll('form').forEach(function(f) {
    if (f.id === 'demo-login-form' || f.id === 'demo-register-form') return;
    f.addEventListener('submit', function(e) {
      var action = (f.getAttribute('action') || '');
      if (action.includes('login')) { e.preventDefault(); window.location.href = 'dashboard.html'; }
      else { e.preventDefault(); alert('Demo mode: this action is disabled.'); }
    });
  });

  /* ---------- client-side table search ---------- */
  document.querySelectorAll('table').forEach(function(t) {
    var input = document.createElement('input');
    input.placeholder = 'Search this table...';
    input.style.cssText = 'margin:10px 0;padding:8px 12px;border:1px solid #ddd;border-radius:6px;width:280px;';
    t.parentNode.insertBefore(input, t);
    input.addEventListener('input', function() {
      var q = input.value.toLowerCase();
      t.querySelectorAll('tbody tr').forEach(function(r) {
        r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  });

  /* ---------- show logged-in demo user on dashboard ---------- */
  try {
    var me = JSON.parse(sessionStorage.getItem('kz_demo_user') || 'null');
    if (me) {
      document.querySelectorAll('[data-demo-user]').forEach(function(el) {
        el.textContent = me.name || me.email;
      });
    }
  } catch (e) {}
});
