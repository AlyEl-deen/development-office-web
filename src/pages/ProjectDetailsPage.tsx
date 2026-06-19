import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, Zap, Target, Box, X, ZoomIn } from 'lucide-react';
import { cn, asset } from '../lib/utils';
import { useProject } from '../hooks/useProjects';

export function ProjectDetailsPage() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const projectImages = useMemo(
    () => project ? [project.imageUrl, ...project.galleryImages].filter(Boolean).map(asset) : [],
    [project]
  );
  const activeImage = projectImages[activeImageIndex] || '';

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedImage(null);
  }, [id]);

  const changeImage = (direction: -1 | 1) => {
    setActiveImageIndex((current) => {
      if (projectImages.length === 0) return current;
      return (current + direction + projectImages.length) % projectImages.length;
    });
  };

  const changeSelectedImage = (direction: -1 | 1) => {
    if (!selectedImage || projectImages.length === 0) return;
    const currentIndex = projectImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + direction + projectImages.length) % projectImages.length;
    setSelectedImage(projectImages[nextIndex]);
    setActiveImageIndex(nextIndex);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="h-6 w-44 animate-pulse rounded-sm bg-white/10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card aspect-video animate-pulse bg-white/5" />
          <div className="space-y-6">
            <div className="h-10 w-3/4 animate-pulse rounded-sm bg-white/10" />
            <div className="h-32 animate-pulse rounded-2xl bg-white/5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-56 animate-pulse rounded-3xl bg-white/5" />
              <div className="h-56 animate-pulse rounded-3xl bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 text-center h-[80vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl font-bold text-white">Project Unavailable</h2>
        <p className="mt-4 max-w-md text-slate-400">{error}</p>
        <Link to="/" className="text-anubis-cyan mt-6 hover:underline">Return Home</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 text-center h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-white">Project Not Found</h2>
        <Link to="/" className="text-anubis-cyan mt-4 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-12"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-anubis-cyan transition-colors font-display text-sm font-black uppercase tracking-[0.2em]">
        <ArrowLeft size={16} />
        Back to Portfolio
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery/Image */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <div 
            onClick={() => activeImage && setSelectedImage(activeImage)}
            className="relative glass-card rounded-2xl md:rounded-3xl overflow-hidden border-white/10 group cursor-zoom-in"
          >
            {activeImage ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={project.name}
                  initial={{ opacity: 0.55, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full aspect-[4/3] sm:aspect-video object-contain bg-black/30 transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>
            ) : (
              <div className="w-full aspect-[4/3] sm:aspect-video bg-black/30 flex items-center justify-center text-slate-500">
                Project media pending
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-anubis-dark/85 via-transparent to-black/20 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-anubis-cyan/20 backdrop-blur-md p-4 rounded-full border border-anubis-cyan/30">
                <ZoomIn className="text-anubis-cyan w-8 h-8" />
              </div>
            </div>
            {projectImages.length > 0 && (
              <div className="absolute top-3 left-3 rounded-sm bg-black/60 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md md:hidden">
                {activeImageIndex + 1} / {projectImages.length}
              </div>
            )}
            {projectImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeImage(-1);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-anubis-cyan hover:text-anubis-dark"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeImage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-anubis-cyan hover:text-anubis-dark"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <div className="absolute bottom-6 left-6 right-6 hidden md:block">
              <span className="badge-anubis">{project.category}</span>
              <h1 className="text-5xl font-display font-black mt-2 text-white uppercase tracking-tight">{project.name}</h1>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            <span className="badge-anubis w-fit">{project.category}</span>
            <h1 className="font-display text-3xl font-black text-white uppercase tracking-tight leading-tight">{project.name}</h1>
          </div>
          
          {projectImages.length > 1 && (
            <div className="flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
              {projectImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`} 
                  onClick={() => setActiveImageIndex(index)} 
                  className={cn(
                    "glass h-20 w-28 shrink-0 snap-start rounded-xl border-white/5 opacity-55 hover:opacity-100 transition-all cursor-pointer flex items-center justify-center group overflow-hidden md:h-auto md:w-auto md:aspect-video md:rounded-2xl",
                    activeImageIndex === index && "opacity-100 border-anubis-cyan/60 ring-2 ring-anubis-cyan/30"
                  )}
                >
                  <img src={image} alt={`${project.name} preview ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-black flex items-center gap-2 uppercase tracking-wide text-white">
              <Zap className="text-anubis-gold" size={20} />
              Executive Summary
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg font-light">
              {project.fullDescription}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full text-center flex items-center justify-center gap-3 group md:w-fit"
              >
                Open Site
                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
              <h3 className="font-display font-bold flex items-center gap-3 uppercase tracking-widest text-sm text-white">
                <Target className="text-anubis-gold" size={18} />
                Key Features
              </h3>
              <ul className="space-y-4">
                {project.features.length > 0 ? project.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={16} className="text-anubis-cyan mt-0.5" />
                    {f}
                  </li>
                )) : (
                  <li className="text-sm text-slate-500">Feature details pending.</li>
                )}
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
              <h3 className="font-display font-bold flex items-center gap-3 uppercase tracking-widest text-sm text-white">
                <Box className="text-anubis-gold" size={18} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.length > 0 ? project.techStack.map(t => (
                  <span key={t} className="bg-white/5 px-4 py-1.5 rounded-sm text-[10px] uppercase font-black tracking-widest text-anubis-cyan border border-anubis-cyan/20">{t}</span>
                )) : (
                  <span className="text-sm text-slate-500">Tech stack pending.</span>
                )}
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-3xl border-anubis-gold/20 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-anubis-gold/5 blur-3xl group-hover:bg-anubis-gold/10 transition-colors" />
            <div className="space-y-2 text-center md:text-left z-10">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">Estimated Investment</p>
              <p className="text-4xl font-display font-black text-white">{project.priceRange}</p>
            </div>
            <Link to="/order" className="btn-primary w-full md:w-auto text-center flex items-center justify-center gap-3 group z-10">
              Start Project
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-anubis-dark/95 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-9 w-9 md:h-12 md:w-12" strokeWidth={1} />
            </motion.button>
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-anubis-cyan hover:text-anubis-dark md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                changeSelectedImage(-1);
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-anubis-cyan hover:text-anubis-dark md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                changeSelectedImage(1);
              }}
            >
              <ChevronRight size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl w-full aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40"
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-anubis-cyan font-black uppercase tracking-[0.5em] text-xs">Visual Inspection Mode</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
