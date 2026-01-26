import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import LanguageSelector from '../components/common/LanguageSelector';
import './Auth.css';

type AuthTab = 'login' | 'register';

const Auth: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AuthTab>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();

    const role = searchParams.get('role') || 'student';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, handle authentication here
        // Route based on role
        if (role === 'teacher') {
            navigate('/teacher/dashboard');
        } else if (role === 'management') {
            navigate('/management/setup');
        } else {
            navigate('/dashboard');
        }
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
        // Handle social login - route based on role
        if (role === 'teacher') {
            navigate('/teacher/dashboard');
        } else if (role === 'management') {
            navigate('/management/setup');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-page">
            {/* Gradient Header */}
            <header className="auth-header">
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
            <main className="auth-content">
                <div className="auth-card">
                    <div className="greeting-section">
                        <h2 className="greeting">{t('roleSelection.greeting')}</h2>
                        <p className="greeting-subtitle">{t('roleSelection.welcomeBack')}</p>
                    </div>

                    {/* Auth Tabs */}
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            {t('common.login')}
                        </button>
                        <button
                            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                            onClick={() => setActiveTab('register')}
                        >
                            {t('common.register')}
                        </button>
                    </div>

                    {/* Language Selector */}
                    <LanguageSelector variant="tabs" className="language-tabs" />

                    {/* Form */}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {activeTab === 'register' && (
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">{t('auth.emailOrPhone')}</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="text"
                                    name="email"
                                    className="form-input with-icon"
                                    placeholder={t('auth.emailOrPhonePlaceholder')}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('auth.password')}</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-input with-icon"
                                    placeholder={t('auth.passwordPlaceholder')}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {activeTab === 'login' && (
                                <a href="#" className="forgot-link">
                                    {t('auth.forgotPassword')}
                                </a>
                            )}
                        </div>

                        {activeTab === 'register' && (
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        className="form-input with-icon"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <Button type="submit" variant="primary" fullWidth>
                            {activeTab === 'login' ? t('common.login') : t('common.register')}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="divider">
                        <span className="divider-text">{t('auth.orContinueWith')}</span>
                    </div>

                    {/* Social Login */}
                    <div className="social-buttons">
                        <button
                            type="button"
                            className="social-btn"
                            onClick={() => handleSocialLogin('google')}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>{t('auth.google')}</span>
                        </button>
                        <button
                            type="button"
                            className="social-btn"
                            onClick={() => handleSocialLogin('apple')}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <span>{t('auth.apple')}</span>
                        </button>
                    </div>

                    {/* Switch auth mode */}
                    <p className="auth-switch">
                        {activeTab === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                        <button
                            type="button"
                            className="switch-link"
                            onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                        >
                            {activeTab === 'login' ? t('auth.createAccount') : t('common.login')}
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Auth;
