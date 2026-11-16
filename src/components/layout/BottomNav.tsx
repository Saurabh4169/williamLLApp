import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, Calendar, HardHat, Menu } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cases } = useAppStore();

  const activeCasesCount = cases.filter((c) => c.category === 'Active').length;

  const isHome = location.pathname === '/' || location.pathname === '/home';
  const isServices = location.pathname.startsWith('/services');
  const isBook = location.pathname === '/book-consultation' || location.pathname === '/quote';
  const isConstruction =
    location.pathname.startsWith('/construction') ||
    location.pathname.startsWith('/portfolio') ||
    location.pathname.startsWith('/projects');
  const isMore =
    location.pathname === '/profile' ||
    location.pathname === '/chat' ||
    location.pathname === '/vault' ||
    location.pathname === '/news' ||
    location.pathname === '/about' ||
    location.pathname === '/faq' ||
    location.pathname === '/contact' ||
    location.pathname === '/checklist' ||
    location.pathname === '/cases' ||
    location.pathname === '/notifications';

  return (
    <nav
      aria-label="Bottom Navigation"
      className="w-full h-[68px] sm:h-[72px] liquid-glass-nav rounded-t-[22px] sm:rounded-t-[26px] grid grid-cols-5 items-center px-1 select-none z-30 flex-shrink-0"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* 1. Home */}
      <button
        onClick={() => navigate('/')}
        aria-label="Home"
        className="w-full flex flex-col items-center justify-center py-1 transition-all active:scale-95 group"
      >
        <Home
          className={`w-5 h-5 transition-colors ${
            isHome ? 'text-[#191919] stroke-[2.5]' : 'text-[#334454] stroke-[1.9] group-hover:text-[#191919]'
          }`}
        />
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isHome ? 'font-bold text-[#191919]' : 'font-semibold text-[#334454] group-hover:text-[#191919]'
          }`}
        >
          Home
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isHome ? 'bg-[#191919] shadow-[0_0_8px_rgba(25,25,25,0.4)] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
          }`}
        />
      </button>

      {/* 2. Services */}
      <button
        onClick={() => navigate('/services')}
        aria-label="Services"
        className="w-full flex flex-col items-center justify-center py-1 transition-all active:scale-95 group"
      >
        <Sparkles
          className={`w-5 h-5 transition-colors ${
            isServices ? 'text-[#191919] stroke-[2.5]' : 'text-[#334454] stroke-[1.9] group-hover:text-[#191919]'
          }`}
        />
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isServices ? 'font-bold text-[#191919]' : 'font-semibold text-[#334454] group-hover:text-[#191919]'
          }`}
        >
          Services
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isServices ? 'bg-[#191919] shadow-[0_0_8px_rgba(25,25,25,0.4)] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
          }`}
        />
      </button>

      {/* 3. Center Raised Button: Book */}
      <div className="w-full flex items-center justify-center relative">
        <button
          onClick={() => navigate('/book-consultation')}
          aria-label="Book Consultation"
          className="w-[50px] h-[50px] rounded-full liquid-charcoal-water-button flex items-center justify-center ring-4 ring-white shadow-[0_8px_24px_rgba(25,25,25,0.35),0_0_16px_rgba(165,181,193,0.40)] active:scale-95 transition-all -translate-y-3.5 z-10 group"
        >
          <Calendar className="w-5 h-5 text-white stroke-[2.2] relative z-10 drop-shadow-xs" />
        </button>
      </div>

      {/* 4. Construction & Design */}
      <button
        onClick={() => navigate('/construction')}
        aria-label="Construction & Design"
        className="w-full flex flex-col items-center justify-center py-1 transition-all active:scale-95 group"
      >
        <div className="relative">
          <HardHat
            className={`w-5 h-5 transition-colors ${
              isConstruction ? 'text-[#191919] stroke-[2.5]' : 'text-[#334454] stroke-[1.9] group-hover:text-[#191919]'
            }`}
          />
        </div>
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isConstruction ? 'font-bold text-[#191919]' : 'font-semibold text-[#334454] group-hover:text-[#191919]'
          }`}
        >
          Construction
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isConstruction ? 'bg-[#191919] shadow-[0_0_8px_rgba(25,25,25,0.4)] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
          }`}
        />
      </button>

      {/* 5. More */}
      <button
        onClick={() => navigate('/profile')}
        aria-label="More Options"
        className="w-full flex flex-col items-center justify-center py-1 transition-all active:scale-95 group"
      >
        <Menu
          className={`w-5 h-5 transition-colors ${
            isMore ? 'text-[#191919] stroke-[2.5]' : 'text-[#334454] stroke-[1.9] group-hover:text-[#191919]'
          }`}
        />
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isMore ? 'font-bold text-[#191919]' : 'font-semibold text-[#334454] group-hover:text-[#191919]'
          }`}
        >
          More
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isMore ? 'bg-[#191919] shadow-[0_0_8px_rgba(25,25,25,0.4)] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
          }`}
        />
      </button>
    </nav>
  );
};

export default BottomNav;
