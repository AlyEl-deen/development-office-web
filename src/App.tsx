import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ChatWidget } from './components/ChatWidget';
import { HomePage } from './pages/HomePage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { OrderPage } from './pages/OrderPage';
import { AboutPage } from './pages/AboutPage';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { asset } from './lib/utils';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col relative">
        <ScrollToTop />
        <Navbar />
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectDetailsPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer id="contact" className="py-12 border-t border-white/5 bg-teal-950/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-tighter">W.M. Development</h3>
              <p className="text-sm text-slate-500 max-w-sm">Architecting the future through advanced digital systems and immersive presence.</p>
            </div>
            <div className="flex gap-12">
               <div className="space-y-3">
                  <p className="text-xs uppercase font-bold text-gold tracking-widest">Protocol</p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li><Link to="/" className="hover:text-gold transition-colors">Portfolio</Link></li>
                    <li><Link to="/about" className="hover:text-gold transition-colors">Introduction</Link></li>
                    <li><Link to="/order" className="hover:text-gold transition-colors">Sys-Orders</Link></li>
                  </ul>
               </div>
               <div className="space-y-3">
                  <p className="text-xs uppercase font-bold text-gold tracking-widest">Contact</p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li><a href="mailto:contact@wmd-office.com" className="hover:text-gold transition-colors">contact@wmd-office.com</a></li>
                    <li><a href="tel:+201067672492" className="hover:text-gold transition-colors">01067672492</a></li>
                    <li><a href="#" className="hover:text-gold transition-colors">Red Sea, Egypt</a></li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-12 text-[10px] uppercase font-bold tracking-widest text-slate-600 flex justify-between">
             
  <div className="container mx-auto px-6 flex flex-col items-center justify-center">
    
    <div className="flex flex-col items-center justify-center gap-3 mt-3">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center drop-shadow-[0_0_22px_rgba(0,168,143,0.5)] sm:h-32 sm:w-32">
        <img
          src={asset('logo.png')}
          alt="W.M.D. office logo"
          className="h-full w-full object-contain"
        />
      </div>

    <div className="text-center">
      <p className="text-white text-sm md:text-base font-medium tracking-widest">
        © 2026 <span className="font-bold">Future Coders </span>
      </p>
      
      <p className="text-[#00a88f] text-[10px] mt-2 uppercase tracking-[0.32em] sm:tracking-[0.4em] font-semibold opacity-80">
        Powered by W.M.D. office
      </p>
    </div>
    </div>

    <div className="flex items-center gap-2 mt-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a88f] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a88f]"></span>
      </span>
      <span className="text-gray-500 text-[9px] uppercase tracking-tighter">System Active</span>
    </div>
  </div>
          </div>
        </footer>

        <ChatWidget />
      </div>
    </Router>
  );
}
