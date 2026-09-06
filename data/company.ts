export interface CompanyAddress {
  line1: string;
  town: string;
  region: string;
  postcode: string;
  country: string;
  full: string;
}

export interface CompanyConfig {
  name: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  telLink: string;
  email: string;
  careersEmail: string;
  address: CompanyAddress;
  jurisdiction: string;
  copyright: string;
  engineeringTeam: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export const company: CompanyConfig = {
  name: "Expert Tech",
  tagline: "Proactive managed IT and custom software for UK businesses.",
  phone: "+447565322806",
  phoneFormatted: "+44 7565 322806",
  telLink: "tel:+447565322806",
  email: "info@experttech.co.uk",
  careersEmail: "hr@experttech.co.uk",
  address: {
    line1: "175-179 High Street Cowdeanbeath High Street",
    town: "Cowdenbeath",
    region: "Scotland",
    postcode: "KY4 9QE",
    country: "United Kingdom",
    full: "175-179 High Street Cowdeanbeath High Street, Cowdenbeath, Scotland, KY4 9QE",
  },
  jurisdiction: "Registered in Scotland",
  copyright: "© 2026 Expert Tech - Registered in Scotland.",
  engineeringTeam: "UK-based engineering team",
};

export const navLinks: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Reviews", href: "/reviews" },
  { name: "A Note from Founder", href: "/a-note-from-founder" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Contact", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

export default company;
