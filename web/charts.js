// ===================================================
// European Football Player Valuation — Chart Utilities
// Lightweight canvas-based chart rendering
// ===================================================

const COLORS = {
    green: '#00F593',
    blue: '#00B4D8',
    gold: '#FFBE0B',
    red: '#FF6B6B',
    purple: '#A78BFA',
    orange: '#FB923C',
    text: '#94A3B8',
    textDim: '#64748B',
    grid: 'rgba(255,255,255,0.05)',
    bg: '#111827',
};

function getCtx(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
}

// ── LINE CHART ──────────────────────────────────
export function drawLineChart(canvas, datasets, options = {}) {
    const { ctx, w, h } = getCtx(canvas);
    const pad = { top: 20, right: 20, bottom: 40, left: 65 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    // Find bounds
    let allValues = [];
    datasets.forEach(ds => ds.data.forEach(d => allValues.push(d.value)));
    const minVal = options.minVal ?? Math.min(...allValues) * 0.9;
    const maxVal = options.maxVal ?? Math.max(...allValues) * 1.1;
    const valRange = maxVal - minVal || 1;

    // Background
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    const gridCount = 5;
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.font = '11px Inter';
    ctx.fillStyle = COLORS.textDim;
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridCount; i++) {
        const y = pad.top + (ch / gridCount) * i;
        const val = maxVal - (valRange / gridCount) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
        const label = options.formatY ? options.formatY(val) : formatShort(val);
        ctx.fillText(label, pad.left - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.textDim;
    const ds0 = datasets[0];
    const step = Math.max(1, Math.floor(ds0.data.length / 6));
    ds0.data.forEach((d, i) => {
        if (i % step === 0 || i === ds0.data.length - 1) {
            const x = pad.left + (i / (ds0.data.length - 1)) * cw;
            ctx.fillText(d.label || '', x, h - pad.bottom + 20);
        }
    });

    // Draw lines
    datasets.forEach(ds => {
        const pts = ds.data.map((d, i) => ({
            x: pad.left + (i / (ds.data.length - 1)) * cw,
            y: pad.top + ch - ((d.value - minVal) / valRange) * ch
        }));

        // Gradient fill
        if (ds.fill !== false) {
            const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
            grad.addColorStop(0, (ds.color || COLORS.green) + '30');
            grad.addColorStop(1, (ds.color || COLORS.green) + '00');
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pad.top + ch);
            pts.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.lineTo(pts[pts.length - 1].x, pad.top + ch);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();
        }

        // Line
        ctx.beginPath();
        ctx.strokeStyle = ds.color || COLORS.green;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        if (ds.dashed) ctx.setLineDash([6, 4]);
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.setLineDash([]);

        // End dot
        const last = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = ds.color || COLORS.green;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(last.x, last.y, 7, 0, Math.PI * 2);
        ctx.strokeStyle = (ds.color || COLORS.green) + '40';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Legend
    if (datasets.length > 1) {
        ctx.font = '11px Inter';
        let lx = pad.left;
        datasets.forEach(ds => {
            ctx.fillStyle = ds.color || COLORS.green;
            ctx.fillRect(lx, h - 12, 12, 3);
            ctx.fillStyle = COLORS.text;
            ctx.textAlign = 'left';
            ctx.fillText(ds.label || '', lx + 16, h - 7);
            lx += ctx.measureText(ds.label || '').width + 36;
        });
    }
}

// ── BAR CHART ───────────────────────────────────
export function drawBarChart(canvas, data, options = {}) {
    const { ctx, w, h } = getCtx(canvas);
    const pad = { top: 20, right: 20, bottom: 50, left: 65 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    const maxVal = options.maxVal ?? Math.max(...data.map(d => d.value)) * 1.15;

    // Grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.font = '11px Inter';
    ctx.fillStyle = COLORS.textDim;
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const y = pad.top + (ch / 4) * i;
        const val = maxVal - (maxVal / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();
        ctx.fillText(options.formatY ? options.formatY(val) : formatShort(val), pad.left - 8, y + 4);
    }

    // Bars
    const barW = Math.min(40, (cw / data.length) * 0.6);
    const gap = (cw - barW * data.length) / (data.length + 1);

    data.forEach((d, i) => {
        const x = pad.left + gap + i * (barW + gap);
        const barH = (d.value / maxVal) * ch;
        const y = pad.top + ch - barH;

        // Gradient bar
        const grad = ctx.createLinearGradient(x, y, x, pad.top + ch);
        grad.addColorStop(0, d.color || COLORS.green);
        grad.addColorStop(1, (d.color || COLORS.green) + '40');
        ctx.fillStyle = grad;

        // Rounded top
        const r = Math.min(4, barW / 2);
        ctx.beginPath();
        ctx.moveTo(x, pad.top + ch);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.lineTo(x + barW - r, y);
        ctx.arcTo(x + barW, y, x + barW, y + r, r);
        ctx.lineTo(x + barW, pad.top + ch);
        ctx.closePath();
        ctx.fill();

        // Value on top
        ctx.fillStyle = COLORS.text;
        ctx.textAlign = 'center';
        ctx.font = '10px Inter';
        ctx.fillText(options.formatVal ? options.formatVal(d.value) : formatShort(d.value), x + barW / 2, y - 6);

        // Label
        ctx.fillStyle = COLORS.textDim;
        ctx.font = '10px Inter';
        ctx.save();
        ctx.translate(x + barW / 2, h - pad.bottom + 12);
        ctx.rotate(-0.4);
        ctx.textAlign = 'right';
        ctx.fillText(d.label, 0, 0);
        ctx.restore();
    });
}

// ── RADAR CHART ─────────────────────────────────
export function drawRadarChart(canvas, datasets, labels, options = {}) {
    const { ctx, w, h } = getCtx(canvas);
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 40;
    const n = labels.length;
    const angleStep = (Math.PI * 2) / n;

    // Grid rings
    for (let r = 1; r <= 5; r++) {
        const ringR = (r / 5) * radius;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const a = -Math.PI / 2 + i * angleStep;
            const x = cx + ringR * Math.cos(a);
            const y = cy + ringR * Math.sin(a);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Axis lines + labels
    ctx.font = '11px Inter';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + i * angleStep;
        const x1 = cx + radius * Math.cos(a);
        const y1 = cy + radius * Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = COLORS.grid;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        const lx = cx + (radius + 18) * Math.cos(a);
        const ly = cy + (radius + 18) * Math.sin(a);
        ctx.fillStyle = COLORS.text;
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], lx, ly);
    }

    // Data polygons
    datasets.forEach(ds => {
        ctx.beginPath();
        ds.values.forEach((v, i) => {
            const a = -Math.PI / 2 + i * angleStep;
            const r = (v / (options.maxVal || 1.5)) * radius;
            const x = cx + r * Math.cos(a);
            const y = cy + r * Math.sin(a);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = (ds.color || COLORS.green) + '25';
        ctx.fill();
        ctx.strokeStyle = ds.color || COLORS.green;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dots
        ds.values.forEach((v, i) => {
            const a = -Math.PI / 2 + i * angleStep;
            const r = (v / (options.maxVal || 1.5)) * radius;
            const x = cx + r * Math.cos(a);
            const y = cy + r * Math.sin(a);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = ds.color || COLORS.green;
            ctx.fill();
        });
    });

    // Legend
    if (datasets.length > 1) {
        let lx = 10;
        ctx.font = '11px Inter';
        datasets.forEach(ds => {
            ctx.fillStyle = ds.color || COLORS.green;
            ctx.fillRect(lx, h - 14, 12, 3);
            ctx.fillStyle = COLORS.text;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(ds.label || '', lx + 16, h - 8);
            lx += ctx.measureText(ds.label || '').width + 36;
        });
    }
}

// ── DONUT CHART ─────────────────────────────────
export function drawDonutChart(canvas, data, options = {}) {
    const { ctx, w, h } = getCtx(canvas);
    const cx = w / 2;
    const cy = h / 2;
    const outerR = Math.min(cx, cy) - 30;
    const innerR = outerR * 0.6;
    const total = data.reduce((s, d) => s + d.value, 0);

    const colors = [COLORS.red, COLORS.blue, COLORS.purple, COLORS.gold, COLORS.green, COLORS.orange];

    let startAngle = -Math.PI / 2;
    data.forEach((d, i) => {
        const sliceAngle = (d.value / total) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startAngle, endAngle);
        ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = d.color || colors[i % colors.length];
        ctx.fill();

        // Label
        const midAngle = startAngle + sliceAngle / 2;
        const lx = cx + (outerR + 16) * Math.cos(midAngle);
        const ly = cy + (outerR + 16) * Math.sin(midAngle);
        ctx.fillStyle = COLORS.text;
        ctx.font = '11px Inter';
        ctx.textAlign = midAngle > Math.PI / 2 && midAngle < Math.PI * 1.5 ? 'right' : 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${d.label} (${Math.round(d.value / total * 100)}%)`, lx, ly);

        startAngle = endAngle;
    });

    // Center text
    if (options.centerLabel) {
        ctx.fillStyle = COLORS.text;
        ctx.font = 'bold 14px Outfit';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(options.centerLabel, cx, cy - 6);

        if (options.centerValue) {
            ctx.fillStyle = COLORS.green;
            ctx.font = 'bold 20px Outfit';
            ctx.fillText(options.centerValue, cx, cy + 14);
        }
    }
}

// ── SPARKLINE ───────────────────────────────────
export function drawSparkline(canvas, values, color = COLORS.green) {
    const { ctx, w, h } = getCtx(canvas);
    const pad = 2;
    const cw = w - pad * 2;
    const ch = h - pad * 2;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';

    values.forEach((v, i) => {
        const x = pad + (i / (values.length - 1)) * cw;
        const y = pad + ch - ((v - min) / range) * ch;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill
    const grad = ctx.createLinearGradient(0, pad, 0, h);
    grad.addColorStop(0, color + '20');
    grad.addColorStop(1, color + '00');
    ctx.lineTo(pad + cw, pad + ch);
    ctx.lineTo(pad, pad + ch);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
}

// ── HORIZONTAL BAR ──────────────────────────────
export function drawHorizontalBar(canvas, value, maxVal, color = COLORS.green) {
    const { ctx, w, h } = getCtx(canvas);
    const barH = h * 0.5;
    const y = (h - barH) / 2;
    const fillW = (value / maxVal) * w;

    // Track
    ctx.fillStyle = COLORS.grid;
    ctx.beginPath();
    ctx.roundRect(0, y, w, barH, 3);
    ctx.fill();

    // Fill
    const grad = ctx.createLinearGradient(0, 0, fillW, 0);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '80');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, y, fillW, barH, 3);
    ctx.fill();
}

// ── Helpers ─────────────────────────────────────
function formatShort(val) {
    if (Math.abs(val) >= 1e9) return '€' + (val / 1e9).toFixed(1) + 'B';
    if (Math.abs(val) >= 1e6) return '€' + (val / 1e6).toFixed(0) + 'M';
    if (Math.abs(val) >= 1e3) return '€' + (val / 1e3).toFixed(0) + 'K';
    return '€' + val.toFixed(0);
}

export { COLORS };
