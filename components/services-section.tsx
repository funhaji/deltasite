import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { Hammer, Users, Ruler } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "بهترین تعمیر و نوسازی",
    description:
      "خانه های قدیمی شما را می کوبیم و از نو می سازیم با استفاده از مصالح با کیفیت و بنا به درخواست شما",
    image: "/images/service-renovation.jpg",
  },
  {
    icon: Users,
    title: "تیم کارگران حرفه ای",
    description:
      "به تیم ما برای دقت و تمیزکاری اعتماد داشته باشید در کم ترین زمان ممکن خانه را برای شما آماده می کنیم",
    image: "/images/service-workers.jpg",
  },
  {
    icon: Ruler,
    title: "طراحی و معماری زیبا",
    description:
      "تیم مهندسین طراح ما بی وقفه جهت طراحی یک نقشه زیبا چندین جلسه وقت خود را صرف ایده و نظرات خود می کنند",
    image: "/images/service-architecture.jpg",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold text-primary">
              {"خدمات ما"}
            </span>
            <span className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-balance">
            {"چه کاری برای شما انجام میدهیم"}
          </h2>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <AnimatedSection
              key={service.title}
              animation="fade-up"
              delay={idx * 150}
            >
              <div className="group bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors duration-500" />
                  {/* Icon Badge */}
                  <div className="absolute -bottom-5 right-6 h-12 w-12 rounded-lg bg-primary flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                    <service.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Text */}
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
          ))}
        </div>
      </div>
    </section>
  );
}
