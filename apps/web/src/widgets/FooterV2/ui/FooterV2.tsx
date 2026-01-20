"use client";

import Link from "next/link";
import { LogoV2 } from "@/shared/ui/Logo/LogoV2";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Solutions",
    links: ["Pro Sports", "Youth Academies", "Leagues", "Audit Labs", "Media Groups"],
  },
  {
    title: "Product",
    links: ["Connect", "Prepare", "Visualize", "Analyze", "Collaborate", "Pricing"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Success Stories", "Blog", "Community"],
  },
  {
    title: "Company",
    links: ["About Us", "Contact Us", "Careers", "Legal", "Security"],
  },
];

export const FooterV2 = () => {
  return (
    <footer className="bg-[#101828] text-white pt-96 pb-48">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-48 mb-80">
          <div className="col-span-2 lg:col-span-1 space-y-32">
            <LogoV2 size={40} className="invert brightness-0 invert-1" />
            <p className="text-gray-400 text-sm leading-relaxed font-semibold">
              The professional sports auditing and analytics platform. Built for the future of sports data.
            </p>
            <div className="flex gap-20 text-gray-400">
               <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />
               <Linkedin size={20} className="hover:text-white transition-colors cursor-pointer" />
               <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
               <Github size={20} className="hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-24">
              <h4 className="text-sm font-black uppercase tracking-widest text-primary-blue">
                {group.title}
              </h4>
              <ul className="space-y-16">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-bold">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-48 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-24">
           <div className="text-xs font-bold text-gray-500 uppercase tracking-widest uppercase">
              © 2026 Elbruso Technologies. Industry-Standard Data Integrity.
           </div>
           <div className="flex gap-32 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Use</Link>
              <Link href="#" className="hover:text-white">Cookies</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};
