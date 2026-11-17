import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { ZONING_NEWS } from '../data/news';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import BackButton from '../components/ui/BackButton';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';

export const NewsDetailScreen: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = ZONING_NEWS.find((n) => n.slug === slug) || ZONING_NEWS[0];

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-6">
      {/* Sub-screen Header with Back Arrow and Title */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton ariaLabel="Back to Updates" />
          <div>
            <h1 className="font-heading text-sm font-bold text-[#121214]">
              Ordinance Update
            </h1>
            <span className="text-[10px] text-[#82807A] block">
              Chicago City Council
            </span>
          </div>
        </div>

        <Badge variant="primary" size="sm">
          {article.category}
        </Badge>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Hero Image */}
        <div className="relative h-48 w-full rounded-card overflow-hidden bg-[#121214] shadow-sm">
          <ImageWithFallback
            imageKey={article.imageKey}
            aspectRatio="aspect-auto h-full w-full"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/80 via-transparent to-transparent" />
        </div>

        {/* Article Meta */}
        <div className="flex items-center gap-3 text-xs text-[#82807A]">
          <span className="font-semibold text-[#323232]">{article.date}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-2xl font-bold text-[#121214] leading-tight">
          {article.title}
        </h1>

        {/* Article Body */}
        <GlassCard className="p-5 space-y-3 text-xs text-[#121214]/90 leading-relaxed">
          <p className="font-semibold text-sm text-[#121214]">
            {article.summary}
          </p>

          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </GlassCard>

        {/* Action Callout */}
        <GlassCard className="p-4 space-y-2">
          <h4 className="font-heading text-sm font-bold text-[#121214]">
            How Does This Impact Your Property?
          </h4>
          <p className="text-xs text-[#82807A]">
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
