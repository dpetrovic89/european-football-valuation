// ===================================================
// European Football Player Valuation — App Router
// ===================================================
import { searchPlayers, formatValue } from './data.js';
import * as dashboard from './pages/dashboard.js';
import * as players from './pages/players.js';
import * as playerDetail from './pages/playerDetail.js';
import * as compare from './pages/compare.js';
import * as transfers from './pages/transfers.js';
import * as architecture from './pages/architecture.js';

const pageContainer = document.getElementById('page-container');
const navItems = document.querySelectorAll('.nav-item');
const searchInput = document.getElementById('global-search');
const searchResults = document.getElementById('search-results');

// ── Router ──────────────────────────────────────
function route() {
    const hash = window.location.hash || '#/dashboard';
    const parts = hash.replace('#/', '').split('/');
    const page = parts[0];
    const param = parts[1] || null;

    // Update nav
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page || (page === 'player' && item.dataset.page === 'players'));
    });

    // Render page
    let html = '';
    switch (page) {
        case 'dashboard':
            html = dashboard.render();
            break;
        case 'players':
            html = players.render();
            break;
        case 'player':
            html = playerDetail.render(param);
            break;
        case 'compare':
            html = compare.render();
            break;
        case 'transfers':
            html = transfers.render();
            break;
        case 'architecture':
            html = architecture.render();
            break;
        default:
            html = dashboard.render();
    }

    pageContainer.innerHTML = html;

    // Init page (charts, event listeners)
    requestAnimationFrame(() => {
        switch (page) {
            case 'dashboard': dashboard.init(); break;
            case 'players': players.init(); break;
            case 'player': playerDetail.init(param); break;
            case 'compare': compare.init(); break;
            case 'transfers': transfers.init(); break;
            case 'architecture': architecture.init(); break;
        }
    });

    // Scroll to top
    pageContainer.scrollTop = 0;

    // Close search
    searchResults.classList.add('hidden');
    searchInput.value = '';
}

// ── Global Search ───────────────────────────────
searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }

    const results = searchPlayers(q);
    if (results.length === 0) {
        searchResults.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:0.82rem">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(p => `
            <div class="search-result-item" data-id="${p.id}">
                <div class="result-avatar" style="background:${p.avatar_gradient}">${p.initials}</div>
                <div class="result-info">
                    <div class="result-name">${p.name}</div>
                    <div class="result-meta">${p.club} · ${p.position} · Age ${p.age}</div>
                </div>
                <div class="result-value">${formatValue(p.value)}</div>
            </div>
        `).join('');
    }
    searchResults.classList.remove('hidden');
});

searchResults.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item) {
        window.location.hash = `#/player/${item.dataset.id}`;
    }
});

// Close search on click outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchResults.classList.add('hidden');
    }
});

// ── Listen for hash changes ─────────────────────
window.addEventListener('hashchange', route);

// ── Initial route ───────────────────────────────
route();
