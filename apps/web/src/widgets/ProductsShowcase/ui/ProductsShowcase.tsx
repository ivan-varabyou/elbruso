"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Link2, Brain, Search, Layout, type LucideIcon } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Dictionary } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  auditor: Search,
  engine: Zap,
  hud: Layout,
  linking: Link2,
  ai: Brain,
};

export const ProductsShowcase = ({ dictionary }: { dictionary: Dictionary }) => {
  const { productsShowcase } = dictionary;
  const USPs = productsShowcase.usps.map(usp => ({
    ...usp,
    icon: ICON_MAP[usp.id] || Search
  }));

  const [activeTab, setActiveTab] = useState(USPs[0].id);
  const currentUSP = USPs.find(u => u.id === activeTab) || USPs[0];

  return (
    <section className="py-96 bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-64">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[48px] font-bold text-elbruso-text mb-24"
          >
            {productsShowcase.title}
          </motion.h2>
          <p className="text-elbruso-text-muted max-w-2xl mx-auto text-lg">
            {productsShowcase.subtitle}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-64">
          {USPs.map((usp) => {
            const Icon = usp.icon;
            const isActive = activeTab === usp.id;
            return (
              <button
                key={usp.id}
                onClick={() => setActiveTab(usp.id)}
                className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? "bg-primary-blue border-primary-blue text-white shadow-xl shadow-primary-blue/20 translate-y-[-2px]" 
                    : "bg-white border-elbruso-border text-elbruso-text hover:border-primary-blue/40"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-primary-blue"} />
                <span className="font-bold text-[14px]">{usp.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary-blue"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Feature Detail Block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="card-premium grid grid-cols-1 lg:grid-cols-12 gap-16 p-24 bg-[#F8FAFC]/50 backdrop-blur-sm"
          >
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-primary-blue rounded-12 flex items-center justify-center text-white shadow-lg shadow-primary-blue/20">
                      <currentUSP.icon size={24} />
                   </div>
                   <h3 className="text-[32px] font-bold text-elbruso-text">{currentUSP.title}</h3>
                </div>
                <p className="text-lg text-elbruso-text-muted leading-relaxed">
                  {currentUSP.description}
                </p>
              </div>

              <div className="space-y-5">
                <p className="font-bold text-xs uppercase tracking-widest text-[#1A73E8]">{productsShowcase.coreCapabilities}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUSP.features.map((feature: string, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center group-hover:bg-primary-blue transition-colors duration-300">
                        <Check size={14} className="text-primary-blue group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-semibold text-elbruso-text text-[15px]">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <Button variant="primary">{productsShowcase.buttons.deepDive}</Button>
                <Button variant="outline">{productsShowcase.buttons.technicalSpecs}</Button>
              </div>
            </div>

            {/* Right Visual Representation (Mockup) */}
            <div className="lg:col-span-7 relative group">
              <div className="bg-white rounded-lg border border-elbruso-border shadow-2xl overflow-hidden aspect-[4/3] relative">
                 {/* Internal Dashboard Mockup */}
                 <div className="absolute top-0 left-0 w-full h-full bg-[#F1F3F5] p-6">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-error-red" />
                          <div className="h-2 w-30 bg-gray-200 rounded-full" />
                       </div>
                       <div className="h-8 w-30 bg-white border border-gray-100 rounded-lg shadow-sm" />
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4 h-full">
                       <div className="col-span-4 space-y-4">
                          <div className="h-25 bg-white rounded-lg border border-gray-100 p-4 space-y-3 shadow-sm">
                             <div className="h-3 w-3/4 bg-primary-blue/20 rounded-full" />
                             <div className="space-y-1.5">
                                <div className="h-2 w-full bg-gray-50 rounded-full" />
                                <div className="h-2 w-5/6 bg-gray-50 rounded-full" />
                             </div>
                          </div>
                          <div className="h-40 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                             <div className="flex-1 bg-gray-50/50 p-3 flex items-center justify-center">
                                <currentUSP.icon size={32} className="text-primary-blue/10" />
                             </div>
                             <div className="h-12 border-t border-gray-50" />
                          </div>
                       </div>
                       <div className="col-span-8 space-y-4">
                          <div className="h-75 bg-white rounded-lg border border-gray-100 shadow-xl p-6 relative">
                             <div className="absolute top-4 left-4 px-3 py-1.5 bg-success-green/10 text-success-green text-[10px] font-bold rounded-full">
                                {productsShowcase.auditStatus}
                             </div>
                             <div className="mt-12 space-y-4">
                                {[1, 2, 3, 4].map(r => (
                                  <div key={r} className="flex gap-3 items-center">
                                     <div className="w-3 h-3 rounded bg-gray-100" />
                                     <div className="h-3 flex-1 bg-gray-50 rounded-full" />
                                     <div className="h-3 w-12 bg-primary-blue/10 rounded-full" />
                                  </div>
                                ))}
                             </div>
                             {/* Floating Success Indicator locally for the visual */}
                             <motion.div 
                               animate={{ y: [0, -4, 0] }}
                               transition={{ repeat: Infinity, duration: 3 }}
                               className="absolute bottom-6 right-6 bg-elbruso-text text-white py-3 px-5 rounded-lg flex items-center gap-3 shadow-2xl"
                             >
                                <Check size={18} className="text-success-green" />
                                <span className="font-bold text-sm tracking-wide">{productsShowcase.dataLinked}</span>
                             </motion.div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
