import { createHmac, timingSafeEqual } from "node:crypto"

/**
 * A signed note of when the contact form was opened. The page fetches one as it loads and sends it
 * back with the message, so the server can refuse messages sent straight to it without the page,
 * and messages sent faster than a person could write one. It holds a time and a signature,
 * nothing about the visitor.
 */

/** Nobody opens the form, writes a message and sends it in less than this. */
export const MIN_FILL_MS = 3_000
/** A form left open longer than this has to be reloaded. */
export const MAX_AGE_MS = 24 * 60 * 60 * 1000

function signingKey(): Buffer | null {
  const own = process.env.CONTACT_FORM_SECRET?.trim()
  if (own) return Buffer.from(own)
  // Otherwise derived from the email service's key, which every working deployment already has.
  const resend = process.env.RESEND_API_KEY?.trim()
  return resend ? createHmac("sha256", resend).update("contact-form-token").digest() : null
}

const sign = (key: Buffer, issuedAt: string) => createHmac("sha256", key).update(issuedAt).digest("base64url")

export function issueFormToken(now = Date.now()): string | null {
  const key = signingKey()
  if (!key) return null
  const issuedAt = String(now)
  return `${issuedAt}.${sign(key, issuedAt)}`
}

export type FormTokenCheck = "ok" | "missing" | "invalid" | "too-fast" | "expired"

export function checkFormToken(token: unknown, now = Date.now()): FormTokenCheck {
  if (typeof token !== "string" || token === "") return "missing"
  const key = signingKey()
  if (!key) return "invalid"
  const [issuedAt, signature, extra] = token.split(".")
  if (!issuedAt || !signature || extra !== undefined || !/^\d{13}$/.test(issuedAt)) return "invalid"
  const expected = Buffer.from(sign(key, issuedAt))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid"
  const age = now - Number(issuedAt)
  // A time in the future counts as too fast as well.
  if (age < MIN_FILL_MS) return "too-fast"
  if (age > MAX_AGE_MS) return "expired"
  return "ok"
}
