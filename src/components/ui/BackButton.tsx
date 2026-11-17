import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface BackButtonProps {
  onClick?: () => void;
  variant?: 'plain' | 'photo';
  className?: string;
  ariaLabel?: string;
}

/**
 * Standardized Back Button across Williams & Williams app:
 * - 44 x 44px tap area (w-11 h-11)
 * - 40px round visible circle (w-10 h-10 rounded-full)
 * - 20px arrow icon (w-5 h-5 stroke-[2.2])
 * - Plain: white outline circle with soft 2xs shadow
 * - Photo: white/glass circle with soft medium shadow and blur
 */
export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  variant = 'plain',
  className = '',
  ariaLabel = 'Go back',
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  const buttonStyle =
    variant === 'photo'
      ? 'w-10 h-10 rounded-full bg-white/95 dark:bg-black/75 backdrop-blur-md border border-white/60 dark:border-white/20 text-[#191919] dark:text-[#FEFEFE] shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-white active:scale-95 transition-all flex items-center justify-center'
      : 'w-10 h-10 rounded-full bg-white dark:bg-[#202023] border border-[#D8D8D8] dark:border-white/10 text-[#191919] dark:text-[#FEFEFE] shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center';

  return (
    <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 select-none ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={buttonStyle}
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
      </button>
    </div>
  );
};

export default BackButton;
