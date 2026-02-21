// ===================================================
// Transfers Page
// ===================================================
import { PLAYERS, TRANSFERS, MARKET_INFLATION, CLUBS, formatValue } from '../data.js';
import { drawLineChart, COLORS } from '../charts.js';

export function render() {
    const overvalued = TRANSFERS.filter(t => t.fee > t.estimatedFair * 1.1);
    const undervalued = TRANSFERS.filter(t => t.fee < t.estimatedFair * 0.9);
    const sorted = [...PLAYERS].sort((a, b) => b.value - a.value);
    const clubList = [...CLUBS].sort((a, b) => a.name.localeCompare(b.name));

    return `
    <div class="page-enter">
        <h1 class="page-title">Transfer Analytics</h1>
        <p class="page-description">Market intelligence, deal analysis, and transfer fee prediction</p>

        <div class="card-static" style="margin-bottom:28px">
            <div class="section-header">
                <div><div class="section-title">Transfer Market Inflation Index</div>
                <div class="section-subtitle">Base 2017 = 100. Market grew 65% in 7 years.</div></div>
                <span class="badge badge-gold">Current: 165</span>
            </div>
            <div class="chart-container"><canvas id="transfer-inflation-chart" height="220"></canvas></div>
        </div>

        <div class="card-static" style="margin-bottom:28px">
            <div class="section-header">
                <div><div class="section-title">🔮 Transfer Simulator</div>
                <div class="section-subtitle">Predict a fair transfer fee</div></div>
            </div>
            <div class="simulator-form">
                <div class="form-group"><label>Player</label>
                    <select id="sim-player" class="select-custom" style="width:250px">
                        <option value="">Select player...</option>
                        ${sorted.map(p => `<option value="${p.id}">${p.name} (${formatValue(p.value)})</option>`).join('')}
                    </select></div>
                <div class="form-group"><label>Destination Club</label>
                    <select id="sim-club" class="select-custom" style="width:220px">
                        <option value="">Select club...</option>
                        ${clubList.map(c => `<option value="${c.id}">${c.badge} ${c.name}</option>`).join('')}
                    </select></div>
                <div class="form-group"><label>&nbsp;</label>
                    <button id="sim-btn" class="btn btn-primary">Simulate →</button></div>
            </div>
            <div id="sim-result" class="simulator-result"></div>
        </div>

        <div class="card-static" style="margin-bottom:28px">
            <div class="section-header"><div><div class="section-title">Transfer History</div></div></div>
            <table class="data-table"><thead><tr>
                <th>Player</th><th>From</th><th>To</th><th>Fee</th><th>Fair Value</th><th>Date</th><th>Quality</th>
            </tr></thead><tbody>
                ${TRANSFERS.map(t => `<tr>
                    <td style="font-weight:700">${t.playerName}</td>
                    <td style="color:var(--text-secondary)">${t.from}</td>
                    <td style="color:var(--text-secondary)">${t.to}</td>
                    <td style="font-weight:700;color:var(--accent-green)">${t.fee > 0 ? formatValue(t.fee) : 'Free'}</td>
                    <td style="color:var(--text-secondary)">${formatValue(t.estimatedFair)}</td>
                    <td style="color:var(--text-muted)">${t.date}</td>
                    <td><span class="badge ${t.quality === 'GREAT' ? 'badge-green' : t.quality === 'FAIR' ? 'badge-gold' : 'badge-red'}">${t.quality}</span></td>
                </tr>`).join('')}
            </tbody></table>
        </div>

        <div class="grid-2">
            <div class="card-static">
                <div class="section-title" style="margin-bottom:12px">🔴 Most Overpaid Deals</div>
                ${overvalued.map(t => `<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-subtle);gap:12px">
                    <div style="flex:1"><div style="font-weight:600;font-size:0.85rem">${t.playerName}</div>
                    <div style="font-size:0.72rem;color:var(--text-muted)">${t.from} → ${t.to}</div></div>
                    <div style="text-align:right"><div style="font-weight:700;color:var(--accent-red)">${formatValue(t.fee)}</div>
                    <div style="font-size:0.68rem;color:var(--text-muted)">Fair: ${formatValue(t.estimatedFair)}</div></div>
                </div>`).join('')}
            </div>
            <div class="card-static">
                <div class="section-title" style="margin-bottom:12px">🟢 Best Value Deals</div>
                ${undervalued.map(t => `<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-subtle);gap:12px">
                    <div style="flex:1"><div style="font-weight:600;font-size:0.85rem">${t.playerName}</div>
                    <div style="font-size:0.72rem;color:var(--text-muted)">${t.from} → ${t.to}</div></div>
                    <div style="text-align:right"><div style="font-weight:700;color:var(--accent-green)">${t.fee > 0 ? formatValue(t.fee) : 'Free'}</div>
                    <div style="font-size:0.68rem;color:var(--text-muted)">Fair: ${formatValue(t.estimatedFair)}</div></div>
                </div>`).join('')}
            </div>
        </div>
    </div>`;
}

export function init() {
    const c = document.getElementById('transfer-inflation-chart');
    if (c) drawLineChart(c, [{ label: 'Index', color: COLORS.gold, data: MARKET_INFLATION.map(d => ({ label: '' + d.year, value: d.index })) }], { formatY: v => v.toFixed(0), minVal: 80 });

    const btn = document.getElementById('sim-btn');
    if (btn) btn.addEventListener('click', () => {
        const pid = document.getElementById('sim-player').value;
        const cid = document.getElementById('sim-club').value;
        const res = document.getElementById('sim-result');
        if (!pid || !cid) { res.innerHTML = '<p style="color:var(--accent-red)">Select both player and club.</p>'; res.classList.add('visible'); return; }
        const p = PLAYERS.find(x => x.id === pid), cl = CLUBS.find(x => x.id === cid);
        if (!p || !cl) return;
        const mult = cl.tier === 1 ? 1.1 : 0.95;
        const fair = Math.round(p.value * mult);
        const q = fair < p.value * 0.9 ? ['GREAT DEAL', 'badge-green'] : fair > p.value * 1.1 ? ['OVERPAY RISK', 'badge-red'] : ['FAIR DEAL', 'badge-gold'];
        res.innerHTML = `<div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center">
            <div><div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px">Predicted Fair Fee</div>
            <div class="sim-fee">${formatValue(fair)}</div><div class="sim-quality ${q[1]}">${q[0]}</div></div>
            <div style="flex:1;min-width:180px"><div style="font-size:0.82rem;color:var(--text-secondary)">
            <strong>${p.name}</strong> → <strong>${cl.name}</strong><br>
            <span style="font-size:0.75rem;color:var(--text-muted)">Value: ${formatValue(p.value)} · Contract: ${p.contractYears.toFixed(1)}yr · Tier ${cl.tier}</span></div></div></div>`;
        res.classList.add('visible');
    });
}
