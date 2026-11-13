import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Layers,
  Building2,
  Compass,
  Share2,
  Heart,
  Phone,
  ArrowRight,
  HardHat,
  CheckCircle2,
  Sparkles,
  Maximize2,
  ChevronLeft,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { APP_IMAGES } from '../data/images';
import AppHeader from '../components/layout/AppHeader';

export const ProjectDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find project by id or fallback to first
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id) || PORTFOLIO_PROJECTS[0];

  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(28);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Helper to get image URL from APP_IMAGES
  const getProjectImage = (imageKey: string) => {
    const asset = APP_IMAGES[imageKey];
    return asset?.src || APP_IMAGES.heroChicagoSkyline.src;
  };

  const isCompleted = project.category === 'Past';

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] bg-[#F2F3F5]">
      {/* Standard Unified AppHeader */}
      <AppHeader
        showBack
        rightAction={
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: project.name,
                    text: `Check out ${project.name} entitled by Williams & Williams LLC`,
                    url: window.location.href,
                  });
                }
              }}
              aria-label="Share Project"
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-[#DDE2EA] text-[#1F2A44] flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Favorite Project"
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-[#DDE2EA] text-[#1F2A44] flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-2xs"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isFavorite ? 'fill-[#E5484D] text-[#E5484D]' : 'text-[#1F2A44]'
                }`}
              />
            </button>
          </div>
        }
      />

      <main className="px-4 py-3.5 space-y-4 max-w-md mx-auto w-full">
        {/* Project Header Info */}
        <div>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border shadow-2xs ${
                isCompleted
                  ? 'bg-[#1F2A44] text-white border-[#1F2A44]'
                  : 'bg-[#3FA66B] text-white border-[#3FA66B]'
              }`}
            >
              {isCompleted ? 'Completed' : 'In Progress'}
            </span>
            <span className="text-[10px] font-semibold text-[#8A93A6]">
              {project.timelineRange}
            </span>
          </div>

          <h1 className="font-heading text-lg sm:text-xl font-black text-[#1F2A44] uppercase tracking-tight mt-1">
            {project.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs text-[#5A657D] font-medium mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#3D4D7C] flex-shrink-0" />
            <span className="truncate">{project.address}</span>
          </div>
        </div>

        {/* 1. Architectural Video Presentation Player */}
        <div className="relative rounded-[22px] overflow-hidden bg-[#0A0D15] shadow-md border border-white/80">
          <div className="relative aspect-[16/10] w-full">
            <img
              src={getProjectImage(
                project.gallery[activeGalleryIndex]?.imageKey || project.imageKey
              )}
              alt={project.name}
              className="w-full h-full object-cover"
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

            {/* 360° / Film View Badge */}
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9.5px] font-bold flex items-center gap-1.5 border border-white/20 shadow-xs active:scale-95 transition-all"
              >
                <Sparkles className="w-3 h-3 text-[#B7C3DA]" />
                <span>{isPlayingVideo ? 'Presentation Active' : '360° Film View'}</span>
              </button>
            </div>

            {/* Central Play/Pause Action */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                type="button"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                aria-label={isPlayingVideo ? 'Pause Presentation' : 'Play Presentation'}
                className="w-14 h-14 rounded-full bg-white/95 text-[#1F2A44] flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5)] ring-4 ring-white/40 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlayingVideo ? (
                  <Pause className="w-6 h-6 fill-[#1F2A44] text-[#1F2A44]" />
                ) : (
                  <Play className="w-6 h-6 fill-[#1F2A44] text-[#1F2A44] ml-0.5" />
                )}
              </button>
            </div>

            {/* Player Bottom Scrub Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent z-10 text-white text-[10px]">
              <div className="flex items-center justify-between mb-1 text-white/80 font-mono text-[9.5px]">
                <span>{isPlayingVideo ? '01:24' : '00:00'}</span>
                <span className="font-semibold text-white truncate px-2">
                  {project.videoPresentation.title}
                </span>
                <span>{project.videoPresentation.duration}</span>
              </div>

              {/* Progress Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = Math.round((clickX / rect.width) * 100);
                  setVideoProgress(Math.max(5, Math.min(95, pct)));
                }}
                className="w-full h-1 bg-white/25 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#B7C3DA] to-white rounded-full transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-1.5 text-white/80">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#B7C3DA]">
                  HD 4K &bull; Architectural Film
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-white"
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="p-1 hover:text-white"
                    aria-label="Full Screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Thumbnail Gallery Strip */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1F2A44] px-0.5">
            <span>Architectural Angles</span>
            <span className="text-[10px] text-[#8A93A6]">Tap to view angle</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {project.gallery.map((item, idx) => {
              const isSelected = activeGalleryIndex === idx;
              const thumbSrc = getProjectImage(item.imageKey);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveGalleryIndex(idx);
                    setIsPlayingVideo(false);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all active:scale-95 group shadow-2xs ${
                    isSelected
                      ? 'border-[#1F2A44] ring-2 ring-[#3D4D7C]/50 shadow-sm scale-[1.02]'
                      : 'border-[#DDE2EA] hover:border-[#3D4D7C]/50'
                  }`}
                >
                  <img
                    src={thumbSrc}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-[0.98]"
                  />
                  <div className="absolute inset-x-0 bottom-0 pt-4 pb-1 bg-gradient-to-t from-black/75 to-transparent flex items-center justify-center">
                    <span className="text-[8.5px] font-bold text-white px-1 truncate">
                      {item.title.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Verified City Hall Approval Glass Banner */}
        <div className="rounded-[18px] p-3 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/60 border border-emerald-200/70 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3FA66B]/15 text-[#3FA66B] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2A44]">
                City of Chicago ZBA Approved
              </h4>
              <p className="text-[10px] text-[#5A657D] line-clamp-1">
                {project.zoningChange}
              </p>
            </div>
          </div>

          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#3FA66B] text-white shadow-2xs flex-shrink-0">
            Certified
          </span>
        </div>

        {/* 4. Specifications Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
              Project Specifications
            </h3>
            <span className="text-[10.5px] font-semibold text-[#3D4D7C]">
              Verified Parcel Data
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-[16px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Zoning
                </span>
                <Building2 className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] leading-tight truncate">
                {project.specs.zoningDistrict}
              </span>
            </div>

            <div className="rounded-[16px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Scale
                </span>
                <Layers className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] leading-tight truncate">
                {project.specs.units}
              </span>
            </div>

            <div className="rounded-[16px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  FAR
                </span>
                <Compass className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] leading-tight truncate">
                {project.specs.far}
              </span>
            </div>

            <div className="rounded-[16px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Timeline
                </span>
                <Calendar className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] leading-tight truncate">
                {project.specs.timeline}
              </span>
            </div>

            <div className="rounded-[16px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Structure
                </span>
                <HardHat className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] leading-tight truncate">
                {project.specs.constructionType}
              </span>
            </div>

            <div className="rounded-[16px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-1">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Ward
                </span>
                <MapPin className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] leading-tight truncate">
                {project.specs.wardAlderman}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Architectural Narrative */}
        <div className="rounded-[20px] p-3.5 bg-white border border-[#DDE2EA] shadow-xs space-y-1.5">
          <h4 className="font-heading text-xs font-bold text-[#1F2A44] uppercase tracking-wider">
            About This Development
          </h4>
          <p className="text-xs text-[#5A657D] leading-relaxed">
            {project.description}
          </p>
          <div className="pt-2 border-t border-[#DDE2EA]/70 text-[10.5px] text-[#3D4D7C] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{project.videoPresentation.directorNote}</span>
          </div>
        </div>
      </main>

      {/* 6. Sticky Docked Mobile Action Bar (Strictly contained inside mobile phone frame) */}
      <div className="sticky bottom-0 left-0 right-0 z-30 w-full mt-auto p-3.5 bg-white/95 backdrop-blur-xl border-t border-[#DDE2EA] shadow-[0_-6px_20px_rgba(31,42,68,0.08)] space-y-2">
        <button
          type="button"
          onClick={() => navigate('/quote')}
          className="w-full py-2.5 px-4 rounded-full btn-glossy-navy text-xs font-bold shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Request Similar Project Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:630-635-7688"
            className="py-2 px-3 rounded-full bg-white border border-[#DDE2EA] text-[#1F2A44] text-xs font-bold text-center flex items-center justify-center gap-1.5 hover:bg-[#F2F3F5] active:scale-95 transition-all shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#3D4D7C]" />
            <span>630-635-7688</span>
          </a>

          <button
            type="button"
            onClick={() => navigate('/book-consultation')}
            className="py-2 px-3 rounded-full bg-white border border-[#DDE2EA] text-[#1F2A44] text-xs font-bold text-center flex items-center justify-center gap-1.5 hover:bg-[#F2F3F5] active:scale-95 transition-all shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#3D4D7C]" />
            <span>Book Consult</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailScreen;

