import { createServerSupabase } from "./server";
import type { SiteContent } from "@/lib/types/site-content";

const TABLES = {
  site_config: "site_config_d9k2",
  topbar: "topbar_d9k2",
  nav_links: "nav_links_d9k2",
  hero_slides: "hero_slides_d9k2",
  about: "about_d9k2",
  services: "services_d9k2",
  process_steps: "process_steps_d9k2",
  gallery: "gallery_d9k2",
  cta: "cta_d9k2",
  contact: "contact_d9k2",
  footer: "footer_d9k2",
  footer_links: "footer_links_d9k2",
} as const;

export async function fetchSiteContent(): Promise<SiteContent> {
  const supabase = createServerSupabase();

  const [
    siteConfigRes,
    topbarRes,
    navLinksRes,
    heroSlidesRes,
    aboutRes,
    servicesRes,
    processStepsRes,
    galleryRes,
    ctaRes,
    contactRes,
    footerRes,
    footerLinksRes,
  ] = await Promise.all([
    supabase.from(TABLES.site_config).select("*").eq("id", 1).maybeSingle(),
    supabase.from(TABLES.topbar).select("*").eq("id", 1).maybeSingle(),
    supabase.from(TABLES.nav_links).select("*").order("sort_order", { ascending: true }),
    supabase.from(TABLES.hero_slides).select("*").order("sort_order", { ascending: true }),
    supabase.from(TABLES.about).select("*").eq("id", 1).maybeSingle(),
    supabase.from(TABLES.services).select("*").order("sort_order", { ascending: true }),
    supabase.from(TABLES.process_steps).select("*").order("sort_order", { ascending: true }),
    supabase.from(TABLES.gallery).select("*").order("sort_order", { ascending: true }),
    supabase.from(TABLES.cta).select("*").eq("id", 1).maybeSingle(),
    supabase.from(TABLES.contact).select("*").eq("id", 1).maybeSingle(),
    supabase.from(TABLES.footer).select("*").eq("id", 1).maybeSingle(),
    supabase.from(TABLES.footer_links).select("*").order("sort_order", { ascending: true }),
  ]);

  return {
    siteConfig: siteConfigRes.data ?? null,
    topbar: topbarRes.data ?? null,
    navLinks: navLinksRes.data ?? [],
    heroSlides: heroSlidesRes.data ?? [],
    about: aboutRes.data ?? null,
    services: servicesRes.data ?? [],
    processSteps: processStepsRes.data ?? [],
    gallery: galleryRes.data ?? [],
    cta: ctaRes.data ?? null,
    contact: contactRes.data ?? null,
    footer: footerRes.data ?? null,
    footerLinks: footerLinksRes.data ?? [],
  };
}

export { TABLES };
