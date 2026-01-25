import React from 'react';
import './ProgressCircle.css';

interface ProgressCircleProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    showLabel?: boolean;
    children?: React.ReactNode;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
    percentage,
    size = 80,
    strokeWidth = 8,
    color = 'var(--color-secondary)',
    backgroundColor = 'var(--color-gray-200)',
    showLabel = true,
    children,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="progress-circle" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="progress-circle-svg">
                {/* Background circle */}
                <circle
                    className="progress-circle-bg"
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress circle */}
                <circle
                    className="progress-circle-progress"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                    }}
                />
            </svg>
            <div className="progress-circle-content">
                {children || (showLabel && <span className="progress-circle-label">{percentage}%</span>)}
            </div>
        </div>
    );
};

export default ProgressCircle;
