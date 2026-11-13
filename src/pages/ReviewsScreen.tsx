import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Quote,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Building2,
  Filter,
} from 'lucide-react';
import AppHeader from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import Chip from '../components/ui/Chip';
import { TESTIMONIALS_DATA, Testimonial } from '../data/testimonials';
import { BUSINESS_INFO } from '../data/businessInfo';

export const ReviewsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = ['All', 'Appeals', 'Permits', 'Analysis', 'Feasibility'];

  const filteredReviews = TESTIMONIALS_DATA.filter((review) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Appeals') return review.service.toLowerCase().includes('appeal') || review.service.toLowerCase().includes('variance');
    if (selectedFilter === 'Permits') return review.service.toLowerCase().includes('permit');
    if (selectedFilter === 'Analysis') return review.service.toLowerCase().includes('analysis');
    if (selectedFilter === 'Feasibility') return review.service.toLowerCase().includes('feasibility');
    return true;
  });

  const ratingBreakdown = [
    { stars: 5, pct: 94, count: 114 },
    { stars: 4, pct: 5, count: 6 },
    { stars: 3, pct: 1, count: 1 },
    { stars: 2, pct: 0, count: 0 },
    { stars: 1, pct: 0, count: 0 },
  ];

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-8">
      {/* 1. Global Brand AppHeader */}
      <AppHeader showBack />

      <div className="px-4 py-4 space-y-6">
        {/* Title & Introduction */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#1F2A44] tracking-tight">
            Client Reviews
          </h1>
          <p className="text-xs text-[#8A93A6] mt-0.5 font-medium">
            Real feedback from Chicago homeowners, architects, and developers.
          </p>
        </div>

        {/* Rating Summary Card with 5 Breakdown Bars */}
        <GlassCard className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE2EA]">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl font-extrabold text-[#1F2A44] tracking-tight">
                  [4.9]
                </span>
                <span className="text-xs text-[#8A93A6] font-medium">out of 5.0</span>
              </div>

              <div className="flex items-center gap-1 mt-1 text-[#3D4D7C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#3D4D7C] text-[#3D4D7C]" />
                ))}
              </div>

              <p className="text-[11px] text-[#8A93A6] mt-1 font-medium">
                Based on <strong className="text-[#1F2A44]">[120+]</strong> Chicago zoning casework reviews
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 pt-2 sm:pt-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#3FA66B]/10 text-[#3FA66B] border border-[#3FA66B]/25">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Clients
              </span>
              <span className="text-[11px] text-[#8A93A6] mt-1">
                <strong className="text-[#1F2A44]">[15+]</strong> Years Experience
              </span>
            </div>
          </div>

          {/* 5-Star Breakdown Bars */}
          <div className="space-y-2 pt-1">
            {ratingBreakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium text-[#1F2A44] flex items-center gap-1 tabular-nums">
                  {row.stars} <Star className="w-3 h-3 fill-[#3D4D7C] text-[#3D4D7C]" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-[#DDE2EA] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7D90B5] to-[#3D4D7C] rounded-full transition-all duration-500"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] text-[#8A93A6] tabular-nums">
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Filter Chips */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8A93A6] px-1">
            <span className="font-semibold text-[#1F2A44] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#3D4D7C]" /> Filter by Casework
            </span>
            <span>{filteredReviews.length} results</span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
            {filterOptions.map((opt) => (
              <Chip
                key={opt}
                active={selectedFilter === opt}
                onClick={() => setSelectedFilter(opt)}
              >
                {opt}
              </Chip>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-3.5">
          {filteredReviews.map((review) => {
            const initials = review.name
              .replace('[CLIENT PLACEHOLDER]', '')
              .trim()
              .split(' ')
              .map((n) => n[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('');

            return (
              <GlassCard key={review.id} className="p-5 space-y-3.5 relative overflow-hidden">
                {/* Top Row: Stars + Verified Chip */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-[#3D4D7C]/30 -scale-x-100 flex-shrink-0" />
                    <div className="flex items-center gap-0.5 text-[#3D4D7C]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#3D4D7C] text-[#3D4D7C]" />
                      ))}
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#3FA66B]/10 text-[#3FA66B] border border-[#3FA66B]/25 flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" /> Verified client
                  </span>
                </div>

                {/* Review Text */}
                <p className="font-sans text-xs sm:text-sm text-[#1F2A44] leading-[22px]">
                  {review.text}
                </p>

                {/* Divider */}
                <div className="h-[1px] bg-[#DDE2EA]" />

                {/* Footer: Avatar, Name, Role, Date, Service */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1F2A44] to-[#7D90B5] text-white font-heading font-bold text-xs sm:text-sm flex items-center justify-center flex-shrink-0 shadow-xs ring-2 ring-white/60">
                      {initials || 'WW'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-semibold text-xs sm:text-sm text-[#1F2A44] truncate">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-[#8A93A6] truncate">
                        {review.role} &bull; {review.neighbourhood}
                      </p>
                      <p className="text-[10px] text-[#8A93A6]/80 tabular-nums">
                        {review.date}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#3D4D7C]/10 text-[#3D4D7C] text-[10px] font-semibold whitespace-nowrap flex-shrink-0 border border-[#3D4D7C]/15">
                    {review.service}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom "Free Quote" CTA Card */}
        <section aria-label="Consultation Callout">
          <GlassCard className="p-5 space-y-3.5 bg-gradient-to-br from-white/90 to-[#B7C3DA]/25 border border-white/80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
                  Zoning Solutions Chicago
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1F2A44] mt-0.5">
                  Have a Chicago Zoning Project?
                </h3>
                <p className="text-xs text-[#8A93A6] mt-1 leading-relaxed">
                  Join hundreds of satisfied property owners. Speak directly with our senior zoning specialists or request a free preliminary evaluation.
                </p>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-11 h-11 rounded-full btn-glossy-navy flex items-center justify-center text-white shadow-md active:scale-95 transition-all flex-shrink-0"
                aria-label="Call Williams & Williams LLC"
              >
                <PhoneCall className="w-5 h-5 stroke-[2]" />
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => navigate('/quote')}
                className="w-full sm:flex-1 h-11 rounded-full btn-glossy-navy text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/book-consultation')}
                className="w-full sm:flex-1 h-11 rounded-full bg-white border border-[#DDE2EA] text-xs font-semibold text-[#1F2A44] flex items-center justify-center shadow-xs hover:border-[#3D4D7C]/40 active:scale-95 transition-all"
              >
                Book Consultation
              </button>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
};

export default ReviewsScreen;

