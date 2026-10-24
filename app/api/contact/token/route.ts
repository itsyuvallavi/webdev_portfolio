import { NextResponse } from "next/server"
import { issueFormToken } from "@/lib/form-token"

// A fresh token for every visit: never prerendered, never cached.
export const dynamic = "force-dynamic"

const noStore = { "Cache-Control": "no-store" }

export function GET() {
  const token = issueFormToken()
  if (!token) {
    return NextResponse.json({ error: "The contact form is not configured." }, { status: 503, headers: noStore })
  }
  return NextResponse.json({ token }, { headers: noStore })
}
