"use client";

import Link from "next/link";
import { useI18n } from "@/shared/lib/i18n";
import { Dictionary } from "@/shared";

export const Footer = () => {
  const dictionary = useI18n() as Dictionary;
  const { footer } = dictionary;

  if (!footer) return null;

  return (
    <footer className="bg-elbruso-bg-subtle border-t border-elbruso-border py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <p className="text-[14px] text-elbruso-text-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
