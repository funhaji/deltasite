// Generated types for Supabase tables (suffix _d9k2). Adjust to match your schema.

export interface Database {
  public: {
    Tables: {
      site_config_d9k2: {
        Row: {
          id: number;
          site_name: string;
          site_description: string;
          logo_url: string | null;
          logo_letter: string;
        };
        Insert: Omit<Database["public"]["Tables"]["site_config_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["site_config_d9k2"]["Insert"]>;
      };
      topbar_d9k2: {
        Row: {
          id: number;
          company_name: string;
          hours: string;
          phone: string;
          email: string;
        };
        Insert: Omit<Database["public"]["Tables"]["topbar_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["topbar_d9k2"]["Insert"]>;
      };
      nav_links_d9k2: {
        Row: { id: number; label: string; href: string; sort_order: number };
        Insert: Omit<Database["public"]["Tables"]["nav_links_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["nav_links_d9k2"]["Insert"]>;
      };
      hero_slides_d9k2: {
        Row: {
          id: number;
          title: string;
          description: string;
          image_url: string | null;
          cta_text: string;
          cta_link: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["hero_slides_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["hero_slides_d9k2"]["Insert"]>;
      };
      about_d9k2: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["about_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["about_d9k2"]["Insert"]>;
      };
      services_d9k2: {
        Row: {
          id: number;
          icon: string;
          title: string;
          description: string;
          image_url: string | null;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["services_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["services_d9k2"]["Insert"]>;
      };
      process_steps_d9k2: {
        Row: {
          id: number;
          step_number: string;
          icon: string;
          title: string;
          description: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["process_steps_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["process_steps_d9k2"]["Insert"]>;
      };
      gallery_d9k2: {
        Row: { id: number; image_url: string; alt: string; sort_order: number };
        Insert: Omit<Database["public"]["Tables"]["gallery_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["gallery_d9k2"]["Insert"]>;
      };
      cta_d9k2: {
        Row: {
          id: number;
          tagline: string;
          heading: string;
          body: string;
          cta_text: string;
          cta_link: string;
        };
        Insert: Omit<Database["public"]["Tables"]["cta_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["cta_d9k2"]["Insert"]>;
      };
      contact_d9k2: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["contact_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["contact_d9k2"]["Insert"]>;
      };
      footer_d9k2: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["footer_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["footer_d9k2"]["Insert"]>;
      };
      footer_links_d9k2: {
        Row: { id: number; label: string; href: string; sort_order: number };
        Insert: Omit<Database["public"]["Tables"]["footer_links_d9k2"]["Row"], "id"> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["footer_links_d9k2"]["Insert"]>;
      };
    };
  };
}
