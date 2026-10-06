
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form').forEach(function(f) {
    f.addEventListener('submit', function(e) {
      var action = (f.getAttribute('action') || '');
      if (action.includes('login')) { e.preventDefault(); window.location.href = 'dashboard.html'; }
      else { e.preventDefault(); alert('Demo mode: this action is disabled.'); }
    });
  });
  // client-side table search
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
});
