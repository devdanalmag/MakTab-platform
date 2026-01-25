import React from 'react';
import './OnboardingSlide.css';

interface OnboardingSlideProps {
    title: string;
    description: string;
    image: string;
    bgColor: string;
    isActive: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
    title,
    description,
    image,
    bgColor,
    isActive,
}) => {
    return (
        <div className={`onboarding-slide ${isActive ? 'active' : ''}`}>
            <div className="slide-image-container" style={{ backgroundColor: bgColor }}>
                <img src={image} alt={title} className="slide-image" />
            </div>
            <div className="slide-content">
                <h2 className="slide-title">{title}</h2>
                <p className="slide-description">{description}</p>
            </div>
        </div>
    );
};

export default OnboardingSlide;
