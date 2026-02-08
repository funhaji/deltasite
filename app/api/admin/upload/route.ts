import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const BUCKET = "images";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (e) {
    if (e instanceof Response) return e;
    throw e;
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const name = (formData.get("name") as string) || undefined;

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "No file provided. Use form field 'file'." },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = name
    ? `${name}.${ext}`
    : `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabase = createServerSupabase();
  const bytes = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (error) {
    console.error("Supabase storage upload error:", error);
    // More helpful error message for missing bucket
    if (error.message?.includes("not found") || error.statusCode === "404") {
      return NextResponse.json(
        {
          error: `Bucket "${BUCKET}" not found. Please create a bucket named "${BUCKET}" in Supabase Storage (Dashboard → Storage → New bucket). Make it PUBLIC so images can be accessed.`,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
  return NextResponse.json({ url: urlData.publicUrl, path: data.path });
}
