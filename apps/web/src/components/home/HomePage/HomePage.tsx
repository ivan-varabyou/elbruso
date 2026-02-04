"use client";

import { Brands } from "../Brands";
import { ChartsShowcase } from "../ChartsShowcase";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Hero } from "../Hero";
import { InteractiveGrid } from "../InteractiveGrid";
import { LiveSportsChart } from "../LiveSportsChart";
import { ProductsShowcase } from "../ProductsShowcase";

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[65px]">
        <Hero />
        <ProductsShowcase />
        <ChartsShowcase />
        <InteractiveGrid />
        <LiveSportsChart />
        <Brands />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
