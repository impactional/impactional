import { FinalCta, Footer } from "@/components/home/final-cta";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Mission } from "@/components/home/mission";
import { Programs } from "@/components/home/programs";
import { Spotlight } from "@/components/home/spotlight";
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
        <Spotlight />
        <Stories />
        <FinalCta />
      </main>
      <Footer />
    </LandingMotion>
  );
}
