export type CommunityReport = {
  slug: string;
  month: string;
  date: string;
  type: string;
  title: string;
  summary: string;
  centralMessage: string;
  notice?: string;
  sections: { title: string; paragraphs?: string[]; points?: string[] }[];
};

export const communityReports: CommunityReport[] = [
  {
    slug: "bail-conditions-community-issue",
    month: "August 2026",
    date: "14 August 2026",
    type: "Emerging community report",
    title: "Bail Conditions: An Emerging Community Issue",
    summary:
      "Community feedback has raised bail conditions alongside transport, access to support and uncertainty about the next step. This report looks at why practical help and culturally safe navigation matter.",
    centralMessage:
      "Information about bail conditions may not be enough on its own. People may also need reliable transport, a trusted contact and coordinated access to qualified legal and practical support.",
    notice:
      "This report shares an early community signal. It is not legal advice, does not identify anyone and does not claim to describe every person’s experience.",
    sections: [
      {
        title: "Why IRAAC is reporting on this",
        paragraphs: [
          "Community feedback raised bail conditions together with transport difficulties, access to services and uncertainty about what to do next. These concerns suggest that complying with bail can involve practical barriers as well as understanding legal requirements.",
          "IRAAC’s role is to listen, identify recurring barriers, connect people with appropriate assistance and report the issues community wants examined. Qualified legal services remain responsible for legal advice.",
        ],
      },
      {
        title: "What the feedback is pointing to",
        points: [
          "Bail conditions can intersect with transport, communication and service access.",
          "People may be uncertain about which organisation can help.",
          "Legal, family, housing, transport and wellbeing needs may overlap.",
          "A list of telephone numbers may not provide a workable next step.",
          "Trusted Aboriginal organisations can help people reach appropriate services.",
          "More listening is required before IRAAC makes broad conclusions.",
        ],
      },
      {
        title: "What better support could look like",
        paragraphs: [
          "A useful pathway begins with a plain-language explanation, a named point of contact and confirmation of who is responsible for the next action. Transport, telephone access, appointment location, caring responsibilities and communication needs should be discussed early.",
          "Where another organisation is needed, a warm referral can be more effective than asking someone to start again. Personal information must only be shared with consent.",
        ],
      },
      {
        title: "Practical recommendations",
        points: [
          "Develop a culturally safe bail-navigation pathway with Aboriginal organisations and qualified legal services.",
          "Ask about transport and communication barriers during the first conversation.",
          "Provide plain-language information and communication assistance where required.",
          "Clarify referral responsibilities so people are not left to navigate services alone.",
          "Gather further community evidence before making final policy recommendations.",
          "Report back to community on what was raised and what changed in response.",
        ],
      },
    ],
  },
  {
    slug: "have-your-say-july-2026",
    month: "July 2026",
    date: "31 July 2026",
    type: "Monthly community report",
    title: "IRAAC Have Your Say Monthly Report",
    summary:
      "July’s early responses highlighted culture and connection, in-person support and the need for a clear human pathway after someone asks for help.",
    centralMessage:
      "People want more than a directory of services. They want welcoming, flexible ways to reach someone who can listen, explain the choices and help work out the next step.",
    notice:
      "This report includes two responses received on 23 July 2026. It identifies early themes and must not be read as representing the wider community.",
    sections: [
      {
        title: "What we heard",
        paragraphs: [
          "Both respondents requested contact, selected an in-person pathway and identified a support requirement. Culture and connection appeared in both responses. One respondent also selected a home or community visit.",
          "No names, contact details, locations or private written responses are included. The small number is useful for direct follow-up and for identifying questions that deserve more attention, but it is not enough for population-level conclusions.",
        ],
      },
      {
        title: "What the questions tell us",
        points: [
          "Connection should come before asking a person to navigate service categories.",
          "Face-to-face contact must remain visible and easy to request.",
          "Culture, family, young people and practical support can be closely connected.",
          "Online forms should lead to a human response rather than another dead end.",
          "Location, transport and the choice of where to meet can determine whether someone participates.",
        ],
      },
      {
        title: "Priorities for the next month",
        points: [
          "Follow up each request through the protected source record.",
          "Keep office, home and community visits easy to find.",
          "Tell each person what will happen next and who is responsible.",
          "Include transport and access needs in the first conversation.",
          "Collect more responses before making broader conclusions.",
          "Continue reporting themes without publishing personal information.",
        ],
      },
    ],
  },
  {
    slug: "mcc-peer-to-peer-model",
    month: "June 2026",
    date: "30 June 2026",
    type: "Program learning report",
    title: "What We Are Learning Through MCC’s Peer-to-Peer Model",
    summary:
      "MCC shares governance, administration and reporting experience with Aboriginal Community Organisations through an invitation-led, relationship-based approach.",
    centralMessage:
      "Capability support works best when it respects each organisation’s authority and shares practical knowledge without imposing a fixed model.",
    sections: [
      {
        title: "A different kind of support",
        paragraphs: [
          "Mob and Country Connections allows IRAAC to share systems, templates and lessons it has developed through its own governance work. The support is offered when another Aboriginal Community Organisation asks for it.",
          "This peer-to-peer model recognises that organisations know their own communities. IRAAC can share experience while the receiving organisation remains responsible for its own choices and direction.",
        ],
      },
      {
        title: "What IRAAC is learning",
        points: [
          "Trust and invitation are essential to a useful working relationship.",
          "Practical templates are most valuable when they can be adapted locally.",
          "Governance support should strengthen authority rather than replace it.",
          "Reporting systems can protect programs by reducing missed requirements and unclear responsibilities.",
          "Outcomes should be described only after participating organisations agree they are accurate.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "IRAAC will continue refining MCC through feedback from participating organisations. Future reports can include verified workshops, resources and outcomes once they have been approved for public release.",
        ],
      },
    ],
  },
  {
    slug: "local-decision-making-practice",
    month: "May 2026",
    date: "29 May 2026",
    type: "Community information report",
    title: "Local Decision Making: Turning Policy Into Practice",
    summary:
      "This report explains how community priorities should move through Alliances, Assemblies, Aboriginal organisations and government into visible local action.",
    centralMessage:
      "Local Decision Making should be judged by whether community priorities influence real programs, services and decisions.",
    sections: [
      {
        title: "What Local Decision Making means",
        paragraphs: [
          "Local Decision Making is based on a straightforward principle: Aboriginal communities should have a genuine say in decisions that affect them. Regional Alliances and local Assemblies provide structured ways for priorities to be identified and carried forward.",
          "IRAAC works within this system while remaining an Aboriginal community organisation. Its responsibility is to stay connected to community rather than assume it already knows what people need.",
        ],
      },
      {
        title: "How reporting supports accountability",
        paragraphs: [
          "Community participation is more meaningful when people can see what followed. Reports should show what community said, what IRAAC raised, who responded, what changed and what remains unresolved.",
        ],
        points: [
          "State the community issue without identifying contributors.",
          "Record the action IRAAC took.",
          "Explain the response received.",
          "Give the current status in plain language.",
          "Provide a date for the next update.",
        ],
      },
      {
        title: "The standard IRAAC is working towards",
        paragraphs: [
          "The test is not how many meetings took place or how many documents were produced. The test is whether decisions and services reflect what community identified as important, and whether IRAAC returns with an honest account of progress.",
        ],
      },
    ],
  },
  {
    slug: "governance-foundation",
    month: "April 2026",
    date: "30 April 2026",
    type: "Community accountability report",
    title: "Why Governance Is the Foundation of Strong Community Programs",
    summary:
      "Clear decisions, responsible management and honest reporting help protect community programs and build confidence in IRAAC’s work.",
    centralMessage:
      "Good governance is not separate from community work. It is what keeps that work accountable, stable and able to grow.",
    sections: [
      {
        title: "What governance looks like in practice",
        paragraphs: [
          "Governance includes regular Board meetings, clear agendas and minutes, recorded decisions, financial oversight, defined responsibilities and honest reporting on what is and is not working.",
          "These practices allow community, partners and funders to understand how decisions are made and how resources are being used.",
        ],
      },
      {
        title: "Why it protects programs",
        points: [
          "Clear decisions reduce confusion about responsibility.",
          "Reliable records help IRAAC follow through on commitments.",
          "Accurate reporting protects funding relationships.",
          "Regular review helps problems surface before they interrupt services.",
          "Community reporting makes accountability visible beyond the organisation.",
        ],
      },
      {
        title: "Governance and community control",
        paragraphs: [
          "Strong governance is not the opposite of self-determination. It helps demonstrate that decisions and resources can be held locally with clear accountability to community.",
        ],
      },
    ],
  },
  {
    slug: "young-people-culture-connection",
    month: "March 2026",
    date: "31 March 2026",
    type: "Program focus report",
    title: "Young People, Culture and Connection",
    summary:
      "A report on why YouthScape places culture, opportunity, trusted relationships and practical support around young people rather than treating each need separately.",
    centralMessage:
      "Supporting young people means building belonging, cultural connection and pathways to opportunity together.",
    notice:
      "YouthScape’s detailed activities and outcomes are still being developed. This report explains the program direction without claiming results that have not been verified.",
    sections: [
      {
        title: "Why this matters",
        paragraphs: [
          "Young people carry the future of community. YouthScape is intended to connect them with culture, Country, opportunity and support while recognising the pressures they may be navigating.",
          "Cultural participation should not be treated as an optional addition. It can contribute to belonging, confidence, prevention and longer-term wellbeing.",
        ],
      },
      {
        title: "Principles for the program",
        points: [
          "Young people should help shape the activities intended for them.",
          "Culture and community relationships should sit at the centre of delivery.",
          "Participation should be welcoming and practical to access.",
          "Families and trusted adults should be involved appropriately.",
          "Public reporting should distinguish planned activity from verified outcomes.",
        ],
      },
      {
        title: "What IRAAC needs to learn next",
        paragraphs: [
          "Future reports should describe the age groups reached, activities delivered, participation, feedback and outcomes only after those details have been confirmed. Young people’s privacy and consent must remain central to any public story.",
        ],
      },
    ],
  },
];

export function findCommunityReport(slug: string) {
  return communityReports.find((report) => report.slug === slug);
}
