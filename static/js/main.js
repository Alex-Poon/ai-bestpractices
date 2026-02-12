/* AI Best Practices — Main JS v2.0
   Search, dark mode toggle, TOC scroll-spy, mobile nav */

(function () {
  'use strict';

  // ---- 1. Dark Mode (dark by default) ----
  var html = document.documentElement;
  var darkToggle = document.querySelector('.dark-mode-toggle');
  var stored = null;
  try { stored = localStorage.getItem('themeMode'); } catch (e) {}

  if (stored === 'light') {
    html.classList.add('light');
  }
  // Dark is the default — no class needed

  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      var isLight = html.classList.toggle('light');
      try { localStorage.setItem('themeMode', isLight ? 'light' : 'dark'); } catch (e) {}
    });
  }

  // ---- 2. TOC Scroll-Spy ----
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
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function (l) { l.classList.remove('active'); });
            var match = headings.find(function (h) { return h.el === entry.target; });
            if (match) match.link.classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
      headings.forEach(function (h) { observer.observe(h.el); });
    }

    // Smooth scroll for TOC links
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

  // ---- 3. Mobile Nav Toggle ----
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

  // ---- 4. Client-Side Search ----
  var searchOverlay = document.getElementById('searchOverlay');
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  var searchTrigger = document.getElementById('searchTrigger');
  var searchIndex = null;
  var searchBase = '';
  var activeIdx = -1;

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    activeIdx = -1;
    setTimeout(function () { searchInput.focus(); }, 50);
    loadSearchIndex();
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('active');
    activeIdx = -1;
  }

  function loadSearchIndex() {
    if (searchIndex) return;
    // Try loading from root-relative path, fallback for file:// protocol
    var indexUrl = (document.querySelector('link[rel="canonical"]') || {}).href;
    if (!searchBase) {
      var scripts = document.querySelectorAll('script[src*="main.js"]');
      if (scripts.length) {
        searchBase = scripts[0].src.replace(/js\/main\.js.*$/, '');
      }
    }
    var url = searchBase + 'search-index.json';

    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      searchIndex = data;
    }).catch(function () {
      // If fetch fails (file://), try XHR
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 0) {
          try { searchIndex = JSON.parse(xhr.responseText); } catch (e) {}
        }
      };
      xhr.send();
    });
  }

  function doSearch(query) {
    if (!searchIndex || !query.trim()) {
      searchResults.innerHTML = '';
      activeIdx = -1;
      return;
    }

    var q = query.toLowerCase().trim();
    var words = q.split(/\s+/);

    var scored = searchIndex.map(function (item) {
      var score = 0;
      var titleLower = (item.title || '').toLowerCase();
      var descLower = (item.desc || '').toLowerCase();
      var contentLower = (item.content || '').toLowerCase();
      var tagsLower = (item.tags || []).join(' ').toLowerCase();

      words.forEach(function (w) {
        if (titleLower.indexOf(w) !== -1) score += 10;
        if (tagsLower.indexOf(w) !== -1) score += 5;
        if (descLower.indexOf(w) !== -1) score += 3;
        if (contentLower.indexOf(w) !== -1) score += 1;
      });

      return { item: item, score: score };
    }).filter(function (s) { return s.score > 0; });

    scored.sort(function (a, b) { return b.score - a.score; });

    var results = scored.slice(0, 15);
    activeIdx = -1;

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }

    searchResults.innerHTML = results.map(function (r, i) {
      var item = r.item;
      var desc = item.desc || '';
      if (desc.length > 120) desc = desc.slice(0, 120) + '...';
      var resultUrl = searchBase ? searchBase + item.url.replace(/^\//, '') : item.url;
      return '<a class="search-result" href="' + resultUrl + '" data-idx="' + i + '">' +
        '<div class="search-result-section">' + (item.section || '') + '</div>' +
        '<div class="search-result-title">' + escapeHtml(item.title) + '</div>' +
        (desc ? '<div class="search-result-excerpt">' + escapeHtml(desc) + '</div>' : '') +
        '</a>';
    }).join('');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function navigateResults(dir) {
    var items = searchResults.querySelectorAll('.search-result');
    if (!items.length) return;
    items.forEach(function (el) { el.classList.remove('active'); });
    activeIdx += dir;
    if (activeIdx < 0) activeIdx = items.length - 1;
    if (activeIdx >= items.length) activeIdx = 0;
    items[activeIdx].classList.add('active');
    items[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  function selectResult() {
    var items = searchResults.querySelectorAll('.search-result');
    if (activeIdx >= 0 && activeIdx < items.length) {
      window.location.href = items[activeIdx].getAttribute('href');
    }
  }

  if (searchTrigger) {
    searchTrigger.addEventListener('click', openSearch);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      doSearch(searchInput.value);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSearch(); e.preventDefault(); }
      if (e.key === 'ArrowDown') { navigateResults(1); e.preventDefault(); }
      if (e.key === 'ArrowUp') { navigateResults(-1); e.preventDefault(); }
      if (e.key === 'Enter') { selectResult(); e.preventDefault(); }
    });
  }

  // Keyboard shortcut: "/" to open search
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
    // Cmd/Ctrl+K
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (searchOverlay && searchOverlay.classList.contains('active')) closeSearch();
      else openSearch();
    }
  });
})();
