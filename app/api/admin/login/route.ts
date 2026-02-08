import { NextRequest, NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const adminPass = process.env.ADMIN_PASS;
  if (!adminPass) {
    return NextResponse.json(
      { error: "Admin login not configured" },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (body.password !== adminPass) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  await setAdminCookie();
  return NextResponse.json({ success: true });
}
