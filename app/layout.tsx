import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteContentLayout } from "@/components/site-content-layout";
import { fetchSiteContent } from "@/lib/supabase/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await fetchSiteContent();
    return {
      title: content.siteConfig?.site_name ?? "سایت",
      description: content.siteConfig?.site_description ?? "",
    };
  } catch {
    return { title: "سایت", description: "" };
  }
}

export const viewport: Viewport = {
  themeColor: "#FED501",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        style={{ fontFamily: "'Vazirmatn', sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteContentLayout>{children}</SiteContentLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
