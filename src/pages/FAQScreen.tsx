import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';
import { GlassCard } from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import BackButton from '../components/ui/BackButton';

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
    <div className="min-h-full flex flex-col text-[#191919] pb-24">
      {/* Sub-screen header with Back Arrow and Title */}
      <div className="px-4 pt-3 flex items-center gap-2">
        <BackButton ariaLabel="Back" />
        <div>
          <h1 className="font-heading text-base font-bold text-[#191919]">
            Frequently Asked Questions
          </h1>
          <p className="text-[10.5px] text-[#82807A]">
            Chicago zoning codes, permits &amp; hearings
          </p>
        </div>
      </div>

      <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#82807A]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full h-11 pl-10 pr-4 rounded-full border border-[#D8D8D8] bg-white/90 backdrop-blur-md text-xs text-[#191919] focus:outline-none focus:ring-2 focus:ring-[#323232] shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap min-h-[34px] transition-all select-none ${
                activeCategory === cat
                  ? 'btn-glossy-primary text-white shadow-xs'
                  : 'liquid-glass-chip text-[#191919] hover:border-[#323232]/40'
              }`}
            >
              {cat === 'all' ? 'All Questions' : cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[18px] liquid-glass-card border border-[#D8D8D8] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 min-h-[48px]"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#323232] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#191919] leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#82807A] flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-3.5 pt-1 text-xs text-[#71717A] leading-relaxed border-t border-[#D8D8D8]/70">
                    <p>{faq.answer}</p>
                    <div className="mt-2.5 flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-[#C0D0E1]/30 text-[#323232] border border-[#A4B3BE]/40 font-bold">
                        {faq.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigate('/chat')}
                        className="text-[#191919] font-bold hover:underline"
                      >
                        Ask in Live Chat &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* "Still need help?" Section with "Raise enquiry" and "Live chat" buttons */}
        <div className="p-4 rounded-[22px] liquid-glass-card border border-[#D8D8D8] text-center space-y-3 shadow-xs">
          <div>
            <h4 className="font-heading text-sm font-bold text-[#191919]">
              Still need help?
            </h4>
            <p className="text-xs text-[#82807A] mt-0.5 max-w-xs mx-auto">
              Can&apos;t find an answer to your zoning or setback scenario? Our Chicago municipal team is available to assist.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => navigate('/profile?tab=enquiries&action=new')}
              className="py-2.5 px-3 rounded-full bg-white border border-[#D8D8D8] text-[#191919] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#F4F5F5] active:scale-95 transition-all"
            >
              <span>Raise enquiry</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/chat')}
              className="py-2.5 px-3 rounded-full btn-glossy-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQScreen;
