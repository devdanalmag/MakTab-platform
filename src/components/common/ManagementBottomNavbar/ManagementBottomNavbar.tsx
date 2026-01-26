import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, FileText, BookOpen, GraduationCap, Users, LucideIcon } from 'lucide-react';
import './ManagementBottomNavbar.css';

interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
    route: string;
}

const ManagementBottomNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems: NavItem[] = [
        { id: 'home', icon: LayoutGrid, label: 'Home', route: '/management/dashboard' },
        { id: 'reports', icon: FileText, label: 'Reports', route: '/management/reports' },
        { id: 'classes', icon: BookOpen, label: 'Classes', route: '/management/classes' },
        { id: 'students', icon: GraduationCap, label: 'Students', route: '/management/students' },
        { id: 'teachers', icon: Users, label: 'Teachers', route: '/management/teachers' },
    ];

    const isActive = (route: string) => location.pathname === route || location.pathname.startsWith(route + '/');

    return (
        <nav className="management-bottom-navbar">
            <div className="nav-items">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${isActive(item.route) ? 'active' : ''}`}
                        onClick={() => navigate(item.route)}
                    >
                        <item.icon size={20} className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default ManagementBottomNavbar;
