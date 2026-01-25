import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, User, Plus } from 'lucide-react';
import './BottomNavbar.css';

interface NavItem {
    id: string;
    icon: React.FC<{ size?: number; className?: string }>;
    label: string;
    route: string;
}

const BottomNavbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems: NavItem[] = [
        { id: 'home', icon: Home, label: 'Home', route: '/dashboard' },
        { id: 'quran', icon: BookOpen, label: "Qur'an", route: '/quran' },
        { id: 'classes', icon: Users, label: 'Classes', route: '/classes' },
        { id: 'profile', icon: User, label: 'Profile', route: '/profile' },
    ];

    const isActive = (route: string) => location.pathname === route;

    const handleAddClick = () => {
        // Handle add action (could be a modal or quick action menu)
        console.log('Add button clicked');
    };

    return (
        <nav className="bottom-navbar">
            <div className="nav-items">
                {navItems.slice(0, 2).map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${isActive(item.route) ? 'active' : ''}`}
                        onClick={() => navigate(item.route)}
                    >
                        <item.icon size={22} className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}

                {/* Center Add Button */}
                <button className="nav-add-btn" onClick={handleAddClick}>
                    <Plus size={24} />
                </button>

                {navItems.slice(2).map((item) => (
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

export default BottomNavbar;
