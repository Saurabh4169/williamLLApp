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
    <div className="min-h-full flex flex-col text-[#1F2A44] pb-10">
      <AppHeader title="Construction & Design" showBack />

      <div className="px-4 py-3.5 space-y-3.5 max-w-md mx-auto w-full">
        {/* Segmented Pill Tab Switcher with Pure Liquid Glass Effect (No wrapped words) */}
        <div className="grid grid-cols-2 p-1 rounded-full bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(31,42,68,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)]">
          <button
            type="button"
            onClick={() => handleTabChange('Current')}
            className={`py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'Current'
                ? 'btn-glossy-navy shadow-[0_4px_14px_rgba(31,42,68,0.25)] text-white'
                : 'text-[#5A657D] hover:text-[#1F2A44]'
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
                ? 'btn-glossy-navy shadow-[0_4px_14px_rgba(31,42,68,0.25)] text-white'
                : 'text-[#5A657D] hover:text-[#1F2A44]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2] flex-shrink-0" />
            <span>Past Projects</span>
          </button>
        </div>

        {/* Section Sub-Header */}
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D4D7C]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F2A44]">
              {activeTab === 'Current' ? 'Current Projects' : 'Past Projects'}
            </span>
          </div>
          <span className="text-[10.5px] font-semibold text-[#8A93A6]">
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
                className="relative rounded-[20px] bg-white border border-[#DDE2EA] shadow-[0_4px_16px_rgba(31,42,68,0.05)] overflow-hidden flex flex-col justify-between cursor-pointer group active:scale-[0.98] transition-all hover:border-[#3D4D7C]/40 hover:shadow-md"
              >
                {/* Image & Video Presentation Preview */}
                <div className="relative aspect-[4/3] w-full bg-[#1F2A44] overflow-hidden">
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
                          ? 'bg-[#1F2A44]/85 text-[#DDE2EA] border-white/20'
                          : 'bg-[#3FA66B]/90 text-white border-white/30'
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
                        isSaved ? 'fill-[#E5484D] text-[#E5484D]' : 'text-[#5A657D] hover:text-[#E5484D]'
                      }`}
                    />
                  </button>

                  {/* Central Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/95 text-[#1F2A44] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.4)] ring-2 ring-white/30 group-hover:scale-110 group-hover:bg-white transition-all">
                      <Play className="w-3.5 h-3.5 fill-[#1F2A44] text-[#1F2A44] ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Duration Badge */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[8.5px] font-semibold z-10 pointer-events-none">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#B7C3DA]" />
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
                    <h3 className="font-heading text-xs sm:text-[13px] font-bold text-[#1F2A44] leading-tight line-clamp-1 group-hover:text-[#3D4D7C] transition-colors uppercase">
                      {project.name}
                    </h3>
                    <p className="text-[10px] text-[#5A657D] font-medium line-clamp-1 mt-0.5">
                      Watch the presentation
                    </p>
                  </div>

                  {/* Specs & Arrow Row */}
                  <div className="mt-2 pt-1.5 border-t border-[#DDE2EA]/70 flex items-center justify-between text-[9.5px]">
                    <span className="font-bold text-[#3D4D7C] truncate">
                      {project.specs.zoningDistrict.split(' ')[0]} &bull; {project.specs.units.split(' ')[0]} {project.specs.units.split(' ')[1] || 'Units'}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#1F2A44]/5 text-[#1F2A44] flex items-center justify-center group-hover:bg-[#1F2A44] group-hover:text-white transition-all flex-shrink-0 ml-1 shadow-2xs">
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
