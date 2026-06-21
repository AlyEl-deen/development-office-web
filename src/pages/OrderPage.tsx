import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Shield, Rocket, Globe, Smartphone, Server } from 'lucide-react';

export function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    personalEmail: '',
    personalPhone: '',
    whatsapp: '',
    companyName: '',
    companyEmail: '',
    companyAddress: '',
    companyMobile: '',
    projectType: 'Website',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setFormData({
        customerName: '',
        customerEmail: '',
        personalEmail: '',
        personalPhone: '',
        whatsapp: '',
        companyName: '',
        companyEmail: '',
        companyAddress: '',
        companyMobile: '',
        projectType: 'Website',
        details: ''
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError("Submission failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 h-[80vh] flex flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-12 text-center space-y-6 max-w-md border-sky-accent/30"
        >
          <div className="w-20 h-20 bg-sky-accent rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-sky-500/40">
            <CheckCircle2 color="#020617" size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold text-white">Transmission Received</h2>
          <p className="text-slate-400">Our engineering team has received your request. We will analyze the requirements and reach out within 24 standard hours.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-outline w-full"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h1 className="text-6xl font-display font-bold text-white">System <span className="text-sky-accent">Initiation</span></h1>
        <p className="text-slate-400 text-lg font-light">Define your vision. We provide the architecture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.35em] text-sky-accent">Personal Information</p>
              <p className="mt-1 text-xs text-slate-500">Tell us who we should contact about this request.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Personal Email Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value, personalEmail: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Personal Phone Number</label>
                <input
                  type="tel"
                  value={formData.personalPhone}
                  onChange={(e) => setFormData({...formData, personalPhone: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="+20 100 000 0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">WhatsApp</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="+20 100 000 0000"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.35em] text-sky-accent">Company Information</p>
              <p className="mt-1 text-xs text-slate-500">Add business details if this project is for a company.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="ACME Inc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Company Email</label>
                <input
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({...formData, companyEmail: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="contact@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Company Mobile</label>
                <input
                  type="tel"
                  value={formData.companyMobile}
                  onChange={(e) => setFormData({...formData, companyMobile: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="+20 100 000 0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Company Address</label>
                <input
                  type="text"
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                  className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors text-white"
                  placeholder="123 Business St, City, Country"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Project Vector</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Website', icon: Globe },
                { id: 'Mobile App', icon: Smartphone },
                { id: 'System', icon: Server }
              ].map(type => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({...formData, projectType: type.id as any})}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    formData.projectType === type.id 
                    ? 'bg-sky-accent/10 border-sky-accent text-sky-accent shadow-lg shadow-sky-500/5' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'
                  }`}
                >
                  <type.icon size={20} className="mb-2" />
                  <span className="text-xs font-bold font-display uppercase tracking-wider">{type.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Engineering Requirements</label>
            <textarea 
              required
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              rows={5}
              className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sky-accent transition-colors resize-none text-white"
              placeholder="Tell us about the features, goals, and technological scope..."
            />
          </div>

          {submitError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {submitError}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-3"
          >
            {loading ? "Transmitting..." : "Initialize Protocol"}
            <Send size={18} />
          </button>
        </form>

        <div className="space-y-8">
           <div className="glass-card p-6 border-white/5 space-y-4">
              <h3 className="font-display font-bold flex items-center gap-2 text-white">
                <Shield className="text-sky-accent" size={20} />
                Quality Assurance
              </h3>
              <p className="text-sm text-slate-400">All W.M. Development projects undergo rigorous stress testing and multi-layer security auditing.</p>
           </div>
           
           <div className="glass-card p-6 border-white/5 space-y-4">
              <h3 className="font-display font-bold flex items-center gap-2 text-white">
                <Rocket className="text-sky-accent" size={20} />
                Rapid Deployment
              </h3>
              <p className="text-sm text-slate-400">Our modular frameworks allow for synchronous feature rollout across all platforms.</p>
           </div>

           <div className="p-6 bg-white/5 border border-dashed border-sky-accent/20 rounded-3xl flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-sky-accent/10 flex items-center justify-center text-sky-accent group-hover:bg-sky-accent group-hover:text-white transition-all">
                <Smartphone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Direct Line</p>
                <p className="text-lg text-white font-display font-bold">Simulation Call</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
