import { NextRequest, NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/db";
import { leads } from "@/db/schema";
import { leadSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const limit = await checkRateLimit(`contact:ip:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot: if filled, silently pretend success to confuse bots.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, company, serviceInterest, budget, message } = parsed.data;

  if (!isDatabaseConfigured) {
    console.log("[Demo Mode] Lead submission received (database not yet configured):", {
      name,
      email,
      phone,
      company,
      serviceInterest,
      budget,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    await db.insert(leads).values({
      name,
      email,
      phone,
      company,
      serviceInterest,
      budget,
      message,
      ip,
      source: "website",
    });
  } catch (err) {
    console.warn("[Contact] Failed to persist lead to database:", err);
  }

  return NextResponse.json({ ok: true });
}
