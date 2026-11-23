(() => {
  const key = 'vexor-theme';
  const apply = (theme) => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const dark = theme === 'dark';
      button.innerHTML = `${dark ? '☀' : '☾'} <span>${dark ? 'Светлая' : 'Чёрная'}</span>`;
      button.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить чёрную тему');
      button.title = dark ? 'Переключить на светлую тему' : 'Переключить на чёрную тему';
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#111216' : '#f4a900');
  };
  let saved = 'light';
  try { saved = localStorage.getItem(key) || 'light'; } catch (_) {}
  apply(saved);
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(key, next); } catch (_) {}
  });
})();
