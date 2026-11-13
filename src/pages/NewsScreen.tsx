import React, { useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { ZONING_NEWS } from '../data/news';
import AppHeader from '../components/layout/AppHeader';
import Chip from '../components/ui/Chip';
import GlassCard from '../components/ui/GlassCard';
import NewsCard from '../components/features/NewsCard';

export const NewsScreen: React.FC = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Ordinance Reform', 'Policy Guide', 'Hearing Alert', 'City Council'];

  const filteredNews = activeCategory === 'all'
    ? ZONING_NEWS
    : ZONING_NEWS.filter((n) => n.category === activeCategory);

  const featuredArticle = filteredNews[0];
  const regularArticles = filteredNews.slice(1);

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      {/* AppHeader with Back button */}
      <AppHeader title="Zoning News" showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Title Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#1F2A44] tracking-tight">
            Municipal Ordinance &amp; Policy
          </h1>
          <p className="text-xs text-[#8A93A6] mt-0.5 font-medium">
            Real-time updates on Chicago City Council, ZBA, and ARO regulations.
          </p>
        </div>

        {/* Alerts Toggle Card */}
        <GlassCard variant="card" className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-tile bg-[#3D4D7C]/10 text-[#3D4D7C] flex items-center justify-center flex-shrink-0">
              {alertsEnabled ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5 text-[#8A93A6]" />}
            </div>
            <div>
              <h4 className="font-heading text-xs font-bold text-[#1F2A44]">
                Chicago Zoning Alerts
              </h4>
              <p className="text-[11px] text-[#8A93A6] line-clamp-1">
                Instant notifications on ward rezonings &amp; ZBA hearings
              </p>
            </div>
          </div>

          <button
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            aria-label="Toggle push alerts"
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 flex-shrink-0 ${
              alertsEnabled ? 'bg-[#3FA66B]' : 'bg-[#DDE2EA]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                alertsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </GlassCard>

        {/* Category Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {categories.map((cat) => (
            <Chip
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All Updates' : cat}
            </Chip>
          ))}
        </div>

        {/* Featured Card (Top) */}
        {featuredArticle && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6] block px-1">
              Featured Analysis
            </span>
            <NewsCard article={featuredArticle} featured />
          </div>
        )}

        {/* Remaining List as Equal Compact Horizontal Cards (96x96 thumbnail) */}
        {regularArticles.length > 0 && (
          <div className="space-y-2.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A93A6] block px-1">
              Latest Regulatory Briefings
            </span>
            {regularArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsScreen;
