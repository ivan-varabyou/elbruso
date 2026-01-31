"use client";

import { useI18n } from "@/shared/lib/i18n";
import { Logo } from "@/shared/Logo";
import { Dictionary } from "@/shared";
import Link from "next/link";

export const Header = () => {
  const dictionary = useI18n() as Dictionary;
  const { header } = dictionary;
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-elbruso-border">
      <div className="container h-[64px] flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-16">
          <Link
            href="/login"
            className="text-elbruso-text font-semibold hover:text-primary-blue transition-colors mr-16"
          >
            {header?.actions?.signIn || "Sign In"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
