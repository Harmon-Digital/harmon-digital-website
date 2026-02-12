export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Harmon Digital, LLC',
    url: 'https://harmon-digital.com',
    logo: 'https://harmon-digital.com/logo/icon.png',
    description: 'Sell your business for more. We systematize owner-dependent businesses so buyers pay a premium.',
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
    description: 'Exit systematization for owner-dependent businesses. We build turnkey operations so buyers pay a premium.',
    priceRange: '$2,500/mo + Success-based',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exit Systematization Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Operations Portal',
            description: 'Custom internal portal so the business runs without you.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Customer Service Agent',
            description: 'AI agent to handle customer inquiries without owner involvement.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Complete SOPs & Documentation',
            description: 'Full documentation and standard operating procedures for due diligence.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workflow Automation',
            description: 'Automated workflows that eliminate owner dependency.',
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
        name: "What if my valuation doesn't increase?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "You pay the monthly retainer during the build. Our success fee is 8% of the valuation increase, paid from sale proceeds. If systematization doesn't increase what buyers will pay, we don't collect the success fee.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do you measure the valuation increase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We work with your broker or get an independent assessment to establish your baseline valuation before we start. When you sell, the increase is the difference between what you actually sell for and that baseline. Simple, transparent, no games.",
        },
      },
      {
        '@type': 'Question',
        name: 'How long until my business is ready to sell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "3-6 months for full systematization, depending on complexity. After that, your business runs without you and buyers see turnkey operations instead of key-person risk.",
        },
      },
      {
        '@type': 'Question',
        name: "What if I'm not ready to sell yet?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We work best with businesses actively preparing to go to market. If you're more than 6 months out, let's talk—we can discuss whether the timing makes sense or if you should reach out when you're closer.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is this right for my business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "If you're doing $500K+ in revenue and you're the bottleneck, probably yes. We work best with service businesses, agencies, distributors, and companies where buyers would discount for key-person risk.",
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
    description: 'Custom software and automation for businesses built to exit or scale.',
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
