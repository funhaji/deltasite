import { NextResponse } from "next/server";
import { deleteAdminCookie } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  await deleteAdminCookie();
  return NextResponse.json({ success: true });
}
