import React from 'react';
import SolarHeader from '@/components/solar/SolarHeader';
import SolarHero from '@/components/solar/SolarHero';
import SolarPackages from '@/components/solar/SolarPackages';
import SolarWhyChoose from '@/components/solar/SolarWhyChoose';
import SolarSubsidy from '@/components/solar/SolarSubsidy';
import SolarLeadForm from '@/components/solar/SolarLeadForm';
import SolarProcess from '@/components/solar/SolarProcess';
import SolarGallery from '@/components/solar/SolarGallery';
import SolarFaq from '@/components/solar/SolarFaq';
import SolarFinalCta from '@/components/solar/SolarFinalCta';
import SolarFooter from '@/components/solar/SolarFooter';
import SolarFloatingActions from '@/components/solar/SolarFloatingActions';
import SolarStructuredData from '@/components/solar/SolarStructuredData';

export const metadata = {
  title: 'Shivashutosh Solar Systems | 3 KW Solar System in Uttar Pradesh',
  description:
    'घर और व्यवसाय के लिए सोलर पैनल, इन्वर्टर और बैटरी सहित संपूर्ण सोलर समाधान। सरकारी सब्सिडी की जानकारी और मुफ्त साइट सर्वे के लिए संपर्क करें।',
  alternates: {
    canonical: 'https://shivashutoshlabs.com/solarsystem',
  },
  openGraph: {
    title: 'Shivashutosh Solar Systems | 3 KW Solar System in Uttar Pradesh',
    description:
      'घर और व्यवसाय के लिए सोलर पैनल, इन्वर्टर और बैटरी सहित संपूर्ण सोलर समाधान। सरकारी सब्सिडी की जानकारी और मुफ्त साइट सर्वे के लिए संपर्क करें।',
    url: 'https://shivashutoshlabs.com/solarsystem',
    siteName: 'Shivashutosh Solar Systems',
    locale: 'hi_IN',
    alternateLocale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://shivashutoshlabs.com/solar/rooftop-installation.jpg',
        width: 1200,
        height: 675,
        alt: 'Shivashutosh Solar Systems - 3 KW Rooftop Solar Installation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivashutosh Solar Systems | 3 KW Solar System in Uttar Pradesh',
    description:
      'घर और व्यवसाय के लिए सोलर पैनल, इन्वर्टर और बैटरी सहित संपूर्ण सोलर समाधान। सरकारी सब्सिडी की जानकारी और मुफ्त साइट सर्वे के लिए संपर्क करें।',
    images: ['https://shivashutoshlabs.com/solar/rooftop-installation.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function SolarSystemPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Structured Data (JSON-LD: LocalBusiness + FAQPage) */}
      <SolarStructuredData />

      {/* SECTION A – HEADER */}
      <SolarHeader />

      {/* Main Content Sections */}
      <main id="main-content" style={{ flexGrow: 1 }}>
        {/* SECTION B – HERO SECTION */}
        <SolarHero />

        {/* SECTION C – COMPLETE SOLAR PACKAGE */}
        <SolarPackages />

        {/* SECTION D – WHY CHOOSE SHIVASHUTOSH SOLAR SYSTEMS */}
        <SolarWhyChoose />

        {/* SECTION E – GOVERNMENT SUBSIDY INFORMATION (PM SURYA GHAR) */}
        <SolarSubsidy />

        {/* SECTION F – LEAD GENERATION FORM */}
        <SolarLeadForm />

        {/* SECTION G – 4-STEP INSTALLATION PROCESS */}
        <SolarProcess />

        {/* SECTION H – CUSTOMER INSTALLATION GALLERY */}
        <SolarGallery />

        {/* SECTION I – FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <SolarFaq />

        {/* SECTION J – FINAL CALL TO ACTION (CTA) */}
        <SolarFinalCta />
      </main>

      {/* SECTION K – FOOTER */}
      <SolarFooter />

      {/* FLOATING MOBILE ACTION BUTTONS */}
      <SolarFloatingActions />
    </div>
  );
}

