// Void Esports - Team Performance Analytics System
// Advanced player performance tracking and analytics

class TeamPerformanceAnalytics {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.players = new Map();
        this.teams = new Map();
        this.matches = new Map();
        this.analytics = new Map();
        this.updateInterval = null;
        
        this.init();
    }

    init() {
        this.createAnalyticsLayout();
        this.initializeData();
        this.startRealTimeTracking();
        this.bindEvents();
    }

    createAnalyticsLayout() {
        const analyticsHTML = `
            <div class="analytics-container">
                <div class="analytics-header">
                    <h2 class="analytics-title">Team Performance Analytics</h2>
                    <div class="analytics-controls">
                        <select class="team-selector" id="teamSelector">
                            <option value="all">All Teams</option>
                            <option value="valorant">Valorant</option>
                            <option value="fortnite">Fortnite Creative</option>
                            <option value="rocketleague">Rocket League</option>
                        </select>
                        <select class="period-selector" id="periodSelector">
                            <option value="week">This Week</option>
                            <option value="month" selected>This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <button class="analytics-btn" id="generateReport">
                            <i class="fas fa-file-alt"></i> Generate Report
                        </button>
                    </div>
                </div>
                
                <div class="analytics-grid">
                    <div class="performance-overview">
                        <div class="overview-cards">
                            <div class="overview-card win-rate">
                                <div class="card-icon">
                                    <i class="fas fa-trophy"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">0%</div>
                                    <div class="card-label">Win Rate</div>
                                    <div class="card-trend positive">+0%</div>
                                </div>
                            </div>
                            
                            <div class="overview-card kda">
                                <div class="card-icon">
                                    <i class="fas fa-crosshairs"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">0.0</div>
                                    <div class="card-label">K/D/A</div>
                                    <div class="card-trend positive">+0.0</div>
                                </div>
                            </div>
                            
                            <div class="overview-card performance">
                                <div class="card-icon">
                                    <i class="fas fa-chart-line"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">0</div>
                                    <div class="card-label">Performance Score</div>
                                    <div class="card-trend positive">+0</div>
                                </div>
                            </div>
                            
                            <div class="overview-card improvement">
                                <div class="card-icon">
                                    <i class="fas fa-arrow-up"></i>
                                </div>
                                <div class="card-content">
                                    <div class="card-value">0%</div>
                                    <div class="card-label">Improvement Rate</div>
                                    <div class="card-trend positive">+0%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="player-analytics">
                        <div class="player-section">
                            <div class="section-header">
                                <h3>Player Performance</h3>
                                <div class="section-controls">
                                    <button class="view-toggle active" data-view="grid">Grid</button>
                                    <button class="view-toggle" data-view="list">List</button>
                                    <button class="view-toggle" data-view="detailed">Detailed</button>
                                </div>
                            </div>
                            
                            <div class="player-grid" id="playerGrid">
                                <!-- Player cards will be inserted here -->
                            </div>
                            
                            <div class="player-list hidden" id="playerList">
                                <!-- Player list will be inserted here -->
                            </div>
                            
                            <div class="player-detailed hidden" id="playerDetailed">
                                <!-- Detailed player analytics will be inserted here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="match-analytics">
                        <div class="match-section">
                            <div class="section-header">
                                <h3>Recent Matches</h3>
                                <div class="section-controls">
                                    <button class="filter-btn active" data-filter="all">All</button>
                                    <button class="filter-btn" data-filter="wins">Wins</button>
                                    <button class="filter-btn" data-filter="losses">Losses</button>
                                </div>
                            </div>
                            
                            <div class="match-timeline" id="matchTimeline">
                                <!-- Match timeline will be inserted here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress-analytics">
                        <div class="progress-section">
                            <div class="section-header">
                                <h3>Skill Development Progress</h3>
                                <div class="section-controls">
                                    <button class="skill-toggle active" data-skill="all">All Skills</button>
                                    <button class="skill-toggle" data-skill="aiming">Aiming</button>
                                    <button class="skill-toggle" data-skill="strategy">Strategy</button>
                                    <button class="skill-toggle" data-skill="teamwork">Teamwork</button>
                                </div>
                            </div>
                            
                            <div class="skill-progress-grid" id="skillProgressGrid">
                                <!-- Skill progress bars will be inserted here -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="comparison-analytics">
                        <div class="comparison-section">
                            <div class="section-header">
                                <h3>Team Comparison</h3>
                                <div class="section-controls">
                                    <select class="comparison-select" id="comparisonSelect">
                                        <option value="individual">Individual Players</option>
                                        <option value="team">Team vs Team</option>
                                        <option value="period">Time Period Comparison</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="comparison-chart-container">
                                <canvas id="comparisonChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div class="prediction-analytics">
                        <div class="prediction-section">
                            <div class="section-header">
                                <h3>Performance Predictions</h3>
                                <div class="section-controls">
                                    <button class="prediction-btn" id="runPrediction">
                                        <i class="fas fa-brain"></i> Run AI Prediction
                                    </button>
                                </div>
                            </div>
                            
                            <div class="prediction-results" id="predictionResults">
                                <!-- Prediction results will be inserted here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = analyticsHTML;
    }

    initializeData() {
        // Initialize player data
        this.initializePlayers();
        
        // Initialize team data
        this.initializeTeams();
        
        // Initialize match data
        this.initializeMatches();
        
        // Render initial data
        this.renderPlayerGrid();
        this.renderMatchTimeline();
        this.renderSkillProgress();
        this.initializeComparisonChart();
        this.updateOverviewCards();
    }

    initializePlayers() {
        const playerData = [
            { id: 1, name: 'Ace', team: 'valorant', role: 'Duelist', kda: 2.4, winRate: 78, performance: 85 },
            { id: 2, name: 'Phoenix', team: 'valorant', role: 'Controller', kda: 1.8, winRate: 82, performance: 88 },
            { id: 3, name: 'Viper', team: 'valorant', role: 'Sentinel', kda: 1.6, winRate: 75, performance: 79 },
            { id: 4, name: 'Sage', team: 'valorant', role: 'Support', kda: 0.8, winRate: 85, performance: 82 },
            { id: 5, name: 'Reyna', team: 'valorant', role: 'Duelist', kda: 2.8, winRate: 80, performance: 91 },
            { id: 6, name: 'Ninja', team: 'fortnite', role: 'Builder', kda: 3.2, winRate: 92, performance: 95 },
            { id: 7, name: 'Builder', team: 'fortnite', role: 'Edit', kda: 2.9, winRate: 88, performance: 89 },
            { id: 8, name: 'Storm', team: 'fortnite', role: 'Shotcaller', kda: 2.1, winRate: 85, performance: 86 },
            { id: 9, name: 'Rocket', team: 'rocketleague', role: 'Striker', kda: 2.5, winRate: 79, performance: 83 },
            { id: 10, name: 'Boost', team: 'rocketleague', role: 'Playmaker', kda: 2.2, winRate: 81, performance: 84 }
        ];

        playerData.forEach(player => {
            this.players.set(player.id, {
                ...player,
                matches: [],
                improvements: [],
                predictions: {},
                history: this.generatePlayerHistory(player)
            });
        });
    }

    initializeTeams() {
        const teamData = [
            { id: 1, name: 'Valorant Squad', game: 'valorant', players: [1, 2, 3, 4, 5] },
            { id: 2, name: 'Fortnite Creative', game: 'fortnite', players: [6, 7, 8] },
            { id: 3, name: 'Rocket League', game: 'rocketleague', players: [9, 10] }
        ];

        teamData.forEach(team => {
            this.teams.set(team.id, team);
        });
    }

    initializeMatches() {
        const matchData = [
            { id: 1, date: new Date(Date.now() - 86400000), team: 'valorant', opponent: 'Team Alpha', result: 'win', score: '13-11', map: 'Haven' },
            { id: 2, date: new Date(Date.now() - 172800000), team: 'valorant', opponent: 'Team Beta', result: 'loss', score: '8-13', map: 'Split' },
            { id: 3, date: new Date(Date.now() - 259200000), team: 'fortnite', opponent: 'Squad Gamma', result: 'win', score: '#1', event: 'World Cup' },
            { id: 4, date: new Date(Date.now() - 345600000), team: 'rocketleague', opponent: 'Team Delta', result: 'win', score: '3-2', mode: '3v3' },
            { id: 5, date: new Date(Date.now() - 432000000), team: 'valorant', opponent: 'Team Epsilon', result: 'win', score: '13-9', map: 'Bind' }
        ];

        matchData.forEach(match => {
            this.matches.set(match.id, match);
        });
    }

    generatePlayerHistory(player) {
        const history = [];
        const days = 30;
        
        for (let i = 0; i < days; i++) {
            const date = new Date(Date.now() - i * 86400000);
            history.push({
                date: date,
                kda: player.kda + (Math.random() - 0.5) * 0.5,
                winRate: player.winRate + (Math.random() - 0.5) * 10,
                performance: player.performance + (Math.random() - 0.5) * 15
            });
        }
        
        return history.reverse();
    }

    renderPlayerGrid() {
        const playerGrid = document.getElementById('playerGrid');
        const selectedTeam = document.getElementById('teamSelector').value;
        
        let players = Array.from(this.players.values());
        if (selectedTeam !== 'all') {
            players = players.filter(player => player.team === selectedTeam);
        }
        
        const playerCards = players.map(player => `
            <div class="player-card" data-player-id="${player.id}">
                <div class="player-header">
                    <div class="player-avatar">
                        <img src="https://picsum.photos/seed/${player.name}/60/60.jpg" alt="${player.name}">
                    </div>
                    <div class="player-info">
                        <h4 class="player-name">${player.name}</h4>
                        <div class="player-role">${player.role}</div>
                        <div class="player-team">${this.getTeamName(player.team)}</div>
                    </div>
                </div>
                
                <div class="player-stats">
                    <div class="stat-item">
                        <span class="stat-label">K/D/A</span>
                        <span class="stat-value">${player.kda.toFixed(1)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Win Rate</span>
                        <span class="stat-value">${player.winRate}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Performance</span>
                        <span class="stat-value">${player.performance}</span>
                    </div>
                </div>
                
                <div class="player-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${player.performance}%"></div>
                    </div>
                    <div class="progress-label">Performance Score</div>
                </div>
                
                <div class="player-actions">
                    <button class="action-btn" data-action="details">Details</button>
                    <button class="action-btn" data-action="compare">Compare</button>
                    <button class="action-btn" data-action="predict">Predict</button>
                </div>
            </div>
        `).join('');
        
        playerGrid.innerHTML = playerCards;
    }

    renderMatchTimeline() {
        const matchTimeline = document.getElementById('matchTimeline');
        const selectedTeam = document.getElementById('teamSelector').value;
        
        let matches = Array.from(this.matches.values()).sort((a, b) => b.date - a.date);
        if (selectedTeam !== 'all') {
            matches = matches.filter(match => match.team === selectedTeam);
        }
        
        const matchElements = matches.map(match => `
            <div class="match-item ${match.result}" data-match-id="${match.id}">
                <div class="match-date">${match.date.toLocaleDateString()}</div>
                <div class="match-details">
                    <div class="match-teams">
                        <span class="our-team">Void Esports</span>
                        <span class="match-score">${match.score}</span>
                        <span class="opponent">${match.opponent}</span>
                    </div>
                    <div class="match-info">
                        <span class="match-result ${match.result}">${match.result.toUpperCase()}</span>
                        <span class="match-map">${match.map || match.mode || match.event}</span>
                    </div>
                </div>
                <div class="match-actions">
                    <button class="match-action-btn" data-action="replay">Replay</button>
                    <button class="match-action-btn" data-action="analysis">Analysis</button>
                </div>
            </div>
        `).join('');
        
        matchTimeline.innerHTML = matchElements;
    }

    renderSkillProgress() {
        const skillProgressGrid = document.getElementById('skillProgressGrid');
        const selectedSkill = document.querySelector('.skill-toggle.active').dataset.skill;
        
        const skills = selectedSkill === 'all' ? [
            { name: 'Aiming', progress: 85, trend: '+5%' },
            { name: 'Strategy', progress: 78, trend: '+8%' },
            { name: 'Teamwork', progress: 92, trend: '+3%' },
            { name: 'Communication', progress: 88, trend: '+6%' },
            { name: 'Reaction Time', progress: 91, trend: '+4%' },
            { name: 'Game Sense', progress: 79, trend: '+7%' }
        ] : [
            { name: selectedSkill, progress: Math.floor(Math.random() * 30 + 70), trend: `+${Math.floor(Math.random() * 10)}%` }
        ];
        
        const skillElements = skills.map(skill => `
            <div class="skill-progress-item">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-progress-text">${skill.progress}%</span>
                </div>
                <div class="skill-progress-bar">
                    <div class="skill-progress-fill" style="width: ${skill.progress}%"></div>
                </div>
                <div class="skill-trend ${skill.trend.startsWith('+') ? 'positive' : 'negative'}">
                    <i class="fas fa-arrow-${skill.trend.startsWith('+') ? 'up' : 'down'}"></i>
                    <span>${skill.trend}</span>
                </div>
            </div>
        `).join('');
        
        skillProgressGrid.innerHTML = skillElements;
    }

    initializeComparisonChart() {
        const canvas = document.getElementById('comparisonChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Simple bar chart implementation (without Chart.js dependency)
        this.drawComparisonChart(ctx);
    }

    drawComparisonChart(ctx) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Sample data
        const data = [
            { label: 'Ace', value: 85 },
            { label: 'Phoenix', value: 88 },
            { label: 'Viper', value: 79 },
            { label: 'Sage', value: 82 },
            { label: 'Reyna', value: 91 }
        ];
        
        const barWidth = width / (data.length * 2);
        const maxValue = Math.max(...data.map(d => d.value));
        const scale = (height - 40) / maxValue;
        
        // Draw bars
        data.forEach((item, index) => {
            const x = (index * 2 + 0.5) * barWidth;
            const barHeight = item.value * scale;
            const y = height - barHeight - 20;
            
            // Draw bar
            ctx.fillStyle = '#a855f7';
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw label
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, height - 5);
            
            // Draw value
            ctx.fillText(item.value, x + barWidth / 2, y - 5);
        });
    }

    updateOverviewCards() {
        const players = Array.from(this.players.values());
        const avgWinRate = players.reduce((sum, p) => sum + p.winRate, 0) / players.length;
        const avgKDA = players.reduce((sum, p) => sum + p.kda, 0) / players.length;
        const avgPerformance = players.reduce((sum, p) => sum + p.performance, 0) / players.length;
        const improvementRate = 15; // Sample improvement rate
        
        // Update cards with animation
        this.updateCardValue('win-rate', `${avgWinRate.toFixed(1)}%`, '+2.3%');
        this.updateCardValue('kda', avgKDA.toFixed(1), '+0.2');
        this.updateCardValue('performance', Math.floor(avgPerformance), '+5');
        this.updateCardValue('improvement', `${improvementRate}%`, '+3%');
    }

    updateCardValue(cardClass, value, trend) {
        const card = document.querySelector(`.overview-card.${cardClass}`);
        if (card) {
            const valueEl = card.querySelector('.card-value');
            const trendEl = card.querySelector('.card-trend');
            
            // Animate value change
            this.animateValue(valueEl, 0, parseFloat(value), 1000);
            
            // Update trend
            trendEl.textContent = trend;
            trendEl.className = `card-trend ${trend.startsWith('+') ? 'positive' : 'negative'}`;
        }
    }

    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            
            if (element.classList.contains('win-rate') || element.classList.contains('improvement')) {
                element.textContent = current.toFixed(1) + '%';
            } else if (element.classList.contains('kda')) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    startRealTimeTracking() {
        this.updateInterval = setInterval(() => {
            this.updateOverviewCards();
            this.updatePlayerStats();
            this.simulateLiveMatches();
        }, 10000); // Update every 10 seconds
    }

    updatePlayerStats() {
        // Simulate small changes in player performance
        this.players.forEach(player => {
            player.kda += (Math.random() - 0.5) * 0.1;
            player.performance += Math.floor((Math.random() - 0.5) * 5);
            player.performance = Math.max(0, Math.min(100, player.performance));
        });
    }

    simulateLiveMatches() {
        // Simulate live match updates
        const liveMatches = document.querySelectorAll('.match-item');
        if (liveMatches.length > 0) {
            const randomMatch = liveMatches[Math.floor(Math.random() * liveMatches.length)];
            randomMatch.classList.add('live-update');
            setTimeout(() => {
                randomMatch.classList.remove('live-update');
            }, 2000);
        }
    }

    bindEvents() {
        // Team selector
        document.getElementById('teamSelector').addEventListener('change', () => {
            this.renderPlayerGrid();
            this.renderMatchTimeline();
        });

        // Period selector
        document.getElementById('periodSelector').addEventListener('change', () => {
            this.updateOverviewCards();
            this.renderPlayerGrid();
        });

        // View toggles
        document.querySelectorAll('.view-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });

        // Skill toggles
        document.querySelectorAll('.skill-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.skill-toggle').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderSkillProgress();
            });
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterMatches(btn.dataset.filter);
            });
        });

        // Player actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn')) {
                const action = e.target.dataset.action;
                const playerId = e.target.closest('.player-card').dataset.playerId;
                this.handlePlayerAction(action, playerId);
            }
        });

        // Match actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('match-action-btn')) {
                const action = e.target.dataset.action;
                const matchId = e.target.closest('.match-item').dataset.matchId;
                this.handleMatchAction(action, matchId);
            }
        });

        // Generate report button
        document.getElementById('generateReport').addEventListener('click', () => {
            this.generatePerformanceReport();
        });

        // Run prediction button
        document.getElementById('runPrediction').addEventListener('click', () => {
            this.runAIPrediction();
        });
    }

    switchView(view) {
        // Hide all views
        document.getElementById('playerGrid').classList.add('hidden');
        document.getElementById('playerList').classList.add('hidden');
        document.getElementById('playerDetailed').classList.add('hidden');
        
        // Show selected view
        document.getElementById(`player${view.charAt(0).toUpperCase() + view.slice(1)}`).classList.remove('hidden');
        
        // Update button states
        document.querySelectorAll('.view-toggle').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    filterMatches(filter) {
        const matches = document.querySelectorAll('.match-item');
        matches.forEach(match => {
            if (filter === 'all') {
                match.style.display = '';
            } else {
                match.style.display = match.classList.contains(filter) ? '' : 'none';
            }
        });
    }

    handlePlayerAction(action, playerId) {
        const player = this.players.get(parseInt(playerId));
        
        switch(action) {
            case 'details':
                this.showPlayerDetails(player);
                break;
            case 'compare':
                this.comparePlayer(player);
                break;
            case 'predict':
                this.predictPlayerPerformance(player);
                break;
        }
    }

    handleMatchAction(action, matchId) {
        const match = this.matches.get(parseInt(matchId));
        
        switch(action) {
            case 'replay':
                this.showMatchReplay(match);
                break;
            case 'analysis':
                this.showMatchAnalysis(match);
                break;
        }
    }

    showPlayerDetails(player) {
        // Switch to detailed view and populate with player data
        this.switchView('detailed');
        const detailedView = document.getElementById('playerDetailed');
        
        detailedView.innerHTML = `
            <div class="player-detail-card">
                <div class="player-detail-header">
                    <img src="https://picsum.photos/seed/${player.name}/100/100.jpg" alt="${player.name}">
                    <div class="player-detail-info">
                        <h3>${player.name}</h3>
                        <p>${player.role} - ${this.getTeamName(player.team)}</p>
                        <div class="player-detail-stats">
                            <span>K/D/A: ${player.kda.toFixed(1)}</span>
                            <span>Win Rate: ${player.winRate}%</span>
                            <span>Performance: ${player.performance}</span>
                        </div>
                    </div>
                </div>
                
                <div class="player-detail-content">
                    <div class="performance-chart">
                        <h4>Performance Trend</h4>
                        <canvas id="playerPerformanceChart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="recent-matches">
                        <h4>Recent Matches</h4>
                        <div class="mini-match-list">
                            <!-- Mini match items -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Draw performance chart
        setTimeout(() => {
            this.drawPlayerPerformanceChart(player);
        }, 100);
    }

    drawPlayerPerformanceChart(player) {
        const canvas = document.getElementById('playerPerformanceChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw simple line chart
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        player.history.forEach((point, index) => {
            const x = (index / (player.history.length - 1)) * width;
            const y = height - (point.performance / 100) * height - 20;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }

    comparePlayer(player) {
        // Implement player comparison logic
        console.log('Comparing player:', player.name);
    }

    predictPlayerPerformance(player) {
        // Implement AI prediction logic
        const prediction = {
            nextMatchWinRate: Math.floor(Math.random() * 30 + 60),
            expectedKDA: (player.kda + (Math.random() - 0.5) * 0.5).toFixed(2),
            confidence: Math.floor(Math.random() * 20 + 70)
        };
        
        this.showNotification(
            `Prediction for ${player.name}: ${prediction.nextMatchWinRate}% win rate, ${prediction.expectedKDA} K/D/A (${prediction.confidence}% confidence)`,
            'info'
        );
    }

    showMatchReplay(match) {
        this.showNotification(`Loading replay for match vs ${match.opponent}...`, 'info');
    }

    showMatchAnalysis(match) {
        this.showNotification(`Analyzing match data for ${match.opponent}...`, 'info');
    }

    generatePerformanceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            period: document.getElementById('periodSelector').value,
            team: document.getElementById('teamSelector').value,
            overview: this.getOverviewData(),
            players: this.getPlayersData(),
            matches: this.getMatchesData(),
            predictions: this.getPredictionsData()
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Performance report generated successfully', 'success');
    }

    runAIPrediction() {
        const resultsContainer = document.getElementById('predictionResults');
        
        // Simulate AI prediction processing
        resultsContainer.innerHTML = `
            <div class="prediction-processing">
                <div class="processing-spinner"></div>
                <p>Analyzing team performance data...</p>
            </div>
        `;
        
        setTimeout(() => {
            const predictions = [
                { match: 'Next Valorant Match', winProbability: 78, confidence: 85 },
                { match: 'Fortnite Creative Tournament', winProbability: 92, confidence: 90 },
                { match: 'Rocket League Qualifier', winProbability: 71, confidence: 78 }
            ];
            
            const predictionHTML = predictions.map(pred => `
                <div class="prediction-item">
                    <div class="prediction-match">${pred.match}</div>
                    <div class="prediction-probability">
                        <span class="probability-value">${pred.winProbability}%</span>
                        <div class="probability-bar">
                            <div class="probability-fill" style="width: ${pred.winProbability}%"></div>
                        </div>
                    </div>
                    <div class="prediction-confidence">Confidence: ${pred.confidence}%</div>
                </div>
            `).join('');
            
            resultsContainer.innerHTML = `
                <div class="prediction-results">
                    <h4>AI Performance Predictions</h4>
                    <div class="prediction-list">
                        ${predictionHTML}
                    </div>
                    <div class="prediction-summary">
                        <p>Based on current team performance trends and historical data analysis.</p>
                    </div>
                </div>
            `;
        }, 2000);
    }

    getOverviewData() {
        return {
            winRate: document.querySelector('.overview-card.win-rate .card-value').textContent,
            kda: document.querySelector('.overview-card.kda .card-value').textContent,
            performance: document.querySelector('.overview-card.performance .card-value').textContent,
            improvement: document.querySelector('.overview-card.improvement .card-value').textContent
        };
    }

    getPlayersData() {
        return Array.from(this.players.values()).map(player => ({
            id: player.id,
            name: player.name,
            team: player.team,
            role: player.role,
            kda: player.kda,
            winRate: player.winRate,
            performance: player.performance
        }));
    }

    getMatchesData() {
        return Array.from(this.matches.values()).map(match => ({
            id: match.id,
            date: match.date,
            team: match.team,
            opponent: match.opponent,
            result: match.result,
            score: match.score
        }));
    }

    getPredictionsData() {
        return {
            nextMatch: Math.floor(Math.random() * 30 + 60),
            tournament: Math.floor(Math.random() * 20 + 70),
            championship: Math.floor(Math.random() * 15 + 65)
        };
    }

    getTeamName(teamCode) {
        const teamNames = {
            'valorant': 'Valorant Squad',
            'fortnite': 'Fortnite Creative',
            'rocketleague': 'Rocket League'
        };
        return teamNames[teamCode] || teamCode;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const analyticsContainers = document.querySelectorAll('.team-analytics');
    analyticsContainers.forEach(container => {
        new TeamPerformanceAnalytics(container.id);
    });
});

// Export for global access
window.TeamPerformanceAnalytics = TeamPerformanceAnalytics;
