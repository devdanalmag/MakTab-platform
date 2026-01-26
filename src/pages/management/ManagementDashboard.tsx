import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Settings,
    Bell,
    User,
    Users,
    GraduationCap,
    Calendar,
    FileText,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
} from 'lucide-react';
import Card from '../../components/common/Card';
import ManagementBottomNavbar from '../../components/common/ManagementBottomNavbar';
import './ManagementDashboard.css';

const ManagementDashboard: React.FC = () => {
    const navigate = useNavigate();

    const admin = {
        role: 'Administrator',
        name: 'Adamu Bala',
    };

    const stats = {
        totalStudents: 1240,
        studentGrowth: '+12%',
        attendance: 94,
        attendanceStatus: 'High',
    };

    const quickActions = [
        { id: 'students', icon: GraduationCap, label: 'Students', color: '#3B82F6', route: '/management/students' },
        { id: 'teachers', icon: Users, label: 'Teachers', color: '#10B981', route: '/management/teachers' },
        { id: 'schedule', icon: Calendar, label: 'Schedule', color: '#F59E0B', route: '/management/classes' },
        { id: 'reports', icon: FileText, label: 'Reports', color: '#EF4444', route: '/management/reports' },
    ];

    const recentAlerts = [
        {
            id: '1',
            type: 'warning',
            title: '3 Teachers Absent',
            description: 'Ustaz Abubakar, Ustaz Yusuf, and 1 other mark...',
            time: '10m ago',
        },
        {
            id: '2',
            type: 'success',
            title: 'Exams Results Submitted',
            description: 'Grade 4 Islamiyyah Results have been updated...',
            time: '2h ago',
        },
    ];

    const weekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed'];

    return (
        <div className="management-dashboard-page">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-top">
                    <button className="admin-info" onClick={() => navigate('/management/profile')}>
                        <div className="admin-avatar">
                            <User size={24} />
                        </div>
                        <div className="admin-text">
                            <span className="admin-role">{admin.role}</span>
                            <span className="admin-name">{admin.name}</span>
                        </div>
                    </button>
                    <div className="header-actions">
                        <button className="header-btn">
                            <Settings size={20} />
                        </button>
                        <button className="header-btn primary">
                            <Bell size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Greeting */}
                <div className="greeting-section">
                    <h1 className="greeting-title">Assalamu Alaikum,</h1>
                    <p className="greeting-subtitle">Here's what's happening at your Madarasah today.</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-row">
                    <Card className="stat-card primary">
                        <div className="stat-icon-row">
                            <div className="stat-icon">
                                <Users size={20} />
                            </div>
                            <span className="stat-growth">{stats.studentGrowth}</span>
                        </div>
                        <p className="stat-label">Total Students</p>
                        <p className="stat-value">{stats.totalStudents.toLocaleString()}</p>
                    </Card>
                    <Card className="stat-card">
                        <div className="stat-icon-row">
                            <div className="stat-icon secondary">
                                <TrendingUp size={20} />
                            </div>
                            <span className="stat-badge high">{stats.attendanceStatus}</span>
                        </div>
                        <p className="stat-label">Attendance</p>
                        <p className="stat-value">{stats.attendance}% <span className="stat-suffix">Today</span></p>
                    </Card>
                </div>

                {/* Quick Actions */}
                <section className="section">
                    <h3 className="section-title">Quick Actions</h3>
                    <div className="quick-actions-grid">
                        {quickActions.map((action) => (
                            <Card
                                key={action.id}
                                className="quick-action-card"
                                padding="md"
                                onClick={() => navigate(action.route)}
                            >
                                <div
                                    className="action-icon"
                                    style={{ backgroundColor: `${action.color}15`, color: action.color }}
                                >
                                    <action.icon size={24} />
                                </div>
                                <span className="action-label">{action.label}</span>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Attendance Trends */}
                <section className="section">
                    <div className="section-header">
                        <h3 className="section-title">Attendance Trends</h3>
                        <button className="view-details-btn">View Details</button>
                    </div>
                    <Card className="chart-card" padding="md">
                        <div className="chart-placeholder">
                            <div className="chart-y-axis">
                                <span>100%</span>
                                <span>75%</span>
                                <span>50%</span>
                                <span>25%</span>
                                <span>0%</span>
                            </div>
                            <div className="chart-area">
                                <div className="chart-grid" />
                            </div>
                        </div>
                        <div className="chart-x-axis">
                            {weekDays.map((day) => (
                                <span key={day}>{day}</span>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Recent Alerts */}
                <section className="section">
                    <h3 className="section-title">Recent Alerts</h3>
                    <div className="alerts-list">
                        {recentAlerts.map((alert) => (
                            <Card key={alert.id} className="alert-card" padding="md">
                                <div className={`alert-icon ${alert.type}`}>
                                    {alert.type === 'warning' ? (
                                        <AlertTriangle size={18} />
                                    ) : (
                                        <CheckCircle size={18} />
                                    )}
                                </div>
                                <div className="alert-content">
                                    <h4 className="alert-title">{alert.title}</h4>
                                    <p className="alert-description">{alert.description}</p>
                                </div>
                                <span className="alert-time">{alert.time}</span>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            <ManagementBottomNavbar />
        </div>
    );
};

export default ManagementDashboard;
