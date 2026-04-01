(() => {
  const MOBILE_BREAKPOINT = 980;
  const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const body = document.body;
  if (!body) {
    return;
  }

  const ensureBackdrop = () => {
    let backdrop = document.querySelector('.mobile-nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      body.appendChild(backdrop);
    }
    return backdrop;
  };

  const backdrop = ensureBackdrop();

  const closeAllMenus = () => {
    body.classList.remove('mobile-nav-open');
    document.querySelectorAll('.nav-toggle').forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    });

    document.querySelectorAll('.nav-item--has-menu').forEach((item) => {
      item.classList.remove('is-open');
      const parentLink = item.querySelector('.nav-parent');
      if (parentLink) {
        parentLink.setAttribute('aria-expanded', 'false');
      }
    });
  };

  document.querySelectorAll('.site-header').forEach((header, headerIndex) => {
    const headerInner = header.querySelector('.header-inner');
    const nav = header.querySelector('.nav');
    if (!headerInner || !nav) {
      return;
    }

    const navId = nav.id || `site-nav-${headerIndex + 1}`;
    nav.id = navId;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-controls', navId);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = '<span class="nav-toggle-line"></span><span class="nav-toggle-line"></span><span class="nav-toggle-line"></span>';
    headerInner.insertBefore(toggle, headerInner.firstChild);

    const openMenu = () => {
      body.classList.add('mobile-nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    };

    const closeMenu = () => {
      body.classList.remove('mobile-nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      nav.querySelectorAll('.nav-item--has-menu').forEach((item) => {
        item.classList.remove('is-open');
        const parentLink = item.querySelector('.nav-parent');
        if (parentLink) {
          parentLink.setAttribute('aria-expanded', 'false');
        }
      });
    };

    const toggleMenu = () => {
      if (body.classList.contains('mobile-nav-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    nav.querySelectorAll('.nav-item--has-menu').forEach((item) => {
      const parentLink = item.querySelector('.nav-parent');
      if (!parentLink) {
        return;
      }

      parentLink.setAttribute('aria-expanded', 'false');

      parentLink.addEventListener('click', (event) => {
        if (!mobileQuery.matches) {
          return;
        }

        event.preventDefault();
        const willOpen = !item.classList.contains('is-open');
        item.classList.toggle('is-open', willOpen);
        parentLink.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (!mobileQuery.matches) {
          return;
        }

        if (link.classList.contains('nav-parent')) {
          return;
        }

        closeMenu();
      });
    });

    const handleViewportChange = () => {
      if (!mobileQuery.matches) {
        closeMenu();
        nav.querySelectorAll('.nav-item--has-menu').forEach((item) => {
          item.classList.remove('is-open');
          const parentLink = item.querySelector('.nav-parent');
          if (parentLink) {
            parentLink.setAttribute('aria-expanded', 'false');
          }
        });
      }
    };

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', handleViewportChange);
    } else {
      mobileQuery.addListener(handleViewportChange);
    }
  });

  backdrop.addEventListener('click', closeAllMenus);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllMenus();
    }
  });
})();
