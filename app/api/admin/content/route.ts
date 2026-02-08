import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchSiteContent } from "@/lib/supabase/content";
import { createServerSupabase } from "@/lib/supabase/server";
import { TABLES } from "@/lib/supabase/content";
import type { SiteContent } from "@/lib/types/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const content = await fetchSiteContent();
    return NextResponse.json(content);
  } catch (e) {
    if (e instanceof Response) return e;
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

function safePartialUpdate<T extends Record<string, unknown>>(
  data: T | null | undefined
): Partial<T> | null {
  if (data == null) return null;
  const obj = data as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(obj)) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return Object.keys(out).length ? (out as Partial<T>) : null;
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  let body: Partial<SiteContent>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = createServerSupabase();

  try {
    if (body.siteConfig != null) {
      const payload = safePartialUpdate(body.siteConfig);
      if (payload) await supabase.from(TABLES.site_config).update(payload).eq("id", 1);
    }
    if (body.topbar != null) {
      const payload = safePartialUpdate(body.topbar);
      if (payload) await supabase.from(TABLES.topbar).update(payload).eq("id", 1);
    }
    if (body.navLinks != null && Array.isArray(body.navLinks)) {
      const keepIds = body.navLinks.filter((l) => l?.id && l.id > 0).map((l) => l.id);
      const { data: existing } = await supabase.from(TABLES.nav_links).select("id");
      const toDelete = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
      for (const id of toDelete) {
        await supabase.from(TABLES.nav_links).delete().eq("id", id);
      }
      for (const link of body.navLinks) {
        if (link?.id != null && link.id > 0) {
          await supabase.from(TABLES.nav_links).update({
            label: link.label,
            href: link.href,
            sort_order: link.sort_order ?? 0,
          }).eq("id", link.id);
        } else {
          await supabase.from(TABLES.nav_links).insert({
            label: link.label ?? "",
            href: link.href ?? "#",
            sort_order: link.sort_order ?? 0,
          });
        }
      }
    }
    if (body.heroSlides != null && Array.isArray(body.heroSlides)) {
      const keepIds = body.heroSlides.filter((s) => s?.id && s.id > 0).map((s) => s.id);
      const { data: existing } = await supabase.from(TABLES.hero_slides).select("id");
      const toDelete = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
      for (const id of toDelete) {
        await supabase.from(TABLES.hero_slides).delete().eq("id", id);
      }
      for (const slide of body.heroSlides) {
        if (slide?.id != null && slide.id > 0) {
          await supabase.from(TABLES.hero_slides).update({
            title: slide.title,
            description: slide.description,
            image_url: slide.image_url ?? null,
            cta_text: slide.cta_text ?? "مشاهده خدمات",
            cta_link: slide.cta_link ?? "#services",
            sort_order: slide.sort_order ?? 0,
          }).eq("id", slide.id);
        } else {
          await supabase.from(TABLES.hero_slides).insert({
            title: slide.title ?? "",
            description: slide.description ?? "",
            image_url: slide.image_url ?? null,
            cta_text: slide.cta_text ?? "مشاهده خدمات",
            cta_link: slide.cta_link ?? "#services",
            sort_order: slide.sort_order ?? 0,
          });
        }
      }
    }
    if (body.about != null) {
      const payload = safePartialUpdate(body.about);
      if (payload) await supabase.from(TABLES.about).update(payload).eq("id", 1);
    }
    if (body.services != null && Array.isArray(body.services)) {
      const keepIds = body.services.filter((s) => s?.id && s.id > 0).map((s) => s.id);
      const { data: existing } = await supabase.from(TABLES.services).select("id");
      const toDelete = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
      for (const id of toDelete) {
        await supabase.from(TABLES.services).delete().eq("id", id);
      }
      for (const s of body.services) {
        if (s?.id != null && s.id > 0) {
          await supabase.from(TABLES.services).update({
            icon: s.icon ?? "hammer",
            title: s.title,
            description: s.description,
            image_url: s.image_url ?? null,
            sort_order: s.sort_order ?? 0,
          }).eq("id", s.id);
        } else {
          await supabase.from(TABLES.services).insert({
            icon: s?.icon ?? "hammer",
            title: s?.title ?? "",
            description: s?.description ?? "",
            image_url: s?.image_url ?? null,
            sort_order: s?.sort_order ?? 0,
          });
        }
      }
    }
    if (body.processSteps != null && Array.isArray(body.processSteps)) {
      const keepIds = body.processSteps.filter((s) => s?.id && s.id > 0).map((s) => s.id);
      const { data: existing } = await supabase.from(TABLES.process_steps).select("id");
      const toDelete = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
      for (const id of toDelete) {
        await supabase.from(TABLES.process_steps).delete().eq("id", id);
      }
      for (const step of body.processSteps) {
        if (step?.id != null && step.id > 0) {
          await supabase.from(TABLES.process_steps).update({
            step_number: step.step_number ?? "۱",
            icon: step.icon ?? "message-circle",
            title: step.title,
            description: step.description,
            sort_order: step.sort_order ?? 0,
          }).eq("id", step.id);
        } else {
          await supabase.from(TABLES.process_steps).insert({
            step_number: step?.step_number ?? "۱",
            icon: step?.icon ?? "message-circle",
            title: step?.title ?? "",
            description: step?.description ?? "",
            sort_order: step?.sort_order ?? 0,
          });
        }
      }
    }
    if (body.gallery != null && Array.isArray(body.gallery)) {
      const keepIds = body.gallery.filter((i) => i?.id && i.id > 0).map((i) => i.id);
      const { data: existing } = await supabase.from(TABLES.gallery).select("id");
      const toDelete = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
      for (const id of toDelete) {
        await supabase.from(TABLES.gallery).delete().eq("id", id);
      }
      for (const img of body.gallery) {
        if (img?.id != null && img.id > 0) {
          await supabase.from(TABLES.gallery).update({
            image_url: img.image_url,
            alt: img.alt,
            sort_order: img.sort_order ?? 0,
          }).eq("id", img.id);
        } else {
          await supabase.from(TABLES.gallery).insert({
            image_url: img?.image_url ?? "",
            alt: img?.alt ?? "",
            sort_order: img?.sort_order ?? 0,
          });
        }
      }
    }
    if (body.cta != null) {
      const payload = safePartialUpdate(body.cta);
      if (payload) await supabase.from(TABLES.cta).update(payload).eq("id", 1);
    }
    if (body.contact != null) {
      const payload = safePartialUpdate(body.contact);
      if (payload) await supabase.from(TABLES.contact).update(payload).eq("id", 1);
    }
    if (body.footer != null) {
      const payload = safePartialUpdate(body.footer);
      if (payload) await supabase.from(TABLES.footer).update(payload).eq("id", 1);
    }
    if (body.footerLinks != null && Array.isArray(body.footerLinks)) {
      const keepIds = body.footerLinks.filter((l) => l?.id && l.id > 0).map((l) => l.id);
      const { data: existing } = await supabase.from(TABLES.footer_links).select("id");
      const toDelete = (existing ?? []).filter((r) => !keepIds.includes(r.id)).map((r) => r.id);
      for (const id of toDelete) {
        await supabase.from(TABLES.footer_links).delete().eq("id", id);
      }
      for (const link of body.footerLinks) {
        if (link?.id != null && link.id > 0) {
          await supabase.from(TABLES.footer_links).update({
            label: link.label,
            href: link.href,
            sort_order: link.sort_order ?? 0,
          }).eq("id", link.id);
        } else {
          await supabase.from(TABLES.footer_links).insert({
            label: link.label ?? "",
            href: link.href ?? "#",
            sort_order: link.sort_order ?? 0,
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  const content = await fetchSiteContent();
  return NextResponse.json(content);
}
