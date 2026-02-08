"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";

export function Footer() {
  const { content } = useSiteContent();
  const footer = content?.footer;
  const footerLinks = content?.footerLinks ?? [];
  const gallery = content?.gallery ?? [];

  if (!footer) return null;

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-extrabold text-lg">
                  {footer.logo_letter}
                </span>
              </div>
              <div>
                <h3 className="text-background font-bold text-base">
                  {footer.brand_name}
                </h3>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              {footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-background font-bold text-base mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              {footer.quick_links_heading}
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
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

          <div>
            <h4 className="text-background font-bold text-base mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              {footer.contact_heading}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span className="text-background/60 text-sm leading-relaxed">
                  {footer.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span className="text-background/60 text-sm">{footer.hours}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`tel:${footer.phone}`}
                  className="text-background/60 text-sm hover:text-primary transition-colors duration-300"
                  dir="ltr"
                >
                  {footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`mailto:${footer.email}`}
                  className="text-background/60 text-sm hover:text-primary transition-colors duration-300"
                  dir="ltr"
                >
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-background font-bold text-base mb-5 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              {footer.gallery_heading}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {gallery.slice(0, 6).map((img, n) => (
                <a
                  key={img.id || n}
                  href="#projects"
                  className="relative aspect-square rounded overflow-hidden group"
                >
                  <Image
                    src={img.image_url || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <p className="text-background/40 text-xs text-center">
            {footer.copyright_text}
          </p>
        </div>
      </div>
    </footer>
  );
}
