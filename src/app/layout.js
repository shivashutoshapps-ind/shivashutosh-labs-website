/**
 * SLabs AI PDF — Root Layout
 *
 * The root layout applies to all pages. It:
 * - Loads Google Fonts via Next.js font optimization
 * - Sets default metadata
 * - Renders the header and footer
 * - Injects skip-nav for accessibility
 * - Provides WebSite + Organization JSON-LD
 */
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StructuredData, { buildWebSiteSchema, buildOrganizationSchema } from '@/components/seo/StructuredData';
import '@/styles/globals.css';

// ─── Font Loading ─────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

// ─── Default Metadata ─────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Shivashutosh Labs',
    default: 'Shivashutosh Labs – Free PDF, Image & Form Tools | मुफ़्त PDF टूल्स',
  },
  description:
    'Free PDF tools for everyone. Merge, split, compress, convert PDFs. Resize photos for government forms. No signup required. | सभी के लिए मुफ़्त PDF टूल्स।',
  applicationName: 'Shivashutosh Labs',
  authors: [{ name: 'Shivashutosh Labs' }],
  creator: 'Shivashutosh Labs',
  publisher: 'Shivashutosh Labs',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Shivashutosh Labs',
    locale: 'hi_IN',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'SLabs AI PDF',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <html
      lang="hi"
      dir="ltr"
      className={`${inter.variable}`}
    >
      <head>
        {/* Preconnect to Google Fonts CDN for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#0A1628" />
        
        {/* Structured Data */}
        <StructuredData data={[buildWebSiteSchema(), buildOrganizationSchema()]} />
      </head>
      <body style={{ fontFamily: 'var(--font-devanagari), var(--font-inter), system-ui, sans-serif' }}>
        {/* Skip navigation for keyboard/screen reader users */}
        <a href="#main-content" className="skip-link">
          मुख्य सामग्री पर जाएं (Skip to main content)
        </a>

        {/* Site Header */}
        <Header />

        {/* Main content area */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Site Footer */}
        <Footer />
      </body>
    </html>
  );
}
