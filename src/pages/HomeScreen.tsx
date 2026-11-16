import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Scale,
  CalendarCheck,
  CheckSquare,
  Heart,
  Clock,
  ShieldCheck,
  FileCheck2,
  Award,
  Users2,
  ArrowRight,
  PhoneCall,
  Phone,
  FileText,
  HardHat,
  CheckCircle2,
  Briefcase,
  Building2,
  ChevronRight,
  Check,
  Star,
  Mail,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';
import { POPULAR_AREAS } from '../data/popularAreas';
import { APP_IMAGES } from '../data/images';
import AppHeader from '../components/layout/AppHeader';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Featured Projects / Flagship Zoning Cases (Exact match to Beverly Hills Villa card)
  const featuredSlides = [
    {
      id: 'slide-1',
      image: APP_IMAGES.heroChicagoSkyline.src,
      tag: 'Featured',
      title: 'Rear Yard Setback Variance & 3-Flat',
      price: 'Approved ZBA',
      location: '2144 N. Damen Ave, Chicago, IL 60647',
      path: '/cases/ww-2026-0842',
      stats: [
        { icon: MapPin, label: 'B3-2 District' },
        { icon: Scale, label: 'ZBA Variance' },
        { icon: Clock, label: '30-Day Approval' },
        { icon: ShieldCheck, label: '100% Compliant' },
      ],
    },
    {
      id: 'slide-2',
      image: APP_IMAGES.heroBlueprintsTeam.src,
      tag: 'Featured',
      title: 'Commercial to Mixed-Use Rezoning',
      price: 'Council Approved',
      location: '1250 W. Fulton Market, Chicago, IL 60607',
      path: '/cases/ww-2026-0791',
      stats: [
        { icon: MapPin, label: 'DX-5 District' },
        { icon: FileCheck2, label: 'FAR 5.0 Bonus' },
        { icon: Clock, label: 'Expedited Permit' },
        { icon: Award, label: 'Zoning Counsel' },
      ],
    },
    {
      id: 'slide-3',
      image: APP_IMAGES.areaLincolnPark.src,
      tag: 'Featured',
      title: 'Historic District Coach House Entitlement',
      price: 'Hearing Set',
      location: '1850 N. Clark St, Chicago, IL 60614',
      path: '/cases/ww-2026-0842',
      stats: [
        { icon: MapPin, label: 'RM-5 District' },
        { icon: Scale, label: 'Landmark Review' },
        { icon: Clock, label: 'Dec 04 Hearing' },
        { icon: ShieldCheck, label: 'Brief Filed' },
      ],
    },
    {
      id: 'slide-4',
      image: APP_IMAGES.serviceZoningAnalysis.src,
      tag: 'Featured',
      title: 'Comprehensive Zoning Feasibility Audit',
      price: 'Free Assessment',
      location: 'Downtown Chicago & Cook County',
      path: '/services/zoning-analysis-consultation',
      stats: [
        { icon: MapPin, label: 'All Districts' },
        { icon: FileText, label: 'Title 17 Check' },
        { icon: Clock, label: '24-Hr Turnaround' },
        { icon: Users2, label: 'Senior Counsel' },
      ],
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/zoning-lookup?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      {/* 1. Global AppHeader: Brand on left, Bell & Avatar on right */}
      <AppHeader />

      <div className="px-4 pt-3 space-y-6">
        {/* 2. Capsule Search Bar with Divider and Filter */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="h-12 bg-white rounded-full border border-[#DDE2EA] shadow-xs flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-[#3D4D7C] focus-within:border-transparent transition-all">
            <Search className="w-5 h-5 text-[#8A93A6] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chicago address, zoning district or service..."
              className="flex-1 bg-transparent text-xs text-[#1F2A44] placeholder-[#8A93A6] focus:outline-none"
            />
            <div className="h-5 w-[1px] bg-[#DDE2EA] flex-shrink-0" />
            <button
              type="button"
              onClick={() => navigate('/zoning-lookup')}
              className="p-1 text-[#1F2A44] hover:text-[#3D4D7C] active:scale-90 transition-all flex-shrink-0"
              aria-label="Open Zoning Map and Filters"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </form>

        {/* 3. 4 Clean Quick-Action Tiles */}
        <section aria-label="Quick Actions">
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {/* Tile 1: Current */}
            <button
              onClick={() => navigate('/construction?tab=current')}
              className="h-[58px] rounded-[16px] bg-[#1F2A44] text-white flex flex-col items-center justify-center shadow-sm shadow-[#1F2A44]/20 transition-all active:scale-95 group relative overflow-hidden"
            >
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <HardHat className="w-3.5 h-3.5 text-white stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-white tracking-tight mt-1 text-center line-clamp-1">
                Current
              </span>
            </button>

            {/* Tile 2: Past */}
            <button
              onClick={() => navigate('/construction?tab=past')}
              className="h-[58px] rounded-[16px] bg-white text-[#1F2A44] border border-[#DDE2EA] flex flex-col items-center justify-center shadow-2xs hover:border-[#3D4D7C]/40 transition-all active:scale-95 group"
            >
              <div className="w-7 h-7 rounded-full bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C] group-hover:bg-[#3D4D7C] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold text-[#1F2A44] tracking-tight mt-1 text-center line-clamp-1">
                Past
              </span>
            </button>

            {/* Tile 3: Cases */}
            <button
              onClick={() => navigate('/cases')}
              className="h-[58px] rounded-[16px] bg-white text-[#1F2A44] border border-[#DDE2EA] flex flex-col items-center justify-center shadow-2xs hover:border-[#3D4D7C]/40 transition-all active:scale-95 group relative"
            >
              <div className="w-7 h-7 rounded-full bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C] group-hover:bg-[#3D4D7C] group-hover:text-white transition-colors relative">
                <Briefcase className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold text-[#1F2A44] tracking-tight mt-1 text-center line-clamp-1">
                Cases
              </span>
            </button>

            {/* Tile 4: Permits */}
            <button
              onClick={() => navigate('/checklist')}
              className="h-[58px] rounded-[16px] bg-white text-[#1F2A44] border border-[#DDE2EA] flex flex-col items-center justify-center shadow-2xs hover:border-[#3D4D7C]/40 transition-all active:scale-95 group"
            >
              <div className="w-7 h-7 rounded-full bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C] group-hover:bg-[#3D4D7C] group-hover:text-white transition-colors">
                <CheckSquare className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold text-[#1F2A44] tracking-tight mt-1 text-center line-clamp-1">
                Permits
              </span>
            </button>
          </div>
        </section>

        {/* 4. Featured Banner Card (Proportional Mobile Sizing) */}
        <section aria-label="Featured Highlight">
          <div className="relative rounded-[20px] overflow-hidden shadow-md bg-[#1F2A44] cursor-pointer group">
            <div className="relative h-[215px] sm:h-[235px] w-full">
              <img
                src={featuredSlides[featuredIndex].image}
                alt={featuredSlides[featuredIndex].title}
                className="w-full h-full object-cover brightness-[0.78] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

              {/* Top Badges / Heart Action */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                <span className="bg-black/45 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                  {featuredSlides[featuredIndex].tag}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(!isFavorite);
                  }}
                  aria-label="Save to favorites"
                  className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1F2A44] shadow-xs hover:bg-white active:scale-90 transition-all"
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      isFavorite ? 'fill-[#E5484D] text-[#E5484D]' : 'text-[#1F2A44]'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Overlay Content */}
              <div
                onClick={() => navigate(featuredSlides[featuredIndex].path)}
                className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 flex flex-col justify-end text-white z-10"
              >
                {/* Title & Price Row */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-sm sm:text-[15px] font-bold text-white line-clamp-1 leading-snug">
                    {featuredSlides[featuredIndex].title}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold text-white/90 bg-white/15 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {featuredSlides[featuredIndex].price}
                  </span>
                </div>

                {/* Address */}
                <p className="text-[10.5px] text-white/80 line-clamp-1 mt-0.5">
                  {featuredSlides[featuredIndex].location}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-white/15 text-[10px] text-white/90 overflow-x-auto no-scrollbar">
                  {featuredSlides[featuredIndex].stats.map((stat, sIdx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={sIdx} className="flex items-center gap-1 whitespace-nowrap">
                        <StatIcon className="w-3 h-3 text-[#B7C3DA]" />
                        <span>{stat.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons: Request Free Quote & Call */}
                <div className="pt-2 mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/quote');
                    }}
                    className="flex-1 h-8 rounded-full btn-glossy-navy border border-white/25 text-white font-heading font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
                  >
                    <span>Request Free Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    onClick={(e) => e.stopPropagation()}
                    className="h-8 px-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-heading font-semibold text-[11px] flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all flex-shrink-0"
                    aria-label={`Call Williams & Williams LLC at ${BUSINESS_INFO.phone}`}
                  >
                    <PhoneCall className="w-3 h-3 text-white stroke-[2.2]" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {featuredSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeaturedIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === featuredIndex ? 'w-5 bg-[#3D4D7C]' : 'w-1 bg-[#DDE2EA]'
                }`}
              />
            ))}
          </div>
        </section>

        {/* 5. Popular Locations (Compact 1 row, 4 areas matching reference) */}
        <section aria-label="Popular Locations" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#1F2A44] tracking-tight">
              Popular Locations
            </h2>
            <button
              onClick={() => navigate('/zoning-lookup')}
              className="text-xs font-semibold text-[#8A93A6] hover:text-[#3D4D7C] transition-colors"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {POPULAR_AREAS.slice(0, 4).map((area) => (
              <div
                key={area.id}
                onClick={() => navigate(`/zoning-lookup?area=${encodeURIComponent(area.name)}`)}
                className="h-[96px] sm:h-[108px] rounded-[16px] sm:rounded-[18px] overflow-hidden relative cursor-pointer shadow-xs hover:shadow-md active:scale-95 transition-all group flex flex-col justify-end"
              >
                <img
                  src={
                    area.id === 'area-loop'
                      ? APP_IMAGES.areaLoop.src
                      : area.id === 'area-west-loop'
                      ? APP_IMAGES.areaWestLoop.src
                      : area.id === 'area-lincoln-park'
                      ? APP_IMAGES.areaLincolnPark.src
                      : APP_IMAGES.heroChicagoSkyline.src
                  }
                  alt={area.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="relative z-10 p-2 text-white">
                  <span className="font-heading font-bold text-[10.5px] sm:text-[11.5px] text-white leading-[1.15] block tracking-tight">
                    {area.name}
                  </span>
                  <span className="text-[9px] sm:text-[9.5px] text-white/80 font-medium leading-tight mt-0.5 block">
                    {area.id === 'area-loop'
                      ? 'Downtown'
                      : area.id === 'area-west-loop'
                      ? 'Fulton Mkt'
                      : area.id === 'area-lincoln-park'
                      ? 'North Side'
                      : 'South Side'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Key Performance Metrics Bar */}
        <section aria-label="Key Performance Metrics">
          <div className="bg-white rounded-[22px] border border-[#E2E8F0] shadow-xs p-3.5 sm:p-4 grid grid-cols-3 divide-x divide-slate-100">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#1F2A44] tracking-tight">
                  500+
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#8A93A6] font-bold mt-0.5">
                Variances Approved
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-500 stroke-[2.5]" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#1F2A44] tracking-tight">
                  45-Day
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#8A93A6] font-bold mt-0.5">
                Avg Approval
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#1F2A44] tracking-tight">
                  20+ Yrs
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#8A93A6] font-bold mt-0.5">
                Experience
              </span>
            </div>
          </div>
        </section>

        {/* 7. Specialized Zoning Solutions (Matching Reference Image 1) */}
        <section aria-label="Practice Areas" className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C] block">
                Practice Areas
              </span>
              <h2 className="font-heading text-lg font-bold text-[#1F2A44] tracking-tight mt-0.5">
                Specialized Zoning Solutions
              </h2>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="text-xs font-semibold text-[#3D4D7C] hover:text-[#1F2A44] flex items-center gap-0.5 transition-colors"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Card 1: Commercial & Mixed-Use Entitlements */}
            <div
              onClick={() => navigate('/services/zoning-analysis-consultation')}
              className="bg-white rounded-[22px] border border-[#E2E8F0] overflow-hidden shadow-xs group cursor-pointer hover:border-[#3D4D7C]/30 active:scale-[0.99] transition-all"
            >
              {/* Image Banner */}
              <div className="relative h-[180px] w-full overflow-hidden">
                <img
                  src={APP_IMAGES.serviceZoningAnalysis.src}
                  alt="Commercial & Mixed-Use Entitlements"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-amber-400 border border-white/20 shadow-xs">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    Land Use &amp; FAR
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                  <h3 className="font-heading text-base font-bold text-white tracking-tight leading-snug">
                    Commercial &amp; Mixed-Use Entitlements
                  </h3>
                </div>
              </div>

              {/* White Card Body */}
              <div className="p-3.5 space-y-2.5">
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Navigate complex FAR bonuses, downtown planned developments, and City Hall aldermanic zoning amendments.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8A93A6]">
                    Municipal Counsel
                  </span>
                  <div className="font-bold text-[#3D4D7C] group-hover:text-[#1F2A44] flex items-center gap-1 transition-colors text-xs">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: ZBA Variances & Administrative Appeals */}
            <div
              onClick={() => navigate('/services/zba-variance-appeals')}
              className="bg-white rounded-[22px] border border-[#E2E8F0] overflow-hidden shadow-xs group cursor-pointer hover:border-[#3D4D7C]/30 active:scale-[0.99] transition-all"
            >
              {/* Image Banner */}
              <div className="relative h-[180px] w-full overflow-hidden">
                <img
                  src={APP_IMAGES.serviceAppealsHearing.src}
                  alt="ZBA Variances & Administrative Appeals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-sky-400 border border-white/20 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    ZBA Appeals
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                  <h3 className="font-heading text-base font-bold text-white tracking-tight leading-snug">
                    ZBA Variances &amp; Administrative Appeals
                  </h3>
                </div>
              </div>

              {/* White Card Body */}
              <div className="p-3.5 space-y-2.5">
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Specialized representation for front &amp; rear yard setbacks, building height exceptions, and lot coverage relief.
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8A93A6]">
                    Cook County Division
                  </span>
                  <div className="font-bold text-[#3D4D7C] group-hover:text-[#1F2A44] flex items-center gap-1 transition-colors text-xs">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Featured Case Studies & Entitlements (Matching Reference Image 2) */}
        <section aria-label="Featured Entitlements" className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C] block">
                Case Studies
              </span>
              <h2 className="font-heading text-lg font-bold text-[#1F2A44] tracking-tight mt-0.5">
                Featured Entitlements
              </h2>
            </div>
            <button
              onClick={() => navigate('/construction')}
              className="text-xs font-semibold text-[#3D4D7C] hover:text-[#1F2A44] flex items-center gap-0.5 transition-colors"
            >
              <span>Portfolio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Case Study Card 1: Residential Rooftop System */}
            <div
              onClick={() => navigate('/cases/ww-2026-0842')}
              className="bg-white rounded-[22px] border border-[#E2E8F0] overflow-hidden shadow-xs group cursor-pointer hover:border-[#3D4D7C]/30 active:scale-[0.99] transition-all"
            >
              {/* Image Banner */}
              <div className="relative h-[180px] w-full overflow-hidden">
                <img
                  src={APP_IMAGES.heroChicagoSkyline.src}
                  alt="Suburban Rooftop Residential Addition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="bg-[#FFF3E0] text-[#D97706] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                    Residential
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                    2026
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                  <h3 className="font-heading text-base font-bold text-white tracking-tight leading-snug">
                    Suburban Rooftop &amp; 3-Flat Addition
                  </h3>
                </div>
              </div>

              {/* White Card Body */}
              <div className="p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 text-[#8A93A6]" />
                    <span>2144 N. Damen Ave, Chicago</span>
                  </div>
                  <span className="font-bold text-[#1F2A44] text-[11px]">
                    B3-2 District
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8A93A6]">
                    Verified Approval
                  </span>
                  <div className="font-bold text-[#3D4D7C] group-hover:text-[#1F2A44] flex items-center gap-1 transition-colors text-xs">
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Card 2: Commercial Warehouse Rooftop Array */}
            <div
              onClick={() => navigate('/cases/ww-2026-0791')}
              className="bg-white rounded-[22px] border border-[#E2E8F0] overflow-hidden shadow-xs group cursor-pointer hover:border-[#3D4D7C]/30 active:scale-[0.99] transition-all"
            >
              {/* Image Banner */}
              <div className="relative h-[180px] w-full overflow-hidden">
                <img
                  src={APP_IMAGES.serviceConstruction.src}
                  alt="Commercial Warehouse Rezoning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="bg-[#E0F2FE] text-[#0284C7] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-sky-200">
                    Commercial
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                    2026
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                  <h3 className="font-heading text-base font-bold text-white tracking-tight leading-snug">
                    Commercial Warehouse &amp; Creative Office
                  </h3>
                </div>
              </div>

              {/* White Card Body */}
              <div className="p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 text-[#8A93A6]" />
                    <span>1250 W. Fulton Market, Chicago</span>
                  </div>
                  <span className="font-bold text-[#1F2A44] text-[11px]">
                    DX-5 / FAR 5.0
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8A93A6]">
                    Verified Approval
                  </span>
                  <div className="font-bold text-[#3D4D7C] group-hover:text-[#1F2A44] flex items-center gap-1 transition-colors text-xs">
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
