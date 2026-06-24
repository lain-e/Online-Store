/** Shared search + reference/copyright helpers for public and private portfolio sites. */
(function () {
    function normalizeQuery(q) {
        return String(q || '').trim().toLowerCase();
    }

    function haystack(text) {
        return String(text || '').toLowerCase();
    }

    function matchesQuery(query, parts) {
        if (!query) return false;
        const blob = parts.filter(Boolean).join(' ');
        return haystack(blob).includes(query);
    }

    window.isReferenceMedia = function (media) {
        if (!media || media.label == null) return false;
        return String(media.label).trim().toUpperCase().startsWith('REF');
    };

    window.updatePrivateCopyrightVisibility = function (el, media) {
        if (!el) return;
        const textEl = el.querySelector('.private-copyright-text') || el;
        textEl.classList.toggle('is-text-hidden', window.isReferenceMedia(media));
    };

    window.setPrivateCopyrightForViewerMode = function (el, viewerMode, media) {
        if (!el) return;
        const textEl = el.querySelector('.private-copyright-text') || el;
        if (viewerMode === 'project' && media) {
            textEl.classList.toggle('is-text-hidden', window.isReferenceMedia(media));
            return;
        }
        textEl.classList.remove('is-text-hidden');
    };

    window.searchPortfolioData = function (query, visdevDb, categoriesList, categoryLabels, menuContent) {
        const q = normalizeQuery(query);
        if (!q || !visdevDb) return [];

        const results = [];

        (categoriesList || []).forEach(function (cat) {
            const label = (categoryLabels && categoryLabels[cat]) || cat;
            (visdevDb[cat] || []).forEach(function (project, index) {
                const mediaText = (project.media || []).map(function (m) {
                    return [m.label, m.caption, m.description].join(' ');
                }).join(' ');
                if (matchesQuery(q, [project.title, project.file, project.description, project.tag, label, mediaText])) {
                    results.push({
                        title: project.title,
                        subtitle: label + ' · ' + (project.tag || 'Project'),
                        kind: 'project',
                        category: cat,
                        index: index
                    });
                }
            });
        });

        if (menuContent) {
            Object.keys(menuContent).forEach(function (key) {
                const doc = menuContent[key];
                if (!doc) return;
                if (matchesQuery(q, [doc.title, doc.file, doc.tag, doc.body, key])) {
                    results.push({
                        title: doc.title,
                        subtitle: doc.tag || key,
                        kind: 'menu',
                        menuKey: key
                    });
                }
            });
        }

        return results.slice(0, 12);
    };

    window.initSiteSearch = function (options) {
        const toggle = document.getElementById(options.toggleId || 'search-toggle');
        const panel = document.getElementById(options.panelId || 'site-search-panel');
        const input = document.getElementById(options.inputId || 'site-search-input');
        const resultsEl = document.getElementById(options.resultsId || 'site-search-results');
        if (!toggle || !panel || !input || !resultsEl || typeof options.getResults !== 'function') return;

        let open = false;

        function closeSearch() {
            open = false;
            panel.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        }

        function openSearch() {
            open = true;
            panel.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'true');
            input.focus();
            renderResults();
        }

        function renderResults() {
            const items = options.getResults(input.value);
            if (!normalizeQuery(input.value)) {
                resultsEl.innerHTML = '<li class="site-search-empty">Type to search the portfolio.</li>';
                return;
            }
            if (!items.length) {
                resultsEl.innerHTML = '<li class="site-search-empty">No matches found.</li>';
                return;
            }
            resultsEl.innerHTML = items.map(function (item, idx) {
                return '<li><button type="button" class="site-search-result" data-search-index="' + idx + '">' +
                    '<span class="site-search-result-title">' + escapeHtml(item.title) + '</span>' +
                    (item.subtitle ? '<span class="site-search-result-sub">' + escapeHtml(item.subtitle) + '</span>' : '') +
                    '</button></li>';
            }).join('');

            resultsEl.querySelectorAll('.site-search-result').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const item = items[parseInt(btn.dataset.searchIndex, 10)];
                    if (item && typeof options.onSelect === 'function') options.onSelect(item);
                    closeSearch();
                    input.value = '';
                });
            });
        }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (open) closeSearch();
            else openSearch();
        });

        input.addEventListener('input', renderResults);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeSearch();
                input.blur();
            }
        });

        document.addEventListener('click', function (e) {
            if (!open) return;
            if (panel.contains(e.target) || toggle.contains(e.target)) return;
            closeSearch();
        });
    };

    window.searchPublicSite = function (query) {
        const q = normalizeQuery(query);
        if (!q) return [];

        const results = [];

        document.querySelectorAll('.gallery-item[data-title]').forEach(function (item) {
            if (matchesQuery(q, [
                item.getAttribute('data-title'),
                item.getAttribute('data-desc'),
                item.getAttribute('data-category'),
                item.getAttribute('data-tag'),
                item.getAttribute('data-tags'),
                item.getAttribute('data-secret-id')
            ])) {
                results.push({
                    title: item.getAttribute('data-title'),
                    subtitle: item.getAttribute('data-category'),
                    kind: 'gallery',
                    element: item
                });
            }
        });

        [
            { title: 'Backgrounds', href: '#backgrounds' },
            { title: 'Props', href: '#props' },
            { title: 'Vehicles', href: '#vehicles' },
            { title: 'Concepts', href: '#concepts' },
            { title: 'Motion Graphics', href: '#motion-graphics' },
            { title: 'VisDev', href: '#visdev' },
            { title: 'About', href: '#me' },
            { title: 'Graphics', href: '#graphics' }
        ].forEach(function (section) {
            if (matchesQuery(q, [section.title, section.href])) {
                results.push({
                    title: section.title,
                    subtitle: 'Section',
                    kind: 'section',
                    href: section.href
                });
            }
        });

        [
            { title: 'About', target: 'tab-about' },
            { title: 'Services', target: 'tab-services' },
            { title: 'Professional', target: 'tab-professional' },
            { title: 'Contact', target: 'tab-contact' }
        ].forEach(function (tab) {
            const el = document.getElementById(tab.target);
            if (el && matchesQuery(q, [tab.title, el.textContent])) {
                results.push({
                    title: tab.title,
                    subtitle: 'About page',
                    kind: 'about',
                    target: tab.target
                });
            }
        });

        return results.slice(0, 12);
    };

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    window.CONTACT_EMAIL = 'laineneufeldart@gmail.com';

    window.getContactEmailButtonHtml = function (sizeClass) {
        const size = sizeClass || 'text-lg';
        return '<div class="contact-email-btn-wrap mt-4 mb-2 flex justify-center gap-4 px-2">' +
            '<button type="button" id="email-me-btn" class="win-button win-border px-8 py-2 font-bold ' + size + ' uppercase hover:opacity-90">' +
            'EMAIL ME</button></div>';
    };

    window.initContactEmailUi = function (options) {
        options = options || {};
        if (document.documentElement.dataset.contactEmailUiInit === '1') return;
        document.documentElement.dataset.contactEmailUiInit = '1';

        const toast = document.getElementById('email-copy-toast');
        const toastOk = document.getElementById('email-copy-toast-ok');
        let toastTimeout = null;

        async function copyContactEmail() {
            try {
                await navigator.clipboard.writeText(window.CONTACT_EMAIL);
            } catch (e) {
                const ta = document.createElement('textarea');
                ta.value = window.CONTACT_EMAIL;
                ta.setAttribute('readonly', '');
                ta.style.position = 'fixed';
                ta.style.left = '-9999px';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
        }

        function hideEmailCopyToast() {
            clearTimeout(toastTimeout);
            if (toast) toast.classList.add('hidden');
        }

        function showEmailCopyToast() {
            if (!toast) return;
            clearTimeout(toastTimeout);
            toast.classList.remove('hidden');
            toastTimeout = setTimeout(hideEmailCopyToast, 4000);
        }

        document.addEventListener('click', async function (e) {
            const btn = e.target.closest('#email-me-btn');
            if (!btn) return;
            if (typeof options.onEmailClick === 'function') options.onEmailClick();
            await copyContactEmail();
            showEmailCopyToast();
        });

        if (toastOk) {
            toastOk.addEventListener('click', function () {
                if (typeof options.onToastDismiss === 'function') options.onToastDismiss();
                hideEmailCopyToast();
            });
        }

        if (toast) {
            toast.addEventListener('click', function (e) {
                if (e.target === toast) hideEmailCopyToast();
            });
        }
    };
})();
