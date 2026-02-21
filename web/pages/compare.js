// ===================================================
// Compare Page
// ===================================================
import { PLAYERS, formatValue, formatPct, getPositionClass } from '../data.js';
import { drawRadarChart, drawLineChart, COLORS } from '../charts.js';

let playerA = null;
let playerB = null;

export function render() {
    const sorted = [...PLAYERS].sort((a, b) => b.value - a.value);

    return `
    <div class="page-enter">
        <h1 class="page-title">Player Comparison</h1>
        <p class="page-description">Compare two players side-by-side across performance, valuation, and potential</p>

        <!-- Player Selectors -->
        <div class="compare-header">
            <div class="card-static" style="text-align:center;padding:20px">
                <label style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:8px">Player A</label>
                <select id="compare-player-a" class="select-custom" style="width:100%;max-width:280px">
                    <option value="">Select a player...</option>
                    ${sorted.map(p => `<option value="${p.id}" ${p.id === 'p1' ? 'selected' : ''}>${p.name} — ${p.club} (${formatValue(p.value)})</option>`).join('')}
                </select>
                <div id="compare-avatar-a" style="margin-top:16px"></div>
            </div>
            <div class="compare-vs">VS</div>
            <div class="card-static" style="text-align:center;padding:20px">
                <label style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:8px">Player B</label>
                <select id="compare-player-b" class="select-custom" style="width:100%;max-width:280px">
                    <option value="">Select a player...</option>
                    ${sorted.map(p => `<option value="${p.id}" ${p.id === 'p2' ? 'selected' : ''}>${p.name} — ${p.club} (${formatValue(p.value)})</option>`).join('')}
                </select>
                <div id="compare-avatar-b" style="margin-top:16px"></div>
            </div>
        </div>

        <!-- Comparison Content -->
        <div id="compare-content"></div>
    </div>
    `;
}

function renderComparison() {
    if (!playerA || !playerB) return;
    const container = document.getElementById('compare-content');
    if (!container) return;

    // Stat comparison
    const stats = [
        { label: 'Market Value', a: playerA.value, b: playerB.value, format: formatValue },
        { label: 'Match Rating', a: playerA.stats.matchRating, b: playerB.stats.matchRating, format: v => v.toFixed(1), max: 10 },
        { label: 'Goals', a: playerA.stats.goals, b: playerB.stats.goals },
        { label: 'Assists', a: playerA.stats.assists, b: playerB.stats.assists },
        { label: 'xG', a: playerA.stats.xG, b: playerB.stats.xG, format: v => v.toFixed(1) },
        { label: 'xA', a: playerA.stats.xA, b: playerB.stats.xA, format: v => v.toFixed(1) },
        { label: 'Pass Accuracy', a: playerA.stats.passAcc, b: playerB.stats.passAcc, format: v => v.toFixed(1) + '%', max: 100 },
        { label: 'Dribbles/Game', a: playerA.stats.dribblesPerGame, b: playerB.stats.dribblesPerGame, format: v => v.toFixed(1) },
        { label: 'Tackles/Game', a: playerA.stats.tacklesPerGame, b: playerB.stats.tacklesPerGame, format: v => v.toFixed(1) },
        { label: 'Aerial Won', a: playerA.stats.aerialWon, b: playerB.stats.aerialWon, format: v => v.toFixed(1) },
        { label: 'Distance/Game', a: playerA.stats.distanceKm, b: playerB.stats.distanceKm, format: v => v.toFixed(1) + 'km' },
        { label: 'Sprints/Game', a: playerA.stats.sprints, b: playerB.stats.sprints },
    ];

    container.innerHTML = `
        <div class="grid-2" style="margin-bottom:28px">
            <!-- Radar Comparison -->
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">Valuation Factor Comparison</div>
                        <div class="section-subtitle">Overlaid valuation breakdown</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="compare-radar" height="320"></canvas>
                </div>
            </div>

            <!-- Value History Comparison -->
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">Value Trajectory</div>
                        <div class="section-subtitle">24-month valuation history</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="compare-history" height="320"></canvas>
                </div>
            </div>
        </div>

        <!-- Stat Bars -->
        <div class="card-static">
            <div class="section-header">
                <div>
                    <div class="section-title">Head-to-Head Statistics</div>
                    <div class="section-subtitle">Direct metric comparison — winner highlighted in green</div>
                </div>
            </div>
            <div style="padding:8px 0">
                <!-- Header -->
                <div class="compare-stat-row" style="border-bottom:2px solid var(--border-subtle)">
                    <div style="text-align:right;font-weight:700;font-size:0.9rem">${playerA.name}</div>
                    <div class="compare-stat-label" style="font-size:0.68rem">STAT</div>
                    <div style="font-weight:700;font-size:0.9rem">${playerB.name}</div>
                </div>
                ${stats.map(s => {
        const format = s.format || (v => v);
        const maxVal = s.max || Math.max(s.a, s.b) * 1.1 || 1;
        const aWin = s.a >= s.b;
        const bWin = s.b >= s.a;
        const aPct = Math.min(100, (s.a / maxVal) * 100);
        const bPct = Math.min(100, (s.b / maxVal) * 100);
        return `
                    <div class="compare-stat-row">
                        <div class="compare-bar-left">
                            <span class="compare-stat-value ${aWin ? 'compare-winner' : ''}" style="color:${aWin ? 'var(--accent-green)' : 'var(--text-secondary)'}">${format(s.a)}</span>
                            <div class="compare-bar-track" style="width:${aPct}%;max-width:200px;min-width:4px;height:8px;border-radius:4px;background:${aWin ? 'var(--accent-green)' : 'rgba(148,163,184,0.3)'}"></div>
                        </div>
                        <div class="compare-stat-label">${s.label}</div>
                        <div class="compare-bar-right">
                            <div class="compare-bar-track" style="width:${bPct}%;max-width:200px;min-width:4px;height:8px;border-radius:4px;background:${bWin && !aWin ? 'var(--accent-blue)' : 'rgba(148,163,184,0.3)'}"></div>
                            <span class="compare-stat-value" style="color:${bWin && !aWin ? 'var(--accent-blue)' : 'var(--text-secondary)'}">${format(s.b)}</span>
                        </div>
                    </div>`;
    }).join('')}
            </div>
        </div>
    `;

    // Render charts
    renderCharts();
}

