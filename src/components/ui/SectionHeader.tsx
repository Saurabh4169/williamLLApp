import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex items-end justify-between ${className}`}>
      <div>
        <h2 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#1F2A44] tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-[#8A93A6] mt-0.5 font-medium line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="text-xs font-semibold text-[#3D4D7C] hover:text-[#1F2A44] flex items-center gap-1 transition-colors min-h-[36px]"
        >
          <span>{actionText}</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
