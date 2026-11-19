import React from 'react';
import SolarHeader from '@/components/solar/SolarHeader';
import SolarHero from '@/components/solar/SolarHero';
import SolarQuickEnquiry from '@/components/solar/SolarQuickEnquiry';
import SolarBrands from '@/components/solar/SolarBrands';
import SolarMiddleQuickEnquiry from '@/components/solar/SolarMiddleQuickEnquiry';
import SolarCoverage from '@/components/solar/SolarCoverage';
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
  title: 'Shivashutosh Solar Agency | Authorized Solar Services Across Uttar Pradesh | TATA, Adani, UTL Brands | Up to ₹1,08,000 Subsidy',
  description:
    'संपूर्ण उत्तर प्रदेश में अधिकृत सोलर सेवाएँ। TATA, Adani, UTL और अन्य प्रमुख ब्रांड्स के सोलर सिस्टम विकल्प। केंद्र (₹78,000) व यूपी सरकार (₹30,000) से अधिकतम ₹1,08,000 तक सरकारी सब्सिडी सहायता व मुफ्त साइट सर्वे।',
  alternates: {
    canonical: 'https://shivashutoshlabs.com/solarsystem',
  },
  openGraph: {
    title: 'Shivashutosh Solar Agency | Authorized Solar Services Across Uttar Pradesh | Up to ₹1,08,000 Subsidy',
    description:
      'संपूर्ण उत्तर प्रदेश में अधिकृत सोलर सेवाएँ। TATA, Adani, UTL और अन्य प्रमुख ब्रांड्स के सोलर पैनल, इन्वर्टर और बैटरी। केंद्र (₹78,000) व यूपी सरकार (₹30,000) से अधिकतम ₹1,08,000 तक सरकारी सब्सिडी सहायता व मुफ्त साइट सर्वे।',
    url: 'https://shivashutoshlabs.com/solarsystem',
    siteName: 'Shivashutosh Solar Agency',
    locale: 'hi_IN',
    alternateLocale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://shivashutoshlabs.com/solar/rooftop-installation.jpg',
        width: 1200,
        height: 675,
        alt: 'Shivashutosh Solar Agency - Authorized Solar Services Across Uttar Pradesh - Up to ₹1,08,000 Subsidy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivashutosh Solar Agency | Authorized Solar Services Across Uttar Pradesh | Up to ₹1,08,000 Subsidy',
    description:
      'संपूर्ण उत्तर प्रदेश में अधिकृत सोलर सेवाएँ। TATA, Adani, UTL और अन्य प्रमुख ब्रांड्स के सोलर सिस्टम विकल्प। केंद्र (₹78,000) व यूपी सरकार (₹30,000) से अधिकतम ₹1,08,000 तक सरकारी सब्सिडी सहायता व मुफ्त साइट सर्वे।',
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
        {/* SECTION 1 – TOP-LEVEL TATA & ADANI BRAND ENQUIRY & CALL/CALLBACK (ABOVE HERO) */}
        <SolarQuickEnquiry />

        {/* SECTION B – HERO SECTION (Statewide + Brand Choice + Subsidy + CTAs) */}
        <SolarHero />

        {/* SECTION C – DEDICATED MULTI-BRAND CHOICE SECTION */}
        <SolarBrands />

        {/* SECTION C.2 – TATA & ADANI QUICK ENQUIRY (MIDDLE OF FIRST PAGE) */}
        <SolarMiddleQuickEnquiry />

        {/* SECTION D – STATEWIDE UTTAR PRADESH SERVICE COVERAGE */}
        <SolarCoverage />

        {/* SECTION E – COMPLETE SOLAR PACKAGE (Panels, Inverters, Battery) */}
        <SolarPackages />

        {/* SECTION F – WHY CHOOSE SHIVASHUTOSH SOLAR AGENCY */}
        <SolarWhyChoose />

        {/* SECTION G – GOVERNMENT SUBSIDY INFORMATION (PM SURYA GHAR) */}
        <SolarSubsidy />

        {/* SECTION H – LEAD GENERATION FORM */}
        <SolarLeadForm />

        {/* SECTION I – 4-STEP INSTALLATION PROCESS */}
        <SolarProcess />

        {/* SECTION J – CUSTOMER INSTALLATION GALLERY */}
        <SolarGallery />

        {/* SECTION K – FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <SolarFaq />

        {/* SECTION L – FINAL CALL TO ACTION (CTA) */}
        <SolarFinalCta />
      </main>

      {/* SECTION M – FOOTER */}
      <SolarFooter />

      {/* FLOATING MOBILE ACTION BUTTONS */}
      <SolarFloatingActions />
    </div>
  );
}
