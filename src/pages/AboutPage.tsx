import { motion } from 'motion/react';
import { Target, Users, Zap, Shield, Globe, Award } from 'lucide-react';
import { asset } from '../lib/utils';

export function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-24">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold">
            The Office of <span className="text-sky-accent">W.M.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed font-light">
            W.M. Development is a specialized engineering office dedicated to building the high-frequency systems of tomorrow. We architect digital presence through modular logic.
          </p>
          <div className="flex gap-12 pt-4">
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-sky-accent">50+</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Deployments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-sky-accent">99.9%</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-sky-accent">12ms</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Latency</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative aspect-square glass rounded-full overflow-hidden border-white/10"
        >
          <img
            src={asset('logo.png')}
            alt="W.M. Development Avatar"
            className="w-full h-full object-contain relative z-10 transition-all duration-500 filter drop-shadow(0 0 10px rgba(0, 242, 254, 0.3))"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-accent/10 via-transparent to-indigo-accent/10" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full h-full border-2 border-sky-accent/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-3/4 h-3/4 border-2 border-indigo-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute w-1/2 h-1/2 border-2 border-white/10 rounded-full animate-[pulse_5s_ease-in-out_infinite]" />
          </div>
        </motion.div>
      </section>

      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display font-bold">
            Our <span className="text-sky-accent">Core Protocols</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Our development philosophy is rooted in three primary principles that define every project we undertake.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Zap, title: 'Dynamic Motion', desc: 'Digital interfaces should feel alive. We implement fluid transitions and real-time responsiveness.' },
            { icon: Shield, title: 'Crystal Integrity', desc: 'Our code is transparent and robust. We prioritize security and clean architecture above all else.' },
            { icon: Target, title: 'Pure Performance', desc: 'No bloat. Only speed. Every system is optimized for maximum efficiency and high-speed execution.' },
          ].map((item) => (
            <div key={item.title} className="glass-card p-10 space-y-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-sky-accent mb-4">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-[40px] p-12 border-white/5 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-accent/5 blur-[80px] rounded-full" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-sky-accent">Parent Corporation</h3>
            <h2 className="text-4xl font-display font-bold text-white">Global Tech Holdings</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              W.M. Development is a subsidiary of Global Tech Holdings, a leader in aerospace and cyber-security infrastructure. This partnership provides us with industrial-grade resources and high-level data centers.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <Award className="text-sky-accent" />
              <span className="text-sm font-semibold">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <Globe className="text-sky-accent" />
              <span className="text-sm font-semibold">Global Infrastructure</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <Users className="text-sky-accent" />
              <span className="text-sm font-semibold">500+ Engineers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
