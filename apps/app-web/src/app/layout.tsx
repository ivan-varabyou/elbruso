import "./globals.css";

import { AppProviders } from "@elbruso/shared/app";
import { Inter } from "next/font/google";

import { getDictionary } from "@/lib/get-dictionary";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Elbruso - BI System",
  description: "Business Intelligence System with dynamic tables and reports",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const dictionary = await getDictionary("ru");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders dictionary={dictionary}>{children}</AppProviders>
      </body>
    </html>
  );
}
