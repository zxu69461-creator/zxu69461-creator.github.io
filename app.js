/* ==========================================================================
   Zhida Xu — Academic Homepage Client Script
   Loads verified public works from ./data/public_works.json
   Handles theme persistence, category filtering, search, BibTeX & copy UI.
   ========================================================================== */

(function () {
  'use strict';

  var state = {
    works: [],
    activeFilter: 'all',
    query: ''
  };

  /* ---------------- Theme Toggle ---------------- */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem('zx-theme', theme);
      } catch (e) {}
    }

    var toggle = document.getElementById('theme-toggle');
    var label = document.getElementById('theme-label');
    var sun = document.getElementById('theme-icon-sun');
    var moon = document.getElementById('theme-icon-moon');

    if (toggle && label && sun && moon) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      label.textContent = isDark ? 'Light' : 'Dark';
      sun.hidden = !isDark;
      moon.hidden = isDark;
    }
  }

  function initTheme() {
    applyTheme(getCurrentTheme(), false);
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    }
  }

  /* ---------------- Clipboard Helpers ---------------- */
  function copyText(text, button) {
    var original = button.textContent;
    function showCopied() {
      button.textContent = 'Copied';
      window.setTimeout(function () {
        button.textContent = original;
      }, 1400);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showCopied).catch(function () {
        fallbackCopy(text);
        showCopied();
      });
    } else {
      fallbackCopy(text);
      showCopied();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function initStaticCopyButtons() {
    var buttons = document.querySelectorAll('.copy-btn[data-copy]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var payload = btn.getAttribute('data-copy') || '';
        copyText(payload, btn);
      });
    });
  }

  /* ---------------- DOM Builder for Work Cards ---------------- */
  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === 'string') el.textContent = text;
    return el;
  }

  function createExternalLink(href, text, className) {
    var a = createEl('a', className || '', text);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }

  function badgeClass(label) {
    if (label === 'Live Web Tool' || label === 'medRxiv Preprint') {
      return 'pill pill-live';
    }
    if (label === 'Zenodo DOI' || label === 'Python CLI' || label === 'Python Package' || label === 'CI Verified') {
      return 'pill pill-accent';
    }
    return 'pill pill-neutral';
  }

  function buildWorkCard(work) {
    var card = createEl('article', 'work-card');
    card.setAttribute('data-category', work.category);

    var header = createEl('div', 'work-header');
    var badges = createEl('div', 'work-badges');
    badges.appendChild(createEl('span', 'pill pill-neutral', work.kind));
    (work.badges || []).forEach(function (b) {
      badges.appendChild(createEl('span', badgeClass(b), b));
    });
    header.appendChild(badges);
    header.appendChild(createEl('span', 'work-date', work.date_display || work.date));
    card.appendChild(header);

    card.appendChild(createEl('h3', 'work-title', work.title));
    card.appendChild(createEl('p', 'work-authors', work.authors));
    card.appendChild(createEl('p', 'work-summary', work.summary));

    if (Array.isArray(work.metrics) && work.metrics.length > 0) {
      var metricsRow = createEl('div', 'work-metrics');
      work.metrics.forEach(function (m) {
        metricsRow.appendChild(createEl('span', 'metric-chip', m));
      });
      card.appendChild(metricsRow);
    }

    var footer = createEl('div', 'work-footer');
    var links = createEl('div', 'work-links');
    var lnk = work.links || {};

    if (lnk.web_tool) {
      links.appendChild(createExternalLink(lnk.web_tool, 'Live Web Tool \u2197', 'work-link-primary'));
    }
    if (lnk.preprint) {
      links.appendChild(createExternalLink(lnk.preprint, 'medRxiv Preprint (DOI) \u2197', 'work-link-primary'));
    }
    if (lnk.repo) {
      links.appendChild(createExternalLink(lnk.repo, 'GitHub Repository \u2197'));
    }
    if (lnk.zenodo) {
      links.appendChild(createExternalLink(lnk.zenodo, 'Zenodo Archive \u2197'));
    }
    if (work.figure && work.figure.src) {
      var figBtn = createEl('button', 'figure-action-btn', 'View Figure \u2922');
      figBtn.type = 'button';
      figBtn.addEventListener('click', function () {
        openLightbox(work.figure, figBtn);
      });
      links.appendChild(figBtn);
    }
    footer.appendChild(links);

    var bibBox = null;
    if (work.bibtex) {
      var citeBtn = createEl('button', 'cite-toggle', 'BibTeX');
      citeBtn.type = 'button';
      citeBtn.setAttribute('aria-expanded', 'false');

      bibBox = createEl('div', 'bibtex-box');
      bibBox.hidden = true;

      var copyBibBtn = createEl('button', 'copy-btn', 'Copy');
      copyBibBtn.type = 'button';
      copyBibBtn.addEventListener('click', function () {
        copyText(work.bibtex, copyBibBtn);
      });

      var pre = createEl('pre', 'bibtex-pre');
      pre.textContent = work.bibtex;

      bibBox.appendChild(copyBibBtn);
      bibBox.appendChild(pre);

      citeBtn.addEventListener('click', function () {
        var expanded = !bibBox.hidden;
        bibBox.hidden = expanded;
        citeBtn.setAttribute('aria-expanded', String(!expanded));
        citeBtn.textContent = expanded ? 'BibTeX' : 'Hide BibTeX';
      });

      footer.appendChild(citeBtn);
    }

    card.appendChild(footer);
    if (bibBox) {
      card.appendChild(bibBox);
    }

    return card;
  }

  /* ---------------- Filtering & Rendering ---------------- */
  function updateFilterCounts() {
    var counts = { all: state.works.length, software: 0, genomics: 0, pharmacology: 0 };
    state.works.forEach(function (w) {
      if (Object.prototype.hasOwnProperty.call(counts, w.category)) {
        counts[w.category] += 1;
      }
    });

    Object.keys(counts).forEach(function (key) {
      var el = document.querySelector('[data-count="' + key + '"]');
      if (el) el.textContent = String(counts[key]);
    });
  }

  function matchesQuery(work, q) {
    if (!q) return true;
    var haystack = [
      work.title,
      work.subtitle,
      work.authors,
      work.summary,
      work.kind,
      work.category_label,
      (work.metrics || []).join(' '),
      (work.badges || []).join(' '),
      work.links ? Object.values(work.links).join(' ') : ''
    ].join(' ').toLowerCase();
    return haystack.indexOf(q) !== -1;
  }

  function renderWorks() {
    var container = document.getElementById('works-list');
    if (!container) return;

    var q = state.query.trim().toLowerCase();
    var filtered = state.works.filter(function (w) {
      var catOk = state.activeFilter === 'all' || w.category === state.activeFilter;
      return catOk && matchesQuery(w, q);
    });

    container.textContent = '';

    if (filtered.length === 0) {
      var empty = createEl('div', 'empty-state');
      empty.textContent = 'No verified public works match the current filter.';
      container.appendChild(empty);
      return;
    }

    var frag = document.createDocumentFragment();
    filtered.forEach(function (w) {
      frag.appendChild(buildWorkCard(w));
    });
    container.appendChild(frag);
  }

  function initControls() {
    var filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.activeFilter = btn.getAttribute('data-filter') || 'all';
        filterButtons.forEach(function (other) {
          var active = other === btn;
          other.classList.toggle('is-active', active);
          other.setAttribute('aria-selected', String(active));
        });
        renderWorks();
      });
    });

    var searchInput = document.getElementById('works-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.query = searchInput.value || '';
        renderWorks();
      });
    }
  }

  function loadWorks() {
    var container = document.getElementById('works-list');
    if (!container) return;

    fetch('./data/public_works.json')
      .then(function (resp) {
        if (!resp.ok) {
          throw new Error('HTTP ' + resp.status);
        }
        return resp.json();
      })
      .then(function (payload) {
        state.works = Array.isArray(payload.works) ? payload.works : [];
        updateFilterCounts();
        renderWorks();
      })
      .catch(function () {
        container.textContent = '';
        var fallback = createEl('div', 'empty-state');
        fallback.textContent = 'Unable to load ./data/public_works.json. Serve this directory over HTTP (e.g., python3 -m http.server) or visit https://github.com/zxu69461-creator directly.';
        container.appendChild(fallback);
      });
  }

  /* ---------------- Figure Lightbox ---------------- */
  var lastFocusedTrigger = null;

  function openLightbox(fig, triggerEl) {
    var modal = document.getElementById('figure-lightbox');
    if (!modal || !fig || !fig.src) return;

    lastFocusedTrigger = triggerEl || document.activeElement;
    var img = document.getElementById('lightbox-img');
    var label = document.getElementById('lightbox-label');
    var title = document.getElementById('lightbox-title');
    var caption = document.getElementById('lightbox-caption');
    var doi = document.getElementById('lightbox-doi');

    if (img) {
      img.src = fig.src;
      img.alt = fig.title || 'Published medRxiv figure';
    }
    if (label) label.textContent = fig.label || 'Published medRxiv Figure';
    if (title) title.textContent = fig.title || '';
    if (caption) caption.textContent = fig.caption || '';
    if (doi) {
      if (fig.doi_url) {
        doi.href = fig.doi_url;
        doi.hidden = false;
      } else {
        doi.hidden = true;
      }
    }

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('lightbox-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    var modal = document.getElementById('figure-lightbox');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
    lastFocusedTrigger = null;
  }

  function initFigureLightbox() {
    var triggers = document.querySelectorAll('.figure-trigger');
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLightbox(
          {
            src: btn.getAttribute('data-fig-src') || '',
            label: btn.getAttribute('data-fig-label') || '',
            title: btn.getAttribute('data-fig-title') || '',
            caption: btn.getAttribute('data-fig-caption') || '',
            doi_url: btn.getAttribute('data-fig-doi') || ''
          },
          btn
        );
      });
    });

    var closers = document.querySelectorAll('[data-lightbox-close]');
    closers.forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initStaticCopyButtons();
    initFigureLightbox();
    initControls();
    loadWorks();
  });
})();
