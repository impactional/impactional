import type { Metadata } from "next";
import { contact, siteUrl } from "@/content/site";
import { FinalCta, Footer } from "@/components/home/final-cta";
import { CotmSpotlight } from "@/components/home/cotm-spotlight";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Mission } from "@/components/home/mission";
import { CompanyProfile } from "@/components/home/company-profile";
import { NetworkPreview } from "@/components/home/network-preview";
import { Programs } from "@/components/home/programs";
import { Stories } from "@/components/home/stories";
import { LandingMotion } from "@/components/motion/landing-motion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", siteName: "Impactional", type: "website" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Impactional",
  url: siteUrl,
  email: contact.email,
  sameAs: Object.values(contact.socials),
};

export default function Home() {
  return (
    <LandingMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main-content">
        <Hero />
        <Mission />
        <Programs />
        <Impact />
        <CompanyProfile />
        <Stories />
        <CotmSpotlight />
        <NetworkPreview />
        <FinalCta />
      </main>
      <Footer />
    </LandingMotion>
  );
}
