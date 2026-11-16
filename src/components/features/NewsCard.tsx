import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { NewsArticle } from '../../data/news';
import ImageWithFallback from '../ui/ImageWithFallback';
import GlassCard from '../ui/GlassCard';

export interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  className?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  featured = false,
  className = '',
}) => {
  const navigate = useNavigate();

  if (featured) {
    return (
      <GlassCard
        variant="card"
        interactive
        onClick={() => navigate(`/news/${article.slug}`)}
        className={`p-0 overflow-hidden cursor-pointer group hover:shadow-lg transition-all bg-white/85 border border-white/90 rounded-[24px] shadow-[0_8px_25px_rgba(18, 18, 20,0.06)] ${className}`}
      >
        <div className="relative h-48 w-full overflow-hidden bg-[#121214]">
          <ImageWithFallback
            imageKey={article.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="group-hover:scale-105 transition-transform duration-500 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/90 via-[#121214]/35 to-transparent" />

          <div className="absolute top-3 right-3">
            <span className="liquid-glass-chip px-2.5 py-0.5 text-[10px] font-bold text-[#121214] shadow-xs">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-[10px] text-[#EFE7DC] mb-1 font-medium">
              <span>{article.date}</span>
              <span>&bull;</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="font-heading text-base sm:text-lg font-bold leading-snug line-clamp-2">
              {article.title}
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-xs text-[#82807A] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
          <div className="pt-1 flex items-center justify-between text-xs font-semibold text-[#323232]">
            <span>Read Full Ordinance Analysis</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </GlassCard>
    );
  }

  // Compact Horizontal Card (Fixed 96x96 thumbnail)
  return (
    <GlassCard
      variant="card"
      interactive
      onClick={() => navigate(`/news/${article.slug}`)}
      className={`p-3 flex items-center gap-3 cursor-pointer group hover:shadow-md transition-all bg-white/85 border border-white/90 rounded-[20px] ${className}`}
    >
      {/* 96x96 Fixed Thumbnail */}
      <div className="w-24 h-24 rounded-[14px] overflow-hidden flex-shrink-0 bg-[#121214] relative">
        <ImageWithFallback
          imageKey={article.imageKey}
          aspectRatio="aspect-square w-full h-full"
          className="group-hover:scale-105 transition-transform duration-500 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-0.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#323232] bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 px-2 py-0.5 rounded-full truncate">
              {article.category}
            </span>
            <span className="text-[10px] text-[#82807A] whitespace-nowrap">{article.readTime}</span>
          </div>

          <h4 className="font-heading text-[14px] font-bold text-[#191919] line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#82807A] pt-1">
          <span>{article.date}</span>
          <span className="text-[#323232] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            <span>Read</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default NewsCard;
