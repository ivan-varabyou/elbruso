"use client";

import "./AuthLayout.css";

import { cn } from "@elbruso/lib";
import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
  showGradient?: boolean;
  className?: string;
}

const defaultBackground = "/assets/img/login-bg.jpg";

export function AuthLayout({
  children,
  backgroundImage = defaultBackground,
  showGradient = true,
  className,
}: AuthLayoutProps) {
  return (
    <div className={cn("auth-layout", className)}>
      <div className="auth-layout-left">
        <div className="auth-layout-content">{children}</div>
      </div>

      <div className="auth-layout-right">
        <Image
          src={backgroundImage}
          alt="Authentication background"
          fill
          priority
          className="auth-layout-bg-image"
          style={{ objectFit: "cover" }}
        />
        {showGradient && <div className="auth-layout-gradient" />}
        <div className="auth-layout-decoration" />
      </div>
    </div>
  );
}
