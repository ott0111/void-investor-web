// Void Esports - Contact and CRM System
// Advanced contact management and customer relationship management

class ContactCRMSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.contacts = new Map();
        this.companies = new Map();
        this.deals = new Map();
        this.activities = new Map();
        this.tags = new Map();
        this.currentView = 'dashboard';
        this.searchTerm = '';
        
        this.init();
    }

    init() {
        this.createCRMLayout();
        this.initializeData();
        this.bindEvents();
        this.startRealTimeUpdates();
    }

    createCRMLayout() {
        const crmHTML = `
            <div class="crm-container">
                <div class="crm-header">
                    <h2 class="crm-title">Investor Relations CRM</h2>
                    <div class="crm-controls">
                        <div class="search-container">
                            <input type="text" class="search-input" id="crmSearch" placeholder="Search contacts, companies, deals...">
                            <button class="search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <button class="crm-btn primary" id="addContact">
                            <i class="fas fa-user-plus"></i> Add Contact
                        </button>
                        <button class="crm-btn" id="addDeal">
                            <i class="fas fa-handshake"></i> Add Deal
                        </button>
                        <button class="crm-btn" id="exportData">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
                
                <div class="crm-navigation">
                    <nav class="crm-nav">
                        <button class="nav-btn active" data-view="dashboard">
                            <i class="fas fa-chart-line"></i> Dashboard
                        </button>
                        <button class="nav-btn" data-view="contacts">
                            <i class="fas fa-users"></i> Contacts
                        </button>
                        <button class="nav-btn" data-view="companies">
                            <i class="fas fa-building"></i> Companies
                        </button>
                        <button class="nav-btn" data-view="deals">
                            <i class="fas fa-handshake"></i> Deals
                        </button>
                        <button class="nav-btn" data-view="activities">
                            <i class="fas fa-calendar"></i> Activities
                        </button>
                        <button class="nav-btn" data-view="analytics">
                            <i class="fas fa-chart-bar"></i> Analytics
                        </button>
                    </nav>
                </div>
                
                <div class="crm-content">
                    <!-- Dashboard View -->
                    <div class="crm-view dashboard-view active" id="dashboardView">
                        <div class="dashboard-grid">
                            <div class="metric-cards">
                                <div class="metric-card">
                                    <div class="metric-icon contacts">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div class="metric-content">
                                        <div class="metric-value" id="totalContacts">0</div>
                                        <div class="metric-label">Total Contacts</div>
                                        <div class="metric-change positive">+12%</div>
                                    </div>
                                </div>
                                
                                <div class="metric-card">
                                    <div class="metric-icon companies">
                                        <i class="fas fa-building"></i>
                                    </div>
                                    <div class="metric-content">
                                        <div class="metric-value" id="totalCompanies">0</div>
                                        <div class="metric-label">Companies</div>
                                        <div class="metric-change positive">+8%</div>
                                    </div>
                                </div>
                                
                                <div class="metric-card">
                                    <div class="metric-icon deals">
                                        <i class="fas fa-handshake"></i>
                                    </div>
                                    <div class="metric-content">
                                        <div class="metric-value" id="activeDeals">0</div>
                                        <div class="metric-label">Active Deals</div>
                                        <div class="metric-change positive">+15%</div>
                                    </div>
                                </div>
                                
                                <div class="metric-card">
                                    <div class="metric-icon revenue">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                    <div class="metric-content">
                                        <div class="metric-value" id="pipelineValue">$0</div>
                                        <div class="metric-label">Pipeline Value</div>
                                        <div class="metric-change positive">+22%</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="dashboard-charts">
                                <div class="chart-container">
                                    <h3>Deal Pipeline</h3>
                                    <canvas id="pipelineChart" width="400" height="200"></canvas>
                                </div>
                                
                                <div class="chart-container">
                                    <h3>Revenue Forecast</h3>
                                    <canvas id="revenueChart" width="400" height="200"></canvas>
                                </div>
                            </div>
                            
                            <div class="recent-activities">
                                <h3>Recent Activities</h3>
                                <div class="activity-list" id="recentActivities">
                                    <!-- Activities will be inserted here -->
                                </div>
                            </div>
                            
                            <div class="upcoming-tasks">
                                <h3>Upcoming Tasks</h3>
                                <div class="task-list" id="upcomingTasks">
                                    <!-- Tasks will be inserted here -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contacts View -->
                    <div class="crm-view contacts-view" id="contactsView">
                        <div class="contacts-header">
                            <h3>Contacts</h3>
                            <div class="contacts-controls">
                                <select class="filter-select" id="contactFilter">
                                    <option value="all">All Contacts</option>
                                    <option value="investors">Investors</option>
                                    <option value="sponsors">Sponsors</option>
                                    <option value="partners">Partners</option>
                                </select>
                                <select class="sort-select" id="contactSort">
                                    <option value="name">Name</option>
                                    <option value="company">Company</option>
                                    <option value="value">Deal Value</option>
                                    <option value="date">Last Contact</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="contacts-grid" id="contactsGrid">
                            <!-- Contact cards will be inserted here -->
                        </div>
                    </div>
                    
                    <!-- Companies View -->
                    <div class="crm-view companies-view" id="companiesView">
                        <div class="companies-header">
                            <h3>Companies</h3>
                            <div class="companies-controls">
                                <select class="filter-select" id="companyFilter">
                                    <option value="all">All Companies</option>
                                    <option value="tech">Technology</option>
                                    <option value="finance">Finance</option>
                                    <option value="media">Media</option>
                                    <option value="gaming">Gaming</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="companies-grid" id="companiesGrid">
                            <!-- Company cards will be inserted here -->
                        </div>
                    </div>
                    
                    <!-- Deals View -->
                    <div class="crm-view deals-view" id="dealsView">
                        <div class="deals-header">
                            <h3>Deals Pipeline</h3>
                            <div class="deals-controls">
                                <select class="filter-select" id="dealFilter">
                                    <option value="all">All Deals</option>
                                    <option value="prospecting">Prospecting</option>
                                    <option value="qualification">Qualification</option>
                                    <option value="proposal">Proposal</option>
                                    <option value="negotiation">Negotiation</option>
                                    <option value="closed-won">Closed Won</option>
                                    <option value="closed-lost">Closed Lost</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="deals-pipeline" id="dealsPipeline">
                            <!-- Deal pipeline stages will be inserted here -->
                        </div>
                    </div>
                    
                    <!-- Activities View -->
                    <div class="crm-view activities-view" id="activitiesView">
                        <div class="activities-header">
                            <h3>Activities</h3>
                            <div class="activities-controls">
                                <button class="activity-btn" id="logActivity">
                                    <i class="fas fa-plus"></i> Log Activity
                                </button>
                                <select class="filter-select" id="activityFilter">
                                    <option value="all">All Activities</option>
                                    <option value="call">Calls</option>
                                    <option value="email">Emails</option>
                                    <option value="meeting">Meetings</option>
                                    <option value="task">Tasks</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="activities-timeline" id="activitiesTimeline">
                            <!-- Activities timeline will be inserted here -->
                        </div>
                    </div>
                    
                    <!-- Analytics View -->
                    <div class="crm-view analytics-view" id="analyticsView">
                        <div class="analytics-header">
                            <h3>CRM Analytics</h3>
                            <div class="analytics-controls">
                                <select class="period-select" id="analyticsPeriod">
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d" selected>Last 30 Days</option>
                                    <option value="90d">Last 90 Days</option>
                                    <option value="1y">Last Year</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="analytics-grid">
                            <div class="analytics-chart">
                                <h4>Contact Growth</h4>
                                <canvas id="contactGrowthChart" width="400" height="200"></canvas>
                            </div>
                            
                            <div class="analytics-chart">
                                <h4>Deal Conversion Rates</h4>
                                <canvas id="conversionChart" width="400" height="200"></canvas>
                            </div>
                            
                            <div class="analytics-chart">
                                <h4>Revenue by Source</h4>
                                <canvas id="revenueSourceChart" width="400" height="200"></canvas>
                            </div>
                            
                            <div class="analytics-chart">
                                <h4>Activity Performance</h4>
                                <canvas id="activityChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = crmHTML;
    }

    initializeData() {
        this.initializeContacts();
        this.initializeCompanies();
        this.initializeDeals();
        this.initializeActivities();
        this.initializeTags();
        
        this.renderDashboard();
        this.renderContacts();
        this.renderCompanies();
        this.renderDeals();
        this.renderActivities();
        this.renderAnalytics();
    }

    initializeContacts() {
        const contactData = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Anderson',
                email: 'john.anderson@techcorp.com',
                phone: '+1-555-0123',
                company: 'TechCorp Industries',
                position: 'Investment Director',
                type: 'investor',
                value: 2500000,
                status: 'active',
                tags: ['high-value', 'tech', 'vc'],
                lastContact: new Date(Date.now() - 86400000),
                notes: 'Lead investor interested in esports expansion. Very knowledgeable about gaming industry.',
                avatar: 'https://picsum.photos/seed/john-anderson/100/100.jpg'
            },
            {
                id: 2,
                firstName: 'Sarah',
                lastName: 'Chen',
                email: 'sarah.chen@globalventures.com',
                phone: '+1-555-0124',
                company: 'Global Ventures',
                position: 'Partner',
                type: 'investor',
                value: 5000000,
                status: 'active',
                tags: ['high-value', 'global', 'strategic'],
                lastContact: new Date(Date.now() - 172800000),
                notes: 'Strategic partner with extensive network in Asia Pacific region.',
                avatar: 'https://picsum.photos/seed/sarah-chen/100/100.jpg'
            },
            {
                id: 3,
                firstName: 'Michael',
                lastName: 'Robinson',
                email: 'michael.robinson@gamingbrands.com',
                phone: '+1-555-0125',
                company: 'Gaming Brands LLC',
                position: 'Marketing Director',
                type: 'sponsor',
                value: 750000,
                status: 'active',
                tags: ['sponsor', 'branding', 'marketing'],
                lastContact: new Date(Date.now() - 259200000),
                notes: 'Interested in brand integration across multiple content platforms.',
                avatar: 'https://picsum.photos/seed/michael-robinson/100/100.jpg'
            },
            {
                id: 4,
                firstName: 'Emily',
                lastName: 'Watson',
                email: 'emily.watson@mediainvest.com',
                phone: '+1-555-0126',
                company: 'Media Investment Group',
                position: 'CEO',
                type: 'investor',
                value: 3200000,
                status: 'prospecting',
                tags: ['media', 'content', 'investment'],
                lastContact: new Date(Date.now() - 604800000),
                notes: 'Focus on content creation and media expansion opportunities.',
                avatar: 'https://picsum.photos/seed/emily-watson/100/100.jpg'
            },
            {
                id: 5,
                firstName: 'David',
                lastName: 'Kim',
                email: 'david.kim@esportstech.com',
                phone: '+1-555-0127',
                company: 'Esports Tech Solutions',
                position: 'CTO',
                type: 'partner',
                value: 1200000,
                status: 'active',
                tags: ['technology', 'partner', 'infrastructure'],
                lastContact: new Date(Date.now() - 432000000),
                notes: 'Technology partner providing infrastructure and analytics solutions.',
                avatar: 'https://picsum.photos/seed/david-kim/100/100.jpg'
            }
        ];

        contactData.forEach(contact => {
            this.contacts.set(contact.id, contact);
        });
    }

    initializeCompanies() {
        const companyData = [
            {
                id: 1,
                name: 'TechCorp Industries',
                industry: 'Technology',
                size: 'Enterprise',
                revenue: '10B+',
                website: 'https://techcorp.com',
                description: 'Leading technology company focused on AI and cloud computing solutions.',
                contacts: [1],
                deals: [1, 2],
                totalValue: 5000000,
                status: 'active',
                tags: ['tech', 'enterprise', 'ai']
            },
            {
                id: 2,
                name: 'Global Ventures',
                industry: 'Finance',
                size: 'Large',
                revenue: '5B-10B',
                website: 'https://globalventures.com',
                description: 'International venture capital firm with focus on emerging markets.',
                contacts: [2],
                deals: [3],
                totalValue: 8000000,
                status: 'active',
                tags: ['finance', 'vc', 'global']
            },
            {
                id: 3,
                name: 'Gaming Brands LLC',
                industry: 'Media',
                size: 'Medium',
                revenue: '100M-500M',
                website: 'https://gamingbrands.com',
                description: 'Specialized marketing agency for gaming and esports brands.',
                contacts: [3],
                deals: [4],
                totalValue: 1500000,
                status: 'active',
                tags: ['media', 'marketing', 'gaming']
            }
        ];

        companyData.forEach(company => {
            this.companies.set(company.id, company);
        });
    }

    initializeDeals() {
        const dealData = [
            {
                id: 1,
                name: 'Series A Investment Round',
                company: 'TechCorp Industries',
                contact: 1,
                value: 2500000,
                stage: 'negotiation',
                probability: 75,
                expectedClose: new Date(Date.now() + 2592000000),
                description: 'Series A investment for expansion into new gaming markets.',
                activities: [1, 2, 3],
                tags: ['investment', 'series-a', 'high-value']
            },
            {
                id: 2,
                name: 'Strategic Partnership',
                company: 'TechCorp Industries',
                contact: 1,
                value: 2500000,
                stage: 'proposal',
                probability: 60,
                expectedClose: new Date(Date.now() + 5184000000),
                description: 'Strategic technology partnership for content delivery.',
                activities: [4, 5],
                tags: ['partnership', 'technology', 'strategic']
            },
            {
                id: 3,
                name: 'Global Expansion Fund',
                company: 'Global Ventures',
                contact: 2,
                value: 5000000,
                stage: 'qualification',
                probability: 45,
                expectedClose: new Date(Date.now() + 7776000000),
                description: 'Funding for international market expansion and team development.',
                activities: [6, 7],
                tags: ['investment', 'expansion', 'global']
            },
            {
                id: 4,
                name: 'Sponsorship Agreement',
                company: 'Gaming Brands LLC',
                contact: 3,
                value: 750000,
                stage: 'prospecting',
                probability: 30,
                expectedClose: new Date(Date.now() + 10368000000),
                description: 'Annual sponsorship for team branding and content integration.',
                activities: [8],
                tags: ['sponsorship', 'branding', 'annual']
            }
        ];

        dealData.forEach(deal => {
            this.deals.set(deal.id, deal);
        });
    }

    initializeActivities() {
        const activityData = [
            {
                id: 1,
                type: 'call',
                title: 'Initial Investment Discussion',
                contact: 1,
                company: 'TechCorp Industries',
                date: new Date(Date.now() - 86400000),
                duration: 45,
                notes: 'Discussed investment opportunities and growth potential. Very positive response.',
                outcome: 'positive',
                followUp: new Date(Date.now() + 604800000)
            },
            {
                id: 2,
                type: 'email',
                title: 'Investment Proposal Sent',
                contact: 1,
                company: 'TechCorp Industries',
                date: new Date(Date.now() - 172800000),
                notes: 'Sent detailed investment proposal and financial projections.',
                outcome: 'pending',
                followUp: new Date(Date.now() + 259200000)
            },
            {
                id: 3,
                type: 'meeting',
                title: 'Due Diligence Meeting',
                contact: 1,
                company: 'TechCorp Industries',
                date: new Date(Date.now() - 259200000),
                duration: 120,
                notes: 'Comprehensive due diligence review. Team presentation and facility tour.',
                outcome: 'positive',
                followUp: new Date(Date.now() + 864000000)
            },
            {
                id: 4,
                type: 'call',
                title: 'Partnership Exploration',
                contact: 1,
                company: 'TechCorp Industries',
                date: new Date(Date.now() - 345600000),
                duration: 30,
                notes: 'Explored technology partnership opportunities beyond investment.',
                outcome: 'positive',
                followUp: new Date(Date.now() + 172800000)
            },
            {
                id: 5,
                type: 'email',
                title: 'Partnership Proposal',
                contact: 1,
                company: 'TechCorp Industries',
                date: new Date(Date.now() - 432000000),
                notes: 'Sent partnership proposal outlining mutual benefits.',
                outcome: 'pending',
                followUp: new Date(Date.now() + 604800000)
            }
        ];

        activityData.forEach(activity => {
            this.activities.set(activity.id, activity);
        });
    }

    initializeTags() {
        const tagData = [
            { id: 1, name: 'high-value', color: '#a855f7', count: 8 },
            { id: 2, name: 'tech', color: '#3b82f6', count: 12 },
            { id: 3, name: 'investment', color: '#10b981', count: 15 },
            { id: 4, name: 'sponsor', color: '#f59e0b', count: 6 },
            { id: 5, name: 'partner', color: '#ef4444', count: 9 },
            { id: 6, name: 'strategic', color: '#8b5cf6', count: 7 }
        ];

        tagData.forEach(tag => {
            this.tags.set(tag.id, tag);
        });
    }

    renderDashboard() {
        this.updateDashboardMetrics();
        this.renderDashboardCharts();
        this.renderRecentActivities();
        this.renderUpcomingTasks();
    }

    updateDashboardMetrics() {
        const totalContacts = this.contacts.size;
        const totalCompanies = this.companies.size;
        const activeDeals = Array.from(this.deals.values()).filter(deal => 
            deal.stage !== 'closed-won' && deal.stage !== 'closed-lost'
        ).length;
        const pipelineValue = Array.from(this.deals.values()).reduce((sum, deal) => 
            sum + (deal.value * deal.probability / 100), 0
        );

        this.animateValue('totalContacts', 0, totalContacts, 1000);
        this.animateValue('totalCompanies', 0, totalCompanies, 1000);
        this.animateValue('activeDeals', 0, activeDeals, 1000);
        this.animateValue('pipelineValue', 0, pipelineValue, 1000, true);
    }

    animateValue(elementId, start, end, duration, isCurrency = false) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            
            if (isCurrency) {
                element.textContent = '$' + Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    renderDashboardCharts() {
        this.renderPipelineChart();
        this.renderRevenueChart();
    }

    renderPipelineChart() {
        const canvas = document.getElementById('pipelineChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];
        const stageData = stages.map(stage => {
            return Array.from(this.deals.values()).filter(deal => 
                deal.stage.toLowerCase().replace(' ', '-') === stage.toLowerCase().replace(' ', '-')
            ).length;
        });
        
        this.drawBarChart(ctx, stages, stageData, '#a855f7');
    }

    renderRevenueChart() {
        const canvas = document.getElementById('revenueChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenueData = months.map(() => Math.floor(Math.random() * 1000000 + 500000));
        
        this.drawLineChart(ctx, months, revenueData, '#10b981');
    }

    drawBarChart(ctx, labels, data, color) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        const barWidth = width / (labels.length * 2);
        const maxValue = Math.max(...data);
        const scale = (height - 40) / maxValue;
        
        data.forEach((value, index) => {
            const x = (index * 2 + 0.5) * barWidth;
            const barHeight = value * scale;
            const y = height - barHeight - 20;
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x + barWidth / 2, height - 5);
            ctx.fillText('$' + (value / 1000000).toFixed(1) + 'M', x + barWidth / 2, y - 5);
        });
    }

    drawLineChart(ctx, labels, data, color) {
        const canvas = ctx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        const maxValue = Math.max(...data);
        const scale = (height - 40) / maxValue;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value * scale) - 20;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value * scale) - 20;
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(labels[index], x, height - 5);
        });
    }

    renderRecentActivities() {
        const container = document.getElementById('recentActivities');
        if (!container) return;
        
        const activities = Array.from(this.activities.values())
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);
        
        const activityHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-details">
                        <span class="activity-contact">${this.getContactName(activity.contact)}</span>
                        <span class="activity-company">${this.getCompanyName(activity.company)}</span>
                    </div>
                    <div class="activity-time">${this.formatDate(activity.date)}</div>
                </div>
                <div class="activity-outcome ${activity.outcome}">
                    <i class="fas fa-${activity.outcome === 'positive' ? 'check' : 'clock'}"></i>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = activityHTML;
    }

    renderUpcomingTasks() {
        const container = document.getElementById('upcomingTasks');
        if (!container) return;
        
        const tasks = [
            { title: 'Follow up with TechCorp', dueDate: new Date(Date.now() + 864000000), priority: 'high' },
            { title: 'Send proposal to Global Ventures', dueDate: new Date(Date.now() + 1728000000), priority: 'medium' },
            { title: 'Schedule meeting with Gaming Brands', dueDate: new Date(Date.now() + 2592000000), priority: 'low' },
            { title: 'Review due diligence documents', dueDate: new Date(Date.now() + 3456000000), priority: 'high' },
            { title: 'Prepare quarterly report', dueDate: new Date(Date.now() + 4320000000), priority: 'medium' }
        ];
        
        const taskHTML = tasks.map(task => `
            <div class="task-item ${task.priority}">
                <div class="task-checkbox">
                    <input type="checkbox" id="task-${task.title.replace(/\s+/g, '-')}">
                    <label for="task-${task.title.replace(/\s+/g, '-')}"></label>
                </div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-due">Due: ${this.formatDate(task.dueDate)}</div>
                </div>
                <div class="task-priority ${task.priority}">
                    <i class="fas fa-flag"></i>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = taskHTML;
    }

    renderContacts() {
        const container = document.getElementById('contactsGrid');
        if (!container) return;
        
        const filter = document.getElementById('contactFilter')?.value || 'all';
        const sort = document.getElementById('contactSort')?.value || 'name';
        
        let contacts = Array.from(this.contacts.values());
        
        // Apply filter
        if (filter !== 'all') {
            contacts = contacts.filter(contact => contact.type === filter);
        }
        
        // Apply sort
        contacts.sort((a, b) => {
            switch(sort) {
                case 'name':
                    return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
                case 'company':
                    return a.company.localeCompare(b.company);
                case 'value':
                    return b.value - a.value;
                case 'date':
                    return b.lastContact - a.lastContact;
                default:
                    return 0;
            }
        });
        
        const contactHTML = contacts.map(contact => `
            <div class="contact-card" data-contact-id="${contact.id}">
                <div class="contact-header">
                    <img src="${contact.avatar}" alt="${contact.firstName} ${contact.lastName}" class="contact-avatar">
                    <div class="contact-info">
                        <h4 class="contact-name">${contact.firstName} ${contact.lastName}</h4>
                        <div class="contact-position">${contact.position}</div>
                        <div class="contact-company">${contact.company}</div>
                    </div>
                    <div class="contact-status ${contact.status}">
                        <i class="fas fa-circle"></i>
                    </div>
                </div>
                
                <div class="contact-details">
                    <div class="contact-detail">
                        <i class="fas fa-envelope"></i>
                        <span>${contact.email}</span>
                    </div>
                    <div class="contact-detail">
                        <i class="fas fa-phone"></i>
                        <span>${contact.phone}</span>
                    </div>
                </div>
                
                <div class="contact-tags">
                    ${contact.tags.map(tagId => {
                        const tag = this.tags.get(tagId);
                        return tag ? `<span class="tag" style="background-color: ${tag.color}">${tag.name}</span>` : '';
                    }).join('')}
                </div>
                
                <div class="contact-stats">
                    <div class="stat-item">
                        <span class="stat-label">Deal Value</span>
                        <span class="stat-value">$${(contact.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Last Contact</span>
                        <span class="stat-value">${this.formatDate(contact.lastContact)}</span>
                    </div>
                </div>
                
                <div class="contact-actions">
                    <button class="action-btn" data-action="view">View</button>
                    <button class="action-btn" data-action="edit">Edit</button>
                    <button class="action-btn" data-action="call">Call</button>
                    <button class="action-btn" data-action="email">Email</button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = contactHTML;
    }

    renderCompanies() {
        const container = document.getElementById('companiesGrid');
        if (!container) return;
        
        const filter = document.getElementById('companyFilter')?.value || 'all';
        
        let companies = Array.from(this.companies.values());
        
        if (filter !== 'all') {
            companies = companies.filter(company => company.industry.toLowerCase() === filter);
        }
        
        const companyHTML = companies.map(company => `
            <div class="company-card" data-company-id="${company.id}">
                <div class="company-header">
                    <div class="company-logo">
                        <img src="https://picsum.photos/seed/${company.name}/80/80.jpg" alt="${company.name}">
                    </div>
                    <div class="company-info">
                        <h4 class="company-name">${company.name}</h4>
                        <div class="company-industry">${company.industry}</div>
                        <div class="company-size">${company.size} • ${company.revenue}</div>
                    </div>
                    <div class="company-status ${company.status}">
                        <i class="fas fa-circle"></i>
                    </div>
                </div>
                
                <div class="company-description">
                    <p>${company.description}</p>
                </div>
                
                <div class="company-stats">
                    <div class="stat-item">
                        <span class="stat-label">Contacts</span>
                        <span class="stat-value">${company.contacts.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Active Deals</span>
                        <span class="stat-value">${company.deals.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Total Value</span>
                        <span class="stat-value">$${(company.totalValue / 1000000).toFixed(1)}M</span>
                    </div>
                </div>
                
                <div class="company-tags">
                    ${company.tags.map(tagId => {
                        const tag = this.tags.get(tagId);
                        return tag ? `<span class="tag" style="background-color: ${tag.color}">${tag.name}</span>` : '';
                    }).join('')}
                </div>
                
                <div class="company-actions">
                    <button class="action-btn" data-action="view">View</button>
                    <button class="action-btn" data-action="edit">Edit</button>
                    <button class="action-btn" data-action="website">Website</button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = companyHTML;
    }

    renderDeals() {
        const container = document.getElementById('dealsPipeline');
        if (!container) return;
        
        const filter = document.getElementById('dealFilter')?.value || 'all';
        
        let deals = Array.from(this.deals.values());
        
        if (filter !== 'all') {
            deals = deals.filter(deal => deal.stage === filter);
        }
        
        const stages = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
        
        const pipelineHTML = stages.map(stage => {
            const stageDeals = deals.filter(deal => deal.stage === stage);
            
            return `
                <div class="deal-stage ${stage}">
                    <div class="stage-header">
                        <h4>${stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}</h4>
                        <div class="stage-count">${stageDeals.length}</div>
                    </div>
                    <div class="stage-deals">
                        ${stageDeals.map(deal => `
                            <div class="deal-card" data-deal-id="${deal.id}">
                                <div class="deal-header">
                                    <h5 class="deal-name">${deal.name}</h5>
                                    <div class="deal-value">$${(deal.value / 1000000).toFixed(1)}M</div>
                                </div>
                                <div class="deal-company">${this.getCompanyName(deal.company)}</div>
                                <div class="deal-contact">${this.getContactName(deal.contact)}</div>
                                <div class="deal-probability">
                                    <div class="probability-bar">
                                        <div class="probability-fill" style="width: ${deal.probability}%"></div>
                                    </div>
                                    <span class="probability-text">${deal.probability}%</span>
                                </div>
                                <div class="deal-close-date">
                                    <i class="fas fa-calendar"></i>
                                    ${this.formatDate(deal.expectedClose)}
                                </div>
                                <div class="deal-actions">
                                    <button class="action-btn" data-action="view">View</button>
                                    <button class="action-btn" data-action="edit">Edit</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = pipelineHTML;
    }

    renderActivities() {
        const container = document.getElementById('activitiesTimeline');
        if (!container) return;
        
        const filter = document.getElementById('activityFilter')?.value || 'all';
        
        let activities = Array.from(this.activities.values())
            .sort((a, b) => b.date - a.date);
        
        if (filter !== 'all') {
            activities = activities.filter(activity => activity.type === filter);
        }
        
        const activityHTML = activities.map(activity => `
            <div class="activity-timeline-item">
                <div class="timeline-marker ${activity.type}">
                    <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="timeline-content">
                    <div class="activity-header">
                        <h4 class="activity-title">${activity.title}</h4>
                        <div class="activity-date">${this.formatDate(activity.date)}</div>
                    </div>
                    <div class="activity-details">
                        <div class="activity-contact">
                            <i class="fas fa-user"></i>
                            ${this.getContactName(activity.contact)}
                        </div>
                        <div class="activity-company">
                            <i class="fas fa-building"></i>
                            ${this.getCompanyName(activity.company)}
                        </div>
                        ${activity.duration ? `
                            <div class="activity-duration">
                                <i class="fas fa-clock"></i>
                                ${activity.duration} minutes
                            </div>
                        ` : ''}
                    </div>
                    <div class="activity-notes">${activity.notes}</div>
                    <div class="activity-outcome ${activity.outcome}">
                        <i class="fas fa-${activity.outcome === 'positive' ? 'check-circle' : 'clock'}"></i>
                        ${activity.outcome === 'positive' ? 'Positive' : 'Pending'}
                    </div>
                    ${activity.followUp ? `
                        <div class="activity-followup">
                            <i class="fas fa-calendar-plus"></i>
                            Follow up: ${this.formatDate(activity.followUp)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
        
        container.innerHTML = activityHTML;
    }

    renderAnalytics() {
        this.renderContactGrowthChart();
        this.renderConversionChart();
        this.renderRevenueSourceChart();
        this.renderActivityChart();
    }

    renderContactGrowthChart() {
        const canvas = document.getElementById('contactGrowthChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const contactData = months.map((_, index) => 
            Math.floor(Math.random() * 10 + 5 + index * 2)
        );
        
        this.drawLineChart(ctx, months, contactData, '#a855f7');
    }

    renderConversionChart() {
        const canvas = document.getElementById('conversionChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed'];
        const conversionData = [100, 75, 45, 25, 15];
        
        this.drawBarChart(ctx, stages, conversionData, '#10b981');
    }

    renderRevenueSourceChart() {
        const canvas = document.getElementById('revenueSourceChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const sources = ['Investors', 'Sponsors', 'Partners', 'Other'];
        const revenueData = [45, 30, 20, 5];
        
        // Simple pie chart
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const radius = Math.min(canvasWidth, canvasHeight) / 3;
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        let currentAngle = 0;
        const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b'];
        
        revenueData.forEach((value, index) => {
            const sliceAngle = (value / 100) * 2 * Math.PI;
            
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            // Draw label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(`${sources[index]}: ${value}%`, labelX, labelY);
            
            currentAngle += sliceAngle;
        });
    }

    renderActivityChart() {
        const canvas = document.getElementById('activityChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const activityTypes = ['Calls', 'Emails', 'Meetings', 'Tasks'];
        const activityData = activityTypes.map(() => Math.floor(Math.random() * 50 + 10));
        
        this.drawBarChart(ctx, activityTypes, activityData, '#f59e0b');
    }

    // Helper methods
    getActivityIcon(type) {
        const icons = {
            'call': 'phone',
            'email': 'envelope',
            'meeting': 'users',
            'task': 'check-square'
        };
        return icons[type] || 'circle';
    }

    getContactName(contactId) {
        const contact = this.contacts.get(contactId);
        return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown';
    }

    getCompanyName(companyId) {
        const company = this.companies.get(companyId);
        return company ? company.name : 'Unknown';
    }

    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / 86400000);
        
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });

        // Search
        document.getElementById('crmSearch')?.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.applySearch();
        });

        // Contact filters
        document.getElementById('contactFilter')?.addEventListener('change', () => {
            this.renderContacts();
        });

        document.getElementById('contactSort')?.addEventListener('change', () => {
            this.renderContacts();
        });

        // Company filter
        document.getElementById('companyFilter')?.addEventListener('change', () => {
            this.renderCompanies();
        });

        // Deal filter
        document.getElementById('dealFilter')?.addEventListener('change', () => {
            this.renderDeals();
        });

        // Activity filter
        document.getElementById('activityFilter')?.addEventListener('change', () => {
            this.renderActivities();
        });

        // Analytics period
        document.getElementById('analyticsPeriod')?.addEventListener('change', () => {
            this.renderAnalytics();
        });

        // Action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn')) {
                const action = e.target.dataset.action;
                this.handleAction(action, e.target);
            }
        });

        // Control buttons
        document.getElementById('addContact')?.addEventListener('click', () => {
            this.showAddContactModal();
        });

        document.getElementById('addDeal')?.addEventListener('click', () => {
            this.showAddDealModal();
        });

        document.getElementById('exportData')?.addEventListener('click', () => {
            this.exportCRMData();
        });

        document.getElementById('logActivity')?.addEventListener('click', () => {
            this.showLogActivityModal();
        });

        document.getElementById('runPrediction')?.addEventListener('click', () => {
            this.runAIPrediction();
        });
    }

    switchView(view) {
        // Hide all views
        document.querySelectorAll('.crm-view').forEach(v => {
            v.classList.remove('active');
        });

        // Show selected view
        document.getElementById(`${view}View`)?.classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`)?.classList.add('active');

        this.currentView = view;
    }

    applySearch() {
        if (!this.searchTerm) {
            this.renderCurrentView();
            return;
        }

        // Apply search to current view
        switch(this.currentView) {
            case 'contacts':
                this.searchContacts();
                break;
            case 'companies':
                this.searchCompanies();
                break;
            case 'deals':
                this.searchDeals();
                break;
            case 'activities':
                this.searchActivities();
                break;
        }
    }

    searchContacts() {
        const contacts = Array.from(this.contacts.values()).filter(contact => 
            `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.company}`.toLowerCase().includes(this.searchTerm)
        );
        
        // Re-render with filtered results
        const container = document.getElementById('contactsGrid');
        if (container) {
            // Implementation would go here
        }
    }

    searchCompanies() {
        const companies = Array.from(this.companies.values()).filter(company => 
            `${company.name} ${company.industry} ${company.description}`.toLowerCase().includes(this.searchTerm)
        );
        
        // Re-render with filtered results
        const container = document.getElementById('companiesGrid');
        if (container) {
            // Implementation would go here
        }
    }

    searchDeals() {
        const deals = Array.from(this.deals.values()).filter(deal => 
            `${deal.name} ${deal.description}`.toLowerCase().includes(this.searchTerm)
        );
        
        // Re-render with filtered results
        const container = document.getElementById('dealsPipeline');
        if (container) {
            // Implementation would go here
        }
    }

    searchActivities() {
        const activities = Array.from(this.activities.values()).filter(activity => 
            `${activity.title} ${activity.notes}`.toLowerCase().includes(this.searchTerm)
        );
        
        // Re-render with filtered results
        const container = document.getElementById('activitiesTimeline');
        if (container) {
            // Implementation would go here
        }
    }

    handleAction(action, button) {
        const card = button.closest('.contact-card, .company-card, .deal-card');
        const id = card?.dataset.contactId || card?.dataset.companyId || card?.dataset.dealId;
        
        switch(action) {
            case 'view':
                this.viewDetails(id, button);
                break;
            case 'edit':
                this.editItem(id, button);
                break;
            case 'call':
                this.initiateCall(id, button);
                break;
            case 'email':
                this.composeEmail(id, button);
                break;
            case 'website':
                this.openWebsite(id, button);
                break;
        }
    }

    viewDetails(id, button) {
        // Implementation for viewing detailed information
        console.log('View details for:', id);
    }

    editItem(id, button) {
        // Implementation for editing items
        console.log('Edit item:', id);
    }

    initiateCall(id, button) {
        const contact = this.contacts.get(parseInt(id));
        if (contact) {
            window.open(`tel:${contact.phone}`);
        }
    }

    composeEmail(id, button) {
        const contact = this.contacts.get(parseInt(id));
        if (contact) {
            window.open(`mailto:${contact.email}`);
        }
    }

    openWebsite(id, button) {
        const company = this.companies.get(parseInt(id));
        if (company) {
            window.open(company.website, '_blank');
        }
    }

    showAddContactModal() {
        // Implementation for add contact modal
        console.log('Show add contact modal');
    }

    showAddDealModal() {
        // Implementation for add deal modal
        console.log('Show add deal modal');
    }

    showLogActivityModal() {
        // Implementation for log activity modal
        console.log('Show log activity modal');
    }

    exportCRMData() {
        const data = {
            timestamp: new Date().toISOString(),
            contacts: Array.from(this.contacts.values()),
            companies: Array.from(this.companies.values()),
            deals: Array.from(this.deals.values()),
            activities: Array.from(this.activities.values()),
            tags: Array.from(this.tags.values())
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `void-esports-crm-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('CRM data exported successfully', 'success');
    }

    runAIPrediction() {
        // Implementation for AI predictions
        console.log('Run AI prediction');
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

    startRealTimeUpdates() {
        setInterval(() => {
            this.updateDashboardMetrics();
            this.renderRecentActivities();
        }, 30000); // Update every 30 seconds
    }

    renderCurrentView() {
        switch(this.currentView) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'contacts':
                this.renderContacts();
                break;
            case 'companies':
                this.renderCompanies();
                break;
            case 'deals':
                this.renderDeals();
                break;
            case 'activities':
                this.renderActivities();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
        }
    }

    destroy() {
        // Clean up any resources
    }
}

// Initialize CRM when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const crmContainers = document.querySelectorAll('.contact-crm');
    crmContainers.forEach(container => {
        new ContactCRMSystem(container.id);
    });
});

// Export for global access
window.ContactCRMSystem = ContactCRMSystem;
