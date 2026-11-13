import React from 'react';
import { FAQ_DATA } from '@/data/solarFaq';

export default function SolarStructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Shivashutosh Solar Systems',
    alternateName: 'शिवआशुतोष सोलर सिस्टम्स',
    description:
      'घर और व्यवसाय के लिए 3 KW संपूर्ण सोलर सिस्टम, सोलर पैनल, इन्वर्टर एवं बैटरी समाधान तथा पीएम सूर्य घर योजना के तहत सरकारी सब्सिडी सहायता।',
    url: 'https://shivashutoshlabs.com/solarsystem',
    telephone: '+919719543259',
    image: 'https://shivashutoshlabs.com/solar/rooftop-installation.jpg',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aligarh',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.8974',
      longitude: '78.0880',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Aligarh' },
      { '@type': 'AdministrativeArea', name: 'Hathras' },
      { '@type': 'AdministrativeArea', name: 'Mathura' },
      { '@type': 'AdministrativeArea', name: 'Agra' },
      { '@type': 'AdministrativeArea', name: 'Bulandshahr' },
      { '@type': 'AdministrativeArea', name: 'Kasganj' },
      { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

