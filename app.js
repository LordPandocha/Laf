(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const products = [...document.querySelectorAll('[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    products.forEach(product => {
      product.hidden = category !== 'all' && !product.dataset.category.split(' ').includes(category);
    });
  }));

  const wipe = document.querySelector('.page-wipe');
  const pageLinks = [...document.querySelectorAll('a[href$=".html"]')];
  let leaving = false;

  function isInternalPage(url) {
    return url.origin === location.origin && /\/(?:index|menu|about|contacts)\.html$/.test(url.pathname);
  }

  pageLinks.forEach(link => link.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(link.href, location.href);
    if (!isInternalPage(target) || target.pathname === location.pathname || reducedMotion.matches || !wipe || leaving) return;
    event.preventDefault();
    leaving = true;
    closeMenu();
    sessionStorage.setItem('pie-transition', '1');
    wipe.classList.add('is-exiting');
    window.setTimeout(() => { window.location.href = target.href; }, 350);
  }));

  if (!reducedMotion.matches && wipe && sessionStorage.getItem('pie-transition') === '1') {
    sessionStorage.removeItem('pie-transition');
    wipe.classList.add('is-entering');
    wipe.addEventListener('animationend', () => wipe.classList.remove('is-entering'), {once:true});
  }
  window.addEventListener('pageshow', () => {
    leaving = false;
    wipe?.classList.remove('is-exiting');
  });

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const ticker = document.querySelector('.ticker');
    if (ticker) {
      const tickerObserver = new IntersectionObserver(entries => {
        ticker.classList.toggle('is-visible', entries[0].isIntersecting);
      }, {threshold: 0});
      tickerObserver.observe(ticker);
    }
    const targets = document.querySelectorAll('.section-heading, .feature-card, .occasion-copy, .product-card, .about-lead>div:last-child, .contact-row');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, {threshold: .08, rootMargin: '0px 0px -30px 0px'});
    targets.forEach(target => { target.classList.add('reveal'); observer.observe(target); });
  }
})();
