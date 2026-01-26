import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    ClipboardList,
    Megaphone,
    FileText,
    MoreVertical,
} from 'lucide-react';
import Card from '../../components/common/Card';
import TeacherBottomNavbar from '../../components/common/TeacherBottomNavbar';
import './TeacherRecords.css';

type AttendanceFilter = 'all' | 'present' | 'absent' | 'late';

interface Student {
    id: string;
    name: string;
    initials: string;
    juz: number;
    surah: string;
    surahType: string;
    progress: number;
    status: 'present' | 'absent' | 'late';
}

const TeacherRecords: React.FC = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState<AttendanceFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const classInfo = {
        name: 'Halaqah Group A - Juz 5',
        subtitle: 'Halaqa Group A - Juz 5',
        totalStudents: 15,
        absent: 2,
        avgProgress: 'Juz 28',
    };

    const filters: { id: AttendanceFilter; label: string; color?: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'present', label: 'Present', color: '#10B981' },
        { id: 'absent', label: 'Absent', color: '#EF4444' },
        { id: 'late', label: 'Late', color: '#F59E0B' },
    ];

    const quickActions = [
        { id: 'attendance', icon: ClipboardList, label: 'Attendance' },
        { id: 'announce', icon: Megaphone, label: 'Announce' },
        { id: 'reports', icon: FileText, label: 'Attendance' },
    ];

    const students: Student[] = [
        {
            id: '1',
            name: 'Ibrahim Musa',
            initials: 'IM',
            juz: 30,
            surah: 'Surah An-Naba(v10 - 20)',
            surahType: 'new',
            progress: 45,
            status: 'present',
        },
        {
            id: '2',
            name: 'Fatima Bello',
            initials: 'FM',
            juz: 29,
            surah: 'Surah Al-Mulk (Revision)',
            surahType: 'revision',
            progress: 90,
            status: 'present',
        },
        {
            id: '3',
            name: 'Yusuf Ali',
            initials: 'YA',
            juz: 0,
            surah: '',
            surahType: '',
            progress: 0,
            status: 'absent',
        },
    ];

    const filteredStudents = students.filter((s) => {
        if (activeFilter !== 'all' && s.status !== activeFilter) return false;
        if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present':
                return '#10B981';
            case 'absent':
                return '#EF4444';
            case 'late':
                return '#F59E0B';
            default:
                return '#6B7280';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return '#10B981';
        if (progress >= 50) return '#3B82F6';
        return '#3B82F6';
    };

    return (
        <div className="teacher-records-page">
            {/* Header */}
            <header className="records-header">
                <div className="header-top">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={22} />
                    </button>
                    <div className="header-title-section">
                        <h1 className="header-title">{classInfo.name}</h1>
                        <p className="header-subtitle">{classInfo.subtitle}</p>
                    </div>
                    <button className="lang-btn">EN/AR</button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="stats-row">
                <Card className="stat-card blue" padding="md">
                    <p className="stat-label">Total Student</p>
                    <div className="stat-value-row">
                        <span className="stat-value">{classInfo.totalStudents}</span>
                        <span className="stat-icon">👥</span>
                    </div>
                </Card>
                <Card className="stat-card danger" padding="md">
                    <p className="stat-label">Absent</p>
                    <div className="stat-value-row">
                        <span className="stat-value">{classInfo.absent}</span>
                        <span className="stat-icon">❌</span>
                    </div>
                </Card>
                <Card className="stat-card success" padding="md">
                    <p className="stat-label">Avg. Prg.</p>
                    <div className="stat-value-row">
                        <span className="stat-value">{classInfo.avgProgress}</span>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-row">
                {quickActions.map((action) => (
                    <button key={action.id} className="quick-action-btn">
                        <div className="action-icon">
                            <action.icon size={20} />
                        </div>
                        <span>{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <main className="records-content">
                {/* Search */}
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Student..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.color && (
                                <span className="filter-dot" style={{ backgroundColor: filter.color }} />
                            )}
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Student List */}
                <div className="student-section">
                    <h3 className="section-title">STUDENT (TALIB)</h3>
                    <div className="t-student-list">
                        {filteredStudents.map((student) => (
                            <Card key={student.id} className="t-student-card" padding="md">
                                <div
                                    className="student-avatar"
                                    style={{
                                        backgroundColor:
                                            student.status === 'absent' ? '#E5E7EB' : '#DBEAFE',
                                        color: student.status === 'absent' ? '#6B7280' : '#3B82F6',
                                    }}
                                >
                                    <span>{student.initials}</span>
                                    <span
                                        className="status-dot"
                                        style={{ backgroundColor: getStatusColor(student.status) }}
                                    />
                                </div>
                                <div className="student-info">
                                    <h4 className="student-name">{student.name}</h4>
                                    {student.status !== 'absent' ? (
                                        <p className="student-surah">
                                            Juz {student.juz} • <span className="surah-link">{student.surah}</span>
                                        </p>
                                    ) : (
                                        <p className="student-status absent">Absent</p>
                                    )}
                                </div>
                                {student.status !== 'absent' && (
                                    <div className="progress-section">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${student.progress}%`,
                                                backgroundColor: getProgressColor(student.progress),
                                            }}
                                        />
                                        <span className="progress-value">{student.progress}%</span>
                                    </div>
                                )}
                                <button className="more-btn">
                                    <MoreVertical size={18} />
                                </button>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <TeacherBottomNavbar />
        </div >
    );
};

export default TeacherRecords;
