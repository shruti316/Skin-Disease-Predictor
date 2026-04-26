import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { Conditions } from "@/components/landing/Conditions";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <InteractiveDemo />
        <Conditions />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
