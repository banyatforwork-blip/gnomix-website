import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { ParticlesBackground } from "@/components/particles-background";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { DownloadSection } from "@/components/download-section";
import { FAQSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CommunitySection } from "@/components/community-section";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  useEffect(() => {
    // Update page title and meta
    document.title = "Gnomix - Ubuntu Without The Bullshit | Pure Stock GNOME";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Gnomix is an Ubuntu-based Linux distribution with pure stock GNOME. No Canonical modifications, no Snap packages, no bloat. Just clean, beautiful Linux."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Gnomix is an Ubuntu-based Linux distribution with pure stock GNOME. No Canonical modifications, no Snap packages, no bloat. Just clean, beautiful Linux.";
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTags = [
      { property: "og:title", content: "Gnomix - Ubuntu Without The Bullshit" },
      {
        property: "og:description",
        content:
          "Pure stock GNOME on Ubuntu. No Canonical modifications, no Snap packages, no bloat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.gnomix.linkpc.net" },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden w-full" data-testid="page-home">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Particle background */}
      <ParticlesBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="pt-20">
        <HeroSection />
        <FeaturesSection />
        <DownloadSection />
        <FAQSection />
        <TestimonialsSection />
        <CommunitySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
