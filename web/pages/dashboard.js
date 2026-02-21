// ===================================================
// Dashboard Page
// ===================================================
import { PLAYERS, LEAGUES, LEAGUE_VALUES, POSITION_DIST, TRANSFERS, MARKET_INFLATION, formatValue, formatPct } from '../data.js';
import { drawLineChart, drawBarChart, drawDonutChart, drawSparkline, COLORS } from '../charts.js';

export function render() {
    const totalMarketValue = PLAYERS.reduce((s, p) => s + p.value, 0);
    const avgValue = totalMarketValue / PLAYERS.length;
    const risers = [...PLAYERS].sort((a, b) => b.changePct - a.changePct).slice(0, 8);
    const fallers = [...PLAYERS].sort((a, b) => a.changePct - b.changePct).filter(p => p.changePct < 0).slice(0, 8);
    const recentTransfers = TRANSFERS.slice(0, 5);

    return `
    <div class="page-enter">
        <!-- Hero -->
        <div class="dashboard-hero">
            <div class="hero-title">Market Overview</div>
            <div class="hero-subtitle">Real-time European football market analytics — ${PLAYERS.length} players tracked across ${LEAGUES.length} leagues</div>
        </div>

        <!-- Stat Cards -->
        <div class="grid-4" style="margin-bottom: 28px;">
            <div class="stat-card" style="--card-accent: var(--grad-green)">
                <div class="stat-label">Total Market Value</div>
                <div class="stat-value">${formatValue(totalMarketValue)}</div>
                <div class="stat-change positive">▲ +3.8% vs last month</div>
            </div>
            <div class="stat-card" style="--card-accent: var(--grad-blue)">
                <div class="stat-label">Players Tracked</div>
                <div class="stat-value">${PLAYERS.length.toLocaleString()}</div>
                <div class="stat-change positive">▲ Live</div>
            </div>
            <div class="stat-card" style="--card-accent: var(--grad-gold)">
                <div class="stat-label">Average Value</div>
                <div class="stat-value">${formatValue(avgValue)}</div>
                <div class="stat-change positive">▲ +2.1%</div>
            </div>
            <div class="stat-card" style="--card-accent: var(--grad-red)">
                <div class="stat-label">Market Inflation Index</div>
                <div class="stat-value">165</div>
                <div class="stat-change positive">▲ +6.5% YoY</div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid-2" style="margin-bottom: 28px;">
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">League Value Index</div>
                        <div class="section-subtitle">Total squad value by league</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="league-bar-chart" height="260"></canvas>
                </div>
            </div>
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">Position Distribution</div>
                        <div class="section-subtitle">Player value by position group</div>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="position-donut-chart" height="260"></canvas>
                </div>
            </div>
        </div>

        <!-- Market Inflation Chart -->
        <div class="card-static" style="margin-bottom: 28px;">
            <div class="section-header">
                <div>
                    <div class="section-title">Market Inflation Index (2017–2024)</div>
                    <div class="section-subtitle">Relative transfer market price index — base year 2017 = 100</div>
                </div>
            </div>
            <div class="chart-container">
                <canvas id="inflation-chart" height="220"></canvas>
            </div>
        </div>

        <!-- Risers & Fallers -->
        <div class="grid-2" style="margin-bottom: 28px;">
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">🚀 Top Risers</div>
                        <div class="section-subtitle">Biggest value increases (30 days)</div>
                    </div>
                </div>
                ${risers.map((p, i) => `
                    <div class="riser-row" style="cursor:pointer" onclick="window.location.hash='#/player/${p.id}'">
                        <span class="riser-rank">${i + 1}</span>
                        <div class="riser-avatar" style="background:${p.avatar_gradient}">${p.initials}</div>
                        <div class="riser-info">
                            <div class="riser-name">${p.name}</div>
                            <div class="riser-club">${p.club} · ${p.position}</div>
                        </div>
                        <div class="riser-change trend-up">▲ ${formatPct(p.changePct)}</div>
                    </div>
                `).join('')}
            </div>
            <div class="card-static">
                <div class="section-header">
                    <div>
                        <div class="section-title">📉 Top Fallers</div>
                        <div class="section-subtitle">Biggest value declines (30 days)</div>
                    </div>
                </div>
                ${fallers.map((p, i) => `
                    <div class="faller-row" style="cursor:pointer" onclick="window.location.hash='#/player/${p.id}'">
                        <span class="riser-rank">${i + 1}</span>
                        <div class="riser-avatar" style="background:${p.avatar_gradient}">${p.initials}</div>
                        <div class="riser-info">
                            <div class="riser-name">${p.name}</div>
                            <div class="riser-club">${p.club} · ${p.position}</div>
                        </div>
                        <div class="riser-change trend-down">▼ ${formatPct(p.changePct)}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Recent Transfers -->
        <div class="card-static">
            <div class="section-header">
                <div>
                    <div class="section-title">Recent Transfers</div>
                    <div class="section-subtitle">Latest completed deals</div>
                </div>
                <a href="#/transfers" class="btn btn-secondary btn-small">View All →</a>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Fee</th>
                        <th>Type</th>
                        <th>Quality</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentTransfers.map(t => `
                        <tr>
                            <td style="font-weight:600">${t.playerName}</td>
                            <td style="color:var(--text-secondary)">${t.from}</td>
                            <td style="color:var(--text-secondary)">${t.to}</td>
                            <td style="font-weight:700;color:var(--accent-green)">${t.fee > 0 ? formatValue(t.fee) : 'Free'}</td>
                            <td><span class="badge badge-blue">${t.type}</span></td>
                            <td><span class="badge ${t.quality === 'GREAT' ? 'badge-green' : t.quality === 'FAIR' ? 'badge-gold' : 'badge-red'}">${t.quality}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    `;
}

export function init() {
    // League bar chart
    const leagueCanvas = document.getElementById('league-bar-chart');
    if (leagueCanvas) {
        const sorted = [...LEAGUE_VALUES].sort((a, b) => b.totalValue - a.totalValue);
        drawBarChart(leagueCanvas, sorted.map(l => ({
            label: l.name.replace(' League', '').replace('Liga ', ''),
            value: l.totalValue,
            color: l.color || COLORS.green
        })), {
            formatY: v => {
                if (v >= 1e9) return '€' + (v / 1e9).toFixed(1) + 'B';
                if (v >= 1e6) return '€' + (v / 1e6).toFixed(0) + 'M';
                return '€' + v;
            }
        });
    }

    // Position donut
    const donutCanvas = document.getElementById('position-donut-chart');
    if (donutCanvas) {
        drawDonutChart(donutCanvas, POSITION_DIST.map(d => ({
            label: d.label,
            value: d.totalValue
        })), {
            centerLabel: 'Total',
            centerValue: formatValue(PLAYERS.reduce((s, p) => s + p.value, 0))
        });
    }

    // Inflation chart
    const inflationCanvas = document.getElementById('inflation-chart');
    if (inflationCanvas) {
        drawLineChart(inflationCanvas, [{
            label: 'Market Index',
            color: COLORS.gold,
            data: MARKET_INFLATION.map(d => ({ label: d.year.toString(), value: d.index }))
        }], {
            formatY: v => v.toFixed(0)
        });
    }
}
