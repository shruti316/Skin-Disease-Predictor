import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Conditions from "@/components/Conditions";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DermaSense AI — AI Powered Skin Disease Detection" },
      {
        name: "description",
        content:
          "Upload a skin image and get instant AI-powered preliminary analysis with confidence scores and explainable heatmaps.",
      },
      { property: "og:title", content: "DermaSense AI — Skin Disease Detection" },
      {
        property: "og:description",
        content:
          "Instant AI dermatology assessment with Grad-CAM explanation and downloadable medical summary.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Conditions />
        <Features />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
