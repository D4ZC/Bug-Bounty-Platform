import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text', 
  width, 
  height, 
  lines = 1 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-lg';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getDefaultDimensions = () => {
    switch (variant) {
      case 'circular':
        return { width: '40px', height: '40px' };
      case 'rectangular':
        return { width: '100%', height: '200px' };
      case 'text':
      default:
        return { width: '100%', height: '1rem' };
    }
  };

  const defaultDims = getDefaultDimensions();
  const finalWidth = width || defaultDims.width;
  const finalHeight = height || defaultDims.height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} ${className}`}
            style={{
              width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
              height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{
        width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
        height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
      }}
    />
  );
};

// Componentes predefinidos para casos comunes
export const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={14} />
      </div>
    </div>
    <Skeleton lines={3} />
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <Skeleton width="30%" height={20} />
    </div>
    <div className="divide-y divide-gray-200">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Skeleton width="40%" height={16} />
            <Skeleton width="20%" height={16} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonProfile: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-4 mb-6">
      <Skeleton variant="circular" width={80} height={80} />
      <div className="flex-1 space-y-2">
        <Skeleton width="50%" height={20} />
        <Skeleton width="70%" height={16} />
        <Skeleton width="30%" height={14} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton width="40%" height={14} />
        <Skeleton width="80%" height={16} />
      </div>
      <div className="space-y-2">
        <Skeleton width="40%" height={14} />
        <Skeleton width="80%" height={16} />
      </div>
    </div>
  </div>
);

export default Skeleton; 