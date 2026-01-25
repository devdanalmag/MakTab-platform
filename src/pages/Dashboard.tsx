import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    BookOpen,
    Calendar,
    Clock,
    Users,
    Compass,
    ChevronRight,
    ArrowRight,
    Play,
    User,
    Bell,
} from 'lucide-react';
import Card from '../components/common/Card';
import ProgressCircle from '../components/common/ProgressCircle';
import BottomNavbar from '../components/common/BottomNavbar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const { t } = useTranslation();

    // Mock data
    const userData = {
        name: 'Ibrahim Yusuf',
        hijriDate: '12 Rajab 1446 AH',
        gregorianDate: '23 Jan 2025',
    };

    const tahfeezProgress = {
        percentage: 65,
        currentJuz: 3,
        currentSurah: 'Surah Al-Baqarah',
        ayahRange: 'Ayah 250 - 255',
        lastRecited: 'Today, 8:30 AM',
        status: 'on-track' as const,
    };

    const quickActions = [
        { id: 'practice', icon: BookOpen, label: t('dashboard.logPractice'), color: '#3B82F6' },
        { id: 'timetable', icon: Calendar, label: t('dashboard.timetable'), color: '#10B981' },
        { id: 'class', icon: Users, label: t('dashboard.joinClass'), color: '#F59E0B' },
        { id: 'qibla', icon: Compass, label: t('dashboard.qibla'), color: '#EF4444' },
    ];

    const upcomingMuraja = [
        { id: '1', surah: 'Surah An-Nas to Al-Falaq', dueTime: 'Revision due by Magrib today' },
    ];

    const assignments = [
        { id: '1', title: 'Fiqhu: Wudu Procedures', description: 'Submit video demonstration', due: t('dashboard.tomorrow') },
        { id: '2', title: 'Sirah: Early Life of Proph...', description: 'Read Chapter 4 & Quiz', due: t('dashboard.tomorrow') },
    ];

    const recentFeedback = [
        {
            id: '1',
            teacher: 'Ustad Aminu',
            time: '2 hours ago',
            message: '"Good effort today Ibrahim. Please focus more on your Tajweed in verse 253, specifically the Ghunnah."',
            hasAudio: true,
        },
    ];

    return (
        <div className="dashboard-page">
            {/* Gradient Header */}
            <header className="dashboard-header">
                <div className="header-top">
                    <div className="menu-icon">
                        <div className="menu-line" />
                        <div className="menu-line" />
                    </div>
                    <div className="header-actions">
                        <button className="header-btn">
                            <Bell size={22} />
                        </button>
                        <button className="header-btn avatar-btn">
                            <User size={20} />
                        </button>
                    </div>
                </div>

                <div className="greeting-row">
                    <div className="greeting-content">
                        <p className="greeting-label">{t('dashboard.greeting')}</p>
                        <h1 className="user-name">{userData.name}</h1>
                    </div>
                </div>

                <div className="date-row">
                    <div className="date-badge">
                        <Calendar size={14} />
                        <span>{userData.hijriDate}</span>
                    </div>
                    <div className="date-badge">
                        <span>{userData.gregorianDate}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-content">
                {/* Tahfeez Progress Card */}
                <Card className="tahfeez-card">
                    <div className="card-header">
                        <div className="card-title-row">
                            <BookOpen size={20} className="card-icon" />
                            <h2 className="card-title">{t('dashboard.tahfeezProgress')}</h2>
                        </div>
                        <span className="status-badge on-track">{t('dashboard.onTrack')}</span>
                    </div>

                    <div className="tahfeez-content">
                        <ProgressCircle percentage={tahfeezProgress.percentage} size={80} />
                        <div className="tahfeez-info">
                            <p className="goal-label">{t('dashboard.currentGoal')}</p>
                            <p className="goal-title">
                                {t('surah.juz')} {tahfeezProgress.currentJuz} - {tahfeezProgress.currentSurah}
                            </p>
                            <p className="goal-subtitle">{tahfeezProgress.ayahRange}</p>
                        </div>
                    </div>

                    <div className="tahfeez-footer">
                        <p className="last-recited">
                            {t('dashboard.lastRecited')} {tahfeezProgress.lastRecited}
                        </p>
                        <button className="continue-btn">
                            {t('dashboard.continue')}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </Card>

                {/* Quick Actions */}
                <section className="section">
                    <h3 className="section-title">{t('dashboard.quickActions')}</h3>
                    <div className="quick-actions-grid">
                        {quickActions.map((action) => (
                            <button key={action.id} className="quick-action-btn">
                                <div className="action-icon" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                                    <action.icon size={22} />
                                </div>
                                <span className="action-label">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Upcoming Muraja'a */}
                <section className="section">
                    <div className="section-header">
                        <h3 className="section-title">{t('dashboard.upcomingMuraja')}</h3>
                        <button className="view-all-btn">
                            {t('dashboard.viewAll')}
                        </button>
                    </div>
                    <div className="muraja-list">
                        {upcomingMuraja.map((item) => (
                            <Card key={item.id} className="muraja-card" padding="md">
                                <div className="muraja-icon">
                                    <BookOpen size={18} />
                                </div>
                                <div className="muraja-content">
                                    <h4 className="muraja-title">{item.surah}</h4>
                                    <p className="muraja-due">{item.dueTime}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Assignments */}
                <section className="section">
                    <h3 className="section-title">{t('dashboard.assignments')}</h3>
                    <div className="assignments-list">
                        {assignments.map((item) => (
                            <Card key={item.id} className="assignment-card" padding="md">
                                <div className="assignment-icon">
                                    <BookOpen size={18} />
                                </div>
                                <div className="assignment-content">
                                    <h4 className="assignment-title">{item.title}</h4>
                                    <p className="assignment-desc">{item.description}</p>
                                </div>
                                <span className="assignment-due">{item.due}</span>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Recent Feedback */}
                <section className="section">
                    <h3 className="section-title">{t('dashboard.recentFeedback')}</h3>
                    <div className="feedback-list">
                        {recentFeedback.map((item) => (
                            <Card key={item.id} className="feedback-card" padding="md">
                                <div className="feedback-header">
                                    <div className="teacher-avatar">
                                        <User size={20} />
                                    </div>
                                    <div className="teacher-info">
                                        <h4 className="teacher-name">{item.teacher}</h4>
                                        <p className="feedback-time">{item.time}</p>
                                    </div>
                                </div>
                                <p className="feedback-message">{item.message}</p>
                                {item.hasAudio && (
                                    <button className="audio-btn">
                                        <Play size={16} />
                                        <span>{t('dashboard.playAudioNote')}</span>
                                    </button>
                                )}
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            <BottomNavbar />
        </div>
    );
};

export default Dashboard;
