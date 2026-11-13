import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { AppHeader } from '../components/layout/AppHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import Badge from '../components/ui/Badge';

export const FAQScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'General', 'Services', 'Contact', 'Process', 'Permits'];

  const filteredFaqs = FAQS_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-6">
      <AppHeader title="Frequently Asked Questions" showBack />

      <div className="px-4 py-4 space-y-5">
        {/* Title Header */}
        <div>
          <h1 className="font-heading text-xl font-bold text-[#1F2A44] tracking-tight">
            Chicago Zoning FAQ
          </h1>
          <p className="text-xs text-[#8A93A6]">
            Answers to common questions regarding Chicago permits, appeals, and zoning codes.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8A93A6]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full h-11 pl-10 pr-4 rounded-full border border-white/80 bg-white/70 backdrop-blur-md text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#3D4D7C] shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap min-h-[38px] transition-all select-none ${
                activeCategory === cat
                  ? 'btn-glossy-navy shadow-sm'
                  : 'liquid-glass-chip text-[#1F2A44] hover:border-[#3D4D7C]/40'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <GlassCard
                key={faq.id}
                className="overflow-hidden p-0"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 min-h-[50px]"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#3D4D7C] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#1F2A44] leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A93A6] flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#8A93A6] leading-relaxed border-t border-white/60">
                    <p>{faq.answer}</p>
                    <div className="mt-2.5 flex items-center justify-between text-[10px]">
                      <Badge variant="primary" size="sm">
                        {faq.category}
                      </Badge>
                      <button
                        onClick={() => navigate('/chat')}
                        className="text-[#3D4D7C] font-semibold hover:underline"
                      >
                        Need more details? Ask in Chat &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <GlassCard className="p-4 text-center space-y-2">
          <h4 className="font-heading text-sm font-bold text-[#1F2A44]">
            Have a Specific Property Question?
          </h4>
          <p className="text-xs text-[#8A93A6]">
            Every parcel in Chicago has unique setback, density, and historical conditions.
          </p>
          <div className="pt-1">
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => navigate('/chat')}
            >
              Ask Our Zoning Counsel
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default FAQScreen;
