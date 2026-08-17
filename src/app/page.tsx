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

export default function Home() {
  return (
    <LandingMotion>
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
