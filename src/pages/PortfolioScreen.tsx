import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  HardHat,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { AppHeader } from '../components/layout/AppHeader';
import { APP_IMAGES } from '../data/images';
import { useAppStore } from '../store/useAppStore';

export const PortfolioScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, toggleSavedProject } = useAppStore();

  // Read URL query parameter for tab (?tab=current or ?tab=past)
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'Current' | 'Past'>('Current');

  useEffect(() => {
    if (tabParam === 'past') {
      setActiveTab('Past');
    } else if (tabParam === 'current') {
      setActiveTab('Current');
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'Current' | 'Past') => {
    setActiveTab(tab);
    setSearchParams({ tab: tab.toLowerCase() });
  };

  // Filter projects by category and limit to exactly 4 cards (2 rows of 2)
  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => p.category === activeTab).slice(0, 4);

  // Helper to get image URL from APP_IMAGES
  const getProjectImage = (imageKey: string) => {
    const asset = APP_IMAGES[imageKey];
    return asset?.src || APP_IMAGES.heroChicagoSkyline.src;
  };

  return (
    <div className="min-h-full flex flex-col text-[#121214] pb-10">
      <AppHeader title="Construction & Design" showBack />

      <div className="px-4 py-3.5 space-y-3.5 max-w-md mx-auto w-full">
        {/* Segmented Pill Tab Switcher with Pure Liquid Glass Effect (No wrapped words) */}
        <div className="grid grid-cols-2 p-1 rounded-full bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(25,25,25,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)]">
          <button
            type="button"
            onClick={() => handleTabChange('Current')}
            className={`py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'Current'
                ? 'btn-glossy-primary text-[#FEFEFE]'
                : 'text-[#82807A] hover:text-[#191919]'
            }`}
          >
            <HardHat className="w-3.5 h-3.5 stroke-[2.2] flex-shrink-0" />
            <span>Current Projects</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('Past')}
            className={`py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'Past'
                ? 'btn-glossy-primary text-[#FEFEFE]'
                : 'text-[#82807A] hover:text-[#191919]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2] flex-shrink-0" />
            <span>Past Projects</span>
          </button>
        </div>

        {/* Section Sub-Header */}
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#323232]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#191919]">
              {activeTab === 'Current' ? 'Current Projects' : 'Past Projects'}
            </span>
          </div>
          <span className="text-[10.5px] font-semibold text-[#82807A]">
            4 Architectural Films
          </span>
        </div>

        {/* 2x2 Grid View: Exactly 4 Cards (2 each row) in Mobile UI structure */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {filteredProjects.map((project) => {
            const isCompleted = project.category === 'Past';
            const imgSrc = getProjectImage(project.imageKey);
            const isSaved = (user.savedProjectIds || []).includes(project.id);

            return (
              <div
                key={project.id}
                onClick={() => navigate(`/construction/${project.id}`)}
                className="relative rounded-[20px] bg-white border border-[#D8D8D8] shadow-[0_4px_16px_rgba(25,25,25,0.04)] overflow-hidden flex flex-col justify-between cursor-pointer group active:scale-[0.98] transition-all hover:border-[#323232]/40 hover:shadow-md"
              >
                {/* Image & Video Presentation Preview */}
                <div className="relative aspect-[4/3] w-full bg-[#191919] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.92]"
                  />

                  {/* Top & Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

                  {/* Top Status Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span
                      className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-md ${
                        isCompleted
                          ? 'bg-[#191919]/85 text-[#D8D8D8] border-white/20'
                          : 'bg-[#22C55E]/90 text-white border-white/30'
                      }`}
                    >
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>

                  {/* Top Right Save Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSavedProject(project.id);
                    }}
                    aria-label={isSaved ? 'Remove from saved' : 'Save project'}
                    className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center transition-transform active:scale-75"
                  >
                    <Heart
                      className={`w-3 h-3 transition-colors ${
                        isSaved ? 'fill-[#323232] text-[#323232]' : 'text-[#82807A] hover:text-[#323232]'
                      }`}
                    />
                  </button>

                  {/* Central Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/95 text-[#121214] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.4)] ring-2 ring-white/30 group-hover:scale-110 group-hover:bg-white transition-all">
                      <Play className="w-3.5 h-3.5 fill-[#121214] text-[#121214] ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Duration Badge */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[8.5px] font-semibold z-10 pointer-events-none">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#C7D3DC]" />
                      <span>{project.videoPresentation.duration}</span>
                    </span>
                    <span className="text-white/80 font-mono text-[8px]">
                      {project.timelineRange.split('–')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Content (Mobile Proportioned) */}
                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-xs sm:text-[13px] font-bold text-[#191919] leading-tight line-clamp-1 group-hover:text-[#323232] transition-colors uppercase">
                      {project.name}
                    </h3>
                    <p className="text-[10px] text-[#82807A] font-medium line-clamp-1 mt-0.5">
                      Watch the presentation
                    </p>
                  </div>

                  {/* Specs & Arrow Row */}
                  <div className="mt-2 pt-1.5 border-t border-[#D8D8D8]/70 flex items-center justify-between text-[9.5px]">
                    <span className="font-bold text-[#323232] truncate">
                      {project.specs.zoningDistrict.split(' ')[0]} &bull; {project.specs.units.split(' ')[0]} {project.specs.units.split(' ')[1] || 'Units'}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#191919]/5 text-[#191919] flex items-center justify-center group-hover:bg-[#323232] group-hover:text-[#FEFEFE] transition-all flex-shrink-0 ml-1 shadow-2xs">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioScreen;
