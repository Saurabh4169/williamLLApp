import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Scale } from 'lucide-react';
import { ServiceItem } from '../../data/services';
import ImageWithFallback from '../ui/ImageWithFallback';
import { useAppStore } from '../../store/useAppStore';

export interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  const navigate = useNavigate();
  const { user, toggleSavedService } = useAppStore();
  const isSaved = (user.savedServiceIds || []).includes(service.id);

  // Clean code matching Solar Depot reference (e.g. WW-SRV-01)
  const serviceCode = `WW-${service.id.slice(0, 3).toUpperCase()}-${service.category.slice(0, 3).toUpperCase()}`;

  return (
    <div
      onClick={() => navigate(`/services/${service.slug}`)}
      className={`p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer group bg-white border border-[#E5E9F0] rounded-[18px] sm:rounded-[20px] shadow-[0_4px_16px_rgba(31,42,68,0.04)] hover:shadow-md hover:border-[#3D4D7C]/30 transition-all select-none ${className}`}
    >
      <div>
        {/* Compact Image Container with Top-Right Action Buttons (Solar Depot Reference) */}
        <div className="relative aspect-[4/3] w-full rounded-[13px] overflow-hidden bg-[#F2F4F8] flex-shrink-0">
          <ImageWithFallback
            imageKey={service.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="group-hover:scale-105 transition-transform duration-500 object-cover"
          />

          {/* Top-Right Action Badges: Scale & Heart */}
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
            <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-white flex items-center justify-center text-[#5A657D]">
              <Scale className="w-3 h-3 stroke-[2]" />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSavedService(service.id);
              }}
              aria-label={isSaved ? 'Remove from saved' : 'Save service'}
              className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-white flex items-center justify-center transition-transform active:scale-75"
            >
              <Heart
                className={`w-3 h-3 transition-colors ${
                  isSaved
                    ? 'fill-[#E5484D] text-[#E5484D]'
                    : 'text-[#5A657D] hover:text-[#E5484D]'
                }`}
              />
            </button>
          </div>

          {/* Optional fast-track badge */}
          {service.badge && (
            <div className="absolute bottom-1.5 left-1.5">
              <span className="text-[8.5px] font-bold uppercase tracking-wider bg-[#1F2A44]/80 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-md">
                {service.badge}
              </span>
            </div>
          )}
        </div>

        {/* Top Micro-Row: Code in Blue & Specs on Right */}
        <div className="mt-2 flex items-center justify-between text-[9.5px]">
          <span className="font-bold text-[#3D4D7C] tracking-wide uppercase truncate">
            {serviceCode}
          </span>
          <span className="font-semibold text-[#8A93A6] text-[9px] flex-shrink-0">
            {service.priceNote.split(' ')[0]} {service.priceNote.split(' ')[1] || 'Zoning'}
          </span>
        </div>

        {/* Title: 2-line bold clean clamp */}
        <h3 className="font-heading text-xs font-bold text-[#1F2A44] leading-snug line-clamp-2 mt-1 min-h-[30px] group-hover:text-[#3D4D7C] transition-colors">
          {service.title}
        </h3>
      </div>

      {/* Bottom Row: Category on left, Details link on right */}
      <div className="mt-2 pt-1.5 border-t border-[#EEF1F6] flex items-center justify-between text-[10px]">
        <span className="text-[#8A93A6] font-medium truncate max-w-[65px] sm:max-w-[80px]">
          {service.category.split(' ')[0]}
        </span>
        <span className="font-bold text-[#3D4D7C] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
          <span>Details</span>
          <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
        </span>
      </div>
    </div>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#E5E9F0] p-2.5 animate-pulse rounded-[18px] flex flex-col justify-between">
      <div>
        <div className="aspect-[4/3] w-full rounded-[13px] bg-slate-200" />
        <div className="h-3 bg-slate-200 rounded mt-2 w-1/2" />
        <div className="h-4 bg-slate-200 rounded mt-1 w-3/4" />
      </div>
      <div className="mt-2 pt-1.5 border-t border-slate-100 flex justify-between items-center">
        <div className="h-2.5 bg-slate-200 rounded w-12" />
        <div className="h-2.5 bg-slate-200 rounded w-10" />
      </div>
    </div>
  );
};

export default ServiceCard;
