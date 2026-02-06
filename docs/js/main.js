/* AI Best Practices - Main JS
   TOC scroll-spy, dark mode toggle, mobile nav, smooth scroll */

(function () {
  'use strict';

  // 1. TOC scroll-spy
  var tocSidebar = document.querySelector('.toc-sidebar');
  if (tocSidebar) {
    var tocLinks = tocSidebar.querySelectorAll('a');
    var headings = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        var el = document.getElementById(id.slice(1));
        if (el) headings.push({ el: el, link: link });
      }
    });

    if (headings.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              tocLinks.forEach(function (l) { l.classList.remove('active'); });
              var match = headings.find(function (h) { return h.el === entry.target; });
              if (match) match.link.classList.add('active');
            }
          });
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      );
      headings.forEach(function (h) { observer.observe(h.el); });
    }
  }

  // 2. Dark mode toggle
  var darkToggle = document.querySelector('.dark-mode-toggle');
  var html = document.documentElement;

  function setDark(on) {
    html.classList.toggle('dark', on);
    try { localStorage.setItem('darkMode', on ? '1' : '0'); } catch (e) {}
  }

  // Init: check localStorage, then OS preference
  var stored = null;
  try { stored = localStorage.getItem('darkMode'); } catch (e) {}
  if (stored === '1') {
    setDark(true);
  } else if (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDark(true);
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      setDark(!html.classList.contains('dark'));
    });
  }

  // 3. Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      document.body.classList.toggle('nav-open');
    });
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('nav-open') && !e.target.closest('.site-header')) {
        document.body.classList.remove('nav-open');
      }
    });
  }

  // 4. Smooth scroll for TOC links
  if (tocSidebar) {
    tocSidebar.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      var id = link.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }
})();
