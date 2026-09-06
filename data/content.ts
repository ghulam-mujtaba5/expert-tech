import { company } from './company';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon:
    | 'users'
    | 'cloud'
    | 'code'
    | 'phone'
    | 'smartphone'
    | 'shield'
    | 'custom-web'
    | 'consulting'
    | 'ai-saas-mvp'
    | 'cloud-devops'
    | 'ai-automation'
    | 'data-analytics'
    | 'growth-marketing'
    | 'mobile-app'
    | 'ui-ux'
    | string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: 'user-check' | 'book-open' | 'shield';
}

export interface ReviewItem {
  id: string;
  client: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
}

export const homeContent = {
  hero: {
    badge: "Managed IT & Custom Software",
    titlePrefix: "Technology that keeps your business ",
    titleHighlight: "moving.",
    subtitle: "End-to-end IT services, custom software, and proactive support tailored for UK businesses.",
    primaryCta: { text: "Explore Services", href: "/services" },
    secondaryCta: { text: "Talk to Us", href: "/contact" },
  },
  solutions: {
    overline: "Our Capabilities",
    title: "Tailored IT Solutions for Your Business",
    subtitle: "From robust IT support to custom software development, we ensure your technology drives growth, not disruption.",
    items: [
      {
        id: "support",
        title: "IT Support & Helpdesk",
        description: "Proactive monitoring and rapid response to keep your operations smooth and secure.",
        icon: "consulting" as const,
      },
      {
        id: "cloud",
        title: "Cloud Solutions",
        description: "Seamless migration, deployment, and management of scalable cloud infrastructure.",
        icon: "cloud-devops" as const,
      },
      {
        id: "software",
        title: "Software & App Development",
        description: "Custom applications and integrations designed to streamline your unique business processes.",
        icon: "ai-saas-mvp" as const,
      },
    ],
  },
  ctaBanner: {
    title: "Ready to secure your IT infrastructure?",
    subtitle: "Connect with our UK-based team for a personalized consultation and a clear path forward.",
    buttonText: "Schedule a Discovery Call",
    telLink: company.telLink,
    phoneNumber: company.phone,
  },
};

export const servicesContent = {
  hero: {
    overline: "Our Expertise",
    title: "Comprehensive IT Solutions",
    subtitle: "We provide a full spectrum of technology services to keep your business secure, efficient, and compliant.",
  },
  servicesList: [
    {
      id: "web-dev",
      title: "Web Design & Development",
      description: "Crafting bespoke web applications and platforms that drive business growth and user engagement.",
      icon: "custom-web" as const,
    },
    {
      id: "it-support",
      title: "IT Support & Helpdesk",
      description: "Proactive monitoring and rapid response to ensure your systems run smoothly, minimizing downtime.",
      icon: "consulting" as const,
    },
    {
      id: "software-dev",
      title: "Software & App Development",
      description: "Custom software solutions and mobile apps tailored to optimize your unique operational workflows.",
      icon: "ai-saas-mvp" as const,
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions",
      description: "Secure and scalable cloud migrations, management, and optimization for modern business agility.",
      icon: "cloud-devops" as const,
    },
  ],
  ctaBanner: {
    title: "Ready for Proactive IT Support?",
    subtitle: `Contact us today for a tailored quote and secure your business's future with ${company.name}.`,
    buttonText: "Get a Quote",
    href: "/contact",
  },
};

export const founderContent = {
  hero: {
    founderName: "Milon Mahmud",
    founderTitle: "Founder & IT Director",
    founderBio: "Milon Mahmud, an IT expert and UK-based entrepreneur whose journey from international student to business owner reflects dedication, growth, and innovation.",
    founderQuote: "You try and believe, things just happen!",
  },
  manifesto: {
    overline: "Our Philosophy",
    title: "Technology that works, quietly.",
    description: "We believe technology should quiet the noise of running a business, not add to it. Our systems are designed, deployed, and maintained to provide seamless operation and peace of mind.",
  },
  principles: {
    overline: "Our Principles",
    title: "Foundations of Trust",
    subtitle: `${company.name} operates on core values that ensure absolute transparency, client-first delivery, and unwavering reliability for every UK business we serve.`,
    items: [
      {
        id: "client-first",
        title: "Client-First Approach",
        description: "Your business objectives drive our technical solutions. We prioritize your needs with dedicated support and proactive problem-solving.",
        icon: "user-check" as const,
      },
      {
        id: "transparent",
        title: "Transparent Operations",
        description: "Clear communication and straightforward pricing ensure you always understand our process and what you're paying for. No hidden fees or jargon.",
        icon: "book-open" as const,
      },
      {
        id: "uk-compliant",
        title: "UK-Compliant Delivery",
        description: "All our services and infrastructure adhere strictly to UK regulations, providing secure and reliable operations tailored for your local market.",
        icon: "shield" as const,
      },
    ],
  },
};

