export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Harmon Digital, LLC',
    url: 'https://harmon-digital.com',
    logo: 'https://harmon-digital.com/logo/icon.png',
    description: 'We help businesses cut operational costs 30-50% with AI-powered automation. Measurable savings, documented quarterly.',
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
    description: 'AI operations consulting that cuts business costs 30-50%. Custom automation, AI agents, and process optimization with performance-based pricing.',
    priceRange: '$3,000-$5,000/mo + Performance-based',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Operations Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Operations Portal',
            description: 'Custom internal portal for streamlined operations and real-time visibility.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Customer Service Agent',
            description: 'AI agent to handle customer inquiries autonomously, reducing support costs.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Process Documentation & SOPs',
            description: 'Full documentation and standard operating procedures for operational consistency.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workflow Automation',
            description: 'Automated workflows that eliminate manual processes and reduce costs.',
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
        name: 'How do you measure cost savings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We baseline your current operational costs in Month 1 — labor hours, software spend, throughput rates. Every quarter, we measure the same metrics. The difference is your savings. Everything is tracked in a transparent dashboard you can access anytime.",
        },
      },
      {
        '@type': 'Question',
        name: "What's the minimum commitment?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "6 months. It takes 60-90 days to build and deploy, then we need at least one quarter to measure and optimize. Most clients stay much longer as we expand to new processes.",
        },
      },
      {
        '@type': 'Question',
        name: 'What kinds of businesses do you work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Service businesses, agencies, distributors, and companies doing $500K+ in revenue with significant manual operations. We also work with PE firms to optimize across portfolio companies.",
        },
      },
      {
        '@type': 'Question',
        name: "What if the savings don't materialize?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Our performance bonus is tied to documented savings. No savings, no bonus — you only pay the retainer. And if we can't document at least 2x the retainer in savings within 6 months, we refund your last month.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do we need to replace our team?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No. We automate tasks, not people. Most clients redeploy team members to higher-value work rather than cutting headcount. But the cost savings are real either way — fewer hours spent on manual processes means more capacity without more hiring.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can you work with multiple companies in our portfolio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — this is one of our strengths. We develop repeatable automation playbooks across portfolio companies, so each engagement gets faster and cheaper. One relationship, multiple wins.",
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
    description: 'AI operations consulting that helps businesses cut costs 30-50% with automation.',
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
