'use client'
import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { Brands } from "@/widgets/Brands";
import { ProductsShowcase } from "@/widgets/ProductsShowcase";
import { ChartsShowcase } from "@/widgets/ChartsShowcase";
import { Footer } from "@/widgets/Footer";
import { Dictionary } from "@/types";

export const HomePage = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header dictionary={dictionary} />
      <main className="flex-grow pt-[80px]">
        <Hero dictionary={dictionary} />
        <Brands dictionary={dictionary} />
        <ProductsShowcase dictionary={dictionary} />
        <ChartsShowcase dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </div>
  );
};

export default HomePage;
