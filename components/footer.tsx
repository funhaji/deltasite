import { MapPin, Clock, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "خانه", href: "#" },
  { label: "درباره ما", href: "#about" },
  { label: "خدمات ما", href: "#services" },
  { label: "تماس با ما", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-extrabold text-lg">
                  {"د"}
                </span>
              </div>
              <div>
                <h3 className="text-background font-bold text-base">
                  {"گروه ساختمانی دلتا"}
                </h3>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              {
                "گروه ما با داشتن بیش از دو دهه سابقه کار تمام رویا های شما را برآورده می کنیم"
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background font-bold text-base mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              {"لینک های سریع"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/60 text-sm hover:text-primary transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-background font-bold text-base mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              {"اطلاعات تماس"}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span className="text-background/60 text-sm leading-relaxed">
                  {
                    "تهران میدان شیخ بهایی ضلع غربی میدان ساختمان رایان ونک طبقه سوم"
                  }
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span className="text-background/60 text-sm">
                  {"شنبه - پنجشنبه: 7:00-18:00"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:09125703247"
                  className="text-background/60 text-sm hover:text-primary transition-colors duration-300"
                  dir="ltr"
                >
                  09125703247
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:alibastegi1396@yahoo.com"
                  className="text-background/60 text-sm hover:text-primary transition-colors duration-300"
                  dir="ltr"
                >
                  alibastegi1396@yahoo.com
                </a>
              </li>
            </ul>
          </div>

          {/* Gallery Preview */}
          <div>
            <h4 className="text-background font-bold text-base mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              {"گالری"}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <a
                  key={n}
                  href="#projects"
                  className="relative aspect-square rounded overflow-hidden group"
                >
                  <img
                    src={`/images/gallery-${n}.jpg`}
                    alt={`پروژه ${n}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-background/40 text-xs text-center">
            {"تمامی حقوق برای گروه ساختمانی انبوه سازان دلتا محفوظ است."}
          </p>
        </div>
      </div>
    </footer>
  );
}
