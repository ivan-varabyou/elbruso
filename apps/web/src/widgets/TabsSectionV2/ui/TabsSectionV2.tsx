"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Database, Wand2, PieChart, Brain, ChevronRight, Laptop } from "lucide-react";

const STEPS = [
  {
    id: "connect",
    label: "Connect",
    icon: Database,
    title: "Connect to any sports data source.",
    description: "Import data from 500+ sources including professional leagues, wearable sensors, and legacy databases. Automatic sync ensures your audit is always fresh.",
    features: ["API Integrations", "Warehouse Sync", "Local File Upload"],
  },
  {
    id: "prepare",
    label: "Prepare",
    icon: Wand2,
    title: "Self-service data preparation.",
    description: "Prepare and clean your data with AI-assisted pipelines. No coding required. Transform raw metrics into audit-ready datasets in minutes.",
    features: ["AI Data Cleaning", "Visual Pipelines", "Formula Engine"],
  },
  {
    id: "visualize",
    label: "Visualize",
    icon: PieChart,
    title: "Visualize data with D3.js.",
    description: "Create stunning, high-performance dashboards. From athlete load trends to financial risk heatmaps, visualize every metric with precision.",
    features: ["Interactive Charts", "Custom Themes", "Drill-down Analytics"],
  },
  {
    id: "analyze",
    label: "Analyze",
    icon: Brain,
    title: "AI-powered predictive analytics.",
    description: "Unlock deep insights with our built-in ML models. Forecast injuries, project team success, and detect data anomalies automatically.",
    features: ["Predictive Models", "Anomaly Detection", "Automated Insights"],
  },
  {
    id: "collaborate",
    label: "Collaborate",
    icon: Share2,
    title: "Collaborative storytelling.",
    description: "Share your findings across the entire organization. Securely publish reports, embed analytics in your portal, and discuss data in real-time.",
    features: ["Secure Sharing", "Team Comments", "White-label Portals"],
  },
  {
    id: "extend",
    label: "Extend",
    icon: Laptop,
    title: "Integrate and extend.",
    description: "Embed Elbruso into your own apps with our robust APIs and SDKs. Build custom sports management solutions on top of our auditing engine.",
    features: ["Full API Access", "Custom SDKs", "Webhook Integration"],
  },
];

