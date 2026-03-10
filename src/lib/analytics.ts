/**
 * Analytics utility for GA4 and Facebook Pixel tracking.
 *
 * IMPORTANT: Replace the placeholder IDs before going live:
 *   - GA4 Measurement ID: update GA_MEASUREMENT_ID below
 *   - Facebook Pixel ID:  update FB_PIXEL_ID below
 */

// ── Placeholder IDs — replace with real values ──────────────────────────
export const GA_MEASUREMENT_ID = "G-ZVC7R06Y33";
export const FB_PIXEL_ID = "XXXXXXXXXXXXXXXXX"; // TODO: Replace with real Facebook Pixel ID

// ── Type declarations for global tracking functions ─────────────────────
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    dataLayer: unknown[];
    _fbq: unknown;
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Fire a custom event to both GA4 and Facebook Pixel.
 *
 * @example
 *   trackEvent('button_click', { button_name: 'pricing_cta' })
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string>,
): void {
  if (typeof window === "undefined") return;

  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Facebook Pixel — fires as a custom event with optional params
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}

/**
 * Track a lead-capture form submission on both platforms.
 */
export function trackLeadCapture(formData: {
  email: string;
  state: string;
}): void {
  if (typeof window === "undefined") return;

  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", "form_submit", {
      form_name: "lead_capture",
      email: formData.email,
      state: formData.state,
    });
  }

  // Facebook Pixel — standard Lead event
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: "lead_capture",
      email: formData.email,
      state: formData.state,
    });
  }
}

/**
 * Track a "Start Trial" action on both platforms.
 */
export function trackTrialStart(): void {
  if (typeof window === "undefined") return;

  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", "start_trial");
  }

  // Facebook Pixel — standard StartTrial event
  if (typeof window.fbq === "function") {
    window.fbq("track", "StartTrial");
  }
}
