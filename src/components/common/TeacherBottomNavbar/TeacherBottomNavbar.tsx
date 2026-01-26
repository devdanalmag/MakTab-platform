import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardList, User, LucideIcon } from 'lucide-react';
import './TeacherBottomNavbar.css';

interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
    route: string;
}

const TeacherBottomNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems: NavItem[] = [
        { id: 'home', icon: Home, label: 'Home', route: '/teacher/dashboard' },
        { id: 'classes', icon: BookOpen, label: 'Classes', route: '/teacher/classes' },
        { id: 'record', icon: ClipboardList, label: 'Record', route: '/teacher/records' },
        { id: 'profile', icon: User, label: 'Profile', route: '/teacher/profile' },
    ];

    const isActive = (route: string) => location.pathname === route || location.pathname.startsWith(route + '/');

    return (
        <nav className="teacher-bottom-navbar">
            <div className="nav-items">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${isActive(item.route) ? 'active' : ''}`}
                        onClick={() => navigate(item.route)}
                    >
                        <item.icon size={22} className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default TeacherBottomNavbar;
