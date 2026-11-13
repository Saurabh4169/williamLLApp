import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, PhoneCall } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { BUSINESS_INFO } from '../data/businessInfo';
import AppHeader from '../components/layout/AppHeader';
import Chip from '../components/ui/Chip';
import ServiceCard from '../components/features/ServiceCard';

export const ServicesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Analysis', 'Permits & Appeals', 'Consulting', 'Development'];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-24">
      {/* 1. Global AppHeader */}
      <AppHeader title="Our Services" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Full-width Search Bar with Filter Slider */}
        <div className="relative">
          <div className="h-11 bg-white rounded-full border border-[#DDE2EA] shadow-xs flex items-center px-4 gap-2.5 focus-within:ring-2 focus-within:ring-[#3D4D7C] transition-all">
            <Search className="w-4 h-4 text-[#8A93A6] flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search all 10 zoning services..."
              className="flex-1 bg-transparent text-xs text-[#1F2A44] placeholder-[#8A93A6] focus:outline-none"
            />
            <button
              type="button"
              className="p-1 text-[#8A93A6] hover:text-[#3D4D7C] active:scale-95 transition-all flex-shrink-0"
              aria-label="Filter services"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Category Pills (horizontally scrollable) */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {categories.map((cat) => (
            <Chip
              key={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'All Services (10)' : cat}
            </Chip>
          ))}
        </div>

        {/* Services in a strict 2-column grid (always 2 per row from 320px up) */}
        <div className="grid grid-cols-2 gap-3 pt-1 auto-rows-fr">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Direct Consultation Banner (Matching exact screenshot design) */}
        <div className="mt-4 p-5 rounded-[24px] bg-[#1F2A44] text-white shadow-md relative overflow-hidden space-y-3">
          {/* Subtle concentric circles in bottom-right background */}
          <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border-[18px] border-white/[0.04] pointer-events-none" />
          <div className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full border-[10px] border-white/[0.04] pointer-events-none" />

          {/* Top Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3FA66B] animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">
              DIRECT CONSULTATION AVAILABLE
            </span>
          </div>

          {/* Heading & Subtext */}
          <div>
            <h3 className="font-heading font-extrabold text-base sm:text-[17px] text-white uppercase tracking-tight leading-snug">
              UNSURE WHICH SERVICE FITS YOUR PARCEL?
            </h3>
            <p className="text-xs text-white/70 mt-1 leading-relaxed">
              Speak directly with our zoning team for an immediate preliminary review of your property pin.
            </p>
          </div>

          {/* Two Action Buttons */}
          <div className="pt-1 flex items-center gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex-1 h-10 rounded-full bg-white text-[#1F2A44] hover:bg-slate-100 font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#1F2A44] stroke-[2.2]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => navigate('/quote')}
              className="flex-1 h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-heading font-semibold text-xs flex items-center justify-center shadow-xs active:scale-95 transition-all"
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
