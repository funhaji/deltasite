"use client";

import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { Hammer, Users, Ruler } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";

const ICON_MAP: Record<string, typeof Hammer> = {
  hammer: Hammer,
  users: Users,
  ruler: Ruler,
};

export function ServicesSection() {
  const { content } = useSiteContent();
  const services = content?.services ?? [];
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold text-primary">خدمات ما</span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-balance">
            چه کاری برای شما انجام میدهیم
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] ?? Hammer;
            return (
              <AnimatedSection
                key={service.id}
                animation="fade-up"
                delay={idx * 150}
              >
                <div className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image_url || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors duration-500" />
                    <div className="absolute -bottom-5 right-6 h-12 w-12 rounded-lg bg-primary flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-6 pt-8 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className="mt-5 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
