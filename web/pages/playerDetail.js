// ===================================================
// Player Detail Page
// ===================================================
import { PLAYERS, getPlayer, formatValue, formatValueFull, formatPct, getPositionClass } from '../data.js';
import { drawLineChart, drawRadarChart, COLORS } from '../charts.js';

export function render(playerId) {
    const p = getPlayer(playerId);
    if (!p) {
        return `<div class="page-enter empty-state"><h3>Player not found</h3><p>The player you're looking for doesn't exist.</p></div>`;
    }

    const similarPlayers = PLAYERS
        .filter(sp => sp.id !== p.id && sp.posGroup === p.posGroup)
        .sort((a, b) => Math.abs(a.value - p.value) - Math.abs(b.value - p.value))
        .slice(0, 4);

    const contractYearsDisplay = p.contractYears.toFixed(1);

    return `
    <div class="page-enter">
        <!-- Back Button -->
        <div style="margin-bottom:16px">
            <a href="#/players" class="btn btn-secondary btn-small">← Back to Players</a>
        </div>

        <!-- Hero -->
        <div class="player-hero">
            <div class="player-hero-avatar" style="background:${p.avatar_gradient}">${p.initials}</div>
            <div class="player-hero-info">
                <h1 class="player-hero-name">${p.name}</h1>
                <div class="player-hero-meta">
                    <span><span class="${getPositionClass(p.position)}" style="padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:700">${p.position}</span></span>
                    <span>${p.flag} ${p.nationality.join(', ')}</span>
                    <span>${p.clubBadge} ${p.club}</span>
                    <span>📅 Age ${p.age}</span>
                    <span>📏 ${p.height}cm / ${p.weight}kg</span>
                    <span>🦶 ${p.foot}</span>
                    <span>🏟️ ${p.intlCaps} caps</span>
                </div>
                <div style="display:flex;gap:16px;flex-wrap:wrap">
                    <div>
                        <span style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">Contract</span>
                        <div style="font-weight:700;font-size:0.85rem">${p.contractExpiry} (${contractYearsDisplay}yr)</div>
                    </div>
                    <div>
                        <span style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">League</span>
                        <div style="font-weight:700;font-size:0.85rem">${p.leagueFlag} ${p.league}</div>
                    </div>
                    <div>
                        <span style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">Trend</span>
                        <div class="${p.trend === 'RISING' ? 'trend-up' : p.trend === 'DECLINING' ? 'trend-down' : 'trend-stable'}" style="font-weight:700;font-size:0.85rem">
                            ${p.trend === 'RISING' ? '▲' : p.trend === 'DECLINING' ? '▼' : '–'} ${p.trend}
                        </div>
                    </div>
                </div>
            </div>
            <div class="player-hero-valuation">
                <div class="player-hero-val-label">Estimated Market Value</div>
                <div class="player-hero-val-amount">${formatValue(p.value)}</div>
                <div class="stat-change ${p.changePct >= 0 ? 'positive' : 'negative'}" style="margin-top:8px">
                    ${p.changePct >= 0 ? '▲' : '▼'} ${formatPct(p.changePct)} (30d)
                </div>
                <div style="margin-top:12px">
                    <div class="confidence-labels">
                        <span>${formatValue(p.value * 0.85)}</span>
                        <span style="color:var(--text-primary);font-weight:600">80% CI</span>
                        <span>${formatValue(p.value * 1.15)}</span>
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-track">
                            <div class="confidence-fill" style="left:15%;width:70%"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid-2" style="margin-bottom:28px">
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">Valuation History</div>
                        <div class="section-subtitle">24-month value trajectory</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="val-history-chart" height="280"></canvas>
                </div>
            </div>
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">Valuation Breakdown</div>
                        <div class="section-subtitle">Factor contribution to current valuation</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="val-radar-chart" height="280"></canvas>
                </div>
            </div>
        </div>

        <!-- Performance Stats -->
        <div class="card-static" style="margin-bottom:28px">
            <div class="section-header">
                <div>
                    <div class="section-title">Performance Statistics</div>
                    <div class="section-subtitle">Current season — ${p.stats.appearances} appearances, ${p.stats.minutesPlayed} minutes</div>
                </div>
                <span class="badge badge-green">⭐ ${p.stats.matchRating} avg rating</span>
            </div>
            <div class="grid-4" style="gap:12px">
                ${statBox('Goals', p.stats.goals, 'var(--accent-green)')}
                ${statBox('Assists', p.stats.assists, 'var(--accent-blue)')}
                ${statBox('xG', p.stats.xG.toFixed(1), 'var(--accent-gold)')}
                ${statBox('xA', p.stats.xA.toFixed(1), 'var(--accent-purple)')}
                ${statBox('Shots/Game', p.stats.shotsPerGame.toFixed(1), 'var(--accent-orange)')}
                ${statBox('Key Passes', p.stats.keyPasses.toFixed(1), 'var(--accent-blue)')}
                ${statBox('Dribbles/G', p.stats.dribblesPerGame.toFixed(1), 'var(--accent-green)')}
                ${statBox('Tackles/G', p.stats.tacklesPerGame.toFixed(1), 'var(--accent-red)')}
                ${statBox('Pass Acc.', p.stats.passAcc.toFixed(1) + '%', 'var(--accent-blue)')}
                ${statBox('Aerial Won', p.stats.aerialWon.toFixed(1), 'var(--accent-gold)')}
                ${statBox('Distance/G', p.stats.distanceKm.toFixed(1) + 'km', 'var(--accent-purple)')}
                ${statBox('Sprints/G', p.stats.sprints, 'var(--accent-red)')}
            </div>
        </div>

        <!-- Similar Players -->
        <div class="card-static">
            <div class="section-header">
                <div>
                    <div class="section-title">Similar Players</div>
                    <div class="section-subtitle">Comparable profiles by position and value</div>
                </div>
                <a href="#/compare" class="btn btn-secondary btn-small">Compare →</a>
            </div>
            <div class="grid-4">
                ${similarPlayers.map(sp => `
                    <div class="player-card" onclick="window.location.hash='#/player/${sp.id}'">
                        <span class="player-position ${getPositionClass(sp.position)}">${sp.position}</span>
                        <div class="player-avatar" style="background:${sp.avatar_gradient};width:42px;height:42px;font-size:0.8rem">${sp.initials}</div>
                        <div class="player-name" style="font-size:0.9rem">${sp.name}</div>
                        <div class="player-club">${sp.clubBadge} ${sp.club}</div>
                        <div class="player-value" style="font-size:1rem">${formatValue(sp.value)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    `;
}

function statBox(label, value, color) {
    return `
    <div style="background:var(--bg-glass);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:14px 16px;text-align:center">
        <div style="font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">${label}</div>
        <div style="font-family:'Outfit',sans-serif;font-size:1.3rem;font-weight:800;color:${color}">${value}</div>
    </div>`;
}

export function init(playerId) {
    const p = getPlayer(playerId);
    if (!p) return;

    // Valuation history chart
    const histCanvas = document.getElementById('val-history-chart');
    if (histCanvas) {
        drawLineChart(histCanvas, [{
            label: 'Market Value',
            color: COLORS.green,
            data: p.valuationHistory.map(h => ({
                label: h.date,
                value: h.value
            }))
        }], {
            formatY: v => {
                if (v >= 1e6) return '€' + (v / 1e6).toFixed(0) + 'M';
                return '€' + v;
            }
        });
    }

    // Radar chart
    const radarCanvas = document.getElementById('val-radar-chart');
    if (radarCanvas) {
        const labels = ['Performance', 'Age Factor', 'Contract', 'Market', 'Potential', 'Popularity'];
        const values = [
            p.breakdown.performance,
            p.breakdown.age,
            p.breakdown.contract,
            p.breakdown.market,
            p.breakdown.potential,
            p.breakdown.popularity
        ];
        drawRadarChart(radarCanvas, [{
            label: p.name,
            color: COLORS.green,
            values
        }], labels, { maxVal: 1.5 });
    }
}
