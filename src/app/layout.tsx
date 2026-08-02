import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

import "lenis/dist/lenis.css";
import "./globals.css";

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
  metadataBase: new URL("https://www.impactional.org"),
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
    <html lang="en" className={`${montserrat.variable} ${brandey.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