function renderCharts() {
    if (!playerA || !playerB) return;

    // Radar
    const radarCanvas = document.getElementById('compare-radar');
    if (radarCanvas) {
        const labels = ['Performance', 'Age Factor', 'Contract', 'Market', 'Potential', 'Popularity'];
        drawRadarChart(radarCanvas, [
            {
                label: playerA.name,
                color: COLORS.green,
                values: [playerA.breakdown.performance, playerA.breakdown.age, playerA.breakdown.contract, playerA.breakdown.market, playerA.breakdown.potential, playerA.breakdown.popularity]
            },
            {
                label: playerB.name,
                color: COLORS.blue,
                values: [playerB.breakdown.performance, playerB.breakdown.age, playerB.breakdown.contract, playerB.breakdown.market, playerB.breakdown.potential, playerB.breakdown.popularity]
            }
        ], labels, { maxVal: 1.5 });
    }

    // History
    const histCanvas = document.getElementById('compare-history');
    if (histCanvas) {
        drawLineChart(histCanvas, [
            {
                label: playerA.name,
                color: COLORS.green,
                fill: false,
                data: playerA.valuationHistory.map(h => ({ label: h.date, value: h.value }))
            },
            {
                label: playerB.name,
                color: COLORS.blue,
                fill: false,
                data: playerB.valuationHistory.map(h => ({ label: h.date, value: h.value }))
            }
        ], {
            formatY: v => v >= 1e6 ? '€' + (v / 1e6).toFixed(0) + 'M' : '€' + v
        });
    }
}

function renderAvatar(el, p) {
    if (!el || !p) return;
    el.innerHTML = `
        <div style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">
            <div style="width:56px;height:56px;border-radius:50%;background:${p.avatar_gradient};display:flex;align-items:center;justify-content:center;font-weight:800;font-family:'Outfit',sans-serif;color:var(--bg-primary);font-size:1rem">${p.initials}</div>
            <div style="font-weight:700;font-size:0.9rem">${p.name}</div>
            <div style="font-size:0.75rem;color:var(--text-muted)">${p.club} · ${p.position} · Age ${p.age}</div>
            <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.2rem;color:var(--accent-green)">${formatValue(p.value)}</div>
        </div>
    `;
}

export function init() {
    const selA = document.getElementById('compare-player-a');
    const selB = document.getElementById('compare-player-b');

    function update() {
        playerA = PLAYERS.find(p => p.id === selA.value) || null;
        playerB = PLAYERS.find(p => p.id === selB.value) || null;
        renderAvatar(document.getElementById('compare-avatar-a'), playerA);
        renderAvatar(document.getElementById('compare-avatar-b'), playerB);
        if (playerA && playerB) renderComparison();
    }

    if (selA) selA.addEventListener('change', update);
    if (selB) selB.addEventListener('change', update);

    // Initial render with defaults
    update();
}
