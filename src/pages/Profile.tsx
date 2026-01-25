import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft,
    Edit2,
    User,
    Calendar,
    Phone,
    FileText,
    Clock,
    Languages,
    Bell,
    Moon,
    LogOut,
    ChevronRight,
} from 'lucide-react';
import Card from '../components/common/Card';
import BottomNavbar from '../components/common/BottomNavbar';
import './Profile.css';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const user = {
        name: 'Ibrahim Yusuf',
        fullName: 'Ibrahim Musa Yusuf',
        id: 'MTB-2024-089',
        class: 'Tahfeez Class 23',
        dateOfBirth: '12th Ramadan 1432 AH',
        guardian: '+234 987 654 3210',
        attendance: '96%',
        juz: '3 / 30',
        grade: 'A-',
    };

    const personalInfo = [
        { id: 'name', icon: User, label: 'Full Name', value: user.fullName },
        { id: 'dob', icon: Calendar, label: 'Date of Birth', value: user.dateOfBirth },
        { id: 'guardian', icon: Phone, label: 'Guardian Contact', value: user.guardian, action: 'Update' },
    ];

    const academics = [
        { id: 'reports', icon: FileText, label: 'Academic Reports', hasArrow: true },
        { id: 'history', icon: Clock, label: 'Attendance History', hasArrow: true },
    ];

    return (
        <div className="profile-page">
            {/* Gradient Header */}
            <header className="profile-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={22} />
                    </button>
                    <h1 className="header-title">My Profile</h1>
                    <button className="edit-btn">
                        <Edit2 size={18} />
                    </button>
                </div>

                <div className="profile-info">
                    <div className="profile-avatar">
                        <User size={40} />
                    </div>
                    <h2 className="profile-name">{user.name}</h2>
                    <p className="profile-id">ID: {user.id} • {user.class}</p>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-label">ATTENDANCE</span>
                    <span className="stat-value primary">{user.attendance}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-label">JUZ</span>
                    <span className="stat-value">{user.juz}</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-label">GRADE</span>
                    <span className="stat-value">{user.grade}</span>
                </div>
            </div>

            {/* Main Content */}
            <main className="profile-content">
                {/* Personal Information */}
                <section className="section">
                    <h3 className="section-title">PERSONAL INFORMATION</h3>
                    <Card className="info-card" padding="none">
                        {personalInfo.map((item, index) => (
                            <div key={item.id} className={`info-item ${index < personalInfo.length - 1 ? 'with-border' : ''}`}>
                                <div className="info-icon">
                                    <item.icon size={18} />
                                </div>
                                <div className="info-content">
                                    <span className="info-label">{item.label}</span>
                                    <span className="info-value">{item.value}</span>
                                </div>
                                {item.action && (
                                    <button className="info-action">{item.action}</button>
                                )}
                            </div>
                        ))}
                    </Card>
                </section>

                {/* Academics */}
                <section className="section">
                    <h3 className="section-title">ACADEMICS</h3>
                    <Card className="info-card" padding="none">
                        {academics.map((item, index) => (
                            <button key={item.id} className={`info-item clickable ${index < academics.length - 1 ? 'with-border' : ''}`}>
                                <div className="info-icon">
                                    <item.icon size={18} />
                                </div>
                                <span className="info-label single">{item.label}</span>
                                {item.hasArrow && <ChevronRight size={18} className="arrow-icon" />}
                            </button>
                        ))}
                    </Card>
                </section>

                {/* App Settings */}
                <section className="section">
                    <h3 className="section-title">APP SETTINGS</h3>
                    <Card className="info-card" padding="none">
                        <button className="info-item with-border clickable">
                            <div className="info-icon">
                                <Languages size={18} />
                            </div>
                            <span className="info-label single">Language</span>
                            <ChevronRight size={18} className="arrow-icon" />
                        </button>

                        <div className="info-item with-border">
                            <div className="info-icon">
                                <Bell size={18} />
                            </div>
                            <span className="info-label single">Notifications</span>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                />
                                <span className="toggle-slider" />
                            </label>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Moon size={18} />
                            </div>
                            <span className="info-label single">Dark Mode</span>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <span className="toggle-slider" />
                            </label>
                        </div>
                    </Card>
                </section>

                {/* Sign Out Button */}
                <button className="signout-btn">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>

                {/* Version */}
                <p className="version-text">{t('footer.version')}</p>
            </main>

            <BottomNavbar />
        </div>
    );
};

export default Profile;
