// Void Esports - Interactive Data Visualization Dashboard
// Advanced analytics and real-time data visualization system

class DataVisualizationDashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.charts = [];
        this.dataCache = new Map();
        this.updateInterval = null;
        this.animationFrame = null;
        
        this.init();
    }

    init() {
        this.createDashboardLayout();
        this.initializeCharts();
        this.startRealTimeUpdates();
        this.bindEvents();
    }

    createDashboardLayout() {
        const dashboardHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h2 class="dashboard-title">Real-Time Analytics Dashboard</h2>
                    <div class="dashboard-controls">
                        <button class="control-btn refresh-btn" data-action="refresh">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                        <button class="control-btn export-btn" data-action="export">
                            <i class="fas fa-download"></i> Export
                        </button>
                        <select class="time-range-selector" id="timeRange">
                            <option value="1h">Last Hour</option>
                            <option value="24h" selected>Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                    </div>
                </div>
                
                <div class="dashboard-grid">
                    <div class="metric-cards">
                        <div class="metric-card" data-metric="revenue">
                            <div class="metric-icon">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">$0</div>
                                <div class="metric-label">Revenue</div>
                                <div class="metric-change positive">+0%</div>
                            </div>
                        </div>
                        
                        <div class="metric-card" data-metric="views">
                            <div class="metric-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">0</div>
                                <div class="metric-label">Views</div>
                                <div class="metric-change positive">+0%</div>
                            </div>
                        </div>
                        
                        <div class="metric-card" data-metric="engagement">
                            <div class="metric-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">0%</div>
                                <div class="metric-label">Engagement</div>
                                <div class="metric-change positive">+0%</div>
                            </div>
                        </div>
                        
                        <div class="metric-card" data-metric="followers">
                            <div class="metric-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="metric-content">
                                <div class="metric-value">0</div>
                                <div class="metric-label">Followers</div>
                                <div class="metric-change positive">+0%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Revenue Trend</h3>
                                <div class="chart-controls">
                                    <button class="chart-type-btn active" data-chart="line">Line</button>
                                    <button class="chart-type-btn" data-chart="bar">Bar</button>
                                    <button class="chart-type-btn" data-chart="area">Area</button>
                                </div>
                            </div>
                            <canvas id="revenueChart" width="400" height="200"></canvas>
                        </div>
                        
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Content Performance</h3>
                                <div class="chart-controls">
                                    <button class="chart-type-btn active" data-chart="doughnut">Doughnut</button>
                                    <button class="chart-type-btn" data-chart="pie">Pie</button>
                                </div>
                            </div>
                            <canvas id="contentChart" width="400" height="200"></canvas>
                        </div>
                        
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Platform Distribution</h3>
                                <div class="chart-controls">
                                    <button class="chart-type-btn active" data-chart="radar">Radar</button>
                                    <button class="chart-type-btn" data-chart="polar">Polar</button>
                                </div>
                            </div>
                            <canvas id="platformChart" width="400" height="200"></canvas>
                        </div>
                        
                        <div class="chart-card">
                            <div class="chart-header">
                                <h3>Growth Metrics</h3>
                                <div class="chart-controls">
                                    <button class="chart-type-btn active" data-chart="mixed">Mixed</button>
                                    <button class="chart-type-btn" data-chart="scatter">Scatter</button>
                                </div>
                            </div>
                            <canvas id="growthChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                    
                    <div class="data-table-container">
                        <div class="table-card">
                            <div class="table-header">
                                <h3>Recent Performance Data</h3>
                                <div class="table-controls">
                                    <input type="text" class="search-input" placeholder="Search...">
                                    <button class="filter-btn">
                                        <i class="fas fa-filter"></i> Filter
                                    </button>
                                </div>
                            </div>
                            <div class="data-table-wrapper">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Revenue</th>
                                            <th>Views</th>
                                            <th>Engagement</th>
                                            <th>Platform</th>
                                            <th>Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody id="dataTableBody">
                                        <!-- Data rows will be inserted here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = dashboardHTML;
    }

    initializeCharts() {
        // Initialize Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        this.charts.revenue = new Chart(revenueCtx, {
            type: 'line',
            data: this.generateRevenueData(),
            options: this.getChartOptions('Revenue Trend', '$')
        });

        // Initialize Content Chart
        const contentCtx = document.getElementById('contentChart').getContext('2d');
        this.charts.content = new Chart(contentCtx, {
            type: 'doughnut',
            data: this.generateContentData(),
            options: this.getChartOptions('Content Performance', '')
        });

        // Initialize Platform Chart
        const platformCtx = document.getElementById('platformChart').getContext('2d');
        this.charts.platform = new Chart(platformCtx, {
            type: 'radar',
            data: this.generatePlatformData(),
            options: this.getChartOptions('Platform Distribution', '')
        });

        // Initialize Growth Chart
        const growthCtx = document.getElementById('growthChart').getContext('2d');
        this.charts.growth = new Chart(growthCtx, {
            type: 'bar',
            data: this.generateGrowthData(),
            options: this.getChartOptions('Growth Metrics', '')
        });
    }

    generateRevenueData() {
        const labels = this.getTimeLabels();
        return {
            labels: labels,
            datasets: [{
                label: 'Revenue',
                data: labels.map(() => Math.random() * 50000 + 10000),
                borderColor: '#a855f7',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }, {
                label: 'Projected',
                data: labels.map(() => Math.random() * 40000 + 15000),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                borderDash: [5, 5]
            }]
        };
    }

    generateContentData() {
        return {
            labels: ['Videos', 'Streams', 'Social Media', 'Tournaments', 'Merchandise'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#a855f7',
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        };
    }

    generatePlatformData() {
        return {
            labels: ['YouTube', 'Twitch', 'Twitter', 'Instagram', 'TikTok', 'Discord'],
            datasets: [{
                label: 'Reach',
                data: [95, 88, 76, 82, 91, 73],
                borderColor: '#a855f7',
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderWidth: 2
            }, {
                label: 'Engagement',
                data: [78, 92, 85, 88, 79, 95],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2
            }]
        };
    }

    generateGrowthData() {
        const labels = this.getTimeLabels();
        return {
            labels: labels,
            datasets: [{
                label: 'Followers',
                data: labels.map(() => Math.floor(Math.random() * 5000 + 1000)),
                backgroundColor: '#a855f7',
                borderColor: '#a855f7',
                borderWidth: 1
            }, {
                label: 'Views',
                data: labels.map(() => Math.floor(Math.random() * 100000 + 50000)),
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6',
                borderWidth: 1,
                yAxisID: 'y1'
            }]
        };
    }

    getTimeLabels() {
        const timeRange = document.getElementById('timeRange').value;
        const labels = [];
        const now = new Date();
        
        let points, format;
        switch(timeRange) {
            case '1h':
                points = 12;
                format = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                break;
            case '24h':
                points = 24;
                format = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit' });
                break;
            case '7d':
                points = 7;
                format = (date) => date.toLocaleDateString('en-US', { weekday: 'short' });
                break;
            case '30d':
                points = 30;
                format = (date) => date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                break;
        }
        
        for (let i = points - 1; i >= 0; i--) {
            const date = new Date(now - i * this.getIntervalMs(timeRange));
            labels.push(format(date));
        }
        
        return labels;
    }

    getIntervalMs(timeRange) {
        switch(timeRange) {
            case '1h': return 5 * 60 * 1000; // 5 minutes
            case '24h': return 60 * 60 * 1000; // 1 hour
            case '7d': return 24 * 60 * 60 * 1000; // 1 day
            case '30d': return 24 * 60 * 60 * 1000; // 1 day
        }
    }

    getChartOptions(title, prefix) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#a855f7',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: '#ffffff',
                        callback: function(value) {
                            return prefix + value.toLocaleString();
                        }
                    }
                }
            }
        };
    }

    updateMetrics() {
        const metrics = {
            revenue: Math.floor(Math.random() * 50000 + 10000),
            views: Math.floor(Math.random() * 100000 + 50000),
            engagement: (Math.random() * 30 + 70).toFixed(1),
            followers: Math.floor(Math.random() * 5000 + 1000)
        };

        Object.keys(metrics).forEach(key => {
            const card = document.querySelector(`[data-metric="${key}"]`);
            if (card) {
                const valueEl = card.querySelector('.metric-value');
                const changeEl = card.querySelector('.metric-change');
                
                // Animate value change
                this.animateValue(valueEl, parseInt(valueEl.textContent.replace(/[^0-9]/g, '')), metrics[key], 1000);
                
                // Update change indicator
                const change = Math.floor(Math.random() * 20 - 5);
                changeEl.textContent = `${change > 0 ? '+' : ''}${change}%`;
                changeEl.className = `metric-change ${change > 0 ? 'positive' : 'negative'}`;
            }
        });
    }

    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            
            if (element.dataset.metric === 'engagement') {
                element.textContent = current + '%';
            } else if (element.dataset.metric === 'revenue') {
                element.textContent = '$' + current.toLocaleString();
            } else {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    updateDataTable() {
        const tableBody = document.getElementById('dataTableBody');
        const rows = [];
        
        for (let i = 0; i < 10; i++) {
            const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            const revenue = Math.floor(Math.random() * 5000 + 1000);
            const views = Math.floor(Math.random() * 10000 + 5000);
            const engagement = (Math.random() * 30 + 70).toFixed(1);
            const platforms = ['YouTube', 'Twitch', 'Twitter', 'Instagram'];
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const performance = Math.floor(Math.random() * 100);
            
            rows.push(`
                <tr>
                    <td>${date.toLocaleDateString()}</td>
                    <td>$${revenue.toLocaleString()}</td>
                    <td>${views.toLocaleString()}</td>
                    <td>${engagement}%</td>
                    <td><span class="platform-badge ${platform.toLowerCase()}">${platform}</span></td>
                    <td><div class="performance-bar" style="width: ${performance}%"></div></td>
                </tr>
            `);
        }
        
        tableBody.innerHTML = rows.join('');
    }

    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateMetrics();
            this.updateChartData();
            this.updateDataTable();
        }, 5000);
    }

    updateChartData() {
        // Simulate real-time data updates
        Object.keys(this.charts).forEach(chartKey => {
            const chart = this.charts[chartKey];
            chart.data.datasets.forEach(dataset => {
                dataset.data = dataset.data.map(value => {
                    const change = (Math.random() - 0.5) * value * 0.1;
                    return Math.max(0, value + change);
                });
            });
            chart.update('none');
        });
    }

    bindEvents() {
        // Control buttons
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleControlAction(action);
            });
        });

        // Time range selector
        document.getElementById('timeRange').addEventListener('change', () => {
            this.updateTimeRange();
        });

        // Chart type buttons
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartType = btn.dataset.chart;
                const chartCard = btn.closest('.chart-card');
                this.changeChartType(chartCard, chartType);
            });
        });

        // Search functionality
        document.querySelector('.search-input').addEventListener('input', (e) => {
            this.filterTable(e.target.value);
        });
    }

    handleControlAction(action) {
        switch(action) {
            case 'refresh':
                this.refreshData();
                break;
            case 'export':
                this.exportData();
                break;
        }
    }

    refreshData() {
        // Show loading state
        document.querySelectorAll('.metric-card').forEach(card => {
            card.classList.add('loading');
        });

        // Simulate data refresh
        setTimeout(() => {
            this.updateMetrics();
            this.updateChartData();
            this.updateDataTable();
            
            document.querySelectorAll('.metric-card').forEach(card => {
                card.classList.remove('loading');
            });
            
            this.showNotification('Data refreshed successfully', 'success');
        }, 1000);
    }

    exportData() {
        const data = {
            timestamp: new Date().toISOString(),
            metrics: this.getMetricsData(),
            charts: this.getChartData(),
            tableData: this.getTableData()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `void-esports-analytics-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Data exported successfully', 'success');
    }

    getMetricsData() {
        const metrics = {};
        document.querySelectorAll('.metric-card').forEach(card => {
            const key = card.dataset.metric;
            const value = card.querySelector('.metric-value').textContent;
            const change = card.querySelector('.metric-change').textContent;
            metrics[key] = { value, change };
        });
        return metrics;
    }

    getChartData() {
        const data = {};
        Object.keys(this.charts).forEach(key => {
            data[key] = this.charts[key].data;
        });
        return data;
    }

    getTableData() {
        const rows = [];
        document.querySelectorAll('#dataTableBody tr').forEach(row => {
            const cells = Array.from(row.cells).map(cell => cell.textContent);
            rows.push(cells);
        });
        return rows;
    }

    updateTimeRange() {
        // Update all charts with new time range
        Object.keys(this.charts).forEach(chartKey => {
            const chart = this.charts[chartKey];
            if (chartKey === 'revenue' || chartKey === 'growth') {
                chart.data.labels = this.getTimeLabels();
                chart.data.datasets.forEach(dataset => {
                    dataset.data = this.getTimeLabels().map(() => 
                        Math.random() * 50000 + 10000
                    );
                });
                chart.update();
            }
        });
        
        this.showNotification('Time range updated', 'info');
    }

    changeChartType(chartCard, newType) {
        const canvas = chartCard.querySelector('canvas');
        const chartKey = canvas.id.replace('Chart', '');
        const chart = this.charts[chartKey];
        
        // Update button states
        chartCard.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Change chart type
        chart.config.type = newType;
        chart.update();
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#dataTableBody tr');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
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
        
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].destroy();
            }
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded. Loading from CDN...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            initializeDashboard();
        };
        document.head.appendChild(script);
    } else {
        initializeDashboard();
    }
});

function initializeDashboard() {
    // Find dashboard containers and initialize
    const dashboardContainers = document.querySelectorAll('.data-dashboard');
    dashboardContainers.forEach(container => {
        new DataVisualizationDashboard(container.id);
    });
}

// Export for global access
window.DataVisualizationDashboard = DataVisualizationDashboard;
