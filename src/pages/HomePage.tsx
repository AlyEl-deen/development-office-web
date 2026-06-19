import { ProjectCard } from '../components/ProjectCard';
import { PartnersSection } from '../components/PartnersSection';
import { motion } from 'motion/react';
import { ArrowRight, Code, Smartphone, Rocket, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { asset } from '../lib/utils';
import { useProjects } from '../hooks/useProjects';

export function HomePage() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="pt-24 space-y-20">
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-40 pointer-events-none">
           <div className="absolute inset-0 bg-anubis-cyan/10 blur-[200px] rounded-full animate-pulse" />
           <div className="absolute top-0 left-1/4 w-[1px] h-[800px] bg-gradient-to-b from-transparent via-anubis-cyan/40 to-transparent rotate-45"></div>
           <div className="absolute top-0 right-1/4 w-[1px] h-[700px] bg-gradient-to-b from-transparent via-anubis-gold/40 to-transparent -rotate-12"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 max-w-6xl z-10 flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
               y: [0, -10, 2] 
            }}
            whileHover={{ 
              scale: 1.1,
              rotateY: 180,
              filter: "drop-shadow(0 0 50px rgba(0, 242, 254, 0.6))"
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              scale: { type: "spring", stiffness: 300 },
              rotateY: { type: "spring", stiffness: 200, damping: 10 }
            }}
            className="relative w-48 h-48 md:w-64 md:h-64 mb-4 cursor-pointer group"
          >
            <div className="absolute inset-0 bg-anubis-cyan/20 rounded-full blur-2xl animate-pulse group-hover:bg-anubis-cyan/40 transition-colors" />
            
            <img 
              src={asset('logo.png')} 
              alt="W.M. Development Avatar"
              className="w-full h-full object-contain relative z-10 transition-all duration-500 filter drop-shadow(0 0 10px rgba(0, 242, 254, 0.3))"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
              }}
            />
            
            <div className="fallback hidden absolute inset-0 flex items-center justify-center bg-white/5 border border-anubis-cyan/30 rounded-full backdrop-blur-md">
              <Rocket size={48} className="text-anubis-cyan" />
            </div>
          </motion.div>
          <div className="inline-flex items-center gap-2 bg-anubis-cyan/10 border border-anubis-cyan/20 px-5 py-2 rounded-sm text-anubis-cyan text-[9px] font-black uppercase tracking-[0.4em]">
            <Rocket size={14} />
            Technological Excellence Protocol
          </div>
          <h1 className="font-display text-7xl md:text-[12rem] font-black text-white leading-none tracking-tighter">
            W.M. <br className="md:hidden" /><span className="text-anubis-gold shadow-anubis-gold/20">DEV</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light uppercase tracking-widest italic opacity-80">
            Constructing the next generation of <span className="text-anubis-cyan font-bold">digital monoliths</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            <Link to="/order" className="btn-primary group flex items-center gap-4">
              Initialize Protocol
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <a href="#projects" className="btn-outline">Browse Modules</a>
          </div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {[
          { icon: Globe, title: 'Web Systems', desc: 'Monolithic architectures for global reach.' },
          { icon: Smartphone, title: 'Mobile Nexus', desc: 'Fluid, cross-platform neural interfaces.' },
          { icon: Code, title: 'Logic Cores', desc: 'Immutable, crystalline system architecture.' }
        ].map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-12 flex flex-col items-start text-left gap-6 group hover:border-anubis-gold/40 border-l-4 border-l-anubis-cyan"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-anubis-gold group-hover:bg-anubis-gold group-hover:text-anubis-dark transition-all">
              <service.icon size={28} />
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-3xl font-black text-white uppercase tracking-tight">{service.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed tracking-wide">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4 text-left">
            <h2 className="text-[10px] font-black text-anubis-cyan uppercase tracking-[0.5em]">Active Core Modules</h2>
            <h3 className="font-display text-6xl font-black text-white">Technological <span className="text-anubis-gold">Showcase</span></h3>
          </div>
          <button className="text-xs text-sky-400 underline underline-offset-8 font-bold uppercase tracking-widest hover:text-white transition-colors">
            Explore All Modules
          </button>
        </div>
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="glass-card h-[360px] animate-pulse bg-white/5" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="glass p-10 rounded-2xl border-red-500/20 text-center">
            <h4 className="font-display text-2xl font-black text-white">Projects unavailable</h4>
            <p className="mt-3 text-sm text-slate-400">{error}</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="glass p-10 rounded-2xl border-white/10 text-center">
            <h4 className="font-display text-2xl font-black text-white">No projects published yet</h4>
            <p className="mt-3 text-sm text-slate-400">Add project documents in Firestore to populate this showcase.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <PartnersSection />
    </div>
  );
}
