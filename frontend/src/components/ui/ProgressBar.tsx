import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  status?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status,
  showPercentage = true,
  variant = 'default',
  size = 'md',
  animated = true,
  className = '',
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'default':
      default:
        return 'bg-blue-500';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-3';
      case 'md':
      default:
        return 'h-2';
    }
  };

  const getContainerSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-3';
      case 'md':
      default:
        return 'h-2';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {status && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{status}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(displayProgress)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getContainerSizeStyles()}`}>
        <div
          className={`${getVariantStyles()} ${getSizeStyles()} rounded-full transition-all duration-500 ease-out ${
            animated ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
};

// Componente de progreso circular
interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 60,
  strokeWidth = 4,
  variant = 'default',
  showPercentage = true,
  className = '',
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'error':
        return '#EF4444';
      case 'default':
      default:
        return '#3B82F6';
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getVariantColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {Math.round(displayProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

// Componente de progreso con pasos
interface StepProgressProps {
  steps: Array<{ label: string; completed: boolean; current?: boolean }>;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  variant = 'default',
  className = '',
}) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500 border-green-500';
      case 'warning':
        return 'bg-yellow-500 border-yellow-500';
      case 'error':
        return 'bg-red-500 border-red-500';
      case 'default':
      default:
        return 'bg-blue-500 border-blue-500';
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                step.completed
                  ? `${getVariantColor()} text-white`
                  : step.current
                  ? 'border-blue-500 bg-blue-50 text-blue-500'
                  : 'border-gray-300 bg-gray-50 text-gray-400'
              }`}
            >
              {step.completed ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="mt-2 text-xs text-gray-600 text-center max-w-20">
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
                step.completed ? getVariantColor().split(' ')[0] : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar; 