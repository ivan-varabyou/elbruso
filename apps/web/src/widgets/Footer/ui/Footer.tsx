"use client";

import Link from "next/link";
import { Dictionary } from "@/types";
import { cn } from "@/shared/lib/utils";

export const Footer = ({ dictionary }: { dictionary: Dictionary }) => {
  const { footer, header } = dictionary;
  
  if (!footer) return null;

  return (
    <footer className="bg-elbruso-bg-subtle border-t border-elbruso-border py-64">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-32">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-8">
              <div className="w-32 h-32 bg-primary-blue rounded-6 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-white rounded-full opacity-80" />
              </div>
              <span className="text-[18px] font-bold text-elbruso-text tracking-tight">
                {header.logo.elbruso}
              </span>
            </Link>
            <p className="text-elbruso-text-muted max-w-[320px] leading-relaxed">
              {footer.description}
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-16 lg:gap-32">
            <div>
              <h4 className="font-bold text-elbruso-text mb-24">{footer.columns.products.title}</h4>
              <ul className="space-y-12">
                {footer.columns.products.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="text-elbruso-text-muted hover:text-primary-blue transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-elbruso-text mb-24">{footer.columns.company.title}</h4>
              <ul className="space-y-12">
                {footer.columns.company.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="text-elbruso-text-muted hover:text-primary-blue transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-elbruso-text mb-24">{footer.columns.resources.title}</h4>
              <ul className="space-y-12">
                {footer.columns.resources.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="text-elbruso-text-muted hover:text-primary-blue transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-elbruso-text mb-24">{footer.columns.legal.title}</h4>
              <ul className="space-y-12">
                {footer.columns.legal.links.map((link: any, i: number) => (
                  <li key={i}>
                    <Link href={link.href} className="text-elbruso-text-muted hover:text-primary-blue transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-64 pt-32 border-t border-elbruso-border flex flex-col md:flex-row justify-between items-center gap-16">
          <p className="text-[14px] text-elbruso-text-muted">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-24">
            {/* Minimal social links as text for now */}
            <Link href="#" className="text-[14px] text-elbruso-text-muted hover:text-primary-blue transition-colors">Twitter</Link>
            <Link href="#" className="text-[14px] text-elbruso-text-muted hover:text-primary-blue transition-colors">LinkedIn</Link>
            <Link href="#" className="text-[14px] text-elbruso-text-muted hover:text-primary-blue transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
