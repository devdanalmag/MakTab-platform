import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Edit2,
    User,
    Mail,
    Phone,
    Briefcase,
    Building,
    KeyRound,
    Globe,
    Bell,
    Moon,
    ChevronRight,
    LogOut,
} from 'lucide-react';
import Card from '../../components/common/Card';
import './ManagementProfile.css';

const ManagementProfile: React.FC = () => {
    const navigate = useNavigate();
    const [pushNotifications, setPushNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const admin = {
        name: 'Adamu Bala',
        role: 'School Administrator',
        email: 'adamu.bala@maktab.edu.ng',
        phone: '+234 000 000 0000',
        designation: 'School Head',
        institution: 'MakTab Tahfeez and Islamiyya',
    };

    const institutionalInfo = [
        { id: 'name', icon: User, label: 'Full Name', value: admin.name },
        { id: 'email', icon: Mail, label: 'Email Address', value: admin.email },
        { id: 'phone', icon: Phone, label: 'Phone Number', value: admin.phone },
        { id: 'designation', icon: Briefcase, label: 'Designation', value: admin.designation },
        { id: 'institution', icon: Building, label: 'Institution Name', value: admin.institution },
    ];

    return (
        <div className="management-profile-page">
            {/* Header */}
            <header className="profile-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={22} />
                    </button>
                    <h1 className="header-title">Profile</h1>
                    <button className="edit-btn">
                        <Edit2 size={20} />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-avatar">
                        <User size={40} />
                    </div>
                    <h2 className="profile-name">{admin.name}</h2>
                    <p className="profile-role">{admin.role}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="profile-content">
                {/* Institutional Information */}
                <section className="section">
                    <h3 className="section-title">INSTITUTIONAL INFORMATION</h3>
                    <Card className="info-card" padding="none">
                        {institutionalInfo.map((item, index) => (
                            <div
                                key={item.id}
                                className={`info-item ${index < institutionalInfo.length - 1 ? 'with-border' : ''}`}
                            >
                                <div className="info-icon">
                                    <item.icon size={18} />
                                </div>
                                <div className="info-content">
                                    <span className="info-label">{item.label}</span>
                                    <span className="info-value">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </Card>
                </section>

                {/* Account Security */}
                <section className="section">
                    <h3 className="section-title">ACCOUNT SECURITY</h3>
                    <Card className="settings-card" padding="none">
                        {/* Change Password */}
                        <button className="settings-item with-border">
                            <div className="settings-icon">
                                <KeyRound size={18} />
                            </div>
                            <span className="settings-label">Change Password</span>
                            <ChevronRight size={18} className="arrow-icon" />
                        </button>

                        {/* Language Selection */}
                        <button className="settings-item with-border">
                            <div className="settings-icon">
                                <Globe size={18} />
                            </div>
                            <span className="settings-label">Language Selection</span>
                            <span className="settings-value">English</span>
                            <ChevronRight size={18} className="arrow-icon" />
                        </button>

                        {/* Push Notification */}
                        <div className="settings-item with-border">
                            <div className="settings-icon notifications">
                                <Bell size={18} />
                            </div>
                            <span className="settings-label">Push Notification</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={pushNotifications}
                                    onChange={() => setPushNotifications(!pushNotifications)}
                                />
                                <span className="toggle-slider" />
                            </label>
                        </div>

                        {/* Dark Mode */}
                        <div className="settings-item">
                            <div className="settings-icon dark">
                                <Moon size={18} />
                            </div>
                            <span className="settings-label">Dark Mode</span>
                            <label className="toggle-switch">
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

                {/* Sign Out */}
                <button className="signout-btn" onClick={() => navigate('/')}>
                    <LogOut size={18} />
                    Sign Out
                </button>

                {/* Version */}
                <p className="version-text">MakTab Tahfeez & Islamiyya App v1.0</p>
            </main>
        </div>
    );
};

export default ManagementProfile;
