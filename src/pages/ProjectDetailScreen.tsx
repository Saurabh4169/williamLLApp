import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Heart,
  Phone,
  Calendar,
  ArrowRight,
  Sparkles,
  Building2,
  Layers,
  Compass,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { APP_IMAGES } from '../data/images';
import { useAppStore } from '../store/useAppStore';
import AppHeader from '../components/layout/AppHeader';

export const ProjectDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleSavedProject } = useAppStore();

  // Find project by id or fallback to first
  const project = PORTFOLIO_PROJECTS.find((p) => p.id === id) || PORTFOLIO_PROJECTS[0];

  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(28);

  const isFavorite = (user.savedProjectIds || []).includes(project.id);

  // Helper to get image URL from APP_IMAGES
  const getProjectImage = (imageKey: string) => {
    const asset = APP_IMAGES[imageKey];
    return asset?.src || APP_IMAGES.heroChicagoSkyline.src;
  };

  const isCompleted = project.category === 'Past';

  return (
    <div className="min-h-full flex flex-col text-[#1F2A44] bg-[#F2F3F5] pb-24">
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
              onClick={() => toggleSavedProject(project.id)}
              aria-label={isFavorite ? 'Remove from saved' : 'Save project'}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-[#DDE2EA] text-[#1F2A44] flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-2xs"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isFavorite ? 'fill-[#E5484D] text-[#E5484D]' : 'text-[#1F2A44]'
                }`}
              />
            </button>
          </div>
        }
      />

      <div className="px-4 py-3 space-y-4 max-w-md mx-auto w-full">
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
        <div className="relative rounded-[20px] overflow-hidden bg-[#0A0D15] shadow-md border border-white/80">
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
            <div className="absolute top-2.5 right-2.5 z-10">
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
                className="w-13 h-13 rounded-full bg-white/95 text-[#1F2A44] flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5)] ring-4 ring-white/40 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlayingVideo ? (
                  <Pause className="w-5 h-5 fill-[#1F2A44] text-[#1F2A44]" />
                ) : (
                  <Play className="w-5 h-5 fill-[#1F2A44] text-[#1F2A44] ml-0.5" />
                )}
              </button>
            </div>

            {/* Player Bottom Scrub Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent z-10 text-white text-[10px]">
              <div className="flex items-center justify-between mb-1 text-white/80 font-mono text-[9px]">
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

              <div className="flex items-center justify-between mt-1 text-white/80">
                <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#B7C3DA]">
                  HD 4K &bull; Architectural Film
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-white"
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="p-1 hover:text-white"
                    aria-label="Full Screen"
                  >
                    <Maximize2 className="w-3 h-3" />
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
            <span className="text-[10px] text-[#8A93A6]">Tap to switch angle</span>
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
                  <div className="absolute inset-x-0 bottom-0 pt-3 pb-1 bg-gradient-to-t from-black/75 to-transparent flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white px-1 truncate">
                      {item.title.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Verified City Hall Approval Pill */}
        <div className="rounded-[16px] p-2.5 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/60 border border-emerald-200/70 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#3FA66B]/15 text-[#3FA66B] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
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

        {/* 4. Specifications Grid (4 Focused Cards) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1F2A44]">
              Project Specifications
            </h3>
            <span className="text-[10px] font-semibold text-[#3D4D7C]">
              Verified Parcel Data
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[14px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Zoning District
                </span>
                <Building2 className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                {project.specs.zoningDistrict}
              </span>
            </div>

            <div className="rounded-[14px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Scale &amp; Units
                </span>
                <Layers className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                {project.specs.units}
              </span>
            </div>

            <div className="rounded-[14px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Floor Area Ratio
                </span>
                <Compass className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                {project.specs.far}
              </span>
            </div>

            <div className="rounded-[14px] p-2.5 bg-white border border-[#DDE2EA] shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#8A93A6] mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  Chicago Ward
                </span>
                <MapPin className="w-3.5 h-3.5 text-[#3D4D7C]" />
              </div>
              <span className="font-heading text-xs font-bold text-[#1F2A44] truncate">
                {project.specs.wardAlderman}
              </span>
            </div>
          </div>
        </div>

        {/* 5. In-Page Direct Action Card (No floating bar clutter) */}
        <div className="p-4 rounded-[20px] bg-white border border-[#DDE2EA] shadow-sm space-y-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D4D7C]">
              Have a Similar Development?
            </span>
            <h4 className="font-heading text-sm font-bold text-[#1F2A44] mt-0.5">
              Consult with Williams &amp; Williams
            </h4>
            <p className="text-xs text-[#5A657D] mt-0.5">
              Get an immediate preliminary review for variance feasibility and hearing timelines.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => navigate('/quote')}
              className="w-full py-2.5 px-4 rounded-full btn-glossy-navy text-xs font-bold shadow-xs flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <span>Request Project Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:630-635-7688"
                className="py-2 px-3 rounded-full bg-white border border-[#DDE2EA] text-[#1F2A44] text-xs font-semibold text-center flex items-center justify-center gap-1.5 hover:bg-[#F2F3F5] active:scale-95 transition-all"
              >
                <Phone className="w-3 h-3 text-[#3D4D7C]" />
                <span>630-635-7688</span>
              </a>

              <button
                type="button"
                onClick={() => navigate('/book-consultation')}
                className="py-2 px-3 rounded-full bg-white border border-[#DDE2EA] text-[#1F2A44] text-xs font-semibold text-center flex items-center justify-center gap-1.5 hover:bg-[#F2F3F5] active:scale-95 transition-all"
              >
                <Calendar className="w-3 h-3 text-[#3D4D7C]" />
                <span>Book Consult</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailScreen;
