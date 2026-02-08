"use client";

import { AnimatedSection } from "./animated-section";
import { useSiteContent } from "@/lib/site-content-context";

export function CtaSection() {
  const { content } = useSiteContent();
  const cta = content?.cta;
  if (!cta) return null;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-foreground">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <AnimatedSection animation="fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold text-primary">
              {cta.tagline}
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-background leading-snug text-balance max-w-2xl mx-auto">
            {cta.heading}
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={200}>
          <p className="mt-6 text-background/60 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {cta.body}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={300}>
          <a
            href={cta.cta_link || "#contact"}
            className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-semibold text-sm rounded-md hover:brightness-110 transition-all duration-300"
          >
            {cta.cta_text}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
