// Types for site content (matches Supabase tables with suffix _d9k2)

export const TABLE_SUFFIX = "d9k2";

export interface SiteConfig {
  id: number;
  site_name: string;
  site_description: string;
  logo_url: string | null;
  logo_letter: string;
}

export interface Topbar {
  id: number;
  company_name: string;
  hours: string;
  phone: string;
  email: string;
}

export interface NavLink {
  id: number;
  label: string;
  href: string;
  sort_order: number;
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  cta_text: string;
  cta_link: string;
  sort_order: number;
}

export interface About {
  id: number;
  tagline: string;
  heading: string;
  body: string;
  ceo_name: string;
  ceo_title: string;
  image_url: string | null;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  stat3_value: string;
  stat3_label: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  image_url: string | null;
  sort_order: number;
}

export interface ProcessStep {
  id: number;
  step_number: string;
  icon: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface GalleryImage {
  id: number;
  image_url: string;
  alt: string;
  sort_order: number;
}

export interface Cta {
  id: number;
  tagline: string;
  heading: string;
  body: string;
  cta_text: string;
  cta_link: string;
}

export interface Contact {
  id: number;
  tagline: string;
  heading: string;
  subtext: string;
  form_label_name: string;
  form_placeholder_name: string;
  form_label_email: string;
  form_placeholder_email: string;
  form_label_message: string;
  form_placeholder_message: string;
  submit_text: string;
  submitted_text: string;
}

export interface Footer {
  id: number;
  brand_name: string;
  logo_letter: string;
  description: string;
  copyright_text: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  gallery_heading: string;
  quick_links_heading: string;
  contact_heading: string;
}

export interface FooterLink {
  id: number;
  label: string;
  href: string;
  sort_order: number;
}

export interface SiteContent {
  siteConfig: SiteConfig | null;
  topbar: Topbar | null;
  navLinks: NavLink[];
  heroSlides: HeroSlide[];
  about: About | null;
  services: Service[];
  processSteps: ProcessStep[];
  gallery: GalleryImage[];
  cta: Cta | null;
  contact: Contact | null;
  footer: Footer | null;
  footerLinks: FooterLink[];
}

/** Fallback when API fails or is loading */
export const DEFAULT_SITE_CONTENT: SiteContent = {
  siteConfig: {
    id: 1,
    site_name: "سایت",
    site_description: "",
    logo_url: null,
    logo_letter: "د",
  },
  topbar: {
    id: 1,
    company_name: "",
    hours: "",
    phone: "",
    email: "",
  },
  navLinks: [{ id: 0, label: "خانه", href: "#", sort_order: 0 }],
  heroSlides: [],
  about: null,
  services: [],
  processSteps: [],
  gallery: [],
  cta: null,
  contact: null,
  footer: null,
  footerLinks: [],
};
