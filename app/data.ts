export type PageKey =
  | "about"
  | "programs"
  | "insights"
  | "governance"
  | "support"
  | "news"
  | "contact"
  | "offices"
  | "book-a-call"
  | "survey"
  | "enhanced-bail-article";

export const navItems = [
  { href: "/", label: "Home", key: "index" },
  { href: "/programs/", label: "Programs", key: "programs" },
  { href: "/insights/", label: "Insights", key: "insights" },
];

export const dropdownItems = [
  { href: "/about/", label: "Our Story", key: "about" },
  { href: "/governance/", label: "Governance & Reporting", key: "governance" },
  { href: "/support/", label: "Support", key: "support" },
  { href: "/news/", label: "News", key: "news" },
  { href: "/contact/", label: "Contact", key: "contact" },
];

export const programs = [
  {
    id: "mcc",
    title: "MCC - Mob and Country Connections",
    tag: "Sector Capability",
    image: "https://picsum.photos/seed/iraac-mcc/900/650",
    description:
      "IRAAC supports other Aboriginal Community Organisations to build governance, administration and reporting capability through a peer-to-peer, relationship-based model.",
  },
  {
    id: "youthscape",
    title: "YouthScape",
    tag: "Young People",
    image: "https://picsum.photos/seed/iraac-youth/900/650",
    description:
      "YouthScape connects young people with culture, opportunity and support, while IRAAC develops the program detail, funding and operating model.",
  },
  {
    id: "thecrew",
    title: "The Crew",
    tag: "Community",
    image: "https://picsum.photos/seed/iraac-crew/900/650",
    description:
      "The Crew is a community-facing program building practical skills, connection and participation.",
  },
  {
    id: "darc",
    title: "DARC",
    tag: "Community",
    image: "https://picsum.photos/seed/iraac-darc/900/650",
    description:
      "DARC sits alongside MCC, YouthScape and The Crew to support community outcomes and stronger pathways.",
  },
];

export const publicPages: Record<
  PageKey,
  {
    title: string;
    description: string;
    active: string;
    eyebrow: string;
    hero: string;
    lead: string;
    image: string;
    sections: { title: string; body: string[]; cardTitle?: string; cardBody?: string }[];
  }
