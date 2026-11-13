import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'glass' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium transition-all duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4D7C] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'h-9 px-3.5 text-xs rounded-full min-h-[36px]',
    md: 'h-11 px-5 text-sm rounded-full min-h-[44px]',
    lg: 'h-13 px-6 text-base rounded-full min-h-[48px]',
    icon: 'h-11 w-11 rounded-full min-h-[44px] min-w-[44px] p-0',
  };

  const variantClasses = {
    primary:
      'btn-glossy-navy font-semibold text-white',
    glass:
      'liquid-glass-chip text-[#1F2A44] hover:bg-white active:scale-98 font-semibold shadow-xs',
    outline:
      'bg-transparent text-[#1F2A44] border border-[#DDE2EA] hover:bg-white/60 active:scale-98 font-medium',
    danger:
      'bg-[#E5484D] text-white shadow-[0_4px_14px_rgba(229,72,77,0.30)] hover:bg-[#C93B40] active:scale-98 font-semibold',
    ghost:
      'bg-transparent text-[#1F2A44] hover:bg-black/5 active:scale-98',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.12 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;

