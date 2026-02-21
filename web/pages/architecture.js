// ===================================================
// Architecture Page
// ===================================================

const LAYERS = [
    {
        title: '🖥️ Client Layer',
        components: [
            { icon: '🌐', name: 'Web App', tech: 'React / Next.js', detail: 'Responsive SPA with real-time valuation updates, charts, and player search. Uses WebSocket for live match value changes.' },
            { icon: '📱', name: 'Mobile App', tech: 'React Native', detail: 'Native mobile experience for scouting and player tracking on the go. Push notifications for watchlist alerts.' },
            { icon: '🏢', name: 'Club CRM', tech: 'Custom Integration', detail: 'Integration with club management systems. Bulk API access, scouting reports, and squad planning tools.' },
            { icon: '🤝', name: 'Agent Portal', tech: 'White-label', detail: 'Dedicated interface for player agents with contract analysis, value projections, and negotiation support.' },
        ]
    },
    {
        title: '🚪 API Gateway & CDN',
        components: [
            { icon: '🔒', name: 'API Gateway', tech: 'AWS API Gateway', detail: 'Rate limiting (100-100K req/hr by tier), OAuth2 auth, JWT tokens, SSL termination. Routes to microservices.' },
            { icon: '⚡', name: 'CDN', tech: 'CloudFront', detail: '5-min TTL cache for top 100 player pages. Global edge locations for <50ms first byte time.' },
            { icon: '🛡️', name: 'WAF', tech: 'AWS WAF', detail: 'Web Application Firewall protecting against DDoS, SQL injection, and bot scraping.' },
        ]
    },
    {
        title: '⚙️ Service Layer',
        components: [
            { icon: '👤', name: 'Player Service', tech: 'FastAPI / Python', detail: 'CRUD for player profiles, contracts, career history. PostgreSQL backend with read replicas for high throughput.' },
            { icon: '💰', name: 'Valuation Service', tech: 'FastAPI / Python', detail: 'Core engine: ensemble ML model (XGBoost 40% + DNN 35% + Comparable Analysis 25%). Rule-based adjustments for age, injury, contract.' },
            { icon: '🔍', name: 'Search Service', tech: 'Elasticsearch', detail: 'Full-text + faceted search across 500K players. Auto-complete, fuzzy matching, position/league filters.' },
            { icon: '📊', name: 'Transfer Service', tech: 'FastAPI / Python', detail: 'Transfer history, deal simulation, fair value estimation. Comparable transfer lookup via vector similarity.' },
            { icon: '🤖', name: 'ML Service', tech: 'SageMaker', detail: 'Model training (weekly), inference endpoints (auto-scaling GPU), A/B testing, shadow mode for new models.' },
            { icon: '🔔', name: 'Notification', tech: 'SNS / WebSocket', detail: 'Real-time alerts for value changes >5%, transfer rumors, injury updates. WebSocket for live match valuations.' },
        ]
    },
    {
        title: '💾 Data Layer',
        components: [
            { icon: '🐘', name: 'PostgreSQL', tech: 'RDS Multi-AZ', detail: 'Players, clubs, contracts, transfers. ACID compliance, 3 read replicas, range-partitioned by season.' },
            { icon: '📈', name: 'TimescaleDB', tech: 'Timescale Cloud', detail: 'Match performances (hypertable), valuations history. Optimized for time-series range queries and rollups.' },
            { icon: '⚡', name: 'Redis Cluster', tech: 'ElastiCache', detail: 'Hot cache: 60s (valuations), 1hr (profiles), 6hr (stats), 24hr (indices). Cache-aside pattern with pub/sub invalidation.' },
            { icon: '🗂️', name: 'S3 Data Lake', tech: 'S3 + Parquet', detail: 'Raw match events (400M/year), ML training data, model artifacts. Columnar format for Spark analytics.' },
            { icon: '🔎', name: 'Elasticsearch', tech: '3-node cluster', detail: 'Search index for player names, clubs, leagues. Inverted index with custom analyzers for accented names.' },
            { icon: '🧭', name: 'Vector DB', tech: 'Pinecone', detail: 'Player embeddings for comparable transfer search. ANN (approximate nearest neighbor) queries in <10ms.' },
        ]
    },
    {
        title: '📥 Data Ingestion Pipeline',
        components: [
            { icon: '⚽', name: 'Match Data', tech: 'Opta / StatsBomb', detail: '~2000 events per match (passes, shots, tackles). Ingested via API polling every 30s during live matches.' },
            { icon: '💱', name: 'Transfer Feed', tech: 'Transfermarkt / TMS', detail: 'Transfer rumors, confirmed deals, contract extensions. Scraped + official FIFA TMS API.' },
            { icon: '🏥', name: 'Injury Feed', tech: 'RSS / APIs', detail: 'Injury updates within 30 minutes. Severity classification triggers immediate revaluation.' },
            { icon: '📢', name: 'Social Sentiment', tech: 'Twitter / Reddit', detail: 'NLP sentiment analysis for market hype/panic detection. Used as soft signal in valuation model.' },
            { icon: '📬', name: 'Apache Kafka', tech: 'MSK (64 partitions)', detail: 'Event streaming backbone. Topics: match.events, transfer.activity, injury.updates, sentiment.signals. Consumer lag <1000.' },
            { icon: '⚡', name: 'Stream Processing', tech: 'Apache Flink', detail: 'Real-time stat aggregation, anomaly detection, trigger revaluation on match events.' },
        ]
    },
    {
        title: '🧠 ML Pipeline',
        components: [
            { icon: '🏋️', name: 'Training', tech: 'SageMaker + Airflow', detail: 'Weekly retraining on latest transfer ground truth. Feature store (Feast) ensures consistency between training and serving.' },
            { icon: '🎯', name: 'Inference', tech: 'TorchServe', detail: 'Real-time prediction endpoints. Auto-scaling GPU instances. <50ms p99 latency per valuation.' },
            { icon: '📊', name: 'Monitoring', tech: 'MLflow + Custom', detail: 'Data drift (PSI), model MAPE tracking, prediction vs actual. Alert if rolling 30d MAPE >25%.' },
        ]
    },
];

