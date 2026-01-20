"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { Dictionary } from "@/types";

export const Header = ({ dictionary }: { dictionary: Dictionary }) => {
  const { header } = dictionary;
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-elbruso-border">
      <div className="container h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-8">
          <div className="w-32 h-32 bg-primary-blue rounded-6 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-white rounded-full opacity-80" />
          </div>
          <span className="text-[18px] font-bold text-elbruso-text tracking-tight">
            {header.logo.elbruso}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-32">
          <Link
            href="#"
            className="nav-link text-primary-blue font-semibold"
          >
            {header.nav.home}
          </Link>
          <Link href="#" className="nav-link">
            {header.nav.products}
          </Link>
          <Link href="#" className="nav-link">
            {header.nav.pricing}
          </Link>
          <Link href="#" className="nav-link">
            {header.nav.blog}
          </Link>
          <Link href="#" className="nav-link">
            {header.nav.contact}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-16">
          <Link
            href="/login"
            className="text-elbruso-text font-semibold hover:text-primary-blue transition-colors mr-16"
          >
            {header.actions.signIn}
          </Link>
          <Button variant="primary" className="hidden sm:flex">
            {header.actions.requestDemo}
          </Button>
        </div>
      </div>
    </header>
  );
};