export const reviewsContent = {
  hero: {
    overline: "Client Feedback",
    title: "Google Reviews from Our Retainer/Repeated clients",
    subtitle: "Trusted by forward-thinking businesses across the UK for ongoing IT management and systems engineering.",
  },
  reviewsList: [
    {
      id: "review-1",
      client: "CEO",
      company: "OLIVE AURA RECORDS LTD",
      quote: "“Professional and reliable monthly website maintenance. Everything is handled on time, communication is clear, and the support has been consistent since June.”",
      rating: 5,
      initials: "OA",
    },
    {
      id: "review-2",
      client: "CEO",
      company: "Jelan o Ltd",
      quote: "“A dependable CRM service with responsive support and smooth delivery. It has been a valuable retained service for our business since April.”",
      rating: 5,
      initials: "JL",
    },
    {
      id: "review-3",
      client: "Managing Director",
      company: "CITY PROPERTY SWITCH LTD",
      quote: "“Excellent support across multiple services. The work is professional, reliable, and consistently delivered to a high standard.”",
      rating: 5,
      initials: "CP",
    },
    {
      id: "review-4",
      client: "A Chaon",
      company: "Individual Client",
      quote: "“Very satisfied with the web design and cloud services. The support is efficient, dependable, and strong enough for repeat work.”",
      rating: 5,
      initials: "AC",
    },
  ],
  googleReviewsLink: "https://share.google/5dF7aJ3XjNtnNFsrr",
  googleButtonText: "Press and get to know us more",
  form: {
    title: "Leave a Review",
    description: "Share your experience with our service. Your feedback helps us improve and helps other clients understand the quality of our work.",
    disclaimer: "Reviews are checked before publication to help protect against spam and fake submissions.",
  },
};

export const careersContent = {
  hero: {
    overline: "Careers at Expert Tech",
    title: "Build the Future of UK Enterprise IT",
    subtitle: "Join our collaborative, UK-based engineering team delivering proactive technology solutions to growing organizations.",
  },
  form: {
    title: "Join Our Team",
    subtitle: "Submit your details and CV to explore engineering opportunities with Expert Tech.",
    successMessage: "Thank You! Your application has been received. Our recruitment team will be in touch shortly.",
  },
};

export const contactContent = {
  hero: {
    overline: "Direct UK Engineering",
    title: "Secure systems with zero-friction onboarding.",
    subtitle: "Connect directly with a UK-based systems engineer. We design, deploy, and maintain robust IT infrastructure that eliminates technical friction and guarantees uptime assurance.",
    primaryCta: { text: "Request a Quote", href: "#contact-form" },
    secondaryCta: { text: "View Services", href: "/services" },
    stats: [
      { value: "15 Min", label: "Average response" },
      { value: "99.9%", label: "Uptime assurance" },
    ],
  },
  form: {
    overline: "Get in Touch",
    title: "Let's discuss your infrastructure",
    subtitle: "Speak directly with our UK-based engineering team. We provide transparent pricing and dedicated technical oversight tailored to your business operations.",
    successMessage: `Thank you. An ${company.name} engineer will review your requirements and respond within 15 minutes.`,
  },
};

export const refundPolicyContent = {
  hero: {
    overline: "Your Assurance",
    title: "Refund & Cancellation Policy",
    subtitle: `Understanding your statutory rights and our transparent terms for all services and contracts. ${company.name} adheres strictly to UK consumer protection laws.`,
  },
  sections: [
    {
      overline: "Statutory Rights",
      title: "UK Consumer Protections & Cooling-Off Periods",
      paragraphs: [
        `${company.name} operates in full compliance with the Consumer Rights Act 2015 and the Consumer Contracts Regulations 2013. For most services, you have a 14-day cooling-off period from the date of contract formation, during which you can cancel without penalty. This period allows you to review our terms and ensure they meet your expectations.`,
        "Monthly contracts for ongoing services can be cancelled with 30 days' written notice, as per your service agreement. Project deposits are typically non-refundable once work commences, covering initial planning and resource allocation. Specific terms for each service are detailed in your individual service agreement, ensuring full transparency.",
      ],
    },
    {
      overline: "Our Commitment",
      title: "Non-Refundable Items & Request Procedure",
      paragraphs: [
        "Certain items, particularly custom software development or bespoke infrastructure solutions, may become non-refundable once significant work has been performed or intellectual property transferred. This ensures fair compensation for our engineering team's dedicated efforts. Any third-party licenses or hardware procured specifically for your project are also non-refundable once purchased.",
        `To request a refund or cancellation, please submit a written request to ${company.email}, clearly stating your service details and reason for cancellation. All requests will be processed within 10 working days, and any eligible refunds will be issued to the original payment method. We aim for a fair and timely resolution for all clients.`,
      ],
    },
  ],
};
