import { AnimatedSection } from "./animated-section";
import { MessageCircle, Lightbulb, Rocket } from "lucide-react";

const steps = [
  {
    number: "۱",
    icon: MessageCircle,
    title: "درخواست مشتری",
    description: "شما درخواست خود را ثبت می کنید و ما آن را بررسی خواهیم کرد",
  },
  {
    number: "۲",
    icon: Lightbulb,
    title: "مشاوره",
    description: "تیم کارشناسان ما مشاوره رایگان و تخصصی ارائه خواهند داد",
  },
  {
    number: "۳",
    icon: Rocket,
    title: "شروع پروژه",
    description: "پس از توافق نهایی، پروژه شما با بهترین کیفیت آغاز می شود",
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold text-primary">
              {"روند ما"}
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-balance">
            {"چگونه کار می کنیم"}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connector line - desktop */}
          <div className="hidden md:block absolute top-16 right-[16.67%] left-[16.67%] h-px bg-border" />

          {steps.map((step, idx) => (
            <AnimatedSection
              key={step.title}
              animation="fade-up"
              delay={idx * 200}
            >
              <div className="relative text-center group">
                {/* Number circle */}
                <div className="relative inline-flex items-center justify-center mx-auto mb-6">
                  <div className="h-20 w-20 rounded-full border-2 border-primary bg-background flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:scale-110 z-10">
                    <step.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <span className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center z-20">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
