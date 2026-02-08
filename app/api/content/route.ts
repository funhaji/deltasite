import { NextResponse } from "next/server";
import { fetchSiteContent } from "@/lib/supabase/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await fetchSiteContent();
    return NextResponse.json(content);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
