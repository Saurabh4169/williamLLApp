import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../data/services';
import ImageWithFallback from '../ui/ImageWithFallback';
import GlassCard from '../ui/GlassCard';

export interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '' }) => {
  const navigate = useNavigate();

  return (
    <GlassCard
      variant="card"
      interactive
      onClick={() => navigate(`/services/${service.slug}`)}
      className={`p-3 flex flex-col justify-between cursor-pointer group hover:shadow-lg transition-all h-full bg-white/90 border border-white/90 rounded-[22px] shadow-[0_8px_25px_rgba(31,42,68,0.06)] ${className}`}
    >
      <div>
        {/* Fixed Aspect 4/3 Image on top with navy gradient */}
        <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-[#1F2A44] flex-shrink-0">
          <ImageWithFallback
            imageKey={service.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="group-hover:scale-105 transition-transform duration-500 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Badge top-left inside the image */}
          {service.badge && (
            <div className="absolute top-2 left-2">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-[#3D4D7C] text-white px-2 py-0.5 rounded-md shadow-xs border border-white/20">
                {service.badge}
              </span>
            </div>
          )}

          {/* Category Chip over image bottom-left */}
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/90 block truncate drop-shadow-xs">
              {service.category}
            </span>
          </div>
        </div>

        {/* Title in Plus Jakarta Sans Uppercase matching reference */}
        <div className="mt-2.5 min-w-0">
          <h3 className="font-heading text-xs sm:text-[13px] font-bold text-[#1F2A44] uppercase line-clamp-2 leading-snug tracking-tight min-h-[30px] sm:min-h-[34px]">
            {service.title}
          </h3>

          {/* Two-line benefit text */}
          <p className="text-[11px] text-[#8A93A6] line-clamp-2 mt-1 leading-snug font-normal">
            {service.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer: Benefit Note + View Arrow */}
      <div className="mt-3 pt-2 border-t border-[#DDE2EA]/80 flex items-center justify-between gap-1">
        <span className="text-[10px] font-semibold text-[#8A93A6] truncate">
          {service.priceNote}
        </span>
        <div
          aria-label={`View ${service.title}`}
          className="w-7 h-7 rounded-full bg-[#1F2A44] group-hover:bg-[#3D4D7C] text-white flex items-center justify-center flex-shrink-0 shadow-xs transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
      </div>
    </GlassCard>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="liquid-glass-card p-3 animate-pulse h-full flex flex-col justify-between rounded-[22px]">
      <div>
        <div className="aspect-[4/3] w-full rounded-[14px] bg-slate-200/80" />
        <div className="h-4 bg-slate-200/80 rounded mt-2.5 w-3/4" />
        <div className="h-4 bg-slate-200/80 rounded mt-1 w-1/2" />
        <div className="h-3 bg-slate-200/60 rounded mt-1.5 w-full" />
      </div>
      <div className="mt-3 pt-2 border-t border-[#DDE2EA]/50 flex justify-between items-center">
        <div className="h-3 bg-slate-200/60 rounded w-16" />
        <div className="w-7 h-7 rounded-full bg-slate-200/80" />
      </div>
    </div>
  );
};

export default ServiceCard;
