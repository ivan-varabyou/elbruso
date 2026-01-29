'use client'
import { Header, Hero, Brands, ProductsShowcase, Footer } from "@/shared/ui";

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
