import React from 'react';
import './SlideIndicator.css';

interface SlideIndicatorProps {
    total: number;
    current: number;
    onSelect?: (index: number) => void;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({
    total,
    current,
    onSelect,
}) => {
    return (
        <div className="slide-indicator">
            {Array.from({ length: total }, (_, index) => (
                <button
                    key={index}
                    className={`slide-dot ${index === current ? 'active' : ''}`}
                    onClick={() => onSelect?.(index)}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default SlideIndicator;
