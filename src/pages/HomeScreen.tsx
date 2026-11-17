import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Scale,
  CalendarCheck,
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
  CheckCircle2,
  Building2,
  ChevronRight,
  Check,
  Star,
  Mail,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { BUSINESS_INFO } from '../data/businessInfo';
import { POPULAR_AREAS } from '../data/popularAreas';
import { APP_IMAGES } from '../data/images';
import AppHeader from '../components/layout/AppHeader';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
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

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-6">
      {/* 1. Global AppHeader: Brand on left, Bell & Avatar on right */}
      <AppHeader />

      <div className="px-4 pt-3 space-y-6">
        {/* Featured Banner Card (Proportional Mobile Sizing) */}
        <section aria-label="Featured Highlight">
          <div className="relative rounded-[20px] overflow-hidden shadow-md bg-[#191919] cursor-pointer group">
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
                  className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#323232] shadow-xs hover:bg-white active:scale-90 transition-all"
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      isFavorite ? 'fill-[#A3B4C0] text-[#A3B4C0]' : 'text-[#323232]'
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
                  <h3 className="font-heading text-sm sm:text-[15px] font-bold !text-white line-clamp-1 leading-snug drop-shadow-sm">
                    {featuredSlides[featuredIndex].title}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold !text-white bg-white/20 backdrop-blur-md border border-white/30 px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                    {featuredSlides[featuredIndex].price}
                  </span>
                </div>

                {/* Address */}
                <p className="text-[10.5px] !text-[#E0E7EE] line-clamp-1 mt-0.5 drop-shadow-xs font-medium">
                  {featuredSlides[featuredIndex].location}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-white/15 text-[10px] text-white/90 overflow-x-auto no-scrollbar">
                  {featuredSlides[featuredIndex].stats.map((stat, sIdx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={sIdx} className="flex items-center gap-1 whitespace-nowrap">
                        <StatIcon className="w-3 h-3 text-[#C7D3DC]" />
                        <span className="!text-[#F4F5F5] font-semibold">{stat.label}</span>
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
                      const currentSlide = featuredSlides[featuredIndex];
                      navigate(
                        `/quote?item=${encodeURIComponent(currentSlide.title)}&tags=${encodeURIComponent(
                          currentSlide.stats.map((s) => s.label).join(',')
                        )}&address=${encodeURIComponent(currentSlide.location)}`
                      );
                    }}
                    className="flex-1 h-8 rounded-full bg-white hover:bg-white/95 text-[#191919] font-heading font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.35)] active:scale-95 transition-all"
                  >
                    <span>Request Free Quote</span>
                    <ArrowRight className="w-3 h-3 stroke-[2.2]" />
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    onClick={(e) => e.stopPropagation()}
                    className="h-8 px-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 !text-white font-heading font-semibold text-[11px] flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all flex-shrink-0"
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === featuredIndex ? 'w-6 bg-gradient-to-r from-[#323232] to-[#191919] shadow-xs shadow-black/20' : 'w-1.5 bg-[#A3B4C0]/40 hover:bg-[#A3B4C0]'
                }`}
              />
            ))}
          </div>
        </section>

        {/* 5. Popular Locations (Compact 1 row, 4 areas matching reference) */}
        <section aria-label="Popular Locations" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#191919] tracking-tight">
              Popular Locations
            </h2>
            <button
              onClick={() => navigate('/zoning-lookup')}
              className="text-xs font-semibold text-[#899EAE] hover:text-[#191919] transition-colors"
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
          <div className="liquid-glass-card rounded-[22px] border border-[#D8D8D8]/80 shadow-xs p-3.5 sm:p-4 grid grid-cols-3 divide-x divide-[#D8D8D8]/60">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#191919] tracking-tight">
                  500+
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#8C9DAA] font-bold mt-0.5">
                Variances Approved
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#323232] stroke-[2.5]" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#191919] tracking-tight">
                  45-Day
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#8C9DAA] font-bold mt-0.5">
                Avg Approval
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center px-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#A4B3BE] stroke-[2.5]" />
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#191919] tracking-tight">
                  20+ Yrs
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#8C9DAA] font-bold mt-0.5">
                Experience
              </span>
            </div>
          </div>
        </section>

        {/* 7. Specialized Zoning Solutions (Matching Reference Image 1) */}
        <section aria-label="Practice Areas" className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
                Practice Areas
              </span>
              <h2 className="font-heading text-lg font-bold text-[#191919] tracking-tight mt-0.5">
                Specialized Zoning Solutions
              </h2>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="text-xs font-semibold text-[#323232] hover:text-[#191919] flex items-center gap-0.5 transition-colors"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Card 1: Commercial & Mixed-Use Entitlements */}
            <div
              onClick={() => navigate('/services/zoning-analysis-consultation')}
              className="liquid-glass-card rounded-[22px] border border-[#D8D8D8]/80 overflow-hidden shadow-xs group cursor-pointer hover:border-[#A4B3BE] active:scale-[0.99] transition-all"
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
                  <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-[#C0D0E1] border border-white/20 shadow-xs">
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
                <p className="text-xs text-[#71717A] leading-relaxed">
                  Navigate complex FAR bonuses, downtown planned developments, and City Hall aldermanic zoning amendments.
                </p>

                <div className="pt-2 border-t border-[#D8D8D8]/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8C9DAA]">
                    Municipal Counsel
                  </span>
                  <div className="font-bold text-[#323232] group-hover:text-[#191919] flex items-center gap-1 transition-colors text-xs">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: ZBA Variances & Administrative Appeals */}
            <div
              onClick={() => navigate('/services/zba-variance-appeals')}
              className="liquid-glass-card rounded-[22px] border border-[#D8D8D8]/80 overflow-hidden shadow-xs group cursor-pointer hover:border-[#A4B3BE] active:scale-[0.99] transition-all"
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
                  <div className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-[#C0D0E1] border border-white/20 shadow-xs">
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
                <p className="text-xs text-[#71717A] leading-relaxed">
                  Specialized representation for front &amp; rear yard setbacks, building height exceptions, and lot coverage relief.
                </p>

                <div className="pt-2 border-t border-[#D8D8D8]/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8C9DAA]">
                    Cook County Division
                  </span>
                  <div className="font-bold text-[#323232] group-hover:text-[#191919] flex items-center gap-1 transition-colors text-xs">
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9DAA] block">
                Case Studies
              </span>
              <h2 className="font-heading text-lg font-bold text-[#191919] tracking-tight mt-0.5">
                Featured Entitlements
              </h2>
            </div>
            <button
              onClick={() => navigate('/construction')}
              className="text-xs font-semibold text-[#323232] hover:text-[#191919] flex items-center gap-0.5 transition-colors"
            >
              <span>Portfolio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Case Study Card 1: Residential Rooftop System */}
            <div
              onClick={() => navigate('/cases/ww-2026-0842')}
              className="liquid-glass-card rounded-[22px] border border-[#D8D8D8]/80 overflow-hidden shadow-xs group cursor-pointer hover:border-[#A4B3BE] active:scale-[0.99] transition-all"
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
                  <span className="bg-[#C0D0E1]/35 backdrop-blur-md text-[#323232] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#A4B3BE]/40">
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
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <MapPin className="w-3.5 h-3.5 text-[#8C9DAA]" />
                    <span>2144 N. Damen Ave, Chicago</span>
                  </div>
                  <span className="font-bold text-[#191919] text-[11px]">
                    B3-2 District
                  </span>
                </div>

                <div className="pt-2 border-t border-[#D8D8D8]/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8C9DAA]">
                    Verified Approval
                  </span>
                  <div className="font-bold text-[#323232] group-hover:text-[#191919] flex items-center gap-1 transition-colors text-xs">
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Card 2: Commercial Warehouse Rooftop Array */}
            <div
              onClick={() => navigate('/cases/ww-2026-0791')}
              className="liquid-glass-card rounded-[22px] border border-[#D8D8D8]/80 overflow-hidden shadow-xs group cursor-pointer hover:border-[#A4B3BE] active:scale-[0.99] transition-all"
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
                  <span className="bg-[#C0D0E1]/35 backdrop-blur-md text-[#323232] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#A4B3BE]/40">
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
                  <div className="flex items-center gap-1.5 text-[#71717A]">
                    <MapPin className="w-3.5 h-3.5 text-[#8C9DAA]" />
                    <span>1250 W. Fulton Market, Chicago</span>
                  </div>
                  <span className="font-bold text-[#191919] text-[11px]">
                    DX-5 / FAR 5.0
                  </span>
                </div>

                <div className="pt-2 border-t border-[#D8D8D8]/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#8C9DAA]">
                    Verified Approval
                  </span>
                  <div className="font-bold text-[#323232] group-hover:text-[#191919] flex items-center gap-1 transition-colors text-xs">
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
