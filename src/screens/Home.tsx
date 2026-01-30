import { HeroSection } from "@/components/Home/Hero";
import { HowItWorks } from "@/components/Home/HowItWorks";
import { Features } from "@/components/Home/Features";
import { Footer } from "@/components/common/Footer";

export function Home() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <HeroSection />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}
