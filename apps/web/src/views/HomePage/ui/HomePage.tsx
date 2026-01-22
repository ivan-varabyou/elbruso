'use client'
import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { Brands } from "@/widgets/Brands";
import { ProductsShowcase } from "@/widgets/ProductsShowcase";
import { Footer } from "@/widgets/Footer";

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[65px]">
        <Hero />
        <Brands />
        <ProductsShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
