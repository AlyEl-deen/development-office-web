import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { motion, type Variants } from 'motion/react';
import { Partner, asset, cn } from '../lib/utils';
import { ShieldCheck } from 'lucide-react';

const partnerGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const partnerCardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

const featuredPartners: Partner[] = [
  {
    id: 'dr-youssef-amin-clinic',
    companyName: 'Dr. Youssef Amin Clinic',
    logoUrl: '/images/partner-youssef-amin-clinic.png',
    status: 'active',
  },
  {
    id: 'future-coders-academy',
    companyName: 'Future Coders Academy',
    logoUrl: '/images/partner-future-coders-academy.png',
    status: 'active',
  },
  {
    id: 'dentlistmax',
    companyName: 'Dentlistmax',
    logoUrl: '/images/partner-dentlistmax.jpeg',
    status: 'active',
  },
];

function mergePartners(remotePartners: Partner[]) {
  const featuredIds = new Set(featuredPartners.map((partner) => partner.id));
  return [
    ...featuredPartners,
    ...remotePartners.filter((partner) => !featuredIds.has(partner.id)),
  ];
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>(featuredPartners);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'partners'), limit(10));
    return onSnapshot(
      q,
      (snapshot) => {
        setPartners(mergePartners(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner))));
        setLoading(false);
        setError(null);
      },
      () => {
        setPartners(featuredPartners);
        setLoading(false);
        setError(null);
      },
    );
  }, []);

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center mb-12 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-4">Market Partners & Sponsors</h2>
          </div>
        </div>

        <motion.div
          variants={partnerGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {loading && Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="glass h-36 w-full max-w-[220px] animate-pulse rounded-2xl bg-white/5" />
          ))}

          {!loading && error && (
            <div className="col-span-full py-12 text-center text-slate-400 border border-red-500/20 rounded-3xl">
              {error}
            </div>
          )}

          {!loading && !error && partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={partnerCardVariants}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: '0 24px 70px rgba(0, 242, 254, 0.16)',
              }}
              className={cn(
                "glass min-h-40 w-full max-w-[240px] p-8 rounded-2xl flex flex-col items-center justify-center gap-4 border-white/5 transition-all hover:bg-white/10",
                partner.id === 'future-coders-academy' ? "grayscale-0" : "grayscale hover:grayscale-0"
              )}
            >
              {partner.logoUrl ? (
                <motion.img
                  src={asset(partner.logoUrl)}
                  alt={partner.companyName}
                  className="h-16 max-w-36 object-contain"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : (
                <div className="w-20 h-20 rounded-3xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-slate-400 text-[10px] text-center px-3">
                  <ShieldCheck size={24} className="mb-2 text-sky-400" />
                  Mark Pending
                </div>
              )}
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                {partner.companyName}
              </p>
            </motion.div>
          ))}
          {!loading && !error && partners.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-white/5 rounded-3xl">
              Become the first partner to secure a spot in our network.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
