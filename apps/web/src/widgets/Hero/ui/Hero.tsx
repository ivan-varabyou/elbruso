"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";
import { DataWavesBackground } from "@/shared/ui/DataWavesBackground/DataWavesBackground";
import { LiveSportsChart } from "@/shared/ui/LiveSportsChart/LiveSportsChart";
import { TrendingUp, Users, CheckCircle, Database } from "lucide-react";
import { Dictionary } from "@/types";

export const Hero = ({ dictionary }: { dictionary: Dictionary }) => {
  const { hero } = dictionary;
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-96 pb-80">
      {/* Advanced AI Background with Waves & Data */}
      <DataWavesBackground />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  <Database size={14} />
                  {hero.badge}
                </motion.div>
                <h1
                  className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-elbruso-text leading-[1.1] mb-6"
                  dangerouslySetInnerHTML={{ __html: hero.title }}
                />
                <p className="hero-subheadline">{hero.subtitle}</p>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6">
                <Button
                  variant="primary"
                  className="px-8 h-[44px] shadow-lg shadow-primary-blue/20 text-base"
                >
                  {hero.button.audit}
                </Button>
                <Button variant="outline" className="px-8 h-[44px] text-base">
                  {hero.button.case}
                </Button>
              </div>

              {/* Real-time Counter Mockup */}
              <div className="flex items-center gap-12 pt-8 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-elbruso-text">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2 }}
                    >
                      {hero.metrics.validatedValue}
                    </motion.span>
                  </div>
                  <div className="text-xs font-medium text-elbruso-text-muted uppercase tracking-wider">
                    {hero.metrics.validated}
                  </div>
                </div>
                <div className="space-y-4 border-l border-gray-100 pl-8">
                  <div className="text-3xl font-bold text-elbruso-text">
                    {hero.metrics.organizationsValue}
                  </div>
                  <div className="text-xs font-medium text-elbruso-text-muted uppercase tracking-wider">
                    {hero.metrics.organizations}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Analytics Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Live Data Card */}
            <div className="card-premium relative bg-white border border-gray-100 shadow-premium overflow-hidden p-0">
              <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-error-red/20 border border-error-red/40" />
                    <div className="w-2 h-2 rounded-full bg-warning-yellow/20 border border-warning-yellow/40" />
                    <div className="w-2 h-2 rounded-full bg-success-green/20 border border-success-green/40" />
                  </div>
                  <span className="text-[10px] font-bold text-elbruso-text-muted uppercase tracking-widest">
                    {hero.panel.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse" />
                  <span className="text-[10px] font-bold text-success-.green">
                    {hero.panel.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* D3.js Live Chart Integration */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-elbruso-text text-sm">
                      {hero.panel.chartTitle}
                    </h3>
                    <span className="text-[10px] font-bold text-primary-blue bg-primary-blue/10 px-1.5 py-0.5 rounded">
                      {hero.panel.chartLabel}
                    </span>
                  </div>
                  <LiveSportsChart className="w-full" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold text-elbruso-text-muted uppercase mb-4">
                        {hero.panel.score}
                      </div>
                      <div className="text-2xl font-bold text-elbruso-text">
                        {hero.panel.scoreValue}
                      </div>
                    </div>
                    <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
                      <CheckCircle size={64} className="text-success-green" />
                    </div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-lg p-4 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold text-elbruso-text-muted uppercase mb-4">
                        {hero.panel.auditors}
                      </div>
                      <div className="text-2xl font-bold text-elbruso-text">
                        {hero.panel.auditorsValue}
                      </div>
                    </div>
                    <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:opacity-20 transition-opacity">
                      <Users size={64} className="text-primary-blue" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Predicted Outcome */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-2, -1, -2],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-8 -left-12 bg-white rounded-lg p-5 border border-gray-100 shadow-premium flex flex-col gap-2 z-20 min-w-[180px]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <TrendingUp size={16} className="text-primary-blue" />
                </div>
                <span className="text-xs font-bold text-elbruso-text">
                  {hero.panel.prediction}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-elbruso-text-muted">
                    {hero.panel.stability}
                  </span>
                  <span className="text-success-green font-bold">+12%</span>
                </div>
                <div className="w-full bg-gray-50 h-4 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="bg-success-green h-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Success Label */}
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-3 -right-6 bg-elbruso-text rounded-lg py-2 px-4 shadow-premium z-20 flex items-center gap-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-success-green ring-4 ring-success-green/20" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                {hero.panel.passed}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
