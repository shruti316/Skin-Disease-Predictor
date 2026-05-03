import Navbar from "@/components/derma/Navbar";
import Footer from "@/components/derma/Footer";
import Hero from "@/components/derma/Hero";
import { About, HowItWorks, WhyBetter, Features } from "@/components/derma/Sections";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <Hero />
      <About />
      <HowItWorks />
      <WhyBetter />
      <Features />
    </main>
    <Footer />
  </div>
);

export default Index;
