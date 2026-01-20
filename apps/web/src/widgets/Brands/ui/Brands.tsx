"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/types";

export const Brands = ({ dictionary }: { dictionary: Dictionary }) => {
  const { brands } = dictionary;
  return (
    <section className="py-64 bg-white border-b border-elbruso-border">
      <div className="container">
        <p className="text-center text-[14px] font-medium text-elbruso-text-muted mb-12">
          {brands.title}
        </p>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 md:gap-12 opacity-40 grayscale">
          {brands.names.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-[24px] md:text-[32px] font-bold text-elbruso-dark tracking-tight"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};
