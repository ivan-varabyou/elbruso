import "./globals.css";

import { AppProviders } from "@elbruso/shared/app";
import { Inter } from "next/font/google";

import { getDictionary } from "@/lib/get-dictionary";
import { AdminAuthProvider } from "@elbruso/shared/modules/admin-auth";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Elbruso - Admin Panel",
  description: "Elbruso BI System Admin Panel",
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
        <AdminAuthProvider>
          <AppProviders dictionary={dictionary}>{children}</AppProviders>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
