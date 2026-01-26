import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Search, UserPlus, Check, AlertCircle, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import ManagementBottomNavbar from '../../components/common/ManagementBottomNavbar';
import './ManagementStudents.css';

type FilterType = 'all' | 'halaqa-a' | 'halaqa-b' | 'male';

interface Student {
    id: string;
    name: string;
    studentId: string;
    halaqa: string;
    progress: number;
    totalJuz: number;
    attendance: number;
    attendanceStatus: 'good' | 'warning';
    avatar: string;
}

const ManagementStudents: React.FC = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filters: { id: FilterType; label: string }[] = [
        { id: 'all', label: 'All Students' },
        { id: 'halaqa-a', label: 'Halaqa A' },
        { id: 'halaqa-b', label: 'Halaqa B' },
        { id: 'male', label: 'Male' },
    ];

    const stats = {
        totalActive: 1240,
        newThisMonth: 12,
    };

    const students: Student[] = [
        {
            id: '1',
            name: 'Ahmad Abdullahi',
            studentId: '#MT-2024-001',
            halaqa: 'Halaqa A',
            progress: 12,
            totalJuz: 30,
            attendance: 96,
            attendanceStatus: 'good',
            avatar: '👦🏽',
        },
        {
            id: '2',
            name: 'Fatima Yusuf',
            studentId: '#MT-2024-042',
            halaqa: 'Halaqa B',
            progress: 18,
            totalJuz: 30,
            attendance: 98,
            attendanceStatus: 'good',
            avatar: '👧🏾',
        },
        {
            id: '3',
            name: 'Musa Ibrahim',
            studentId: '#MT-2024-089',
            halaqa: 'Halaqa A',
            progress: 4,
            totalJuz: 30,
            attendance: 72,
            attendanceStatus: 'warning',
            avatar: '👦🏾',
        },
    ];

    const filteredStudents = students.filter((s) => {
        if (activeFilter === 'halaqa-a' && s.halaqa !== 'Halaqa A') return false;
        if (activeFilter === 'halaqa-b' && s.halaqa !== 'Halaqa B') return false;
        if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="management-students-page">
            {/* Header */}
            <header className="students-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <h1 className="header-title">Student Directory</h1>
                <button className="more-btn">
                    <MoreVertical size={20} />
                </button>
            </header>

            {/* Main Content */}
            <main className="students-content">
                {/* Search */}
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="filter-tabs">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <Card className="stat-card" padding="md">
                        <p className="stat-label">TOTAL ACTIVE</p>
                        <p className="stat-value primary">{stats.totalActive.toLocaleString()}</p>
                    </Card>
                    <Card className="stat-card" padding="md">
                        <p className="stat-label">NEW THIS MONTH</p>
                        <p className="stat-value success">+{stats.newThisMonth}</p>
                    </Card>
                </div>

                {/* Students List */}
                <div className="students-list">
                    {filteredStudents.map((student) => (
                        <Card key={student.id} className="student-card" padding="md">
                            <div className="student-header">
                                <div className="student-avatar">{student.avatar}</div>
                                <div className="student-info">
                                    <h4 className="student-name">{student.name}</h4>
                                    <p className="student-id">ID: {student.studentId}</p>
                                </div>
                                <span className="halaqa-badge">{student.halaqa}</span>
                            </div>
                            <div className="student-progress">
                                <div className="progress-row">
                                    <span className="progress-label">Tahfeez Progress</span>
                                    <span className="progress-value">{student.progress}/{student.totalJuz} Juz</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${(student.progress / student.totalJuz) * 100}%` }}
                                    />
                                </div>
                                <div className="attendance-row">
                                    <span className={`attendance-badge ${student.attendanceStatus}`}>
                                        {student.attendanceStatus === 'good' ? (
                                            <Check size={12} />
                                        ) : (
                                            <AlertCircle size={12} />
                                        )}
                                        Attendance: {student.attendance}%
                                    </span>
                                    <button className="profile-btn">
                                        PROFILE
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* View All */}
                <button className="view-all-btn">
                    📁 View All Students
                </button>

                {/* FAB */}
                <button className="fab-btn">
                    <UserPlus size={24} />
                </button>
            </main>

            <ManagementBottomNavbar />
        </div>
    );
};

export default ManagementStudents;
