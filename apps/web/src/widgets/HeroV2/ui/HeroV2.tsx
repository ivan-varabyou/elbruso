"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";
import { CheckCircle2, PlayCircle, Star } from "lucide-react";

export const HeroV2 = () => {
  return (
    <section className="relative pt-128 pb-96 bg-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-blue/5 to-transparent -z-10" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-40">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-8 px-16 py-6 bg-gray-50 rounded-full border border-gray-100"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-24 h-24 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex text-warning-yellow">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
              <span className="text-[11px] font-bold text-elbruso-text-muted uppercase tracking-wider">
                Trusted by 500+ Sports Labs
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[48px] md:text-[72px] font-black text-elbruso-text leading-[1.05] tracking-tight"
            >
              Go from sports data to <br /> 
              <span className="text-primary-blue">insights in minutes.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-elbruso-text-muted max-w-2xl mx-auto leading-relaxed"
            >
              Professional sports auditing and analytics platform. Connect any data source, 
              prepare it with AI, and visualize performance like never before.
            </motion.p>
          </div>

          {/* Inline Signup Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-lg flex flex-col sm:flex-row gap-12 p-8 bg-white border border-gray-200 shadow-xl rounded-16"
          >
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="flex-1 px-16 py-12 text-sm font-semibold outline-none bg-transparent"
            />
            <Button variant="primary" className="px-32 h-[48px] rounded-12 font-bold shadow-lg shadow-primary-blue/20">
              Start Free Trial
            </Button>
          </motion.div>

          <div className="flex items-center gap-24 pt-8">
             <div className="flex items-center gap-6 text-[13px] font-bold text-elbruso-text">
                <CheckCircle2 size={16} className="text-success-green" /> No Credit Card Required
             </div>
             <button className="flex items-center gap-6 text-[13px] font-bold text-primary-blue hover:underline">
                <PlayCircle size={16} /> Watch Overview
             </button>
          </div>
        </div>

        {/* High-Fidelity Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-80 relative"
        >
          <div className="relative mx-auto max-w-5xl">
             {/* Main Dashboard Frame */}
             <div className="bg-white rounded-24 border border-gray-100 shadow-2xl overflow-hidden aspect-[16/10] relative">
                {/* Simplified Sidebar */}
                <div className="absolute top-0 left-0 w-64 h-full bg-gray-50 border-r border-gray-100 p-16 flex flex-col gap-16">
                   <div className="w-32 h-32 rounded-8 bg-primary-blue/10" />
                   <div className="flex-1 space-y-8">
                      {[1, 2, 3, 4].map(i => <div key={i} className="h-4 w-full bg-gray-200 rounded-full" />)}
                   </div>
                </div>
                {/* Main Content Area */}
                <div className="ml-64 p-32 space-y-32">
                   <div className="flex items-center justify-between">
                      <div className="space-y-8">
                         <div className="h-12 w-200 bg-gray-100 rounded-full" />
                         <div className="h-8 w-120 bg-gray-50 rounded-full" />
                      </div>
                      <div className="flex gap-8">
                         <div className="w-80 h-32 bg-gray-50 rounded-8" />
                         <div className="w-80 h-32 bg-primary-blue/10 rounded-8" />
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-24">
                      <div className="h-160 bg-white border border-gray-100 rounded-20 shadow-sm p-24 space-y-16">
                         <div className="h-10 w-1/2 bg-gray-100 rounded-full" />
                         <div className="h-24 w-3/4 bg-elbruso-text rounded-full" />
                         <div className="h-4 w-full bg-success-green/20 rounded-full overflow-hidden">
                            <div className="h-full bg-success-green w-3/4" />
                         </div>
                      </div>
                      <div className="h-160 bg-white border border-gray-100 rounded-20 shadow-sm p-24 space-y-16">
                         <div className="h-10 w-1/2 bg-gray-100 rounded-full" />
                         <div className="h-24 w-3/4 bg-elbruso-text rounded-full" />
                         <div className="flex items-end gap-4 h-32">
                            {[40, 70, 50, 90, 60].map((h, i) => <div key={i} className="flex-1 bg-primary-blue/10 rounded-t-4" style={{ height: `${h}%` }} />)}
                         </div>
                      </div>
                      <div className="h-160 bg-white border border-gray-100 rounded-20 shadow-sm p-24 space-y-16">
                         <div className="h-10 w-1/2 bg-gray-100 rounded-full" />
                         <div className="h-24 w-3/4 bg-elbruso-text rounded-full" />
                         <div className="h-40 w-40 rounded-full border-4 border-primary-blue border-r-transparent animate-spin ml-auto" />
                      </div>
                   </div>
                   <div className="h-200 bg-[#F8FAFC] border border-gray-100 rounded-24 border-dashed flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Global Performance Matrix</span>
                   </div>
                </div>
             </div>

             {/* Floating Elements (Overlays) */}
             <motion.div 
               animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 6 }}
               className="absolute -top-24 -right-48 bg-white p-20 rounded-20 border border-gray-100 shadow-premium z-20 flex flex-col gap-8 hidden md:flex"
             >
                <div className="h-12 w-80 bg-gray-100 rounded-full" />
                <div className="text-2xl font-black text-elbruso-text">98.2%</div>
                <div className="text-[10px] font-bold text-success-green bg-success-green/10 px-8 py-4 rounded-full self-start">Accuracy Verified</div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
