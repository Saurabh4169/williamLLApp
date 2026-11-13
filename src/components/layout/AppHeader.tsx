import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showBack = false,
  rightAction,
}) => {
  const navigate = useNavigate();
  const { user, notifications } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full h-16 liquid-glass-bar flex items-center justify-between px-4 transition-all flex-shrink-0">
      {/* Zone 1: Left Brand / Logo (Always consistent on every page) */}
      <div className="flex items-center gap-2 min-w-0">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="flex items-center justify-center w-8 h-8 rounded-full liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/50 active:scale-95 transition-all flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
          </button>
        )}

        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer select-none flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1F2A44] to-[#3D4D7C] flex items-center justify-center text-white shadow-xs border border-white/30 flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M12 2L2 20h20L12 2zm0 4.5l6.5 11.5h-13L12 6.5z" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-heading font-bold text-xs tracking-wider text-[#1F2A44] whitespace-nowrap block">
              WILLIAMS &amp; WILLIAMS
            </span>
            <span className="text-[9px] tracking-widest uppercase font-semibold text-[#8A93A6] block">
              ZONING SOLUTIONS
            </span>
          </div>
        </div>
      </div>

      {/* Zone 2: Right Action (Bell with badge + Avatar - Always consistent on every page) */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {rightAction ? (
          rightAction
        ) : (
          <>
            <button
              onClick={() => navigate('/notifications')}
              className="relative flex items-center justify-center w-10 h-10 rounded-full liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/50 active:scale-95 transition-all"
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <Bell className="w-4 h-4 stroke-[2]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#E5484D] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full bg-[#3D4D7C] text-white text-xs font-bold flex items-center justify-center ring-2 ring-white shadow-xs hover:ring-[#3D4D7C]/30 active:scale-95 transition-all select-none"
              aria-label="Profile and Settings"
            >
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
