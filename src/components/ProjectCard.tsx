import { motion } from 'motion/react';
import { Project, asset } from '../lib/utils';
import { ExternalLink, Code2, Layout, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const icons = {
  'Website': Layout,
  'Mobile App': Smartphone,
  'System': Code2
};

export function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.category];
  const imageUrl = project.imageUrl ? asset(project.imageUrl) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card group cursor-pointer overflow-hidden p-0"
    >
      <Link to={`/project/${project.id}`}>
        <div className="relative h-48 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.16),rgba(1,19,19,0.88)_62%)]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={project.name} 
              className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105 brightness-100 saturate-110 group-hover:brightness-110 group-hover:saturate-125"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-slate-500">
              Media pending
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-anubis-dark via-anubis-dark/10 to-transparent opacity-70" />
          <div className="absolute top-4 right-4 bg-anubis-gold text-anubis-dark p-2 shadow-[0_0_15px_rgba(255,179,0,0.4)]">
            <Icon size={18} />
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex flex-col gap-1">
            <span className="badge-anubis w-fit">{project.category}</span>
            <h3 className="font-display text-2xl font-bold text-white group-hover:text-anubis-cyan transition-colors uppercase tracking-tight">{project.name}</h3>
          </div>
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-light">{project.shortDescription}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">Module Profile Ready</span>
            <div className="w-8 h-8 bg-white/5 flex items-center justify-center text-white group-hover:bg-anubis-cyan group-hover:text-anubis-dark transition-all">
              <ExternalLink size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
