import React, { useRef, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { AppHeader } from './AppHeader';
import { useAppStore } from '../../store/useAppStore';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const { desktopFrameMode, toast, darkMode } = useAppStore();
  const mainRef = useRef<HTMLElement>(null);

  // Automatically scroll main content to top on navigation
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Top header and bottom nav are always fixed across the entire app, hidden only on splash
  const isSplash = location.pathname === '/splash';
  const hideBottomNav = isSplash;
  const hideTopBar = isSplash;

  return (
    <div
      className={`h-screen h-[100dvh] max-h-[100dvh] w-full ${
        darkMode ? 'dark bg-[#121214]' : 'bg-[#FAFBFC]'
      } lg:bg-gradient-to-br ${
        darkMode
          ? 'lg:from-[#191919] lg:via-[#121214] lg:to-[#0A0D15]'
          : 'lg:from-[#C0D0E1]/10 lg:via-[#FAFBFC] lg:to-[#A4B3BE]/10'
      } flex flex-col items-center justify-start py-0 lg:py-4 px-0 lg:px-4 overflow-hidden select-none transition-colors duration-300`}
    >
      {/* Floating Global Toast Banner */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 max-w-[340px] px-4 py-2.5 rounded-full bg-[#191919]/95 text-[#FEFEFE] border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.35)] text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="truncate">{toast}</span>
        </div>
      )}

      {/* Main Container - edge-to-edge native on mobile (390px standard), framed on desktop */}
      <div
        id="phone-frame"
        className={`w-full h-full max-h-[100dvh] transition-all duration-300 relative flex flex-col overflow-hidden border-0 rounded-none shadow-none ${
          desktopFrameMode
            ? 'lg:max-w-[390px] lg:min-h-0 lg:h-[844px] lg:max-h-[92vh] lg:rounded-[44px] lg:shadow-[0_25px_70px_rgba(25,25,25,0.20)] lg:border-[8px] lg:border-[#191919]'
            : 'lg:max-w-md lg:h-full lg:shadow-md'
        } ${darkMode ? 'bg-[#18181A] text-[#FEFEFE]' : 'bg-[#FAFBFC] text-[#191919]'}`}
      >
        {/* Fixed full-screen soft ambient liquid-glass canvas with misty-blue reflections */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: darkMode
              ? 'radial-gradient(circle at 50% 25%, rgba(60, 75, 90, 0.20) 0%, transparent 65%), radial-gradient(circle at 85% 65%, rgba(30, 40, 50, 0.25) 0%, transparent 50%), linear-gradient(180deg, #1C1C1F 0%, #151517 40%, #121214 100%)'
              : 'radial-gradient(circle at 50% 25%, rgba(199, 211, 220, 0.12) 0%, transparent 65%), radial-gradient(circle at 85% 65%, rgba(165, 181, 193, 0.08) 0%, transparent 50%), linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 40%, #F5F7F8 100%)',
          }}
        />

        {/* Dynamic Island / Speaker cutout in desktop frame mode */}
        {desktopFrameMode && (
          <div className="hidden lg:flex w-full justify-center pt-2.5 pb-1 sticky top-0 z-50 pointer-events-none flex-shrink-0">
            <div className="w-28 h-4 bg-[#121214] rounded-full shadow-inner flex items-center justify-end px-3">
              <div className="w-2 h-2 rounded-full bg-[#18181A]/60" />
            </div>
          </div>
        )}

        {/* Docked Edge-to-Edge Liquid-Glass Top Header (Always Permanently Fixed at Top) */}
        {!hideTopBar && (
          <div className="w-full flex-shrink-0 z-40 select-none">
            <AppHeader isMaster />
          </div>
        )}

        {/* Scrollable Content Container (hides ugly desktop scrollbars, native momentum scrolling) */}
        <main
          ref={mainRef}
          className="flex-1 w-full overflow-y-auto overflow-x-clip no-scrollbar flex flex-col relative z-10 overscroll-contain"
        >
          <Outlet />
        </main>

        {/* Docked Edge-to-Edge Liquid-Glass Bottom Nav (Always Fixed at Bottom) */}
        {!hideBottomNav && (
          <div className="w-full flex-shrink-0 z-30 select-none">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppShell;