> = {
  about: {
    title: "Our Story",
    description: "Who IRAAC is and how it fits within the NSW Local Decision Making Framework.",
    active: "about",
    eyebrow: "About Us",
    hero: "Our Story",
    lead: "IRAAC is an Aboriginal Community Organisation and registered charity, working under the NSW Local Decision Making Framework.",
    image: "https://picsum.photos/seed/iraac-community/1200/900",
    sections: [
      {
        title: "Who We Are",
        body: [
          "IRAAC represents and serves its community through a set of programs and a growing focus on governance and organisational capability.",
          "IRAAC is independent of government, while working alongside Aboriginal Affairs NSW, Alliances and Assemblies to progress the priorities community identifies for itself.",
        ],
        cardTitle: "Local Decision Making",
        cardBody:
          "IRAAC's programs and governance work sit within a framework designed to give Aboriginal communities a stronger say in decisions that affect them.",
      },
      {
        title: "Our Board",
        body: [
          "IRAAC is led by a Board of community members, meeting regularly using a standard agenda, minutes, decisions and actions framework.",
          "Board information should be expanded once names, photos and short bios are confirmed for public release.",
        ],
      },
    ],
  },
  programs: {
    title: "Our Programs",
    description: "MCC, YouthScape, The Crew and DARC - IRAAC's community programs.",
    active: "programs",
    eyebrow: "What We Deliver",
    hero: "Our Programs",
    lead: "Four programs, each supporting community in a different way.",
    image: "https://picsum.photos/seed/iraac-mcc/900/650",
    sections: [],
  },
  insights: {
    title: "Insights",
    description: "Reflections on governance, community programs and Local Decision Making from IRAAC.",
    active: "insights",
    eyebrow: "From IRAAC",
    hero: "Insights",
    lead: "Plain-language reflections on governance, community programs and what IRAAC is learning as it goes.",
    image: "https://picsum.photos/seed/iraac-meeting/1200/800",
    sections: [
      {
        title: "Bail Conditions: An Emerging Community Issue",
        body: [
          "Community feedback has raised bail conditions as an issue connected with Local Decision Making, transport support and uncertainty about the best next step.",
          "This report shares an early community signal. It does not identify anyone, provide legal advice or claim to describe every person's experience.",
        ],
        cardTitle: "Central message",
        cardBody:
          "People may need clear information, reliable transport, a trusted person to speak with and a coordinated pathway to qualified legal and practical support.",
      },
      {
        title: "IRAAC Survey Monthly Report",
        body: [
          "Community members asked about culture, young people, family, practical support, programs and the best way to speak with someone.",
          "The message is clear: people want more than a list of services. They want welcoming, face-to-face and flexible pathways into support.",
        ],
      },
      {
        title: "Why Governance Is the Foundation",
        body: [
          "Good governance is what makes strong community programs possible. It gives funders, partners and community confidence that IRAAC is well run.",
        ],
      },
    ],
  },
  governance: {
    title: "Governance & Reporting",
    description: "How IRAAC is governed and how it reports to funders and regulators.",
    active: "governance",
    eyebrow: "Accountability & Transparency",
    hero: "Governance & Reporting",
    lead: "IRAAC is a charity, independently governed by its Board. This page explains how it runs itself and reports to funders and regulators.",
    image: "https://picsum.photos/seed/iraac-meeting/1200/800",
    sections: [
      {
        title: "How IRAAC Is Governed",
        body: [
          "IRAAC is governed by a Board, chaired by the Chairperson and supported by the Secretary.",
          "A standard agenda, minutes, decisions and actions framework helps each meeting run and record decisions consistently.",
        ],
        cardTitle: "What We Report On",
        cardBody: "Quarterly progress, annual reports, acquittals, audits, ORIC, ACNC and funding-body reporting.",
      },
      {
        title: "The Wider System",
        body: [
          "IRAAC works within OCHRE and Local Decision Making, alongside Aboriginal Affairs NSW, regional Alliances and Assemblies, ORIC and ACNC.",
          "Good reporting helps IRAAC show that local decision making can be trusted with more authority over time.",
        ],
      },
    ],
  },
  support: {
    title: "Support for Aboriginal Community Organisations",
    description: "How IRAAC can support Aboriginal Community Organisations with governance and reporting.",
    active: "support",
    eyebrow: "ACO Support",
    hero: "Support for Aboriginal Community Organisations",
    lead: "IRAAC shares practical systems, templates and governance capability with organisations that invite support.",
    image: "https://picsum.photos/seed/iraac-support/1200/800",
    sections: [
      {
        title: "Peer-to-Peer Capability",
        body: [
          "Support should be relationship-based, Aboriginal-led and practical.",
          "The aim is to help organisations build confidence in governance, reporting, administration and funding evidence.",
        ],
      },
    ],
  },
  news: {
    title: "Latest Updates",
    description: "Latest public updates from IRAAC.",
    active: "news",
    eyebrow: "News",
    hero: "Latest Updates",
    lead: "Working-draft updates from IRAAC programs, governance and community reporting.",
    image: "https://picsum.photos/seed/iraac-news/1200/800",
    sections: [
      {
        title: "Website and Platform Work",
        body: [
          "IRAAC is building a single digital front door for public information, MobLink service navigation and staff operations.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    description: "Contact IRAAC or request a home visit.",
    active: "contact",
    eyebrow: "Contact",
    hero: "Get in Touch",
    lead: "Choose the pathway that works for you: call, visit, request a home visit or complete Have Your Say.",
    image: "https://picsum.photos/seed/iraac-contact/1200/800",
    sections: [
      {
        title: "Start With What Works",
        body: [
          "You do not need to know the right program name before asking for help.",
          "IRAAC can begin with what matters to you and help work out the next step.",
        ],
      },
    ],
  },
  offices: {
    title: "Office Locations",
    description: "IRAAC office locations and local access points.",
    active: "offices",
    eyebrow: "Offices",
    hero: "Office Locations",
    lead: "Local office and drop-in information will be confirmed here.",
    image: "https://picsum.photos/seed/iraac-office/1200/800",
    sections: [
      {
        title: "Drop-In Pathway",
        body: ["A drop-in means the person attends a scheduled location. It is different from a home visit."],
      },
    ],
  },
  "book-a-call": {
    title: "Book a Call",
    description: "Book a 15-minute call with IRAAC.",
    active: "book-a-call",
    eyebrow: "Book a Call",
    hero: "Book a Free 15-Minute Call",
    lead: "Speak with an IRAAC officer over the phone.",
    image: "https://picsum.photos/seed/iraac-call/1200/800",
    sections: [
      {
        title: "A Direct Phone Pathway",
        body: [
          "This is a simple way to start a conversation without completing the survey first.",
          "Production scheduling details will be connected once the operating process is approved.",
        ],
      },
    ],
  },
  survey: {
    title: "Have Your Say",
    description: "IRAAC's Have Your Say survey holding page.",
    active: "survey",
    eyebrow: "Have Your Say",
    hero: "Have Your Say",
    lead: "The previous Google Form is not the production consent source. This page is the IRAAC-owned public survey entry point.",
    image: "https://picsum.photos/seed/iraac-survey/1200/800",
    sections: [
      {
        title: "You Share. IRAAC Listens.",
        body: [
          "Have Your Say is the listening front door for community priorities and future reporting.",
          "Production collection should only open after the governed survey release gates pass.",
        ],
      },
    ],
  },
  "enhanced-bail-article": {
    title: "Bail Conditions: Emerging Community Issue",
    description: "A public article about bail conditions as an emerging community issue.",
    active: "insights",
    eyebrow: "Emerging Community Report",
    hero: "Bail Conditions: An Emerging Community Issue",
    lead: "A plain-language report on bail, practical access and service-navigation challenges.",
    image: "https://picsum.photos/seed/iraac-bail/1200/800",
    sections: [
      {
        title: "What the Feedback Is Pointing To",
        body: [
          "Bail conditions can intersect with transport, communication and access to services.",
          "Trusted Aboriginal organisations can play an important role in connecting people with appropriate legal and practical assistance.",
        ],
        cardTitle: "Important boundary",
        cardBody: "This article does not provide legal advice and does not identify anyone.",
      },
    ],
  },
};

export const services = [
  {
    name: "South Coast Medical Service",
    type: "Health and wellbeing",
    place: "Berry Street, Nowra",
    distance: "0.8 km",
    tags: ["Health", "Family", "Wellbeing"],
    description: "Aboriginal community-controlled health, wellbeing and family support in Nowra.",
  },
  {
    name: "Waminda",
    type: "Women, family and culture",
    place: "Kinghorne Street, Nowra",
    distance: "1.1 km",
    tags: ["Women", "Health", "Family"],
    description: "Culturally safe health and wellbeing support for Aboriginal women and families.",
  },
  {
    name: "Aboriginal Legal Service Nowra",
    type: "Legal help",
    place: "Plunkett Street, Nowra",
    distance: "1.4 km",
    tags: ["Legal", "Bail", "Family"],
    description: "Criminal law, care and protection, family law and referral pathways.",
  },
  {
    name: "13YARN",
    type: "Crisis support",
    place: "National phone service",
    distance: "Call now",
    tags: ["Crisis", "24/7", "Yarn"],
    description: "Aboriginal and Torres Strait Islander crisis support. Use 000 if in immediate danger.",
  },
];
