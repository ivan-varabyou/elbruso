import "./globals.css";

import { AppProviders } from "@frontend/app";
import { AdminAuthProvider } from "@frontend/modules/admin/auth";
import { getDictionary } from "@/lib/get-dictionary";

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
      <body suppressHydrationWarning>
        <AdminAuthProvider>
          <AppProviders dictionary={dictionary}>{children}</AppProviders>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
