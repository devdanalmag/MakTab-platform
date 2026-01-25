import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
import Button from '../components/common/Button';
import LanguageSelector from '../components/common/LanguageSelector';
import SlideIndicator from '../components/onboarding/SlideIndicator';
import './Onboarding.css';

// Import slide images (we'll use placeholder images for now)
const slides = [
    {
        id: 1,
        titleKey: 'onboarding.slide1.title',
        descriptionKey: 'onboarding.slide1.description',
        image: '/images/slide1.png',
        bgColor: '#F5E6D3',
    },
    {
        id: 2,
        titleKey: 'onboarding.slide2.title',
        descriptionKey: 'onboarding.slide2.description',
        image: '/images/slide2.png',
        bgColor: '#8B4513',
    },
    {
        id: 3,
        titleKey: 'onboarding.slide3.title',
        descriptionKey: 'onboarding.slide3.description',
        image: '/images/slide3.png',
        bgColor: '#A8D5BA',
    },
];

const Onboarding: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const isLastSlide = currentSlide === slides.length - 1;

    const handleNext = () => {
        if (isLastSlide) {
            navigate('/role-selection');
        } else {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        navigate('/role-selection');
    };

    const getButtonText = () => {
        if (currentSlide === 0) return t('common.getStarted');
        if (isLastSlide) return t('common.startUsingApp');
        return t('common.next');
    };

    return (
        <div className="onboarding-page">
            {/* Header */}
            <header className="onboarding-header">
                <div className="logo">
                    <BookOpen size={32} className="logo-icon" />
                    <span className="logo-text">{t('common.appName')}</span>
                </div>
                <LanguageSelector variant="pills" />
            </header>

            {/* Slides Container */}
            <main className="onboarding-content">
                <div className="slides-container">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <div
                                className="slide-image-wrapper"
                                style={{ backgroundColor: slide.bgColor }}
                            >
                                <div className="slide-image-placeholder">
                                    {index === 0 && (
                                        <svg viewBox="0 0 200 200" className="placeholder-icon">
                                            <rect x="40" y="30" width="120" height="140" rx="8" fill="#e0e0e0" />
                                            <rect x="50" y="50" width="100" height="80" rx="4" fill="#fff" />
                                            <line x1="60" y1="70" x2="140" y2="70" stroke="#3B82F6" strokeWidth="3" />
                                            <line x1="60" y1="85" x2="120" y2="85" stroke="#3B82F6" strokeWidth="3" />
                                            <line x1="60" y1="100" x2="130" y2="100" stroke="#3B82F6" strokeWidth="3" />
                                            <circle cx="110" cy="120" r="25" fill="#3B82F6" opacity="0.3" />
                                            <path d="M105 120 L115 130 L125 110" stroke="#3B82F6" strokeWidth="3" fill="none" />
                                        </svg>
                                    )}
                                    {index === 1 && (
                                        <svg viewBox="0 0 200 200" className="placeholder-icon">
                                            <path d="M100 40 L60 180 L100 160 L140 180 Z" fill="#8B4513" opacity="0.3" />
                                            <path d="M50 120 C50 80, 100 60, 100 100 C100 60, 150 80, 150 120" stroke="#0F766E" strokeWidth="4" fill="none" />
                                            <circle cx="100" cy="90" r="30" fill="#0F766E" opacity="0.2" />
                                            <path d="M85 90 Q100 75 115 90" stroke="#0F766E" strokeWidth="2" fill="none" />
                                        </svg>
                                    )}
                                    {index === 2 && (
                                        <svg viewBox="0 0 200 200" className="placeholder-icon">
                                            <circle cx="100" cy="100" r="60" fill="#0F766E" opacity="0.2" />
                                            <circle cx="100" cy="100" r="20" fill="#3B82F6" />
                                            <circle cx="60" cy="60" r="12" fill="#6B7280" />
                                            <circle cx="140" cy="60" r="12" fill="#6B7280" />
                                            <circle cx="50" cy="110" r="12" fill="#6B7280" />
                                            <circle cx="150" cy="110" r="12" fill="#6B7280" />
                                            <circle cx="70" cy="150" r="12" fill="#6B7280" />
                                            <circle cx="130" cy="150" r="12" fill="#6B7280" />
                                            <line x1="100" y1="100" x2="60" y2="60" stroke="#3B82F6" strokeWidth="1.5" />
                                            <line x1="100" y1="100" x2="140" y2="60" stroke="#3B82F6" strokeWidth="1.5" />
                                            <line x1="100" y1="100" x2="50" y2="110" stroke="#3B82F6" strokeWidth="1.5" />
                                            <line x1="100" y1="100" x2="150" y2="110" stroke="#3B82F6" strokeWidth="1.5" />
                                            <line x1="100" y1="100" x2="70" y2="150" stroke="#3B82F6" strokeWidth="1.5" />
                                            <line x1="100" y1="100" x2="130" y2="150" stroke="#3B82F6" strokeWidth="1.5" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="slide-text">
                                <h2 className="slide-title">{t(slide.titleKey)}</h2>
                                <p className="slide-description">{t(slide.descriptionKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicator */}
                <SlideIndicator
                    total={slides.length}
                    current={currentSlide}
                    onSelect={setCurrentSlide}
                />
            </main>

            {/* Footer */}
            <footer className="onboarding-footer">
                <Button variant="primary" fullWidth onClick={handleNext}>
                    {getButtonText()}
                </Button>
                {!isLastSlide && (
                    <button className="skip-btn" onClick={handleSkip}>
                        {t('common.skip')} &gt;
                    </button>
                )}
            </footer>
        </div>
    );
};

export default Onboarding;
