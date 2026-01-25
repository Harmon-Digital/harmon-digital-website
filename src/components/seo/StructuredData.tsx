export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Harmon Digital, LLC',
    url: 'https://harmon-digital.com',
    logo: 'https://harmon-digital.com/logo/icon.png',
    description: 'Custom software and automation for businesses built to exit or scale. AI-powered development delivered in 3-6 months.',
    foundingDate: '2024',
    sameAs: [
      'https://www.linkedin.com/company/harmon-digital/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@harmon-digital.com',
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
    description: 'Custom software development, business automation, and AI solutions for growing businesses.',
    priceRange: '$2,500 - $5,000/month',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Internal Operations Portals',
            description: 'Custom internal software and portals to manage business operations.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Agents & Chatbots',
            description: 'Intelligent AI agents and chatbots for customer service and internal automation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Workflow Automation',
            description: 'End-to-end workflow automation to eliminate repetitive tasks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'System Integrations',
            description: 'Connect your existing tools and systems for seamless data flow.',
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
        name: "What's the difference between Standard and Accelerated?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Standard ($2,500/mo) means we work on one project at a time—great for most businesses. Accelerated ($5,000/mo) lets us run two projects in parallel, so you can systematize faster if you have multiple priorities or a tighter timeline.",
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Most full internal applications take 3-6 months. You'll see working features every 2 weeks, so you're not waiting months to see progress. Simpler automations and integrations can be done in weeks.",
        },
      },
      {
        '@type': 'Question',
        name: "What's included in the $1,500/mo maintenance?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Maintenance covers bug fixes, minor updates, keeping integrations running smoothly, and priority support when something breaks. It's optional—you own everything we build and it works without us. But most clients like knowing someone's watching the systems.",
        },
      },
      {
        '@type': 'Question',
        name: 'What tools do you use to build?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We use modern, maintainable tools: Airtable for databases, n8n for workflow automation, custom web apps when needed, and various AI APIs for intelligent features. We choose tools based on your needs—not what's trendy.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is this right for my business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "If you're doing $500K+ in revenue and spending too much time on operations, probably yes. We work best with service businesses, agencies, distributors, and companies where the owner is currently the bottleneck. Book a call—we'll tell you honestly if we can help.",
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
