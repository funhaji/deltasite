"use client";

import { Clock, Phone, Mail } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";
import { DEFAULT_SITE_CONTENT } from "@/lib/types/site-content";

export function TopBar() {
  const { content } = useSiteContent();
  const topbar = content?.topbar ?? DEFAULT_SITE_CONTENT.topbar!;
  return (
    <div className="hidden md:block bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between">
        <p className="text-sm opacity-80">{topbar.company_name}</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm opacity-80">
            <Clock className="h-3.5 w-3.5" />
            <span>{topbar.hours}</span>
          </div>
          <a
            href={`tel:${topbar.phone}`}
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            <span dir="ltr">{topbar.phone}</span>
          </a>
          <a
            href={`mailto:${topbar.email}`}
            className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
          >
            <Mail className="h-3.5 w-3.5" />
            <span dir="ltr">{topbar.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
