/* KickZone Admin — responsive behavior.
   Injects a hamburger button into the topbar (visible below the
   lg breakpoint via Bootstrap's d-lg-none) and a backdrop element.
   Tapping the hamburger slides the fixed sidebar in as a drawer;
   tapping the backdrop, a nav link, or Escape closes it. */
(function () {
    function init() {
        var topbar = document.querySelector('.topbar');
        var sidebar = document.querySelector('.sidebar');
        if (!topbar || !sidebar || document.getElementById('sidebarToggle')) {
            return;
        }

        var btn = document.createElement('button');
        btn.id = 'sidebarToggle';
        btn.type = 'button';
        btn.className = 'btn text-white d-lg-none me-1 p-1';
        btn.setAttribute('aria-label', 'Open navigation menu');
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>';
        topbar.insertBefore(btn, topbar.firstChild);

        var backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);

        function close() {
            document.body.classList.remove('sidebar-open');
        }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            document.body.classList.toggle('sidebar-open');
        });

        backdrop.addEventListener('click', close);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                close();
            }
        });

        sidebar.querySelectorAll('a').forEach(function (a) {
            if (a.hasAttribute('data-bs-toggle')) {
                return; // keep drawer open for dropdown toggles
            }
            a.addEventListener('click', function () {
                if (window.innerWidth < 992) {
                    close();
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
