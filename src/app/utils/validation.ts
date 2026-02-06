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
