
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('form').forEach(function(f) {
    f.addEventListener('submit', function(e) { e.preventDefault(); alert('Demo mode: this action is disabled.'); });
  });
});
