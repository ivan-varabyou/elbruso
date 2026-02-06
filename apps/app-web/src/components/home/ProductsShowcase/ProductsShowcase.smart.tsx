"use client";

import { useI18n } from "@frontend/modules/i18n/lib";
import type { Dictionary } from "@frontend/types/dictionary";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Check, Layout, Link2, type LucideIcon, Search, Zap } from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  auditor: Search,
  engine: Zap,
  hud: Layout,
  linking: Link2,
  ai: Brain,
};

interface USPItem {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  icon?: LucideIcon;
}

export const ProductsShowcase = () => {
  const dictionary = useI18n() as Dictionary;
  const { productsShowcase } = dictionary;
  const USPs: (USPItem & { icon: LucideIcon })[] = productsShowcase.usps.map((usp: USPItem) => ({
    ...usp,
    icon: ICON_MAP[usp.id] || Search,
  }));

  const [activeTab, setActiveTab] = useState(USPs[0]?.id);
  const currentUSP = USPs.find((u) => u.id === activeTab) || USPs[0];

  return (
    <section className="pt-12 bg-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[48px] font-bold text-elbruso-text mb-2"
          >
            {productsShowcase.title}
          </motion.h2>
          <p className="text-elbruso-text-muted max-w-2xl mx-auto text-lg">
            {productsShowcase.subtitle}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
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
                <p className="font-bold text-xs uppercase tracking-widest text-[#1A73E8]">
                  {productsShowcase.coreCapabilities}
                </p>
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
                        <Check
                          size={14}
                          className="text-primary-blue group-hover:text-white transition-colors"
                        />
                      </div>
                      <span className="font-semibold text-elbruso-text text-[15px]">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual Representation (Mockup) */}
            <div className="lg:col-span-7 relative group">
              <div className="bg-white rounded-lg border border-elbruso-border shadow-2xl overflow-hidden aspect-[4/3] relative">
                {/* Internal Dashboard Mockup */}
                <div className="absolute top-0 left-0 w-full h-full bg-[#F1F3F5] p-6"></div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
