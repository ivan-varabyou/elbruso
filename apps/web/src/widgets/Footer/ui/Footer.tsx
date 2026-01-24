"use client";

import Link from "next/link";
import { useI18n } from '@/shared/lib/i18n';
import { FooterColumn } from "./FooterColumn";
import { Dictionary } from "@/types"; // Keep this import as it's used for the type assertion

export const Footer = () => {
  const dictionary = useI18n() as Dictionary;
  const { footer, header } = dictionary;
  const isFullFooter = false;

  if (!footer) return null;

  return (
    <footer className="bg-elbruso-bg-subtle border-t border-elbruso-border py-8">
      <div className="container">
        {isFullFooter && (
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
          </div>)
        }

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <p className="text-[14px] text-elbruso-text-muted">
            {footer.copyright}
          </p>

        </div>
      </div>
    </footer>
  );
};
