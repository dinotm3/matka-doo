/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 * Allows empty (optional) or valid formats: +385 1 234 5678, 01-234-5678, etc.
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true;
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^\+?\d{6,15}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Escapes a string for safe inclusion in HTML text content or attribute values.
 * Use for any user-controlled value interpolated into email/HTML templates.
 */
export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
