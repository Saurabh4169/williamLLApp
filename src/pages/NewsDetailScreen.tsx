import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { ZONING_NEWS } from '../data/news';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';

export const NewsDetailScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = ZONING_NEWS.find((n) => n.slug === slug) || ZONING_NEWS[0];

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader
        showBack
        title="Ordinance Update"
        rightAction={
          <Badge variant="primary" size="sm">
            {article.category}
          </Badge>
        }
      />

      <div className="px-4 py-4 space-y-4">
        {/* Hero Image */}
        <div className="relative h-48 w-full rounded-card overflow-hidden bg-[#1F2A44] shadow-sm">
          <ImageWithFallback
            imageKey={article.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/80 via-transparent to-transparent" />
        </div>

        {/* Article Meta */}
        <div className="flex items-center gap-3 text-xs text-[#8A93A6]">
          <span className="font-semibold text-[#3D4D7C]">{article.date}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-2xl font-bold text-[#1F2A44] leading-tight">
          {article.title}
        </h1>

        {/* Article Body */}
        <GlassCard className="p-5 space-y-3 text-xs text-[#1F2A44]/90 leading-relaxed">
          <p className="font-semibold text-sm text-[#1F2A44]">
            {article.summary}
          </p>

          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </GlassCard>

        {/* Action Callout */}
        <GlassCard className="p-4 space-y-2">
          <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
            How Does This Impact Your Property?
          </h4>
          <p className="text-xs text-[#8A93A6]">
            Our Chicago zoning consultants can assess whether your development can utilize newly expanded FAR ratios or parking reductions.
          </p>
          <div className="pt-1">
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => navigate('/quote')}
              className="flex items-center gap-1.5"
            >
              <span>Request Advisory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NewsDetailScreen;
