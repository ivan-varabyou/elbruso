"use client";
import { Header, Footer, Brands, Hero, ProductsShowcase } from "@/shared";

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
