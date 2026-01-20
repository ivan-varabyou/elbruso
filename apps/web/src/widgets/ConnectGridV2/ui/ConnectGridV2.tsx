"use client";

import { motion } from "framer-motion";
import { Database, Cloud, FileCode, Cpu, Globe, GitBranch } from "lucide-react";

const SOURCES = [
  { name: "Pro Leagues API", icon: Globe, color: "bg-blue-500" },
  { name: "Wearable Tech", icon: Cpu, color: "bg-orange-500" },
  { name: "SQL Databases", icon: Database, color: "bg-slate-700" },
  { name: "Cloud Storage", icon: Cloud, color: "bg-sky-400" },
  { name: "JSON/CSV Files", icon: FileCode, color: "bg-amber-500" },
  { name: "Custom Webhooks", icon: GitBranch, color: "bg-emerald-500" },
];

export const ConnectGridV2 = () => {
  return (
    <section className="py-96 bg-white overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-64 items-center">
          <div className="space-y-32">
             <div className="space-y-16">
                <h2 className="text-[32px] md:text-[42px] font-black text-elbruso-text leading-tight">
                   Connect to any sports data source. In minutes.
                </h2>
                <p className="text-xl text-elbruso-text-muted leading-relaxed">
                   Elbruso integrates seamlessly with your existing data stack. 
                   From live match feeds to athlete monitoring systems, unify everything in one secure audit layer.
                </p>
             </div>
             <div className="flex flex-wrap gap-12">
                {["In-built Connectors", "Direct SQL Access", "Smart Mapping"].map(tag => (
                  <span key={tag} className="px-16 py-8 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-elbruso-text uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
             </div>
             <div className="pt-8">
                <button className="text-primary-blue font-black flex items-center gap-8 hover:gap-12 transition-all uppercase tracking-widest text-xs">
                   Explore all 500+ connectors <GitBranch size={14} />
                </button>
             </div>
          </div>

          {/* Mosaic Grid of Connectors */}
          <div className="relative">
             <div className="grid grid-cols-3 gap-16 md:gap-24 p-8">
                {SOURCES.map((source, i) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="bg-white p-24 rounded-24 border border-gray-100 shadow-subtle flex flex-col items-center justify-center gap-16 text-center group cursor-pointer"
                  >
                     <div className={`w-48 h-48 rounded-16 ${source.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <source.icon size={24} />
                     </div>
                     <span className="text-[14px] font-bold text-elbruso-text">{source.name}</span>
                  </motion.div>
                ))}
             </div>
             
             {/* Decorative Background Circles */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-blue/5 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
