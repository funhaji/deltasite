import { TopBar } from "@/components/top-bar";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { GallerySection } from "@/components/gallery-section";
import { CtaSection } from "@/components/cta-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <GallerySection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
