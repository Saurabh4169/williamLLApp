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
      className="w-full h-[68px] sm:h-[72px] bg-white/98 sm:bg-white backdrop-blur-xl border-t border-[#DDE2EA] rounded-t-[20px] sm:rounded-t-[24px] shadow-[0_-4px_25px_rgba(31,42,68,0.06)] grid grid-cols-5 items-center px-1 select-none z-30 flex-shrink-0"
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
            isHome ? 'text-[#3D4D7C] stroke-[2.4]' : 'text-[#8A93A6] stroke-[1.8] group-hover:text-[#1F2A44]'
          }`}
        />
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isHome ? 'font-semibold text-[#3D4D7C]' : 'font-medium text-[#8A93A6] group-hover:text-[#1F2A44]'
          }`}
        >
          Home
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isHome ? 'bg-[#3D4D7C] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
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
            isServices ? 'text-[#3D4D7C] stroke-[2.4]' : 'text-[#8A93A6] stroke-[1.8] group-hover:text-[#1F2A44]'
          }`}
        />
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isServices ? 'font-semibold text-[#3D4D7C]' : 'font-medium text-[#8A93A6] group-hover:text-[#1F2A44]'
          }`}
        >
          Services
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isServices ? 'bg-[#3D4D7C] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
          }`}
        />
      </button>

      {/* 3. Center Raised Button: Book */}
      <div className="w-full flex items-center justify-center relative">
        <button
          onClick={() => navigate('/book-consultation')}
          aria-label="Book Consultation"
          className="w-[50px] h-[50px] rounded-full btn-glossy-navy flex items-center justify-center shadow-[0_6px_20px_rgba(61,77,124,0.30)] ring-4 ring-white active:scale-95 transition-transform -translate-y-3.5 z-10"
        >
          <Calendar className="w-5 h-5 text-white stroke-[2.2]" />
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
              isConstruction ? 'text-[#3D4D7C] stroke-[2.4]' : 'text-[#8A93A6] stroke-[1.8] group-hover:text-[#1F2A44]'
            }`}
          />
        </div>
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isConstruction ? 'font-semibold text-[#3D4D7C]' : 'font-medium text-[#8A93A6] group-hover:text-[#1F2A44]'
          }`}
        >
          Construction
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isConstruction ? 'bg-[#3D4D7C] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
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
            isMore ? 'text-[#3D4D7C] stroke-[2.4]' : 'text-[#8A93A6] stroke-[1.8] group-hover:text-[#1F2A44]'
          }`}
        />
        <span
          className={`text-[11px] mt-0.5 tracking-tight leading-tight transition-colors ${
            isMore ? 'font-semibold text-[#3D4D7C]' : 'font-medium text-[#8A93A6] group-hover:text-[#1F2A44]'
          }`}
        >
          More
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all ${
            isMore ? 'bg-[#3D4D7C] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
          }`}
        />
      </button>
    </nav>
  );
};

export default BottomNav;
