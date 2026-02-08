import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const TABLE = "contact_messages_d9k2";

export async function GET() {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin messages fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load messages" },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}
