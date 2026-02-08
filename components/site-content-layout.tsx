import { fetchSiteContent } from "@/lib/supabase/content";
import { SiteContentProvider } from "@/lib/site-content-context";

export async function SiteContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialContent = null;
  try {
    initialContent = await fetchSiteContent();
  } catch {
    // use client-side fetch as fallback
  }
  return (
    <SiteContentProvider initialContent={initialContent}>
      {children}
    </SiteContentProvider>
  );
}
