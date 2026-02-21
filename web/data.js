// ===================================================
// European Football Player Valuation — Mock Data
// ===================================================

// Leagues
export const LEAGUES = [
    { id: 'epl', name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', multiplier: 1.30, color: '#3D195B' },
    { id: 'laliga', name: 'La Liga', country: 'Spain', flag: '🇪🇸', multiplier: 1.15, color: '#FF4B44' },
    { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', flag: '🇩🇪', multiplier: 1.05, color: '#D20515' },
    { id: 'seriea', name: 'Serie A', country: 'Italy', flag: '🇮🇹', multiplier: 1.00, color: '#008FD7' },
    { id: 'ligue1', name: 'Ligue 1', country: 'France', flag: '🇫🇷', multiplier: 0.95, color: '#DEC544' },
    { id: 'eredivisie', name: 'Eredivisie', country: 'Netherlands', flag: '🇳🇱', multiplier: 0.70, color: '#F36C21' },
    { id: 'liga_portugal', name: 'Liga Portugal', country: 'Portugal', flag: '🇵🇹', multiplier: 0.65, color: '#006428' },
];

// Clubs
export const CLUBS = [
    { id: 'mci', name: 'Manchester City', league: 'epl', badge: '🔵', tier: 1 },
    { id: 'ars', name: 'Arsenal', league: 'epl', badge: '🔴', tier: 1 },
    { id: 'liv', name: 'Liverpool', league: 'epl', badge: '🔴', tier: 1 },
    { id: 'rma', name: 'Real Madrid', league: 'laliga', badge: '⚪', tier: 1 },
    { id: 'bar', name: 'FC Barcelona', league: 'laliga', badge: '🔵', tier: 1 },
    { id: 'bay', name: 'Bayern Munich', league: 'bundesliga', badge: '🔴', tier: 1 },
    { id: 'psg', name: 'Paris Saint-Germain', league: 'ligue1', badge: '🔵', tier: 1 },
    { id: 'juv', name: 'Juventus', league: 'seriea', badge: '⚫', tier: 1 },
    { id: 'int', name: 'Inter Milan', league: 'seriea', badge: '🔵', tier: 1 },
    { id: 'che', name: 'Chelsea', league: 'epl', badge: '🔵', tier: 1 },
    { id: 'mun', name: 'Manchester United', league: 'epl', badge: '🔴', tier: 1 },
    { id: 'tot', name: 'Tottenham', league: 'epl', badge: '⚪', tier: 1 },
    { id: 'bvb', name: 'Borussia Dortmund', league: 'bundesliga', badge: '🟡', tier: 2 },
    { id: 'atm', name: 'Atlético Madrid', league: 'laliga', badge: '🔴', tier: 1 },
    { id: 'nap', name: 'Napoli', league: 'seriea', badge: '🔵', tier: 2 },
    { id: 'aja', name: 'Ajax', league: 'eredivisie', badge: '🔴', tier: 2 },
    { id: 'ben', name: 'Benfica', league: 'liga_portugal', badge: '🔴', tier: 2 },
    { id: 'acm', name: 'AC Milan', league: 'seriea', badge: '🔴', tier: 1 },
    { id: 'new', name: 'Newcastle', league: 'epl', badge: '⚫', tier: 1 },
    { id: 'ley', name: 'Bayer Leverkusen', league: 'bundesliga', badge: '🔴', tier: 2 },
    { id: 'avl', name: 'Aston Villa', league: 'epl', badge: '🟤', tier: 2 },
    { id: 'rsb', name: 'RB Leipzig', league: 'bundesliga', badge: '⚪', tier: 2 },
];

function getClub(id) { return CLUBS.find(c => c.id === id); }
function getLeague(id) { return LEAGUES.find(l => l.id === id); }

// Generate valuation history (24 months of monthly data)
function genHistory(currentVal, trend, volatility = 0.05) {
    const history = [];
    let val = currentVal * (0.5 + Math.random() * 0.3);
    const targetDelta = (currentVal - val) / 24;
    for (let i = 23; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const noise = (Math.random() - 0.5) * volatility * val;
        val += targetDelta + noise;
        val = Math.max(val, currentVal * 0.2);
        history.push({
            date: date.toISOString().slice(0, 7),
            value: Math.round(val)
        });
    }
    history[history.length - 1].value = currentVal;
    return history;
}

// Players
export const PLAYERS = [
    {
        id: 'p1', name: 'Erling Haaland', age: 24, nationality: ['NO'], flag: '🇳🇴',
        position: 'ST', posGroup: 'FWD', clubId: 'mci', contractExpiry: '2028-06-30',
        height: 194, weight: 88, foot: 'LEFT', intlCaps: 35,
        value: 180000000, prevValue: 170000000, trend: 'RISING',
        stats: { goals: 28, assists: 6, xG: 24.5, xA: 4.2, shotsPerGame: 4.1, keyPasses: 0.8, dribblesPerGame: 1.2, tacklesPerGame: 0.3, passAcc: 78.2, aerialWon: 3.5, matchRating: 7.8, minutesPlayed: 2700, appearances: 32, distanceKm: 8.2, sprints: 18 },
        breakdown: { performance: 0.38, age: 1.15, contract: 0.92, market: 1.30, potential: 1.10, popularity: 0.95 }
    },
    {
        id: 'p2', name: 'Kylian Mbappé', age: 25, nationality: ['FR'], flag: '🇫🇷',
        position: 'LW', posGroup: 'FWD', clubId: 'rma', contractExpiry: '2029-06-30',
        height: 178, weight: 73, foot: 'RIGHT', intlCaps: 78,
        value: 180000000, prevValue: 185000000, trend: 'STABLE',
        stats: { goals: 25, assists: 10, xG: 22.1, xA: 7.8, shotsPerGame: 4.5, keyPasses: 1.8, dribblesPerGame: 3.4, tacklesPerGame: 0.4, passAcc: 82.1, aerialWon: 0.8, matchRating: 7.9, minutesPlayed: 2850, appearances: 34, distanceKm: 9.8, sprints: 25 },
        breakdown: { performance: 0.40, age: 1.20, contract: 0.95, market: 1.15, potential: 1.05, popularity: 1.00 }
    },
    {
        id: 'p3', name: 'Jude Bellingham', age: 21, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'CAM', posGroup: 'MID', clubId: 'rma', contractExpiry: '2029-06-30',
        height: 186, weight: 75, foot: 'RIGHT', intlCaps: 36,
        value: 150000000, prevValue: 120000000, trend: 'RISING',
        stats: { goals: 18, assists: 11, xG: 14.2, xA: 9.1, shotsPerGame: 2.8, keyPasses: 2.3, dribblesPerGame: 2.1, tacklesPerGame: 1.8, passAcc: 87.5, aerialWon: 2.1, matchRating: 7.7, minutesPlayed: 2900, appearances: 35, distanceKm: 11.2, sprints: 22 },
        breakdown: { performance: 0.35, age: 1.05, contract: 0.95, market: 1.15, potential: 1.25, popularity: 0.92 }
    },
    {
        id: 'p4', name: 'Vinícius Júnior', age: 24, nationality: ['BR'], flag: '🇧🇷',
        position: 'LW', posGroup: 'FWD', clubId: 'rma', contractExpiry: '2027-06-30',
        height: 176, weight: 73, foot: 'RIGHT', intlCaps: 35,
        value: 150000000, prevValue: 140000000, trend: 'RISING',
        stats: { goals: 20, assists: 12, xG: 16.8, xA: 10.2, shotsPerGame: 3.2, keyPasses: 2.5, dribblesPerGame: 5.8, tacklesPerGame: 0.5, passAcc: 79.8, aerialWon: 0.5, matchRating: 7.8, minutesPlayed: 2800, appearances: 34, distanceKm: 10.5, sprints: 28 },
        breakdown: { performance: 0.37, age: 1.18, contract: 0.82, market: 1.15, potential: 1.12, popularity: 0.98 }
    },
    {
        id: 'p5', name: 'Bukayo Saka', age: 23, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'RW', posGroup: 'FWD', clubId: 'ars', contractExpiry: '2027-06-30',
        height: 178, weight: 72, foot: 'LEFT', intlCaps: 40,
        value: 140000000, prevValue: 120000000, trend: 'RISING',
        stats: { goals: 16, assists: 14, xG: 13.5, xA: 11.8, shotsPerGame: 2.5, keyPasses: 2.8, dribblesPerGame: 2.9, tacklesPerGame: 1.2, passAcc: 84.3, aerialWon: 0.6, matchRating: 7.6, minutesPlayed: 2950, appearances: 36, distanceKm: 10.8, sprints: 23 },
        breakdown: { performance: 0.34, age: 1.08, contract: 0.82, market: 1.30, potential: 1.18, popularity: 0.88 }
    },
    {
        id: 'p6', name: 'Florian Wirtz', age: 21, nationality: ['DE'], flag: '🇩🇪',
        position: 'CAM', posGroup: 'MID', clubId: 'ley', contractExpiry: '2027-06-30',
        height: 176, weight: 70, foot: 'RIGHT', intlCaps: 22,
        value: 130000000, prevValue: 90000000, trend: 'RISING',
        stats: { goals: 15, assists: 13, xG: 12.1, xA: 11.5, shotsPerGame: 2.4, keyPasses: 3.1, dribblesPerGame: 3.2, tacklesPerGame: 1.0, passAcc: 86.7, aerialWon: 0.4, matchRating: 7.7, minutesPlayed: 2600, appearances: 31, distanceKm: 10.1, sprints: 20 },
        breakdown: { performance: 0.33, age: 1.00, contract: 0.82, market: 1.05, potential: 1.30, popularity: 0.82 }
    },
    {
        id: 'p7', name: 'Phil Foden', age: 24, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'RW', posGroup: 'FWD', clubId: 'mci', contractExpiry: '2027-06-30',
        height: 171, weight: 69, foot: 'LEFT', intlCaps: 38,
        value: 120000000, prevValue: 110000000, trend: 'RISING',
        stats: { goals: 14, assists: 10, xG: 12.8, xA: 8.5, shotsPerGame: 2.6, keyPasses: 2.2, dribblesPerGame: 2.5, tacklesPerGame: 0.9, passAcc: 88.2, aerialWon: 0.3, matchRating: 7.5, minutesPlayed: 2500, appearances: 30, distanceKm: 10.3, sprints: 19 },
        breakdown: { performance: 0.32, age: 1.15, contract: 0.82, market: 1.30, potential: 1.08, popularity: 0.85 }
    },
    {
        id: 'p8', name: 'Rodri', age: 28, nationality: ['ES'], flag: '🇪🇸',
        position: 'CDM', posGroup: 'MID', clubId: 'mci', contractExpiry: '2027-06-30',
        height: 191, weight: 82, foot: 'RIGHT', intlCaps: 58,
        value: 120000000, prevValue: 100000000, trend: 'RISING',
        stats: { goals: 6, assists: 8, xG: 4.2, xA: 6.1, shotsPerGame: 1.2, keyPasses: 1.8, dribblesPerGame: 1.0, tacklesPerGame: 2.8, passAcc: 93.1, aerialWon: 1.8, matchRating: 7.6, minutesPlayed: 3100, appearances: 36, distanceKm: 11.5, sprints: 14 },
        breakdown: { performance: 0.35, age: 1.10, contract: 0.82, market: 1.30, potential: 0.90, popularity: 0.80 }
    },
    {
        id: 'p9', name: 'Lamine Yamal', age: 17, nationality: ['ES'], flag: '🇪🇸',
        position: 'RW', posGroup: 'FWD', clubId: 'bar', contractExpiry: '2026-06-30',
        height: 180, weight: 71, foot: 'LEFT', intlCaps: 14,
        value: 120000000, prevValue: 80000000, trend: 'RISING',
        stats: { goals: 9, assists: 11, xG: 7.5, xA: 9.8, shotsPerGame: 2.0, keyPasses: 2.6, dribblesPerGame: 3.8, tacklesPerGame: 0.6, passAcc: 83.1, aerialWon: 0.3, matchRating: 7.4, minutesPlayed: 2200, appearances: 28, distanceKm: 9.1, sprints: 21 },
        breakdown: { performance: 0.28, age: 0.75, contract: 0.72, market: 1.15, potential: 1.45, popularity: 0.90 }
    },
    {
        id: 'p10', name: 'Martin Ødegaard', age: 25, nationality: ['NO'], flag: '🇳🇴',
        position: 'CAM', posGroup: 'MID', clubId: 'ars', contractExpiry: '2028-06-30',
        height: 178, weight: 68, foot: 'LEFT', intlCaps: 55,
        value: 110000000, prevValue: 100000000, trend: 'RISING',
        stats: { goals: 10, assists: 12, xG: 8.2, xA: 10.5, shotsPerGame: 2.0, keyPasses: 3.2, dribblesPerGame: 1.8, tacklesPerGame: 1.4, passAcc: 88.9, aerialWon: 0.5, matchRating: 7.5, minutesPlayed: 2700, appearances: 33, distanceKm: 10.8, sprints: 17 },
        breakdown: { performance: 0.33, age: 1.18, contract: 0.92, market: 1.30, potential: 1.02, popularity: 0.82 }
    },
    {
        id: 'p11', name: 'William Saliba', age: 23, nationality: ['FR'], flag: '🇫🇷',
        position: 'CB', posGroup: 'DEF', clubId: 'ars', contractExpiry: '2028-06-30',
        height: 192, weight: 80, foot: 'RIGHT', intlCaps: 20,
        value: 100000000, prevValue: 80000000, trend: 'RISING',
        stats: { goals: 2, assists: 1, xG: 1.5, xA: 0.8, shotsPerGame: 0.3, keyPasses: 0.5, dribblesPerGame: 0.4, tacklesPerGame: 2.5, passAcc: 91.2, aerialWon: 3.8, matchRating: 7.3, minutesPlayed: 3100, appearances: 35, distanceKm: 9.8, sprints: 12 },
        breakdown: { performance: 0.30, age: 1.05, contract: 0.92, market: 1.30, potential: 1.15, popularity: 0.75 }
    },
    {
        id: 'p12', name: 'Jamal Musiala', age: 21, nationality: ['DE'], flag: '🇩🇪',
        position: 'CAM', posGroup: 'MID', clubId: 'bay', contractExpiry: '2026-06-30',
        height: 183, weight: 72, foot: 'RIGHT', intlCaps: 30,
        value: 120000000, prevValue: 100000000, trend: 'RISING',
        stats: { goals: 14, assists: 9, xG: 11.5, xA: 7.8, shotsPerGame: 2.2, keyPasses: 2.4, dribblesPerGame: 4.1, tacklesPerGame: 1.1, passAcc: 85.8, aerialWon: 0.5, matchRating: 7.5, minutesPlayed: 2600, appearances: 32, distanceKm: 10.5, sprints: 21 },
        breakdown: { performance: 0.34, age: 1.00, contract: 0.72, market: 1.05, potential: 1.28, popularity: 0.85 }
    },
    {
        id: 'p13', name: 'Mohamed Salah', age: 32, nationality: ['EG'], flag: '🇪🇬',
        position: 'RW', posGroup: 'FWD', clubId: 'liv', contractExpiry: '2025-06-30',
        height: 175, weight: 71, foot: 'LEFT', intlCaps: 95,
        value: 60000000, prevValue: 75000000, trend: 'DECLINING',
        stats: { goals: 22, assists: 11, xG: 19.5, xA: 9.2, shotsPerGame: 3.5, keyPasses: 2.1, dribblesPerGame: 1.8, tacklesPerGame: 0.6, passAcc: 81.5, aerialWon: 0.4, matchRating: 7.6, minutesPlayed: 2800, appearances: 33, distanceKm: 10.2, sprints: 22 },
        breakdown: { performance: 0.36, age: 0.70, contract: 0.39, market: 1.30, potential: 0.70, popularity: 0.95 }
    },
    {
        id: 'p14', name: 'Bruno Fernandes', age: 29, nationality: ['PT'], flag: '🇵🇹',
        position: 'CAM', posGroup: 'MID', clubId: 'mun', contractExpiry: '2027-06-30',
        height: 179, weight: 69, foot: 'RIGHT', intlCaps: 62,
        value: 75000000, prevValue: 80000000, trend: 'DECLINING',
        stats: { goals: 10, assists: 12, xG: 8.8, xA: 10.1, shotsPerGame: 2.4, keyPasses: 3.0, dribblesPerGame: 1.5, tacklesPerGame: 1.2, passAcc: 84.5, aerialWon: 0.8, matchRating: 7.3, minutesPlayed: 3000, appearances: 36, distanceKm: 11.0, sprints: 16 },
        breakdown: { performance: 0.32, age: 1.05, contract: 0.82, market: 1.30, potential: 0.85, popularity: 0.88 }
    },
    {
        id: 'p15', name: 'Declan Rice', age: 25, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'CDM', posGroup: 'MID', clubId: 'ars', contractExpiry: '2028-06-30',
        height: 185, weight: 80, foot: 'RIGHT', intlCaps: 48,
        value: 100000000, prevValue: 95000000, trend: 'RISING',
        stats: { goals: 5, assists: 7, xG: 3.8, xA: 5.5, shotsPerGame: 1.0, keyPasses: 1.5, dribblesPerGame: 1.2, tacklesPerGame: 3.2, passAcc: 90.5, aerialWon: 2.0, matchRating: 7.4, minutesPlayed: 3100, appearances: 36, distanceKm: 11.8, sprints: 15 },
        breakdown: { performance: 0.32, age: 1.18, contract: 0.92, market: 1.30, potential: 1.00, popularity: 0.78 }
    },
    {
        id: 'p16', name: 'Gavi', age: 20, nationality: ['ES'], flag: '🇪🇸',
        position: 'CM', posGroup: 'MID', clubId: 'bar', contractExpiry: '2026-06-30',
        height: 173, weight: 68, foot: 'RIGHT', intlCaps: 24,
        value: 80000000, prevValue: 90000000, trend: 'DECLINING',
        stats: { goals: 3, assists: 5, xG: 2.5, xA: 4.2, shotsPerGame: 1.0, keyPasses: 1.8, dribblesPerGame: 2.0, tacklesPerGame: 2.2, passAcc: 86.5, aerialWon: 0.8, matchRating: 7.1, minutesPlayed: 1800, appearances: 22, distanceKm: 10.5, sprints: 19 },
        breakdown: { performance: 0.25, age: 0.90, contract: 0.72, market: 1.15, potential: 1.20, popularity: 0.80 }
    },
    {
        id: 'p17', name: 'Pedri', age: 21, nationality: ['ES'], flag: '🇪🇸',
        position: 'CM', posGroup: 'MID', clubId: 'bar', contractExpiry: '2026-06-30',
        height: 174, weight: 60, foot: 'RIGHT', intlCaps: 28,
        value: 100000000, prevValue: 90000000, trend: 'RISING',
        stats: { goals: 5, assists: 8, xG: 4.1, xA: 7.2, shotsPerGame: 1.2, keyPasses: 2.5, dribblesPerGame: 2.8, tacklesPerGame: 1.5, passAcc: 91.8, aerialWon: 0.3, matchRating: 7.5, minutesPlayed: 2400, appearances: 30, distanceKm: 10.8, sprints: 17 },
        breakdown: { performance: 0.30, age: 0.95, contract: 0.72, market: 1.15, potential: 1.22, popularity: 0.82 }
    },
    {
        id: 'p18', name: 'Harry Kane', age: 31, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'ST', posGroup: 'FWD', clubId: 'bay', contractExpiry: '2027-06-30',
        height: 188, weight: 86, foot: 'RIGHT', intlCaps: 92,
        value: 80000000, prevValue: 90000000, trend: 'DECLINING',
        stats: { goals: 30, assists: 8, xG: 27.2, xA: 6.5, shotsPerGame: 4.2, keyPasses: 1.5, dribblesPerGame: 0.8, tacklesPerGame: 0.4, passAcc: 82.8, aerialWon: 2.5, matchRating: 7.7, minutesPlayed: 2900, appearances: 34, distanceKm: 9.5, sprints: 14 },
        breakdown: { performance: 0.40, age: 0.80, contract: 0.82, market: 1.05, potential: 0.75, popularity: 0.92 }
    },
    {
        id: 'p19', name: 'Virgil van Dijk', age: 33, nationality: ['NL'], flag: '🇳🇱',
        position: 'CB', posGroup: 'DEF', clubId: 'liv', contractExpiry: '2025-06-30',
        height: 193, weight: 92, foot: 'RIGHT', intlCaps: 62,
        value: 35000000, prevValue: 50000000, trend: 'DECLINING',
        stats: { goals: 3, assists: 2, xG: 2.8, xA: 1.5, shotsPerGame: 0.5, keyPasses: 0.4, dribblesPerGame: 0.2, tacklesPerGame: 1.8, passAcc: 90.5, aerialWon: 4.5, matchRating: 7.2, minutesPlayed: 3000, appearances: 34, distanceKm: 9.2, sprints: 10 },
        breakdown: { performance: 0.28, age: 0.60, contract: 0.39, market: 1.30, potential: 0.65, popularity: 0.85 }
    },
    {
        id: 'p20', name: 'Federico Valverde', age: 26, nationality: ['UY'], flag: '🇺🇾',
        position: 'CM', posGroup: 'MID', clubId: 'rma', contractExpiry: '2029-06-30',
        height: 182, weight: 78, foot: 'RIGHT', intlCaps: 52,
        value: 110000000, prevValue: 100000000, trend: 'RISING',
        stats: { goals: 8, assists: 6, xG: 6.5, xA: 5.2, shotsPerGame: 1.8, keyPasses: 1.5, dribblesPerGame: 1.5, tacklesPerGame: 2.5, passAcc: 88.5, aerialWon: 1.5, matchRating: 7.5, minutesPlayed: 3000, appearances: 35, distanceKm: 12.2, sprints: 22 },
        breakdown: { performance: 0.33, age: 1.15, contract: 0.95, market: 1.15, potential: 1.00, popularity: 0.80 }
    },
    {
        id: 'p21', name: 'Khvicha Kvaratskhelia', age: 23, nationality: ['GE'], flag: '🇬🇪',
        position: 'LW', posGroup: 'FWD', clubId: 'psg', contractExpiry: '2029-06-30',
        height: 183, weight: 72, foot: 'RIGHT', intlCaps: 35,
        value: 85000000, prevValue: 75000000, trend: 'RISING',
        stats: { goals: 12, assists: 10, xG: 10.5, xA: 8.8, shotsPerGame: 2.8, keyPasses: 2.2, dribblesPerGame: 4.5, tacklesPerGame: 0.5, passAcc: 80.1, aerialWon: 0.5, matchRating: 7.4, minutesPlayed: 2500, appearances: 30, distanceKm: 10.0, sprints: 24 },
        breakdown: { performance: 0.30, age: 1.08, contract: 0.95, market: 0.95, potential: 1.15, popularity: 0.78 }
    },
    {
        id: 'p22', name: 'Thibaut Courtois', age: 32, nationality: ['BE'], flag: '🇧🇪',
        position: 'GK', posGroup: 'GK', clubId: 'rma', contractExpiry: '2026-06-30',
        height: 199, weight: 96, foot: 'LEFT', intlCaps: 102,
        value: 30000000, prevValue: 35000000, trend: 'DECLINING',
        stats: { goals: 0, assists: 0, xG: 0, xA: 0, shotsPerGame: 0, keyPasses: 0.2, dribblesPerGame: 0, tacklesPerGame: 0, passAcc: 78.5, aerialWon: 0.5, matchRating: 7.0, minutesPlayed: 2700, appearances: 30, distanceKm: 5.5, sprints: 3 },
        breakdown: { performance: 0.25, age: 0.85, contract: 0.72, market: 1.15, potential: 0.65, popularity: 0.80 }
    },
    {
        id: 'p23', name: 'Trent Alexander-Arnold', age: 25, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'RB', posGroup: 'DEF', clubId: 'liv', contractExpiry: '2025-06-30',
        height: 175, weight: 69, foot: 'RIGHT', intlCaps: 28,
        value: 70000000, prevValue: 80000000, trend: 'DECLINING',
        stats: { goals: 2, assists: 12, xG: 1.8, xA: 10.5, shotsPerGame: 0.8, keyPasses: 3.5, dribblesPerGame: 0.8, tacklesPerGame: 1.5, passAcc: 85.8, aerialWon: 0.8, matchRating: 7.2, minutesPlayed: 2600, appearances: 31, distanceKm: 10.8, sprints: 16 },
        breakdown: { performance: 0.30, age: 1.12, contract: 0.39, market: 1.30, potential: 0.95, popularity: 0.85 }
    },
    {
        id: 'p24', name: 'Lautaro Martínez', age: 27, nationality: ['AR'], flag: '🇦🇷',
        position: 'ST', posGroup: 'FWD', clubId: 'int', contractExpiry: '2028-06-30',
        height: 174, weight: 72, foot: 'RIGHT', intlCaps: 52,
        value: 95000000, prevValue: 85000000, trend: 'RISING',
        stats: { goals: 20, assists: 5, xG: 17.8, xA: 4.1, shotsPerGame: 3.5, keyPasses: 1.0, dribblesPerGame: 1.5, tacklesPerGame: 0.5, passAcc: 80.2, aerialWon: 1.8, matchRating: 7.4, minutesPlayed: 2700, appearances: 32, distanceKm: 9.5, sprints: 17 },
        breakdown: { performance: 0.35, age: 1.18, contract: 0.92, market: 1.00, potential: 0.90, popularity: 0.82 }
    },
    {
        id: 'p25', name: 'Rafael Leão', age: 25, nationality: ['PT'], flag: '🇵🇹',
        position: 'LW', posGroup: 'FWD', clubId: 'acm', contractExpiry: '2028-06-30',
        height: 188, weight: 81, foot: 'RIGHT', intlCaps: 32,
        value: 85000000, prevValue: 80000000, trend: 'STABLE',
        stats: { goals: 12, assists: 9, xG: 10.2, xA: 7.5, shotsPerGame: 2.5, keyPasses: 1.8, dribblesPerGame: 4.2, tacklesPerGame: 0.4, passAcc: 81.5, aerialWon: 0.8, matchRating: 7.3, minutesPlayed: 2600, appearances: 32, distanceKm: 10.0, sprints: 24 },
        breakdown: { performance: 0.30, age: 1.18, contract: 0.92, market: 1.00, potential: 1.02, popularity: 0.78 }
    },
    {
        id: 'p26', name: 'Bernardo Silva', age: 29, nationality: ['PT'], flag: '🇵🇹',
        position: 'RW', posGroup: 'FWD', clubId: 'mci', contractExpiry: '2026-06-30',
        height: 173, weight: 64, foot: 'LEFT', intlCaps: 82,
        value: 70000000, prevValue: 72000000, trend: 'STABLE',
        stats: { goals: 8, assists: 10, xG: 6.8, xA: 8.5, shotsPerGame: 1.8, keyPasses: 2.2, dribblesPerGame: 2.5, tacklesPerGame: 1.5, passAcc: 90.2, aerialWon: 0.3, matchRating: 7.4, minutesPlayed: 2800, appearances: 34, distanceKm: 11.2, sprints: 18 },
        breakdown: { performance: 0.32, age: 1.05, contract: 0.72, market: 1.30, potential: 0.82, popularity: 0.80 }
    },
    {
        id: 'p27', name: 'Alejandro Garnacho', age: 20, nationality: ['AR'], flag: '🇦🇷',
        position: 'LW', posGroup: 'FWD', clubId: 'mun', contractExpiry: '2028-06-30',
        height: 180, weight: 72, foot: 'RIGHT', intlCaps: 10,
        value: 55000000, prevValue: 35000000, trend: 'RISING',
        stats: { goals: 10, assists: 5, xG: 7.2, xA: 4.5, shotsPerGame: 2.2, keyPasses: 1.5, dribblesPerGame: 3.8, tacklesPerGame: 0.5, passAcc: 78.5, aerialWon: 0.5, matchRating: 7.1, minutesPlayed: 2200, appearances: 28, distanceKm: 9.8, sprints: 22 },
        breakdown: { performance: 0.25, age: 0.88, contract: 0.92, market: 1.30, potential: 1.25, popularity: 0.72 }
    },
    {
        id: 'p28', name: 'Ollie Watkins', age: 28, nationality: ['GB'], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        position: 'ST', posGroup: 'FWD', clubId: 'avl', contractExpiry: '2028-06-30',
        height: 180, weight: 70, foot: 'RIGHT', intlCaps: 18,
        value: 65000000, prevValue: 50000000, trend: 'RISING',
        stats: { goals: 18, assists: 8, xG: 15.5, xA: 6.8, shotsPerGame: 3.0, keyPasses: 1.2, dribblesPerGame: 1.5, tacklesPerGame: 0.8, passAcc: 79.8, aerialWon: 2.0, matchRating: 7.3, minutesPlayed: 2900, appearances: 34, distanceKm: 10.5, sprints: 20 },
        breakdown: { performance: 0.34, age: 1.10, contract: 0.92, market: 1.30, potential: 0.85, popularity: 0.72 }
    },
    {
        id: 'p29', name: 'Xavi Simons', age: 21, nationality: ['NL'], flag: '🇳🇱',
        position: 'CAM', posGroup: 'MID', clubId: 'rsb', contractExpiry: '2027-06-30',
        height: 179, weight: 68, foot: 'RIGHT', intlCaps: 15,
        value: 80000000, prevValue: 60000000, trend: 'RISING',
        stats: { goals: 10, assists: 11, xG: 8.2, xA: 9.5, shotsPerGame: 2.0, keyPasses: 2.5, dribblesPerGame: 3.0, tacklesPerGame: 1.0, passAcc: 84.2, aerialWon: 0.5, matchRating: 7.3, minutesPlayed: 2400, appearances: 30, distanceKm: 10.2, sprints: 21 },
        breakdown: { performance: 0.28, age: 0.95, contract: 0.82, market: 1.05, potential: 1.22, popularity: 0.78 }
    },
    {
        id: 'p30', name: 'Aurélien Tchouaméni', age: 24, nationality: ['FR'], flag: '🇫🇷',
        position: 'CDM', posGroup: 'MID', clubId: 'rma', contractExpiry: '2028-06-30',
        height: 187, weight: 81, foot: 'RIGHT', intlCaps: 35,
        value: 90000000, prevValue: 85000000, trend: 'RISING',
        stats: { goals: 3, assists: 4, xG: 2.1, xA: 3.5, shotsPerGame: 0.8, keyPasses: 1.2, dribblesPerGame: 0.8, tacklesPerGame: 3.0, passAcc: 89.5, aerialWon: 2.2, matchRating: 7.3, minutesPlayed: 2800, appearances: 33, distanceKm: 11.5, sprints: 16 },
        breakdown: { performance: 0.28, age: 1.15, contract: 0.92, market: 1.15, potential: 1.05, popularity: 0.75 }
    },
];

// Add computed fields
PLAYERS.forEach(p => {
    const club = getClub(p.clubId);
    const league = club ? getLeague(club.league) : null;
    p.club = club ? club.name : 'Unknown';
    p.clubBadge = club ? club.badge : '⚪';
    p.league = league ? league.name : 'Unknown';
    p.leagueId = club ? club.league : '';
    p.leagueFlag = league ? league.flag : '';
    p.initials = p.name.split(' ').map(n => n[0]).join('').slice(0, 2);
    p.changePct = p.prevValue > 0 ? ((p.value - p.prevValue) / p.prevValue * 100) : 0;
    p.contractYears = Math.max(0, (new Date(p.contractExpiry).getTime() - Date.now()) / (365.25 * 24 * 60 * 60 * 1000));
    p.valuationHistory = genHistory(p.value, p.trend);
    p.avatar_gradient = p.posGroup === 'FWD' ? 'var(--grad-red)' :
        p.posGroup === 'MID' ? 'var(--grad-blue)' :
            p.posGroup === 'DEF' ? 'var(--grad-green)' : 'var(--grad-gold)';
});

// Transfers
export const TRANSFERS = [
    { id: 't1', playerId: 'p2', playerName: 'Kylian Mbappé', from: 'Paris Saint-Germain', to: 'Real Madrid', fee: 0, type: 'FREE', date: '2024-07-01', quality: 'GREAT', estimatedFair: 180000000 },
    { id: 't2', playerId: 'p15', playerName: 'Declan Rice', from: 'West Ham', to: 'Arsenal', fee: 105000000, type: 'PERMANENT', date: '2023-07-15', quality: 'FAIR', estimatedFair: 95000000 },
    { id: 't3', playerId: 'p3', playerName: 'Jude Bellingham', from: 'Borussia Dortmund', to: 'Real Madrid', fee: 103000000, type: 'PERMANENT', date: '2023-06-14', quality: 'GREAT', estimatedFair: 120000000 },
    { id: 't4', playerId: 'p18', playerName: 'Harry Kane', from: 'Tottenham', to: 'Bayern Munich', fee: 100000000, type: 'PERMANENT', date: '2023-08-12', quality: 'FAIR', estimatedFair: 100000000 },
    { id: 't5', playerId: 'p21', playerName: 'Khvicha Kvaratskhelia', from: 'Napoli', to: 'Paris Saint-Germain', fee: 70000000, type: 'PERMANENT', date: '2025-01-15', quality: 'GREAT', estimatedFair: 85000000 },
    { id: 't6', playerName: 'Moisés Caicedo', from: 'Brighton', to: 'Chelsea', fee: 115000000, type: 'PERMANENT', date: '2023-08-14', quality: 'OVERPAID', estimatedFair: 75000000 },
    { id: 't7', playerName: 'Enzo Fernández', from: 'Benfica', to: 'Chelsea', fee: 121000000, type: 'PERMANENT', date: '2023-01-31', quality: 'OVERPAID', estimatedFair: 80000000 },
    { id: 't8', playerName: 'João Neves', from: 'Benfica', to: 'Paris Saint-Germain', fee: 70000000, type: 'PERMANENT', date: '2024-08-05', quality: 'FAIR', estimatedFair: 65000000 },
    { id: 't9', playerName: 'Dominik Szoboszlai', from: 'RB Leipzig', to: 'Liverpool', fee: 70000000, type: 'PERMANENT', date: '2023-06-24', quality: 'FAIR', estimatedFair: 60000000 },
    { id: 't10', playerName: 'Marc Guiu', from: 'FC Barcelona', to: 'Chelsea', fee: 6000000, type: 'PERMANENT', date: '2024-07-15', quality: 'GREAT', estimatedFair: 15000000 },
];

// Market data
export const MARKET_INFLATION = [
    { year: 2017, index: 100 },
    { year: 2018, index: 118 },
    { year: 2019, index: 125 },
    { year: 2020, index: 95 },
    { year: 2021, index: 105 },
    { year: 2022, index: 130 },
    { year: 2023, index: 155 },
    { year: 2024, index: 165 },
];

// League value index
export const LEAGUE_VALUES = LEAGUES.map(l => {
    const leaguePlayers = PLAYERS.filter(p => p.leagueId === l.id);
    const totalValue = leaguePlayers.reduce((sum, p) => sum + p.value, 0);
    const avgValue = leaguePlayers.length > 0 ? totalValue / leaguePlayers.length : 0;
    return { ...l, totalValue, avgValue, playerCount: leaguePlayers.length };
});

// Position distribution
export const POSITION_DIST = (() => {
    const dist = {};
    PLAYERS.forEach(p => {
        const g = p.posGroup;
        if (!dist[g]) dist[g] = { label: g, count: 0, totalValue: 0 };
        dist[g].count++;
        dist[g].totalValue += p.value;
    });
    return Object.values(dist);
})();

// Utility: format currency
export function formatValue(val) {
    if (val >= 1e9) return '€' + (val / 1e9).toFixed(1) + 'B';
    if (val >= 1e6) return '€' + (val / 1e6).toFixed(1) + 'M';
    if (val >= 1e3) return '€' + (val / 1e3).toFixed(0) + 'K';
    return '€' + val;
}

export function formatValueFull(val) {
    return '€' + val.toLocaleString('en-US');
}

export function formatPct(val) {
    const sign = val >= 0 ? '+' : '';
    return sign + val.toFixed(1) + '%';
}

export function getPositionClass(pos) {
    const p = pos.toLowerCase();
    if (['gk'].includes(p)) return 'pos-gk';
    if (['cb', 'lb', 'rb'].includes(p)) return 'pos-def';
    if (['cm', 'cam', 'cdm'].includes(p)) return 'pos-mid';
    if (['lw', 'rw', 'st', 'cf'].includes(p)) return 'pos-fwd';
    return 'pos-mid';
}

export function getPlayer(id) {
    return PLAYERS.find(p => p.id === id);
}

export function searchPlayers(query) {
    const q = query.toLowerCase();
    return PLAYERS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.club.toLowerCase().includes(q) ||
        p.league.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q)
    ).slice(0, 8);
}
