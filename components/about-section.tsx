import Image from "next/image";
import { AnimatedSection } from "./animated-section";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <div className="md:col-span-3 order-2 md:order-1">
            <AnimatedSection animation="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold text-primary tracking-wide">
                  {"ما کی هستیم"}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <h2 className="text-2xl md:text-4xl font-extrabold text-foreground leading-snug text-balance">
                {"داشتن بیش از دو دهه سابقه کار"}
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <p className="mt-6 text-muted-foreground leading-relaxed text-sm md:text-base">
                {
                  "گروه ساختمانی انبوه سازان دلتا با سابقه کار بیش از دو دهه و متشکل از بهترین تیم مهندسی سازنده مدرن ترین و لوکس ترین ساختمان ها در سطح کشور هستیم. گروه ساختمانی انبوه سازان دلتا زیبا ترین و خوش نقش ترین سازه ها را می سازد برای شما با بهترین مصالح و بالا ترین کیفیت، قیمت های مناسب، ساخت در کم ترین زمان ممکن."
                }
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <div>
                  <p className="font-bold text-foreground">{"علی بستگی"}</p>
                  <p className="text-xs text-muted-foreground">
                    {"مدیر عامل و موسس"}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Image */}
          <div className="md:col-span-2 order-1 md:order-2">
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="/images/about-building.jpg"
                  alt="ساختمان مدرن دلتا"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-5 flex items-center justify-around">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-extrabold text-primary">
                        {"۲۰+"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {"سال تجربه"}
                      </p>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-extrabold text-primary">
                        {"۱۵۰+"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {"پروژه موفق"}
                      </p>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-extrabold text-primary">
                        {"۵۰+"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {"تیم مهندسی"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
