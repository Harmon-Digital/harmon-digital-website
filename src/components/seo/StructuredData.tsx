export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Harmon Digital, LLC',
    url: 'https://harmon-digital.com',
    logo: 'https://harmon-digital.com/logo/icon.png',
    description: 'Custom software, AI agents, websites, and automation built for businesses. Not templates — software built around how your team actually works.',
    foundingDate: '2024',
    sameAs: [
      'https://www.linkedin.com/company/harmon-digital/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@harmon-digital.com',
      contactType: 'sales',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProfessionalServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Harmon Digital, LLC',
    url: 'https://harmon-digital.com',
    image: 'https://harmon-digital.com/logo/icon.png',
    description: 'Custom software, AI agents, websites, and automation for businesses. We build the tools your team actually needs.',
    priceRange: 'Contact for pricing',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software & AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software & Apps',
            description: 'Internal tools, portals, dashboards, and apps built for your business.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agents & Consulting',
            description: 'Custom AI agents that handle email, customer service, scheduling, and more.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Websites & Web Apps',
            description: 'Modern websites and web applications designed and built from scratch.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automation & Integrations',
            description: 'Connect your tools and automate repetitive workflows.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What kinds of projects do you take on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Custom internal tools, AI agents, websites, web apps, automation, integrations — if it involves software and it helps your business run better, we build it. We work best with small to mid-size businesses that need something off-the-shelf tools can\'t do.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most projects launch in 4-8 weeks. Simple automations or integrations can be done in days. Larger custom software builds may take 2-3 months. We\'ll give you a clear timeline before any work starts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer ongoing support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Most clients keep us on a monthly retainer for updates, new features, and support. But it\'s not required — we can also do one-off projects. Whatever works for your business.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every project is different, so we scope and price based on what you actually need. Book a call and we\'ll give you a straight answer — no generic proposals or surprise invoices.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this right for my business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If your team is wasting time on manual work, your tools don\'t talk to each other, or you need custom software that doesn\'t exist yet — yes. We work with service businesses, agencies, e-commerce companies, and more.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Harmon Digital',
    url: 'https://harmon-digital.com',
    description: 'Custom software, AI agents, websites, and automation for businesses.',
    publisher: {
      '@type': 'Organization',
      name: 'Harmon Digital, LLC',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