export const TabsSectionV2 = () => {
  const [activeTab, setActiveTab] = useState(STEPS[0].id);
  const currentStep = STEPS.find((s) => s.id === activeTab) || STEPS[0];

  return (
    <section className="py-96 bg-[#F8F9FB]">
      <div className="container">
        <div className="text-center mb-64 space-y-16">
          <h2 className="text-[32px] md:text-[42px] font-black text-elbruso-text">
            End-to-end sports BI and analytics platform.
          </h2>
          <p className="text-elbruso-text-muted text-lg max-w-2xl mx-auto">
            Everything you need to audit, analyze, and act on your sports data in one unified workspace.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap justify-center gap-8 mb-48 border-b border-gray-100 pb-16">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`flex items-center gap-10 px-24 py-12 transition-all relative ${
                  isActive ? "text-primary-blue" : "text-elbruso-text-muted hover:text-elbruso-text"
                }`}
              >
                <Icon size={18} />
                <span className="font-bold text-[15px]">{step.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-[-17px] left-0 w-full h-[3px] bg-primary-blue"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-64 items-center bg-white rounded-32 p-48 shadow-premium border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-32"
            >
              <div className="space-y-16">
                <h3 className="text-3xl font-black text-elbruso-text leading-tight">
                  {currentStep.title}
                </h3>
                <p className="text-lg text-elbruso-text-muted leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              <div className="space-y-12">
                {currentStep.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-10 text-elbruso-text font-bold">
                    <ChevronRight size={16} className="text-primary-blue" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-16">
                <button className="text-primary-blue font-black flex items-center gap-8 hover:gap-12 transition-all uppercase tracking-widest text-xs">
                  Learn more about {currentStep.label} <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Visual Representation (Stylized Map/Diagram) */}
          <div className="relative aspect-square lg:aspect-video bg-gray-50 rounded-24 border border-gray-100 overflow-hidden flex items-center justify-center p-40">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                   {/* Visuals for all tabs */}
                   {activeTab === 'connect' && (
                     <div className="grid grid-cols-3 gap-16 w-full max-w-sm">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <div key={i} className="h-48 bg-white border border-gray-100 rounded-12 shadow-sm flex items-center justify-center">
                             <div className="w-16 h-16 rounded-full bg-primary-blue/10" />
                          </div>
                        ))}
                     </div>
                   )}
                   {activeTab === 'prepare' && (
                     <div className="flex items-center gap-16 w-full max-w-sm">
                        <div className="w-64 h-64 rounded-16 bg-white border border-gray-100 shadow-sm" />
                        <div className="h-2 w-48 bg-gray-200" />
                        <div className="w-80 h-80 rounded-24 bg-primary-blue flex items-center justify-center text-white shadow-lg">
                           <Wand2 size={32} />
                        </div>
                        <div className="h-2 w-48 bg-gray-200" />
                        <div className="w-64 h-64 rounded-16 bg-white border border-gray-100 shadow-sm" />
                     </div>
                   )}
                   {activeTab === 'visualize' && (
                     <div className="flex flex-col gap-12 w-full max-w-sm">
                        <div className="flex items-end gap-6 h-120">
                           {[40, 80, 60, 100, 70, 90, 50].map((h, i) => (
                             <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: `${h}%` }}
                               key={i} 
                               className="flex-1 bg-primary-blue rounded-t-8" 
                             />
                           ))}
                        </div>
                        <div className="h-2 bg-gray-100 w-full rounded-full" />
                     </div>
                   )}
                   {activeTab === 'analyze' && (
                     <div className="relative w-full max-w-sm h-full flex items-center justify-center">
                        <div className="w-160 h-160 rounded-full border border-primary-blue/20 flex items-center justify-center relative">
                           <Brain size={64} className="text-primary-blue" />
                           <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 border-2 border-dashed border-primary-blue/40 rounded-full"
                           />
                           <div className="absolute -top-10 -right-10 bg-success-green text-white p-8 rounded-12 shadow-lg">
                              <span className="text-[10px] font-bold">PREDICTION STABLE</span>
                           </div>
                        </div>
                     </div>
                   )}
                   {activeTab === 'collaborate' && (
                     <div className="flex flex-col gap-16 w-full max-w-sm">
                        <div className="flex -space-x-12 justify-center">
                           {[1, 2, 3, 4, 5].map(i => (
                             <div key={i} className="w-48 h-48 rounded-full border-4 border-white bg-gray-100 shadow-sm" />
                           ))}
                           <div className="w-48 h-48 rounded-full border-4 border-white bg-primary-blue flex items-center justify-center text-white font-bold text-xs">+12</div>
                        </div>
                        <div className="bg-white border border-gray-100 p-16 rounded-16 shadow-subtle flex items-center gap-12">
                           <div className="w-32 h-32 rounded-full bg-success-green/20" />
                           <div className="flex-1 h-8 bg-gray-100 rounded-full" />
                           <Share2 size={16} className="text-primary-blue" />
                        </div>
                     </div>
                   )}
                   {activeTab === 'extend' && (
                     <div className="bg-slate-900 w-full max-w-sm h-160 rounded-16 p-24 font-mono text-xs flex flex-col gap-8 shadow-2xl">
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-full bg-red-500" />
                           <div className="w-8 h-8 rounded-full bg-yellow-500" />
                           <div className="w-8 h-8 rounded-full bg-green-500" />
                        </div>
                        <div className="text-blue-400">GET <span className="text-green-400">/api/v1/sports/audit</span></div>
                        <div className="text-gray-400">{"{"}</div>
                        <div className="text-gray-400 ml-12">&quot;status&quot;: <span className="text-amber-400">&quot;verified&quot;</span>,</div>
                        <div className="text-gray-400 ml-12">&quot;score&quot;: <span className="text-amber-400">98.2</span></div>
                        <div className="text-gray-400">{"}"}</div>
                     </div>
                   )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
