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
  title: 'अपने घर पर Solar लगवाएं – प्रभावी लागत ₹0 तक | Shivashutosh Solar Agency Uttar Pradesh',
  description:
    'अब पूरे उत्तर प्रदेश में Solar लगवाने की प्रभावी लागत ₹0 तक! ZERO DOWN PAYMENT विकल्प, ₹1,08,000 तक सरकारी सब्सिडी (केंद्र ₹78,000 + यूपी ₹30,000) तथा TATA, Adani, UTL ब्रांड्स के साथ हर महीने बिजली बिल में भारी बचत।',
  alternates: {
    canonical: 'https://shivashutoshlabs.com/solarsystem',
  },
  openGraph: {
    title: 'अपने घर पर Solar लगवाएं – प्रभावी लागत ₹0 तक | Shivashutosh Solar Agency',
    description:
      'अब पूरे उत्तर प्रदेश में Solar लगवाने की प्रभावी लागत ₹0 तक! ZERO DOWN PAYMENT का विकल्प, अधिकतम ₹1,08,000 तक सरकारी सब्सिडी (केंद्र ₹78,000 + यूपी ₹30,000) और हर महीने बिजली बिल में बड़ी बचत।',
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
        alt: 'अपने घर पर Solar लगवाएं – प्रभावी लागत ₹0 तक - Shivashutosh Solar Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'अपने घर पर Solar लगवाएं – प्रभावी लागत ₹0 तक | Shivashutosh Solar Agency',
    description:
      'अब पूरे उत्तर प्रदेश में Solar लगवाने की प्रभावी लागत ₹0 तक! ZERO DOWN PAYMENT का विकल्प, अधिकतम ₹1,08,000 तक सरकारी सब्सिडी और हर महीने बिजली बिल में बड़ी बचत।',
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
