/**
 * Analytics and conversion event tracker for Shivashutosh Solar Systems.
 * Supports Google Analytics 4, Google Ads, Meta Pixel, and Google Tag Manager.
 * Configurable via environment variables without hardcoding fake IDs.
 */

// Helper to safely dispatch events to dataLayer, gtag, fbq
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Tag Manager / dataLayer
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Google Analytics (gtag)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    // 3. Meta Pixel (fbq)
    if (typeof window.fbq === 'function') {
      if (eventName === 'lead_form_submitted') {
        window.fbq('track', 'Lead', eventParams);
      } else if (eventName === 'whatsapp_click' || eventName === 'phone_call_click') {
        window.fbq('trackCustom', eventName, eventParams);
      } else {
        window.fbq('trackCustom', eventName, eventParams);
      }
    }
  } catch (err) {
    console.debug('Analytics tracking warning:', err);
  }
}

/**
 * Capture UTM and click ID parameters from current URL or sessionStorage.
 */
export function getTrackingContext() {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
      referrer: '',
    };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    // Check URL parameters first
    let hasUtm = false;
    const currentUtm = {};
    utmKeys.forEach((key) => {
      const val = urlParams.get(key);
      if (val) {
        currentUtm[key] = val;
        hasUtm = true;
      }
    });

    // Check for ad click IDs (gclid, fbclid)
    const gclid = urlParams.get('gclid');
    const fbclid = urlParams.get('fbclid');
    if (gclid && !currentUtm['utm_source']) {
      currentUtm['utm_source'] = 'google_ads';
      currentUtm['utm_medium'] = 'cpc';
    } else if (fbclid && !currentUtm['utm_source']) {
      currentUtm['utm_source'] = 'meta_ads';
      currentUtm['utm_medium'] = 'social';
    }

    // If UTMs found in URL, persist to sessionStorage for multi-page/form persistence
    if (hasUtm || gclid || fbclid) {
      sessionStorage.setItem('solar_tracking_params', JSON.stringify(currentUtm));
    }

    // Fall back to stored UTM if not in current query string
    const stored = sessionStorage.getItem('solar_tracking_params');
    const merged = stored ? { ...JSON.parse(stored), ...currentUtm } : currentUtm;

    return {
      utmSource: merged['utm_source'] || '',
      utmMedium: merged['utm_medium'] || '',
      utmCampaign: merged['utm_campaign'] || '',
      utmTerm: merged['utm_term'] || '',
      utmContent: merged['utm_content'] || '',
      referrer: document.referrer || '',
    };
  } catch (e) {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
      referrer: '',
    };
  }
}
