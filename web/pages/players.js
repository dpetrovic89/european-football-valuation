// ===================================================
// Players Explorer Page
// ===================================================
import { PLAYERS, LEAGUES, formatValue, formatPct, getPositionClass } from '../data.js';

let currentFilters = { league: '', position: '', sort: 'value' };
let searchQuery = '';

export function render() {
    const positions = ['ST', 'LW', 'RW', 'CF', 'CAM', 'CM', 'CDM', 'CB', 'LB', 'RB', 'GK'];

    return `
    <div class="page-enter">
        <h1 class="page-title">Player Explorer</h1>
        <p class="page-description">Browse, search, and filter ${PLAYERS.length} European football players valued by our AI engine</p>

        <!-- Filter Bar -->
        <div class="filter-bar">
            <div class="form-group">
                <label>Search</label>
                <input type="text" id="player-search" class="search-input" style="width:220px;padding-left:14px" placeholder="Player name...">
            </div>
            <div class="form-group">
                <label>League</label>
                <select id="filter-league" class="select-custom">
                    <option value="">All Leagues</option>
                    ${LEAGUES.map(l => `<option value="${l.id}">${l.flag} ${l.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Position</label>
                <select id="filter-position" class="select-custom">
                    <option value="">All Positions</option>
                    ${positions.map(p => `<option value="${p}">${p}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Sort By</label>
                <select id="filter-sort" class="select-custom">
                    <option value="value">Highest Value</option>
                    <option value="value-asc">Lowest Value</option>
                    <option value="change">Biggest Change</option>
                    <option value="age">Youngest</option>
                    <option value="age-desc">Oldest</option>
                    <option value="rating">Match Rating</option>
                </select>
            </div>
            <div class="form-group" style="margin-left:auto">
                <label>&nbsp;</label>
                <span id="player-count" style="font-size:0.82rem;color:var(--text-muted);font-weight:600">${PLAYERS.length} players</span>
            </div>
        </div>

        <!-- Player Grid -->
        <div id="player-grid" class="grid-4">
            ${renderPlayerCards(PLAYERS)}
        </div>
    </div>
    `;
}

function renderPlayerCards(players) {
    if (players.length === 0) {
        return `
        <div class="empty-state" style="grid-column: 1 / -1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <h3>No players found</h3>
            <p>Try adjusting your filters</p>
        </div>`;
    }
    return players.map(p => `
        <div class="player-card" onclick="window.location.hash='#/player/${p.id}'">
            <span class="player-position ${getPositionClass(p.position)}">${p.position}</span>
            <div class="player-avatar" style="background:${p.avatar_gradient}">${p.initials}</div>
            <div class="player-name">${p.name}</div>
            <div class="player-club">${p.clubBadge} ${p.club} · ${p.leagueFlag}</div>
            <div class="player-value">${formatValue(p.value)}</div>
            <div class="player-trend ${p.trend === 'RISING' ? 'trend-up' : p.trend === 'DECLINING' ? 'trend-down' : 'trend-stable'}">
                ${p.trend === 'RISING' ? '▲' : p.trend === 'DECLINING' ? '▼' : '–'} ${formatPct(p.changePct)}
            </div>
            <div style="margin-top:8px;display:flex;gap:12px;font-size:0.72rem;color:var(--text-muted)">
                <span>Age ${p.age}</span>
                <span>${p.flag}</span>
                <span>⭐ ${p.stats.matchRating}</span>
            </div>
        </div>
    `).join('');
}

function applyFilters() {
    let filtered = [...PLAYERS];

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.club.toLowerCase().includes(q)
        );
    }
    if (currentFilters.league) {
        filtered = filtered.filter(p => p.leagueId === currentFilters.league);
    }
    if (currentFilters.position) {
        filtered = filtered.filter(p => p.position === currentFilters.position);
    }

    switch (currentFilters.sort) {
        case 'value': filtered.sort((a, b) => b.value - a.value); break;
        case 'value-asc': filtered.sort((a, b) => a.value - b.value); break;
        case 'change': filtered.sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct)); break;
        case 'age': filtered.sort((a, b) => a.age - b.age); break;
        case 'age-desc': filtered.sort((a, b) => b.age - a.age); break;
        case 'rating': filtered.sort((a, b) => b.stats.matchRating - a.stats.matchRating); break;
    }

    const grid = document.getElementById('player-grid');
    const count = document.getElementById('player-count');
    if (grid) grid.innerHTML = renderPlayerCards(filtered);
    if (count) count.textContent = `${filtered.length} player${filtered.length !== 1 ? 's' : ''}`;
}

export function init() {
    const searchEl = document.getElementById('player-search');
    const leagueEl = document.getElementById('filter-league');
    const posEl = document.getElementById('filter-position');
    const sortEl = document.getElementById('filter-sort');

    if (searchEl) searchEl.addEventListener('input', e => { searchQuery = e.target.value; applyFilters(); });
    if (leagueEl) leagueEl.addEventListener('change', e => { currentFilters.league = e.target.value; applyFilters(); });
    if (posEl) posEl.addEventListener('change', e => { currentFilters.position = e.target.value; applyFilters(); });
    if (sortEl) sortEl.addEventListener('change', e => { currentFilters.sort = e.target.value; applyFilters(); });
}
