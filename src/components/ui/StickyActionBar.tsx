import React from 'react';

export interface StickyActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export const StickyActionBar: React.FC<StickyActionBarProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`sticky bottom-0 left-0 right-0 z-40 liquid-glass-bar border-t border-white/80 px-4 py-3 shadow-[0_-8px_25px_rgba(31,42,68,0.10)] mt-auto ${className}`}
    >
      <div className="max-w-[430px] mx-auto flex items-center justify-between gap-3">
        {children}
      </div>
    </div>
  );
};

export default StickyActionBar;

