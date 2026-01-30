"use client";

import { motion } from "framer-motion";
import { Dictionary } from "@/shared";
import { useI18n } from "@/shared/lib/i18n";

export const Brands = () => {
  const dictionary = useI18n() as Dictionary;
  const { brands } = dictionary;

  // Дублируем массив для бесконечной прокрутки
  const duplicatedBrands = [...brands.names, ...brands.names, ...brands.names];

  return (
    <section className="mt-8 bg-white overflow-hidden">
      <div>
        <p className="text-center text-[14px] font-medium text-elbruso-text-muted mb-12">
          {brands.title}
        </p>

        <div className="relative">
          {/* Градиенты по краям для плавного исчезновения */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Бесконечная прокрутка */}
          <div className="flex">
            <motion.div
              className="flex gap-60 md:gap-48"
              animate={{
                x: [0, (-100 * brands.names.length) / 3],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: brands.names.length * 2,
                  ease: "linear",
                },
              }}
            >
              {duplicatedBrands.map((brand, i) => (
                <span
                  key={`${brand}-${i}`}
                  className="text-[24px] md:text-[32px] font-bold text-elbruso-dark tracking-tight opacity-40 grayscale whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
