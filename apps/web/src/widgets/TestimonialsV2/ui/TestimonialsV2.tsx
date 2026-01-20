"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Elbruso has completely transformed how we audit our player performance data. The D3 visualizations are second to none.",
    author: "Marco Rossi",
    role: "Head of Analytics, European Football Collective",
    avatar: "https://i.pravatar.cc/150?u=marco",
  },
  {
    quote: "The automated AI pipelines saved our team hundreds of hours in data cleaning. It's the engine we've been waiting for.",
    author: "Sarah Jenkins",
    role: "Data Scientist, Global Sports Federation",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    quote: "Integrating Elbruso into our custom athlete management portal was seamless thanks to their robust API.",
    author: "Dr. Kenji Sato",
    role: "Performance Director, Asia-Pacific Sports Lab",
    avatar: "https://i.pravatar.cc/150?u=kenji",
  },
];

export const TestimonialsV2 = () => {
  return (
    <section className="py-96 bg-[#F8F9FB] overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-64 items-center">
          <div className="lg:w-1/3 space-y-24">
            <div className="w-48 h-48 bg-primary-blue rounded-16 flex items-center justify-center text-white shadow-lg shadow-primary-blue/20">
               <Quote size={24} fill="currentColor" />
            </div>
            <h2 className="text-[32px] md:text-[42px] font-black text-elbruso-text leading-tight">
               Don&apos;t just take our word for it.
            </h2>
            <p className="text-xl text-elbruso-text-muted leading-relaxed">
               Trusted by the world&apos;s leading sports organizations, audit labs, and performance centers.
            </p>
            <div className="pt-8">
               <button className="text-primary-blue font-black flex items-center gap-8 hover:gap-12 transition-all uppercase tracking-widest text-xs">
                  View all success stories →
               </button>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-24">
             {TESTIMONIALS.map((t, i) => (
               <motion.div
                 key={t.author}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-32 rounded-32 border border-gray-100 bg-white shadow-subtle flex flex-col justify-between ${i === 0 ? 'md:col-span-2' : ''}`}
               >
                  <p className="text-lg font-bold text-elbruso-text leading-relaxed italic mb-24">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-12">
                     <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-bold">
                           {t.author.charAt(0)}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm font-black text-elbruso-text">{t.author}</div>
                        <div className="text-[12px] font-bold text-elbruso-text-muted">{t.role}</div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