export function render() {
    return `
    <div class="page-enter">
        <h1 class="page-title">System Architecture</h1>
        <p class="page-description">Interactive view of the European Football Player Valuation system — click any component for details</p>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
            <span class="tech-badge">⚡ < 200ms latency</span>
            <span class="tech-badge">🎯 99.9% uptime</span>
            <span class="tech-badge">📊 10K req/sec peak</span>
            <span class="tech-badge">🔄 2hr match freshness</span>
            <span class="tech-badge">🎯 ±15% accuracy target</span>
            <span class="tech-badge">🔒 GDPR compliant</span>
        </div>

        ${LAYERS.map((layer, li) => `
            <div class="arch-layer" id="arch-layer-${li}">
                <div class="arch-layer-title">
                    <span>${layer.title}</span>
                </div>
                <div class="arch-components">
                    ${layer.components.map((c, ci) => `
                        <div class="arch-component" data-layer="${li}" data-comp="${ci}" onclick="window.__toggleArch(${li},${ci})">
                            <div class="arch-component-icon">${c.icon}</div>
                            <div class="arch-component-name">${c.name}</div>
                            <div class="arch-component-tech">${c.tech}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="arch-detail-panel" id="arch-detail-${li}"></div>
            </div>
            ${li < LAYERS.length - 1 ? '<div class="arch-flow-arrow">▼</div>' : ''}
        `).join('')}

        <!-- Tech Stack Summary -->
        <div class="card-static" style="margin-top:28px">
            <div class="section-title" style="margin-bottom:16px">Technology Stack Summary</div>
            <table class="data-table">
                <thead><tr><th>Category</th><th>Technology</th><th>Purpose</th></tr></thead>
                <tbody>
                    <tr><td>Compute</td><td><span class="tech-badge">EKS</span> <span class="tech-badge">SageMaker</span></td><td>Kubernetes for microservices, SageMaker for ML</td></tr>
                    <tr><td>Database</td><td><span class="tech-badge">PostgreSQL</span> <span class="tech-badge">TimescaleDB</span></td><td>Relational data + time-series optimization</td></tr>
                    <tr><td>Cache</td><td><span class="tech-badge">Redis Cluster</span></td><td>Sub-ms reads, pub/sub for invalidation</td></tr>
                    <tr><td>Search</td><td><span class="tech-badge">Elasticsearch</span> <span class="tech-badge">Pinecone</span></td><td>Full-text search + vector similarity</td></tr>
                    <tr><td>Streaming</td><td><span class="tech-badge">Kafka</span> <span class="tech-badge">Flink</span></td><td>Event streaming + real-time processing</td></tr>
                    <tr><td>ML</td><td><span class="tech-badge">XGBoost</span> <span class="tech-badge">PyTorch</span> <span class="tech-badge">MLflow</span></td><td>Ensemble models, feature store, model registry</td></tr>
                    <tr><td>Storage</td><td><span class="tech-badge">S3</span> <span class="tech-badge">Parquet</span></td><td>Data lake for raw events and ML artifacts</td></tr>
                    <tr><td>Monitoring</td><td><span class="tech-badge">Prometheus</span> <span class="tech-badge">Grafana</span></td><td>Metrics, dashboards, alerting</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
}

export function init() {
    let openLayer = -1, openComp = -1;

    window.__toggleArch = (li, ci) => {
        const panel = document.getElementById(`arch-detail-${li}`);
        const comp = document.querySelector(`.arch-component[data-layer="${li}"][data-comp="${ci}"]`);

        // Close previous
        document.querySelectorAll('.arch-component.expanded').forEach(el => el.classList.remove('expanded'));
        document.querySelectorAll('.arch-detail-panel.visible').forEach(el => { el.classList.remove('visible'); el.innerHTML = ''; });

        if (openLayer === li && openComp === ci) {
            openLayer = -1; openComp = -1;
            return;
        }

        openLayer = li; openComp = ci;
        const layer = LAYERS[li];
        const c = layer.components[ci];

        comp.classList.add('expanded');
        panel.innerHTML = `<strong>${c.icon} ${c.name}</strong> <span class="tech-badge" style="margin-left:8px">${c.tech}</span><br><br>${c.detail}`;
        panel.classList.add('visible');
    };
}
