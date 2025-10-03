export interface SiteConfig {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  mission: string;
  vision: string;
  inspiration: {
    quote: string;
    author: string;
    translation: string;
  };
  programs: {
    socialWelfare: string[];
    healthSafety: string[];
    culturalSpiritual: string[];
  };
}

const siteConfig: SiteConfig = {
  name: "Janki Charitable Trust",
  description: "Serving humanity, preserving culture, and inspiring positive change in Mithilanchal",
  email: "info@jankitrust.org",
  phone: "+91 8100249446",
  address: "Vidyapati Lane, Shastri Nagar, Konnagar, Hooghly, PIN 712246",
  social: {
    facebook: "https://www.facebook.com/people/JANKI-SEVA-SANGH/100067845215910/",
    twitter: "https://twitter.com/jankitrust",
    instagram: "https://instagram.com/jankitrust",
    linkedin: "https://linkedin.com/company/jankitrust",
  },
  mission: "To serve the needy, promote cultural heritage, and empower youth & community through social service, cultural values, and Sanatan Dharma",
  vision: "To build a compassionate society where education, culture, and opportunities flourish, and where no individual is left behind",
  inspiration: {
    quote: "जीवनक अर्थ सेवा आ समर्पण मे अछि।",
    author: "महाकवि विद्यापति",
    translation: "The meaning of life lies in service and surrender."
  },
  programs: {
    socialWelfare: [
      "Blanket & Food Distribution",
      "Plantation & Green Initiatives", 
      "Medical Fundraising",
      "Community Feasts (Bhadora)"
    ],
    healthSafety: [
      "Blood Donation Camps",
      "Safety Literacy Programs",
      "Medical Fundraising for Poor Patients"
    ],
    culturalSpiritual: [
      "Hari Na Kirtan (36+ hours continuous chanting)",
      "Maithili Diwas Celebrations",
      "Saraswati Puja",
      "Puja-Path & Shashwati Puja"
    ]
  }
};

export default siteConfig;