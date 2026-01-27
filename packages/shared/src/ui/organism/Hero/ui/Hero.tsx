"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/atom/Button";
import { DataWavesBackground } from "@/shared/ui/molecule/DataWavesBackground/DataWavesBackground";
import { LiveSportsChart } from "@/shared/ui/molecule/LiveSportsChart/LiveSportsChart";
import { Dictionary } from "@/shared/types";
import { useI18n } from "@/shared/lib/i18n";
import { Database, CheckCircle, Users, TrendingUp } from "lucide-react";

export const Hero = () => {
  const dictionary = useI18n() as Dictionary;
  const { hero } = dictionary;
  return (
    <section className="relative min-h-[60vh] flex items-center bg-white overflow-hidden">
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
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold uppercase tracking-widest w-fit"
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

              <div className="flex items-center gap-12">
                <Button
                  variant="primary"
                  className="px-24 h-[44px] text-base"
                  onClick={() => console.log("case")}
                >
                  {hero.button.case}
                </Button>
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
                  <span className="text-[10px] font-bold text-elbruso-text-muted uppercase tracking-widest"></span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* D3.js Live Chart Integration */}
                <div className="space-y-3">
                  <LiveSportsChart className="w-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
