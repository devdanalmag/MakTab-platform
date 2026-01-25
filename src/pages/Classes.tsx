import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Video, MoreVertical } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import BottomNavbar from '../components/common/BottomNavbar';
import './Classes.css';

interface Subject {
    id: string;
    name: string;
    details: string;
    schedule: string;
    time: string;
    status: 'on-track' | 'new-assignment' | 'none';
    icon: string;
    color: string;
}

const Classes: React.FC = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(23);

    const currentTerm = {
        name: '2nd Term 1446',
        activeClasses: 5,
    };

    const liveClass = {
        title: 'Tahfeez Halqa',
        teacher: 'Sheikh Abdullah',
        time: '10:00 - 11:30AM',
        participants: 12,
    };

    const weekDays = [
        { day: 'Mon', date: 22 },
        { day: 'Tue', date: 23, hasEvent: true },
        { day: 'Wed', date: 24 },
        { day: 'Thu', date: 25 },
        { day: 'Fri', date: 26 },
    ];

    const subjects: Subject[] = [
        {
            id: '1',
            name: 'Tahfeez',
            details: 'Surah Al-Baqarah • Juz 3',
            schedule: 'Mon, Wed, Fri',
            time: '10:00 AM',
            status: 'on-track',
            icon: '📖',
            color: '#3B82F6',
        },
        {
            id: '2',
            name: 'Fiqhu (Jurisprudence)',
            details: 'Kitab Al-Taharah',
            schedule: 'Tue, Thu',
            time: '4:00 PM',
            status: 'new-assignment',
            icon: '🌙',
            color: '#10B981',
        },
        {
            id: '3',
            name: 'Hadith Studies',
            details: '40 Hadith An-Nawawi',
            schedule: 'Wed',
            time: '8:00 PM',
            status: 'none',
            icon: '💬',
            color: '#A855F7',
        },
    ];

    return (
        <div className="classes-page">
            {/* Gradient Header */}
            <header className="classes-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={22} />
                    </button>
                    <h1 className="header-title">My Classes</h1>
                    <div className="header-actions">
                        <button className="header-btn">
                            <Calendar size={20} />
                        </button>
                        <button className="header-btn avatar-btn">
                            <User size={18} />
                            <span className="online-dot" />
                        </button>
                    </div>
                </div>

                <div className="term-info">
                    <p className="term-label">Current Term</p>
                    <div className="term-row">
                        <h2 className="term-name">{currentTerm.name}</h2>
                        <span className="active-classes">{currentTerm.activeClasses} Active Classes</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="classes-content">
                {/* Live Class Card */}
                <Card className="live-card">
                    <div className="live-header">
                        <span className="live-badge">
                            <span className="live-dot" />
                            LIVE NOW
                        </span>
                        <span className="live-time">{liveClass.time}</span>
                    </div>
                    <h3 className="live-title">{liveClass.title}</h3>
                    <div className="live-teacher">
                        <User size={16} />
                        <span>{liveClass.teacher}</span>
                    </div>
                    <div className="live-footer">
                        <div className="participants">
                            <div className="participant-avatars">
                                <span className="avatar" style={{ backgroundColor: '#374151' }} />
                                <span className="avatar" style={{ backgroundColor: '#4B5563' }} />
                                <span className="avatar" style={{ backgroundColor: '#6B7280' }} />
                            </div>
                            <span className="participant-count">+{liveClass.participants}</span>
                        </div>
                        <Button variant="primary" size="sm">
                            <Video size={16} />
                            Join Class
                        </Button>
                    </div>
                </Card>

                {/* Schedule Section */}
                <section className="section">
                    <div className="section-header">
                        <h3 className="section-title">Schedule</h3>
                        <span className="section-date">January 2025</span>
                    </div>
                    <div className="week-calendar">
                        {weekDays.map((day) => (
                            <button
                                key={day.date}
                                className={`day-btn ${selectedDay === day.date ? 'selected' : ''}`}
                                onClick={() => setSelectedDay(day.date)}
                            >
                                <span className="day-name">{day.day}</span>
                                <span className="day-date">{day.date}</span>
                                {day.hasEvent && <span className="day-dot" />}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Enrolled Subjects */}
                <section className="section">
                    <h3 className="section-title">Enrolled Subjects</h3>
                    <div className="subjects-list">
                        {subjects.map((subject) => (
                            <Card key={subject.id} className="subject-card" padding="md">
                                <div
                                    className="subject-icon"
                                    style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
                                >
                                    <span>{subject.icon}</span>
                                </div>
                                <div className="subject-info">
                                    <h4 className="subject-name">{subject.name}</h4>
                                    <p className="subject-details">{subject.details}</p>
                                    <div className="subject-schedule">
                                        <Clock size={14} />
                                        <span>{subject.schedule} • {subject.time}</span>
                                    </div>
                                </div>
                                <div className="subject-right">
                                    <button className="more-btn">
                                        <MoreVertical size={18} />
                                    </button>
                                    {subject.status === 'on-track' && (
                                        <span className="status-badge on-track">On Track</span>
                                    )}
                                    {subject.status === 'new-assignment' && (
                                        <span className="status-badge new-assignment">New Assignment</span>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            <BottomNavbar />
        </div>
    );
};

export default Classes;
