import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Terminal, Briefcase, Info, Mail } from 'lucide-react';
import { useState } from 'react';
import { asset } from '../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', path: '/', icon: Briefcase },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Order', path: '/order', icon: Terminal },
    { name: 'Contact', path: '#contact', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-2xl px-6 py-3 border-white/10">
        <Link to="/" className="flex items-center gap-3 group">
          {/* <div className="w-10 h-10 bg-gradient-to-br "> */}
            <img src={asset('logo.png')} alt="W.M. logo" className="w-20 h-20 object-contain from-anubis-cyan to-anubis-teal rounded-sm flex items-center justify-center drop-shadow-[0_0_25px_rgba(0,242,254,0.7)] transition-transform group-hover:rotate-45 overflow-hidden" />
         {/*  </div> */}
          <span className="font-display font-bold text-xl tracking-[0.2em] text-white">W.M. <span className="hidden sm:inline">DEVELOPMENT</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.name === 'Contact' ? (
              <a
                key={link.name}
                href={link.path}
                className="text-[10px] font-display font-black text-slate-400 hover:text-anubis-cyan transition-colors tracking-[0.3em] uppercase"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="text-[10px] font-display font-black text-slate-400 hover:text-anubis-cyan transition-colors tracking-[0.3em] uppercase"
              >
                {link.name}
              </Link>
            )
          ))}
          <Link to="/order" className="bg-anubis-gold/10 border border-anubis-gold/30 px-5 py-2 text-anubis-gold text-[10px] font-black uppercase tracking-[0.2em] hover:bg-anubis-gold hover:text-anubis-dark transition-all">
            Initiate System
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-3xl p-6 flex flex-col gap-4 border-gold/10"
        >
          {navLinks.map((link) => (
            link.name === 'Contact' ? (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-lg font-display text-slate-300 hover:text-gold transition-colors"
              >
                <link.icon size={20} />
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-lg font-display text-slate-300 hover:text-gold transition-colors"
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            )
          ))}
        </motion.div>
      )}
    </nav>
  );
}
