import Link from 'next/link';
import { buildBaseMetadata } from '@/lib/metadata';

export const metadata = buildBaseMetadata({
  title: 'GST Calculator — Privacy Policy | Shivashutosh Labs',
  description: 'Official Privacy Policy for GST Calculator V1 by Shivashutosh AI Labs. GST Calculator is a 100% offline, private mobile app with zero ads, zero analytics, and zero data tracking.',
  path: '/privacy-policy/gst-calculator',
});

export default function GstCalculatorPrivacyPolicy() {
  const lastUpdated = 'August 28, 2026';

  return (
    <main id="main-content" className="container section">
      <article className="prose" style={{ margin: '0 auto', maxWidth: '840px' }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          <Link href="/">Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href="/privacy">Privacy Policies</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: '600' }}>GST Calculator</span>
        </nav>

        {/* Page Header */}
        <header style={{ marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span className="badge badge--live">Official Release Policy</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Last Updated: <strong>{lastUpdated}</strong>
            </span>
          </div>
          <h1 style={{ marginBottom: 'var(--space-3)', fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
            GST Calculator — Privacy Policy
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            Official Privacy Statement for the GST Calculator Android Application (V1.0) developed by Shivashutosh AI Labs.
          </p>
        </header>

        {/* App Meta Summary Card */}
        <section 
          className="card" 
          style={{ 
            marginBottom: 'var(--space-8)', 
            background: 'var(--color-surface-2)', 
            borderColor: 'var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              Application Name
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
              GST Calculator
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              Version
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
              1.0
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              Developer / Brand
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '2px' }}>
              Shivashutosh AI Labs
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              Official Platform
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-primary)', marginTop: '2px' }}>
              <a href="https://shivashutoshlabs.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                Shivashutosh Labs
              </a>
            </div>
          </div>
        </section>

        {/* Highlight Summary Box */}
        <section 
          style={{ 
            padding: 'var(--space-5) var(--space-6)', 
            background: 'rgba(16, 185, 129, 0.08)', 
            borderLeft: '4px solid var(--color-green)', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: 'var(--space-8)' 
          }}
        >
          <h3 style={{ margin: '0 0 var(--space-2) 0', color: 'var(--color-green)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🔒</span> Privacy Guarantee &amp; Verification Audit
          </h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
            GST Calculator V1 is designed with a zero-data collection architecture. The application operates 100% offline on your device, contains <strong>no advertisements</strong>, uses <strong>no analytics SDKs</strong>, performs <strong>no user tracking</strong>, and transmits no information over the internet.
          </p>
        </section>

        {/* 14 Mandatory Policy Sections */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <div>
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy applies to the mobile application <strong>GST Calculator (Version 1.0)</strong>, created and published by <strong>Shivashutosh AI Labs</strong>, a project brand of <strong>Shivashutosh Labs</strong> (<a href="https://shivashutoshlabs.com">https://shivashutoshlabs.com</a>).
            </p>
            <p>
              We understand the importance of user privacy and financial data confidentiality. This document informs users of our policies regarding the collection, use, and disclosure of information when using GST Calculator V1. By installing and using the application, you agree to the terms outlined in this policy.
            </p>
          </div>

          <div>
            <h2>2. Information Collection</h2>
            <p>
              <strong>GST Calculator V1 does NOT collect, capture, transmit, or store any personal or non-personal information.</strong>
            </p>
            <p>
              When you use the app to calculate Goods and Services Tax (GST), CGST, SGST, IGST, net amounts, gross amounts, or custom tax rates, all numeric values, inputs, and calculation results remain strictly in the volatile memory of your device during execution. No names, email addresses, phone numbers, location data, IP addresses, or device identifiers are collected.
            </p>
          </div>

          <div>
            <h2>3. Offline Operation</h2>
            <p>
              The GST Calculator application is engineered to operate <strong>100% offline</strong> without requiring an active internet connection.
            </p>
            <p>
              All mathematical algorithms and tax calculation routines execute locally on your smartphone or tablet hardware. Because the application does not connect to external servers or remote endpoints, your calculations never leave your device.
            </p>
          </div>

          <div>
            <h2>4. Account/Login</h2>
            <p>
              Using GST Calculator V1 does <strong>not require any registration, sign-up, user account creation, or login credential verification</strong>.
            </p>
            <p>
              You can launch and use all features of the application immediately after installation without providing any personal profile information or authentication tokens.
            </p>
          </div>

          <div>
            <h2>5. Advertising</h2>
            <p>
              <strong>GST Calculator V1 is 100% Ad-Free.</strong>
            </p>
            <p>
              The application contains zero third-party ad networks, zero banner ads, zero interstitial ads, zero rewarded video ads, and zero native ad SDKs (such as Google AdMob, Unity Ads, AppLovin, or Facebook Audience Network). We do not display dynamic advertisements or monetize user attention through commercial tracking.
            </p>
          </div>

          <div>
            <h2>6. Analytics</h2>
            <p>
              <strong>GST Calculator V1 incorporates NO analytics frameworks or telemetry services.</strong>
            </p>
            <p>
              We do not use Google Analytics for Firebase, Firebase Crashlytics, Mixpanel, Flurry, Amplitude, or any telemetry tools. We do not track feature usage frequency, screen view durations, button clicks, or crash logs remotely.
            </p>
          </div>

          <div>
            <h2>7. Tracking</h2>
            <p>
              <strong>We do NOT track users under any circumstances.</strong>
            </p>
            <p>
              GST Calculator V1 does not perform cross-app tracking, device fingerprinting, advertising ID collection (GAID), MAC address inspection, or cookie tracking. Your activity inside the application is completely private and untracked.
            </p>
          </div>

          <div>
            <h2>8. Data Storage</h2>
            <p>
              All calculation inputs and temporary settings stay exclusively in your device's local memory for the active runtime session.
            </p>
            <p>
              The application does not maintain cloud databases, remote backups, server-side storage, or external database integrations. Closing the app or clearing local app data clears all temporary states from your device.
            </p>
          </div>

          <div>
            <h2>9. Data Sharing</h2>
            <p>
              Because GST Calculator V1 collects zero data, <strong>we do not share, sell, lease, trade, or transfer any user data to third parties, government agencies, data brokers, or commercial entities</strong>.
            </p>
          </div>

          <div>
            <h2>10. Data Security</h2>
            <p>
              We prioritize data security by designing the application with zero network exposure. Since 100% of calculations take place locally on your device and no internet requests are made, your financial inputs are protected against network interception, packet sniffing, man-in-the-middle attacks, and cloud data leaks.
            </p>
          </div>

          <div>
            <h2>11. Children's Privacy</h2>
            <p>
              GST Calculator V1 complies fully with the Children's Online Privacy Protection Act (COPPA) and Google Play Families Policies.
            </p>
            <p>
              The application is safe for users of all age groups, including children under 13 years of age. We do not knowingly collect, store, or solicit any personal information from children or any other users.
            </p>
          </div>

          <div>
            <h2>12. Third-Party Services</h2>
            <p>
              The application does not integrate with or rely upon any third-party APIs, software development kits (SDKs), external web services, or background network libraries that transmit user data.
            </p>
          </div>

          <div>
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect future version updates or regulatory enhancements.
            </p>
            <p>
              Any changes will be published directly on this web page (<a href="https://shivashutoshlabs.com/privacy-policy/gst-calculator">https://shivashutoshlabs.com/privacy-policy/gst-calculator</a>) with a updated "Last Updated" revision date. You are advised to review this policy periodically for any changes.
            </p>
          </div>

          <div>
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions, suggestions, or concerns regarding this Privacy Policy or the GST Calculator application, please reach out to us through our official communication channels:
            </p>
            <div 
              className="card" 
              style={{ 
                marginTop: 'var(--space-4)', 
                padding: 'var(--space-6)',
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
              }}
            >
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <li>
                  <strong>Official Website:</strong>{' '}
                  <a href="https://shivashutoshlabs.com" target="_blank" rel="noopener noreferrer">
                    https://shivashutoshlabs.com
                  </a>
                </li>
                <li>
                  <strong>Contact Email:</strong>{' '}
                  <a href="mailto:shivashutosh.apps@gmail.com">
                    shivashutosh.apps@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Contact Page:</strong>{' '}
                  <Link href="/contact">
                    https://shivashutoshlabs.com/contact
                  </Link>
                </li>
                <li>
                  <strong>Developer/Brand:</strong> Shivashutosh AI Labs
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
