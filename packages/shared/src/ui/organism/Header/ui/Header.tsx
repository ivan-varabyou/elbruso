"use client";

import { useI18n } from "@/shared/lib/i18n";
import { Logo } from "@/shared/ui/atom/Logo";
import { Dictionary } from "@/shared/types";
import Link from "next/link";

export const Header = () => {
  const dictionary = useI18n() as Dictionary;
  const { header } = dictionary;
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-elbruso-border">
      <div className="container h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Actions */}
        <div className="flex items-center gap-16">
          <Link
            href="/login"
            className="text-elbruso-text font-semibold hover:text-primary-blue transition-colors mr-16"
          >
            {header.actions.signIn}
          </Link>
        </div>
      </div>
    </header>
  );
};
