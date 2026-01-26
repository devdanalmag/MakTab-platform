import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Plus, MapPin, Users, Edit } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ManagementBottomNavbar from '../../components/common/ManagementBottomNavbar';
import './ManagementClasses.css';

const ManagementClasses: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        className: '',
        assignedRoom: 'Room 101',
        category: 'Tahfeez',
    });

    const existingClasses = [
        { id: '1', name: 'Halaqa Abu Bakr', category: 'Tahfeez', room: 'Room 101', students: 24, icon: '📖' },
        { id: '2', name: 'Islamic Studies...', category: 'Islamiyya', room: 'Hall A', students: 45, icon: '🏛️' },
        { id: '3', name: "Halaqa A'isha", category: 'Tahfeez', room: 'Room 103', students: 18, icon: '📖' },
    ];

    const rooms = ['Room 101', 'Room 102', 'Room 103', 'Hall A', 'Hall B'];
    const categories = ['Tahfeez', 'Islamiyya', 'Arabic'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateClass = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating class:', formData);
        // Handle class creation
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'tahfeez':
                return { bg: '#DBEAFE', text: '#2563EB' };
            case 'islamiyya':
                return { bg: '#FCE7F3', text: '#DB2777' };
            default:
                return { bg: '#E5E7EB', text: '#4B5563' };
        }
    };

    return (
        <div className="management-classes-page">
            {/* Header */}
            <header className="classes-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <h1 className="header-title">Classes & Halaqat</h1>
                <button className="refresh-btn">
                    <RefreshCw size={20} />
                </button>
            </header>

            {/* Main Content */}
            <main className="classes-content">
                {/* Create New Form */}
                <Card className="create-card">
                    <h3 className="create-title">CREATE NEW</h3>
                    <form className="create-form" onSubmit={handleCreateClass}>
                        <div className="form-group">
                            <label className="form-label">Class Name</label>
                            <input
                                type="text"
                                name="className"
                                className="form-input"
                                placeholder="e.g. Halaqa A-Fajr"
                                value={formData.className}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Assigned Room</label>
                                <select
                                    name="assignedRoom"
                                    className="form-select"
                                    value={formData.assignedRoom}
                                    onChange={handleInputChange}
                                >
                                    {rooms.map((room) => (
                                        <option key={room} value={room}>{room}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button type="submit" variant="primary" fullWidth>
                            <Plus size={18} />
                            Create Class
                        </Button>
                    </form>
                </Card>

                {/* Existing Classes */}
                <section className="existing-section">
                    <div className="section-header">
                        <h3 className="section-title">EXISTING CLASSES</h3>
                        <span className="total-count">Total: {existingClasses.length}</span>
                    </div>

                    <div className="classes-list">
                        {existingClasses.map((classItem) => {
                            const catColor = getCategoryColor(classItem.category);
                            return (
                                <Card key={classItem.id} className="class-card" padding="md">
                                    <div className="class-icon">
                                        {classItem.category === 'Tahfeez' ? '📖' : '🏛️'}
                                    </div>
                                    <div className="class-info">
                                        <h4 className="class-name">{classItem.name}</h4>
                                        <div className="class-meta">
                                            <span className="meta-item">
                                                <MapPin size={12} />
                                                {classItem.room}
                                            </span>
                                            <span className="meta-item">
                                                <Users size={12} />
                                                {classItem.students} Students
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className="category-badge"
                                        style={{ backgroundColor: catColor.bg, color: catColor.text }}
                                    >
                                        {classItem.category}
                                    </span>
                                    <button className="edit-btn">
                                        <Edit size={16} />
                                    </button>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            </main>

            <ManagementBottomNavbar />
        </div>
    );
};

export default ManagementClasses;
