"use client";

import { Header } from "../Header/Header";
import { Hero } from "../Hero/Hero";
import { Footer } from "../Footer/Footer";
import { ProductsShowcase } from "../ProductsShowcase/ProductsShowcase";
import { ChartsShowcase } from "../ChartsShowcase/ChartsShowcase";
import { InteractiveGrid } from "../InteractiveGrid/InteractiveGrid";
import { Brands } from "../Brands/Brands";
import { LiveSportsChart } from "../LiveSportsChart/LiveSportsChart";

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
