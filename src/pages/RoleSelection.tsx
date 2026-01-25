import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, Users, Settings, ChevronRight } from 'lucide-react';
import LanguageSelector from '../components/common/LanguageSelector';
import Card from '../components/common/Card';
import './RoleSelection.css';

interface RoleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, onClick }) => (
    <Card variant="default" padding="md" className="role-card" onClick={onClick}>
        <div className="role-card-content">
            <div className="role-icon">{icon}</div>
            <div className="role-info">
                <h3 className="role-title">{title}</h3>
                <p className="role-description">{description}</p>
            </div>
            <ChevronRight size={20} className="role-arrow" />
        </div>
    </Card>
);

const RoleSelection: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const roles = [
        {
            id: 'student',
            icon: <GraduationCap size={24} />,
            titleKey: 'roleSelection.student.title',
            descriptionKey: 'roleSelection.student.description',
            route: '/auth?role=student',
        },
        {
            id: 'teacher',
            icon: <Users size={24} />,
            titleKey: 'roleSelection.teacher.title',
            descriptionKey: 'roleSelection.teacher.description',
            route: '/auth?role=teacher',
        },
        {
            id: 'management',
            icon: <Settings size={24} />,
            titleKey: 'roleSelection.management.title',
            descriptionKey: 'roleSelection.management.description',
            route: '/auth?role=management',
        },
    ];

    const handleRoleClick = (route: string) => {
        navigate(route);
    };

    return (
        <div className="role-selection-page">
            {/* Gradient Header */}
            <header className="role-header">
                <div className="header-top">
                    <div className="header-spacer" />
                    <button className="lang-badge">
                        <span>ENG</span>
                    </button>
                </div>
                <div className="header-content">
                    <div className="app-icon">
                        <BookOpen size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className="app-title">{t('common.appName')} App</h1>
                    <p className="app-tagline">{t('common.appTagline')}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="role-content">
                <div className="greeting-section">
                    <h2 className="greeting">{t('roleSelection.greeting')}</h2>
                    <p className="greeting-subtitle">{t('roleSelection.selectRole')}</p>
                </div>

                {/* Language Tabs */}
                <LanguageSelector variant="tabs" className="language-tabs" />

                {/* Role Cards */}
                <div className="roles-list">
                    {roles.map((role) => (
                        <RoleCard
                            key={role.id}
                            icon={role.icon}
                            title={t(role.titleKey)}
                            description={t(role.descriptionKey)}
                            onClick={() => handleRoleClick(role.route)}
                        />
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="role-footer">
                <p className="version-text">{t('footer.version')}</p>
            </footer>
        </div>
    );
};

export default RoleSelection;
