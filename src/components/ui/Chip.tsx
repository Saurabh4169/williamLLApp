import React from 'react';

export interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: 'filter' | 'status' | 'badge';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  active = false,
  onClick,
  variant = 'filter',
  size = 'md',
  icon,
  className = '',
}) => {
  const isInteractive = Boolean(onClick);

  const sizeClasses = {
    sm: 'h-7 px-2.5 text-[11px]',
    md: 'h-9 px-3.5 text-xs',
  }[size];

  const activeClasses = active
    ? 'nav-pill-active text-[#FEFEFE] border-transparent'
    : 'liquid-glass-chip text-[#191919] hover:border-[#323232]/40';

  const nonInteractiveVariant = {
    filter: activeClasses,
    status: 'liquid-glass-chip text-[#191919]',
    badge: 'bg-[#C0D0E1]/35 text-[#323232] border border-[#A4B3BE]/45 rounded-full',
  }[variant];

  const Tag = isInteractive ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-semibold whitespace-nowrap rounded-full transition-all select-none ${sizeClasses} ${
        isInteractive ? activeClasses : nonInteractiveVariant
      } ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </Tag>
  );
};

export default Chip;

