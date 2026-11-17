import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, BellRing, ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { ZONING_NEWS } from '../data/news';
import Chip from '../components/ui/Chip';

export const NewsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Amendments' | 'City Council' | 'Permits'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: ('All' | 'Amendments' | 'City Council' | 'Permits')[] = [
    'All',
    'Amendments',
    'City Council',
    'Permits',
  ];

  // Map internal categories to requested chips
  const filteredNews = ZONING_NEWS.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Amendments')
      return item.category === 'Ordinance Reform' || item.category === 'Policy Guide';
    if (activeCategory === 'City Council')
      return item.category === 'City Council' || item.category === 'Hearing Alert';
    if (activeCategory === 'Permits')
      return item.category === 'Permits' || item.title.toLowerCase().includes('permit') || item.excerpt.toLowerCase().includes('permit');
    return true;
  });

  return (
    <div className="min-h-full flex flex-col text-[#191919] pb-24">
      {/* Sub-screen Header with Back Arrow and Title */}
      <div className="px-4 pt-3 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/90 border border-[#D8D8D8] text-[#191919] flex items-center justify-center shadow-2xs hover:bg-white active:scale-95 transition-all flex-shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </button>
        <div>
          <h1 className="font-heading text-base font-bold text-[#191919]">
            Zoning Updates
          </h1>
          <p className="text-[10.5px] text-[#8C9DAA]">
            Chicago municipal ordinances, amendments &amp; council rulings
          </p>
        </div>
      </div>

      <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
        {/* Alerts Toggle Card */}
        <div className="p-3.5 rounded-[18px] liquid-glass-card border border-[#D8D8D8] flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
              {alertsEnabled ? <BellRing className="w-4 h-4" /> : <Bell className="w-4 h-4 text-[#82807A]" />}
            </div>
            <div>
              <h4 className="font-heading text-xs font-bold text-[#191919]">
                Chicago Zoning Alerts
              </h4>
              <p className="text-[10.5px] text-[#82807A] line-clamp-1">
                Real-time updates on ward rezonings &amp; ZBA hearings
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            aria-label="Toggle push alerts"
            className={`w-10 h-6 rounded-full transition-colors relative p-0.5 flex-shrink-0 ${
              alertsEnabled ? 'bg-[#191919]' : 'bg-[#D8D8D8]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                alertsEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Filter Chips: All, Amendments, City Council, Permits */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
          {categories.map((cat) => (
            <Chip
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Chip>
          ))}
        </div>

        {/* News Cards List with Date, Headline, Short Text, and "Read more" */}
        <div className="space-y-3">
          {filteredNews.map((article) => {
            const isExpanded = expandedId === article.id;
            return (
              <div
                key={article.id}
                className="p-3.5 rounded-[20px] liquid-glass-card border border-[#D8D8D8] shadow-2xs space-y-2.5 transition-all"
              >
                {/* Date & Category row */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#8C9DAA] uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#A4B3BE]" />
                    <span>{article.date}</span>
                  </span>

                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#323232] bg-[#C0D0E1]/30 border border-[#A4B3BE]/40 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="font-heading text-xs font-bold text-[#191919] leading-snug">
                  {article.title}
                </h3>

                {/* Short text / excerpt */}
                <p className={`text-xs text-[#71717A] leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {article.excerpt}
                </p>

                {/* Expanded full body if toggled */}
                {isExpanded && article.content && (
                  <div className="pt-2 border-t border-[#D8D8D8]/70 text-xs text-[#191919] leading-relaxed space-y-2 animate-in fade-in">
                    <p className="bg-white/80 p-2.5 rounded-xl border border-[#D8D8D8]">
                      {article.content}
                    </p>
                  </div>
                )}

                {/* Action: "Read more" button */}
                <div className="pt-1 flex items-center justify-between border-t border-[#D8D8D8]/60">
                  <span className="text-[10.5px] text-[#8C9DAA]">
                    {article.readTime}
                  </span>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                    className="flex items-center gap-1 text-xs font-bold text-[#191919] hover:text-[#323232] active:scale-95 transition-all"
                  >
                    <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? '-rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsScreen;
