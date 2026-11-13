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
  FileText,
  HardHat,
  CheckCircle2,
  Briefcase,
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

        {/* 3. 4 Category / Quick-Action Tiles */}
        <section aria-label="Quick Actions">
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            {/* Tile 1: Current Projects */}
            <button
              onClick={() => navigate('/construction?tab=current')}
              className="h-[78px] rounded-[20px] bg-[#1F2A44] text-white flex flex-col items-center justify-center gap-1 shadow-md shadow-[#1F2A44]/25 transition-all active:scale-95 group relative overflow-hidden"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <HardHat className="w-4 h-4 text-white stroke-[2.2]" />
              </div>
              <span className="text-[10px] sm:text-[10.5px] font-bold text-white tracking-tight leading-tight px-1 text-center line-clamp-1">
                Current
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#3FA66B] font-extrabold -mt-0.5">
                In Progress
              </span>
            </button>

            {/* Tile 2: Past Projects */}
            <button
              onClick={() => navigate('/construction?tab=past')}
              className="h-[78px] rounded-[20px] bg-white text-[#1F2A44] border border-[#DDE2EA] flex flex-col items-center justify-center gap-1 shadow-xs hover:border-[#3D4D7C]/40 transition-all active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C] group-hover:bg-[#3D4D7C] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] sm:text-[10.5px] font-bold text-[#1F2A44] tracking-tight leading-tight px-1 text-center line-clamp-1">
                Past
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#3D4D7C] font-extrabold -mt-0.5">
                Completed
              </span>
            </button>

            {/* Tile 3: Cases (Replaced Consult as requested) */}
            <button
              onClick={() => navigate('/cases')}
              className="h-[78px] rounded-[20px] bg-white text-[#1F2A44] border border-[#DDE2EA] flex flex-col items-center justify-center gap-1 shadow-xs hover:border-[#3D4D7C]/40 transition-all active:scale-95 group relative"
            >
              <div className="w-8 h-8 rounded-full bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C] group-hover:bg-[#3D4D7C] group-hover:text-white transition-colors relative">
                <Briefcase className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] sm:text-[10.5px] font-bold text-[#1F2A44] tracking-tight leading-tight px-1 text-center line-clamp-1">
                Cases
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#8A93A6] font-semibold -mt-0.5">
                Filings
              </span>
            </button>

            {/* Tile 4: Permits */}
            <button
              onClick={() => navigate('/checklist')}
              className="h-[78px] rounded-[20px] bg-white text-[#1F2A44] border border-[#DDE2EA] flex flex-col items-center justify-center gap-1 shadow-xs hover:border-[#3D4D7C]/40 transition-all active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#3D4D7C]/10 flex items-center justify-center text-[#3D4D7C] group-hover:bg-[#3D4D7C] group-hover:text-white transition-colors">
                <CheckSquare className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] sm:text-[10.5px] font-bold text-[#1F2A44] tracking-tight leading-tight px-1 text-center line-clamp-1">
                Permits
              </span>
              <span className="text-[8px] uppercase tracking-wider text-[#8A93A6] font-semibold -mt-0.5">
                Checklist
              </span>
            </button>
          </div>
        </section>

        {/* 4. Featured Big Card (Flagship Zoning Case Banner) */}
        <section aria-label="Featured Highlight">
          <div className="relative rounded-[26px] sm:rounded-[28px] overflow-hidden shadow-md bg-[#1F2A44] cursor-pointer group">
            <div className="relative aspect-[16/13] sm:aspect-[16/11] min-h-[295px] w-full">
              <img
                src={featuredSlides[featuredIndex].image}
                alt={featuredSlides[featuredIndex].title}
                className="w-full h-full object-cover brightness-[0.78] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />

              {/* Top Badges / Heart Action */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                  {featuredSlides[featuredIndex].tag}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite(!isFavorite);
                  }}
                  aria-label="Save to favorites"
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1F2A44] shadow-md hover:bg-white active:scale-90 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFavorite ? 'fill-[#E5484D] text-[#E5484D]' : 'text-[#1F2A44]'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Overlay Content */}
              <div
                onClick={() => navigate(featuredSlides[featuredIndex].path)}
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end text-white z-10"
              >
                {/* Title & Price Row */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading text-[16px] sm:text-[18px] font-bold text-white line-clamp-1 leading-snug">
                    {featuredSlides[featuredIndex].title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-white/90 bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                    {featuredSlides[featuredIndex].price}
                  </span>
                </div>

                {/* Address */}
                <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                  {featuredSlides[featuredIndex].location}
                </p>

                {/* Stats Row */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 pt-2 border-t border-white/15 text-[11px] text-white/90 overflow-x-auto no-scrollbar">
                  {featuredSlides[featuredIndex].stats.map((stat, sIdx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={sIdx} className="flex items-center gap-1 whitespace-nowrap">
                        <StatIcon className="w-3.5 h-3.5 text-[#B7C3DA]" />
                        <span>{stat.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons: Request Free Quote & Call */}
                <div className="pt-2.5 mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/quote');
                    }}
                    className="flex-1 h-10 rounded-full btn-glossy-navy border border-white/25 text-white font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span>Request Free Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    onClick={(e) => e.stopPropagation()}
                    className="h-10 px-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-heading font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all flex-shrink-0"
                    aria-label={`Call Williams & Williams LLC at ${BUSINESS_INFO.phone}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2.5">
            {featuredSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeaturedIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === featuredIndex ? 'w-6 bg-[#3D4D7C]' : 'w-1.5 bg-[#DDE2EA]'
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

        {/* 6. Why Choose Williams & Williams LLC - Compact Liquid Glass Bento */}
        <section aria-label="Why Choose Us" className="space-y-2.5">
          {/* Section Header with Accent Pill */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D4D7C]" />
                <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#3D4D7C]">
                  Our Core Pillars
                </span>
              </div>
              <h2 className="font-heading text-[17px] sm:text-[19px] font-bold text-[#1F2A44] tracking-tight mt-0.5">
                Why Choose Us
              </h2>
            </div>
            <span className="text-[9.5px] font-semibold text-[#3D4D7C] bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#DDE2EA] shadow-2xs">
              Experienced • Knowledgeable • Dedicated
            </span>
          </div>

          {/* Liquid Glass Bento Layout (Dark & Light Balanced Combination) */}
          <div className="space-y-2">
            {/* Flagship Hero Card: 01 Experienced (Dark Liquid Glass) */}
            <div className="relative rounded-[20px] p-3.5 sm:p-4 bg-gradient-to-br from-[#162035] via-[#1F2A44] to-[#2B3B60] text-white backdrop-blur-xl border border-white/20 shadow-[0_12px_28px_rgba(31,42,68,0.22),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden group hover:border-[#B7C3DA]/40 active:scale-[0.99] transition-all">
              {/* Radial glow background sheen */}
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#3D4D7C]/60 to-transparent blur-xl pointer-events-none" />
              <span className="absolute top-1 right-3 font-heading font-black text-3xl text-white/[0.08] select-none pointer-events-none">
                01
              </span>

              <div className="relative z-10">
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center shadow-xs ring-2 ring-white/25 flex-shrink-0 backdrop-blur-md">
                    <Award className="w-4.5 h-4.5 stroke-[2.2] text-[#B7C3DA]" />
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white/12 text-[#B7C3DA] border border-white/20 backdrop-blur-md">
                    Decades of Casework
                  </span>
                </div>

                {/* Content */}
                <div className="mt-2.5">
                  <h3 className="font-heading text-sm sm:text-[15px] font-bold text-white tracking-tight">
                    Experienced Chicago Advocates
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-[#DDE2EA] leading-relaxed mt-0.5 font-normal">
                    Decades of specialized casework navigating Cook County &amp; City Hall hearing divisions with established aldermanic rapport.
                  </p>
                </div>

                {/* Micro tags */}
                <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/15 text-[9.5px] text-white/90 font-medium overflow-x-auto no-scrollbar">
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-2xs whitespace-nowrap">
                    City Hall ZBA
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-2xs whitespace-nowrap">
                    Variance Petitions
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-2xs whitespace-nowrap">
                    Cook County PINs
                  </span>
                </div>
              </div>
            </div>

            {/* Split Row: Twin Liquid Glass Pods (Crisp Light Glass) */}
            <div className="grid grid-cols-2 gap-2">
              {/* Card 2: Knowledgeable (Light Glass) */}
              <div className="relative rounded-[18px] p-3 sm:p-3.5 bg-gradient-to-br from-white/98 via-white/90 to-[#F2F4F8] backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(31,42,68,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col justify-between group hover:border-[#3D4D7C]/30 active:scale-[0.98] transition-all">
                <span className="absolute top-1 right-2 font-heading font-black text-2xl text-[#1F2A44]/[0.05] select-none pointer-events-none">
                  02
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1F2A44] to-[#3D4D7C] text-white flex items-center justify-center shadow-xs ring-2 ring-white flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase bg-[#3D4D7C]/10 text-[#3D4D7C] border border-[#3D4D7C]/15">
                      Title 17 Code
                    </span>
                  </div>

                  <h3 className="font-heading text-xs sm:text-[13px] font-bold text-[#1F2A44] tracking-tight leading-snug mt-2">
                    Knowledgeable
                  </h3>

                  <p className="text-[10.5px] sm:text-[11px] text-[#5A657D] leading-snug mt-0.5 line-clamp-2">
                    Mastery of Title 17, Connected Communities &amp; FAR rules.
                  </p>
                </div>

                <div className="relative z-10 mt-2 pt-1.5 border-t border-[#DDE2EA]/70 flex items-center gap-1 text-[9px] font-semibold text-[#3D4D7C]">
                  <span>FAR &amp; ARO Rules</span>
                </div>
              </div>

              {/* Card 3: Dedicated (Light Glass) */}
              <div className="relative rounded-[18px] p-3 sm:p-3.5 bg-gradient-to-br from-white/98 via-white/90 to-[#F2F4F8] backdrop-blur-xl border border-white shadow-[0_8px_20px_rgba(31,42,68,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col justify-between group hover:border-[#3D4D7C]/30 active:scale-[0.98] transition-all">
                <span className="absolute top-1 right-2 font-heading font-black text-2xl text-[#1F2A44]/[0.05] select-none pointer-events-none">
                  03
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1F2A44] to-[#3D4D7C] text-white flex items-center justify-center shadow-xs ring-2 ring-white flex-shrink-0">
                      <Users2 className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase bg-[#3FA66B]/10 text-[#3FA66B] border border-[#3FA66B]/20">
                      Permit Stamped
                    </span>
                  </div>

                  <h3 className="font-heading text-xs sm:text-[13px] font-bold text-[#1F2A44] tracking-tight leading-snug mt-2">
                    Dedicated
                  </h3>

                  <p className="text-[10.5px] sm:text-[11px] text-[#5A657D] leading-snug mt-0.5 line-clamp-2">
                    Relentless client advocacy from parcel audit to permit stamp.
                  </p>
                </div>

                <div className="relative z-10 mt-2 pt-1.5 border-t border-[#DDE2EA]/70 flex items-center gap-1 text-[9px] font-semibold text-[#3D4D7C]">
                  <span>End-to-End Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Direct Contact / Immediate Consultation Callout */}
        <section aria-label="Direct Contact Card">
          <div className="p-5 space-y-3 bg-white rounded-[24px] border border-[#DDE2EA] shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
                  Direct Chicago Hotline
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1F2A44] mt-0.5">
                  Speak with a Specialist Today
                </h3>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-11 h-11 rounded-full btn-glossy-navy flex items-center justify-center text-white shadow-md active:scale-95 transition-all flex-shrink-0"
                aria-label="Call Williams & Williams LLC"
              >
                <PhoneCall className="w-5 h-5 stroke-[2]" />
              </a>
            </div>
            <p className="text-xs text-[#8A93A6] leading-relaxed">
              Call us directly at <strong className="text-[#1F2A44]">{BUSINESS_INFO.phone}</strong> or email <strong className="text-[#1F2A44]">{BUSINESS_INFO.email}</strong> for immediate zoning reviews.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => navigate('/quote')}
                className="flex-1 h-10 rounded-full btn-glossy-navy text-xs font-semibold text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              >
                Request Free Quote
              </button>
              <button
                onClick={() => navigate('/book-consultation')}
                className="flex-1 h-10 rounded-full bg-white border border-[#DDE2EA] text-xs font-semibold text-[#1F2A44] flex items-center justify-center shadow-xs hover:border-[#3D4D7C]/40 active:scale-95 transition-transform"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
