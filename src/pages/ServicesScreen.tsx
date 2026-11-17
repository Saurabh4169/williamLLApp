import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, PhoneCall } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';
import Chip from '../components/ui/Chip';
import ServiceCard from '../components/features/ServiceCard';

export const ServicesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'zoning' | 'construction'>(
    tabParam === 'construction' ? 'construction' : 'zoning'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (tabParam === 'construction' || tabParam === 'zoning') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const zoningChips = [
    { id: 'all', label: 'All' },
    { id: 'Analysis', label: 'Analysis' },
    { id: 'Permits & Appeals', label: 'Permits & Appeals' },
    { id: 'Consulting', label: 'Consulting' },
  ];

  const constructionChips = [
    { id: 'all', label: 'All' },
    { id: 'Design', label: 'Design' },
    { id: 'Construction', label: 'Construction' },
    { id: 'Permits', label: 'Permits' },
    { id: 'Planning', label: 'Planning' },
  ];

  const currentChips = activeTab === 'zoning' ? zoningChips : constructionChips;

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesDivision = (service.division || 'zoning') === activeTab;
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      !searchTerm.trim() ||
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDivision && matchesCategory && matchesSearch;
  });

  const otherDivisionCount = SERVICES_DATA.filter(
    (s) =>
      (s.division || 'zoning') !== activeTab &&
      searchTerm.trim() &&
      (s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.serviceCode.toLowerCase().includes(searchTerm.toLowerCase()))
  ).length;

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-24 overflow-visible">
      {/* 1. Global AppHeader */}
      <AppHeader title="Our Services" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Full-width Search Bar with Filter Slider */}
        <div className="relative">
          <div className="h-11 bg-white rounded-full border border-[#D8D8D8] shadow-xs flex items-center px-4 gap-2.5 focus-within:ring-2 focus-within:ring-[#323232] transition-all">
            <Search className="w-4 h-4 text-[#82807A] flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search all 16 services..."
              className="flex-1 bg-transparent text-xs text-[#191919] placeholder-[#82807A] focus:outline-none"
            />
            <button
              type="button"
              className="p-1 text-[#82807A] hover:text-[#323232] active:scale-95 transition-all flex-shrink-0"
              aria-label="Filter services"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Division Switch: Zoning vs Construction & Design */}
        <div className="flex rounded-full liquid-glass-card p-1 shadow-xs border border-[#D8D8D8] dark:border-white/10 bg-white/80 dark:bg-white/5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('zoning');
              setSelectedCategory('all');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all select-none min-h-[36px] ${
              activeTab === 'zoning'
                ? 'btn-glossy-primary text-white shadow-xs'
                : 'text-[#82807A] dark:text-[#A0B0BC] hover:text-[#191919]'
            }`}
          >
            Zoning
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('construction');
              setSelectedCategory('all');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all select-none min-h-[36px] ${
              activeTab === 'construction'
                ? 'btn-glossy-primary text-white shadow-xs'
                : 'text-[#82807A] dark:text-[#A0B0BC] hover:text-[#191919]'
            }`}
          >
            Construction &amp; Design
          </button>
        </div>

        {/* Category Filter Chips for Selected Side */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {currentChips.map((chip) => (
            <Chip
              key={chip.id}
              active={selectedCategory === chip.id}
              onClick={() => setSelectedCategory(chip.id)}
            >
              {chip.label}
            </Chip>
          ))}
        </div>

        {/* Search match switch pill if matches found in other division */}
        {otherDivisionCount > 0 && (
          <div className="pt-0.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab(activeTab === 'zoning' ? 'construction' : 'zoning');
                setSelectedCategory('all');
              }}
              className="text-[11px] text-[#334454] dark:text-[#A0B0BC] bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:text-[#191919] transition-colors"
            >
              <span>Found {otherDivisionCount} result{otherDivisionCount > 1 ? 's' : ''} in {activeTab === 'zoning' ? 'Construction & Design' : 'Zoning'}. Tap to switch.</span>
            </button>
          </div>
        )}

        {/* Services in a strict 2-column grid (always 2 per row from 320px up) */}
        <div className="grid grid-cols-2 gap-3 pt-1 auto-rows-fr">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Direct Consultation Banner (Matching exact screenshot design) */}
        <div className="mt-4 p-5 rounded-[24px] bg-gradient-to-br from-[#252525] via-[#1C1C1C] to-[#141414] border border-white/15 text-white shadow-lg relative overflow-hidden space-y-3">
          {/* Subtle concentric circles in bottom-right background */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border-[18px] border-white/[0.06] pointer-events-none" />
          <div className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full border-[10px] border-white/[0.06] pointer-events-none" />

          {/* Top Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase !text-[#C0D0E1]">
              DIRECT CONSULTATION AVAILABLE
            </span>
          </div>

          {/* Heading & Subtext */}
          <div>
            <h3 className="font-heading font-extrabold text-base sm:text-[17px] !text-[#FEFEFE] uppercase tracking-tight leading-snug">
              UNSURE WHICH SERVICE FITS YOUR PARCEL?
            </h3>
            <p className="text-xs !text-[#D8D8D8] mt-1 leading-relaxed">
              Speak directly with our zoning team for an immediate preliminary review of your property pin.
            </p>
          </div>

          {/* Two Action Buttons */}
          <div className="pt-1 flex items-center gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex-1 h-10 rounded-full bg-white text-[#191919] hover:bg-slate-100 font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#191919] stroke-[2.2]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => navigate('/quote')}
              className="flex-1 h-10 rounded-full btn-glossy-secondary font-heading font-bold text-xs flex items-center justify-center shadow-xs active:scale-95 transition-all"
            >
              Free Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;
