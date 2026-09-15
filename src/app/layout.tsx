import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { GycAnnouncement } from "@/components/announcements/gyc-announcement";
import { MOTION_BOOT_SCRIPT } from "@/lib/motion-prefs";
import { siteUrl } from "@/content/site";

import "lenis/dist/lenis.css";
import "./globals.css";
import "@/styles/editorial-pages.css";
import "@/styles/gyc-announcement.css";
import "@/styles/mobile-nav.css";
import "@/styles/home-programs.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const brandey = localFont({
  src: [
    { path: "../assets/fonts/Brandey-Light.otf", weight: "300", style: "normal" },
    { path: "../assets/fonts/Brandey-Medium.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Brandey-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-brandey",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Impactional — Your ideas can move the world",
  description:
    "An international youth-led community connecting young changemakers with the people, perspectives, and tools to create meaningful change.",
  openGraph: {
    title: "Impactional — Your ideas can move the world",
    description: "Meet the global youth community turning conviction into collective action.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f1e9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The motion boot script stamps data-motion before hydration, so the server
    // markup deliberately differs from what React sees on the client.
    <html lang="en" className={`${montserrat.variable} ${brandey.variable}`} suppressHydrationWarning>
      <head>
        {/* Resolves the motion preference before first paint so nothing flashes. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
      </head>
      <body>
        <SmoothScrollProvider>{children}<GycAnnouncement /></SmoothScrollProvider>
      </body>
    </html>
  );
}
