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
        className={`p-0 overflow-hidden cursor-pointer group hover:shadow-lg transition-all bg-white/85 border border-white/90 rounded-[24px] shadow-[0_8px_25px_rgba(31,42,68,0.06)] ${className}`}
      >
        <div className="relative h-48 w-full overflow-hidden bg-[#1F2A44]">
          <ImageWithFallback
            imageKey={article.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="group-hover:scale-105 transition-transform duration-500 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/90 via-[#1F2A44]/35 to-transparent" />

          <div className="absolute top-3 right-3">
            <span className="liquid-glass-chip px-2.5 py-0.5 text-[10px] font-bold text-[#1F2A44] shadow-xs">
              {article.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-[10px] text-[#B7C3DA] mb-1 font-medium">
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
          <p className="text-xs text-[#8A93A6] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
          <div className="pt-1 flex items-center justify-between text-xs font-semibold text-[#3D4D7C]">
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
      <div className="w-24 h-24 rounded-[14px] overflow-hidden flex-shrink-0 bg-[#1F2A44] relative">
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
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#3D4D7C] bg-[#3D4D7C]/10 px-2 py-0.5 rounded-full truncate">
              {article.category}
            </span>
            <span className="text-[10px] text-[#8A93A6] whitespace-nowrap">{article.readTime}</span>
          </div>

          <h4 className="font-heading text-[14px] font-bold text-[#1F2A44] line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#8A93A6] pt-1">
          <span>{article.date}</span>
          <span className="text-[#3D4D7C] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            <span>Read</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default NewsCard;
