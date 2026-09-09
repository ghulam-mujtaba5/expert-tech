import { company } from './company';

export const SITE_URL = 'https://www.experttech.uk.com';

/**
 * Breadcrumb item definition
 */
export interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList Schema.org structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Global Organization / Corporation Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: company.tagline,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.line1,
      addressLocality: company.address.town,
      addressRegion: company.address.region,
      postalCode: company.address.postcode,
      addressCountry: 'GB',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone,
        contactType: 'customer support',
        areaServed: 'GB',
        availableLanguage: ['en'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: company.phone,
        contactType: 'technical support',
        areaServed: 'GB',
        availableLanguage: ['en'],
      },
    ],
    knowsAbout: [
      'Managed IT Services',
      'Cloud Architecture & DevOps',
      'Cybersecurity & UK Compliance',
      'Custom Software Development',
      'Disaster Recovery & Business Continuity',
      'UK GDPR & Cyber Essentials',
      'Amazon Web Services (AWS)',
      'Microsoft Azure',
      'Network Infrastructure',
    ],
    sameAs: [
      'https://share.google/5dF7aJ3XjNtnNFsrr',
    ],
  };
}

/**
 * LocalBusiness / ProfessionalService / ITService Schema for GEO and Local SEO
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: company.name,
    image: `${SITE_URL}/logo.svg`,
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Credit Card, Bank Transfer, Invoice',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.line1,
      addressLocality: company.address.town,
      addressRegion: company.address.region,
      postalCode: company.address.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 56.1098,
      longitude: -3.3512,
    },
    hasMap: 'https://maps.google.com/maps?q=Cowdenbeath%2C+Scotland%2C+KY4+9QE',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Cowdenbeath',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Fife',
      },
      {
        '@type': 'City',
        name: 'Dunfermline',
      },
      {
        '@type': 'City',
        name: 'Edinburgh',
      },
      {
        '@type': 'City',
        name: 'Glasgow',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Scotland',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    ],
  };
}

/**
 * WebSite Schema with publisher connection
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    description: company.tagline,
    inLanguage: 'en-GB',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Services Catalog Schema for /services
 */
export function generateServicesCatalogSchema() {
  const serviceList = [
    {
      name: 'Web Design & Development',
      description: 'Crafting bespoke web applications and platforms that drive business growth, user engagement, and enterprise performance.',
      serviceType: 'Web Development',
    },
    {
      name: 'Managed IT Support & Helpdesk',
      description: 'Proactive monitoring and 15-minute guaranteed SLA response to ensure operational continuity and zero business downtime.',
      serviceType: 'IT Support',
    },
    {
      name: 'Custom Software & Mobile App Development',
      description: 'Bespoke software applications, internal CRM automation, and mobile solutions tailored to optimize unique operational workflows.',
      serviceType: 'Custom Software Development',
    },
    {
      name: 'Cloud Solutions & DevOps',
      description: 'Secure, scalable cloud migrations, automated disaster recovery, and infrastructure management across AWS and Microsoft Azure.',
      serviceType: 'Cloud Computing Services',
    },
    {
      name: 'Cybersecurity & UK Compliance',
      description: 'Multi-layered perimeter defense, vulnerability audits, Cyber Essentials alignment, and UK GDPR regulatory compliance.',
      serviceType: 'Cybersecurity Services',
    },
    {
      name: 'Network & Systems Architecture',
      description: 'Robust corporate network infrastructure, structured cabling, VoIP unified communications, and enterprise uptime assurance.',
      serviceType: 'Network Infrastructure',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: serviceList.map((srv, idx) => ({
      '@type': 'Service',
      position: idx + 1,
      name: srv.name,
      serviceType: srv.serviceType,
      description: srv.description,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: srv.name,
      },
    })),
  };
}

/**
 * Reviews and AggregateRating Schema for /reviews
 */
export function generateReviewsSchema(
  reviews: Array<{ client: string; company: string; quote: string; rating: number }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: company.name,
    image: `${SITE_URL}/logo.svg`,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.line1,
      addressLocality: company.address.town,
      addressRegion: company.address.region,
      postalCode: company.address.postcode,
      addressCountry: 'GB',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      reviewCount: reviews.length.toString(),
    },
    review: reviews.map((rev) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: rev.client,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rev.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: rev.quote.replace(/[“”"]/g, ''),
      publisher: {
        '@type': 'Organization',
        name: 'Google Business Profile',
      },
    })),
  };
}

/**
 * JobPosting Schemas for /careers
 */
export function generateJobPostingSchemas() {
  const roles = [
    {
      title: 'Senior Cloud & DevOps Engineer',
      description: 'Lead multi-cloud AWS and Azure deployments, automate CI/CD pipelines, and design resilient infrastructure for UK enterprise retainer clients.',
      salaryMin: 65000,
      salaryMax: 80000,
      jobLocationType: 'TELECOMMUTE',
    },
    {
      title: 'Full Stack TypeScript Engineer',
      description: 'Build performant web applications, APIs, and client portals using Next.js, React, Node.js, and modern relational/NoSQL databases.',
      salaryMin: 50000,
      salaryMax: 65000,
      jobLocationType: 'TELECOMMUTE',
    },
    {
      title: 'Tier 2/3 IT Support & Systems Specialist',
      description: 'Deliver proactive endpoint management, network diagnostics, Microsoft 365 administration, and rapid SLA escalation resolution.',
      salaryMin: 32000,
      salaryMax: 42000,
      jobLocationType: 'HYBRID',
    },
  ];

  return roles.map((role) => ({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.description,
    datePosted: '2026-09-01',
    validThrough: '2027-09-01',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address.line1,
        addressLocality: company.address.town,
        addressRegion: company.address.region,
        postalCode: company.address.postcode,
        addressCountry: 'GB',
      },
    },
    jobLocationType: role.jobLocationType,
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'GBP',
      value: {
        '@type': 'QuantitativeValue',
        minValue: role.salaryMin,
        maxValue: role.salaryMax,
        unitText: 'YEAR',
      },
    },
  }));
}

/**
 * ContactPage Schema for /contact
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact/#webpage`,
    url: `${SITE_URL}/contact`,
    name: `Contact ${company.name}`,
    description: 'Connect directly with our UK-based systems engineers for IT support, quotes, and technical audits.',
    mainEntity: {
      '@id': `${SITE_URL}/#localbusiness`,
    },
  };
}
