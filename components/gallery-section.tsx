"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/site-content-context";

export function GallerySection() {
  const { content } = useSiteContent();
  const galleryImages = content?.gallery ?? [];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (galleryImages.length === 0) return null;

  return (
    <>
      <section id="projects" className="py-20 md:py-28 bg-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold text-primary">کار ویژه</span>
              <span className="h-px w-10 bg-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground text-balance">
              کاوش آنچه انجام دادیم
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, idx) => (
              <AnimatedSection
                key={img.id || idx}
                animation="scale-in"
                delay={idx * 100}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-lg group cursor-pointer"
                >
                  <Image
                    src={img.image_url || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-background text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                      {img.alt}
                    </span>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="نمایش تصویر"
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 left-4 p-2 text-background hover:text-primary transition-colors z-10"
            aria-label="بستن"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="relative max-w-4xl max-h-[80vh] w-full aspect-[4/3] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].image_url || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(idx);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === selectedImage
                    ? "w-6 bg-primary"
                    : "w-2 bg-background/40 hover:bg-background/60"
                )}
                aria-label={`تصویر ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
