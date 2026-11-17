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

  // Service code (e.g. WW-CON-01 or WW-SRV-01)
  const serviceCode = service.serviceCode || `WW-${service.id.slice(0, 3).toUpperCase()}`;

  return (
    <div
      onClick={() => navigate(`/services/${service.slug}`)}
      className={`p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer group bg-white border border-[#D8D8D8] rounded-[18px] sm:rounded-[20px] shadow-[0_4px_16px_rgba(25,25,25,0.04)] hover:shadow-md hover:border-[#323232]/30 transition-all select-none ${className}`}
    >
      <div>
        {/* Compact Image Container with Top-Right Action Buttons */}
        <div className="relative aspect-[4/3] w-full rounded-[13px] overflow-hidden bg-[#F4F5F5] flex-shrink-0">
          <ImageWithFallback
            imageKey={service.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="group-hover:scale-105 transition-transform duration-500 object-cover"
          />

          {/* Top-Right Action Badges: Scale & Heart */}
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 z-10">
            <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-white flex items-center justify-center text-[#82807A]">
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
                    ? 'fill-[#323232] text-[#323232]'
                    : 'text-[#82807A] hover:text-[#323232]'
                }`}
              />
            </button>
          </div>

          {/* Optional fast-track badge (e.g. POPULAR, HIGH VALUE, NEW) */}
          {service.badge && (
            <div className="absolute bottom-1.5 left-1.5">
              <span className="text-[8.5px] font-extrabold uppercase tracking-wider bg-[#191919]/90 backdrop-blur-sm text-[#FEFEFE] px-2 py-0.5 rounded-md shadow-xs">
                {service.badge}
              </span>
            </div>
          )}
        </div>

        {/* Top Micro-Row: Service Code on Left & Price Note on Right */}
        <div className="mt-2 flex items-center justify-between gap-1 text-[9.5px]">
          <span className="font-bold text-[#191919] tracking-wide uppercase text-[9.5px] flex-shrink-0">
            {serviceCode}
          </span>
          <span className="font-semibold text-[#82807A] text-[9px] truncate max-w-[85px] text-right">
            {service.priceNote}
          </span>
        </div>

        {/* Title: Clean 2-line title that never cuts off */}
        <h3 className="font-heading text-xs font-bold text-[#191919] leading-snug line-clamp-2 mt-1 min-h-[32px] group-hover:text-[#323232] transition-colors">
          {service.title}
        </h3>
      </div>

      {/* Bottom Row: Category on left, Details link on right */}
      <div className="mt-2 pt-1.5 border-t border-[#D8D8D8]/60 flex items-center justify-between text-[10px]">
        <span className="text-[#82807A] font-medium truncate max-w-[70px] sm:max-w-[85px]">
          {service.category}
        </span>
        <span className="font-bold text-[#323232] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
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
