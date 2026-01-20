"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { LogoV2 } from "@/shared/ui/Logo/LogoV2";
import { ChevronDown } from "lucide-react";

export const HeaderV2 = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container h-[72px] flex items-center justify-between">
        {/* Logo V2 */}
        <Link href="/v2" className="hover:opacity-90 transition-opacity">
          <LogoV2 size={36} />
        </Link>

        {/* Global Navigation */}
        <nav className="hidden lg:flex items-center gap-40">
          <div className="group relative">
            <button className="flex items-center gap-4 text-[15px] font-bold text-elbruso-text hover:text-primary-blue transition-colors">
              Solutions <ChevronDown size={14} className="text-gray-400 group-hover:text-primary-blue transition-colors" />
            </button>
            {/* Simple dropdown placeholder */}
            <div className="absolute top-full left-0 w-[200px] pt-12 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
               <div className="bg-white border border-gray-100 shadow-premium rounded-12 p-8 overflow-hidden">
                  <Link href="#" className="block px-12 py-8 text-sm font-semibold hover:bg-gray-50 rounded-8">Pro Sports</Link>
                  <Link href="#" className="block px-12 py-8 text-sm font-semibold hover:bg-gray-50 rounded-8">Youth Academies</Link>
                  <Link href="#" className="block px-12 py-8 text-sm font-semibold hover:bg-gray-50 rounded-8">Financial Audit</Link>
               </div>
            </div>
          </div>
          <Link href="#" className="text-[15px] font-bold text-elbruso-text hover:text-primary-blue transition-colors">Products</Link>
          <Link href="#" className="text-[15px] font-bold text-elbruso-text hover:text-primary-blue transition-colors">Pricing</Link>
          <Link href="#" className="text-[15px] font-bold text-elbruso-text hover:text-primary-blue transition-colors">Resources</Link>
        </nav>

        {/* Primary Actions */}
        <div className="flex items-center gap-24">
          <Link href="/login" className="text-[15px] font-bold text-elbruso-text hover:text-primary-blue transition-colors">
            Login
          </Link>
          <Button variant="primary" className="px-24 h-[44px] rounded-8 font-bold shadow-lg shadow-primary-blue/20">
            Request a Demo
          </Button>
        </div>
      </div>
    </header>
  );
};
