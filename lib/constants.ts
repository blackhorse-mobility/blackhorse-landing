/**
 * Global constants for Blackhorse Landing
 *
 * NEXT_PUBLIC_WHATSAPP_SUPPORT should be set in your .env.local file as:
 * NEXT_PUBLIC_WHATSAPP_SUPPORT=https://wa.me/<phone_number>
 *
 * Replace <phone_number> with the full international phone number (no + or spaces),
 * e.g. NEXT_PUBLIC_WHATSAPP_SUPPORT=https://wa.me/233201234567
 */

export const NEXT_WHATSAPP_SUPPORT =
  process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT ?? "https://wa.me/233201234567";

export const SUPPORT_EMAIL = "nanaama@black-horse.io";
