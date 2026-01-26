import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Search, MessageSquare, BarChart2, Phone, Calendar } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ManagementBottomNavbar from '../../components/common/ManagementBottomNavbar';
import './ManagementTeachers.css';

type FilterType = 'all' | 'tahfeez' | 'islamiyya' | 'arabic';

interface Teacher {
    id: string;
    name: string;
    title: string;
    levels: string[];
    phone: string;
    status: 'present' | 'absent';
    avatar: string;
}

const ManagementTeachers: React.FC = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filters: { id: FilterType; label: string }[] = [
        { id: 'all', label: 'All Teachers (42)' },
        { id: 'tahfeez', label: 'Tahfeez' },
        { id: 'islamiyya', label: 'Islamiyya' },
        { id: 'arabic', label: 'Arabic' },
    ];

    const stats = {
        presentToday: 39,
        total: 42,
        unmarked: 3,
    };

    const teachers: Teacher[] = [
        {
            id: '1',
            name: 'Ustaz Abubakar Musa',
            title: 'Head of Tahfeez Department',
            levels: ['Level 4', 'Level 5'],
            phone: '+234 704 ...',
            status: 'present',
            avatar: '👨🏾',
        },
        {
            id: '2',
            name: "Malama A'isha Bello",
            title: 'Islamiyya & Fiqh Teacher',
            levels: ['Grade 2', 'Grade 3'],
            phone: '+234 901 ...',
            status: 'present',
            avatar: '👩🏾',
        },
        {
            id: '3',
            name: 'Ustaz Yusuf Idris',
            title: 'Hadeeth Specialist',
            levels: ['Senior Grade 1'],
            phone: '+234 804 ...',
            status: 'present',
            avatar: '👨🏽',
        },
    ];

    const filteredTeachers = teachers.filter((t) => {
        if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="management-teachers-page">
            {/* Header */}
            <header className="teachers-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <h1 className="header-title">Teacher Directory</h1>
                <button className="add-btn" onClick={() => navigate('/management/teachers/register')}>
                    <UserPlus size={20} />
                </button>
            </header>

            {/* Main Content */}
            <main className="teachers-content">
                {/* Search */}
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search teachers..."
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
                    <Card className="stat-card present" padding="md">
                        <div className="stat-icon">
                            <Calendar size={20} />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">PRESENT TODAY</p>
                            <p className="stat-value">{stats.presentToday}/{stats.total}</p>
                        </div>
                    </Card>
                    <Card className="stat-card unmarked" padding="md">
                        <div className="stat-icon">
                            <Calendar size={20} />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">UNMARKED</p>
                            <p className="stat-value">{stats.unmarked} Pending</p>
                        </div>
                    </Card>
                </div>

                {/* Teachers List */}
                <div className="teachers-list">
                    {filteredTeachers.map((teacher) => (
                        <Card key={teacher.id} className="teacher-card" padding="md">
                            <div className="mt-teacher-card-header">
                                <div className="teacher-avatar">
                                    {teacher.avatar}
                                    <span className={`status-dot ${teacher.status}`} />
                                </div>
                                <div className="teacher-info">
                                    <h4 className="teacher-name">{teacher.name}</h4>
                                    <p className="teacher-title">{teacher.title}</p>
                                </div>
                                <span className={`status-badge ${teacher.status}`}>
                                    {teacher.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="teacher-details">
                                <div className="detail-tags">
                                    <span className="detail-tag levels">
                                        🎓 {teacher.levels.join(', ')}
                                    </span>
                                    <span className="detail-tag phone">
                                        <Phone size={12} />
                                        {teacher.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="teacher-actions">
                                <button className="action-btn message">
                                    <MessageSquare size={16} />
                                    Message
                                </button>
                                <button className="action-btn reports">
                                    <BarChart2 size={16} />
                                    Reports
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* View All */}
                <button className="view-all-btn">
                    📁 View All Teachers
                </button>

                {/* Register Button */}
                <Button
                    variant="primary"
                    fullWidth
                    onClick={() => navigate('/management/teachers/register')}
                >
                    <UserPlus size={18} />
                    Register New Teacher
                </Button>
            </main>

            <ManagementBottomNavbar />
        </div>
    );
};

export default ManagementTeachers;
