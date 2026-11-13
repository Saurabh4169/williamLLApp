import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D4D7C] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'h-9 px-4 text-xs rounded-full min-h-[36px]',
    md: 'h-11 px-5 text-sm rounded-full min-h-[44px]',
    lg: 'h-13 px-6 text-base rounded-full min-h-[48px]',
    icon: 'h-11 w-11 rounded-full min-h-[44px] min-w-[44px] p-0',
  };

  const variantClasses = {
    primary:
      'bg-[#3D4D7C] text-white shadow-[0_4px_14px_rgba(61,77,124,0.30)] hover:bg-[#313E64] active:bg-[#283353] border-t border-white/20',
    secondary:
      'bg-[#1F2A44] text-white shadow-[0_4px_14px_rgba(31,42,68,0.25)] hover:bg-[#161F33] active:bg-[#0E1524] border-t border-white/15',
    glass:
      'bg-white/80 backdrop-blur-md text-[#1F2A44] border border-white shadow-[0_4px_16px_rgba(31,42,68,0.06)] hover:bg-white active:bg-white/90',
    outline:
      'bg-transparent text-[#1F2A44] border border-[#DDE2EA] hover:bg-white/60 active:bg-white/80',
    danger:
      'bg-[#E5484D] text-white shadow-[0_4px_14px_rgba(229,72,77,0.30)] hover:bg-[#C93B40] active:bg-[#A82B30]',
    ghost:
      'bg-transparent text-[#1F2A44] hover:bg-black/5 active:bg-black/10',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.1 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

