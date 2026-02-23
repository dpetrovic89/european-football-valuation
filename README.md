# European Football Player Valuation ⚽💰

## Website https://dpetrovic89.github.io/european-football-valuation/

A premium interactive web dashboard for visualizing European football player market valuations. Built with zero external dependencies — pure HTML, CSS, and vanilla JavaScript with custom canvas-rendered charts.

![Dark Theme](https://img.shields.io/badge/theme-dark-1a1a2e?style=flat-square)
![No Dependencies](https://img.shields.io/badge/dependencies-zero-00F593?style=flat-square)
![ES Modules](https://img.shields.io/badge/modules-ES%20Modules-FFBE0B?style=flat-square)
![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## ✨ Features

### 📊 Dashboard
Market overview with live stat cards, league value bar chart, position distribution donut, market inflation timeline, top risers/fallers, and recent transfers table.

### 🔍 Player Explorer
Browse 30 elite European players with real-time search, league/position filters, and multiple sort options (value, age, rating, change %).

### 👤 Player Detail
Deep-dive into any player: hero section, 24-month valuation history chart, 6-factor radar breakdown (performance, age, contract, market, potential, popularity), 12 performance stat boxes, and similar player recommendations.

### ⚔️ Player Comparison
Side-by-side comparison with overlaid radar charts, dual value trajectories, and 12-stat head-to-head bars with winner highlighting.

### 💱 Transfer Analytics
Market inflation index (2017–2024), interactive transfer simulator with fair-fee prediction, deal quality table, and most overpaid/best value analysis.

### 🏗️ Architecture Viewer
Interactive 6-layer system diagram — from client apps through API gateway, microservices, data stores, ingestion pipeline, to ML pipeline. Click any component for technology details.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/dpetrovic89/european-football-valuation.git
cd european-football-valuation

# Serve locally (requires Node.js)
npx -y serve . -l 3000

# Open in browser
# http://localhost:3000
```

> **Note:** ES modules require HTTP serving — opening `index.html` directly won't work due to CORS restrictions.

---

## 📁 Project Structure

```
european-football-valuation/
├── index.html              # App shell — sidebar, search bar, page container
├── web/
│   ├── index.css           # Design system — dark theme, glassmorphism, grids
│   ├── app.js              # Hash-based router & global search
│   ├── data.js             # Mock data — 30 players, stats, transfers, leagues
│   ├── charts.js           # Custom canvas charts (line, bar, radar, donut)
│   └── pages/
│       ├── dashboard.js    # Market overview page
│       ├── players.js      # Player explorer with filters
│       ├── playerDetail.js # Single player deep-dive
│       ├── compare.js      # Side-by-side comparison
│       ├── transfers.js    # Transfer analytics & simulator
│       └── architecture.js # System architecture viewer
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🎨 Design System

- **Theme:** Dark mode with `#0A0F1C` base and glassmorphism cards
- **Typography:** [Outfit](https://fonts.google.com/specimen/Outfit) (headings) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Accent Colors:** Electric Green `#00F593` · Gold `#FFBE0B` · Sky Blue `#00B4D8`
- **Charts:** Custom canvas-rendered — no Chart.js or D3 dependency
- **Animations:** Smooth page transitions, hover effects, and entrance animations
- **Responsive:** Fluid grid system with mobile-friendly breakpoints

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 semantic markup |
| Styling | Vanilla CSS with custom properties |
| Logic | Vanilla JavaScript (ES Modules) |
| Charts | HTML5 Canvas API |
| Fonts | Google Fonts (Outfit, Inter) |
| Icons | Native emoji |
| Serving | Any static file server |

---

## 📈 Mock Data

The app ships with realistic mock data for **30 elite players** across Europe's top 5 leagues:

- **Premier League** — Haaland, Saka, Salah, Palmer, Rice, Foden, ...
- **La Liga** — Vinícius Jr, Bellingham, Yamal, Pedri, ...
- **Bundesliga** — Musiala, Wirtz, Xhaka, ...
- **Serie A** — Lautaro, Leão, Barella, ...
- **Ligue 1** — Mbappé, Dembélé, ...

Each player includes: biographical details, season stats (goals, assists, xG, xA, pass accuracy, etc.), valuation breakdown factors, 24-month value history, and contract information.

---

## 🧠 System Architecture

The architecture page documents a production-scale design including:

- **6 service layers** — Client → API Gateway → Services → Data → Ingestion → ML
- **Microservices** — Player Service, Valuation Engine, Search, Transfer Analysis
- **ML Pipeline** — Ensemble model (XGBoost 40% + DNN 35% + Comparable Analysis 25%)
- **Data Stack** — PostgreSQL, TimescaleDB, Redis, Elasticsearch, Pinecone, S3
- **Stream Processing** — Kafka + Flink for real-time match events

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ⚽ and ❤️ for football analytics
</p>
