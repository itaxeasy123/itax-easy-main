import { NextResponse } from "next/server";


export const runtime = "nodejs";

const ALLOWED = new Set([
  "invoice",
  "aadhar",
  "pan",
  "parse_form16",
  "driving_licence",
  "process-bank-statement",
  "process-gst",
]);

export async function POST(req, { params }) {
  try {
    const service = decodeURIComponent((params?.service || []).join("/"));
    if (!ALLOWED.has(service)) {
      return NextResponse.json({ error: "Unknown OCR service" }, { status: 404 });
    }

    const form = await req.formData();

    const headers = {};
    const token = (process.env.OCR_API_TOKEN || "").trim();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const upstream = await fetch(`${process.env.OCR_BASE_URL}/api/${service}`, {
      method: "POST",
      headers,
      body: form,       // FormData as-is (boundary auto)
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") || "application/json";
    const buf = Buffer.from(await upstream.arrayBuffer());

    return new NextResponse(buf, {
      status: upstream.status,
      headers: { "content-type": contentType },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Proxy error", detail: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const r = await fetch(`${process.env.OCR_BASE_URL}/api/`, { cache: "no-store" });
  const contentType = r.headers.get("content-type") || "application/json";
  const buf = Buffer.from(await r.arrayBuffer());
  return new NextResponse(buf, { status: r.status, headers: { "content-type": contentType } });
}
