export type ProgramDetail = {
  id: string;
  title: string;
  strapline: string;
  audience: string;
  status: string;
  introduction: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    points?: string[];
  }[];
  questions: { question: string; answer: string }[];
};

export const programDetails: ProgramDetail[] = [
  {
    id: "mcc",
    title: "Mob and Country Connections",
    strapline: "Sharing knowledge. Keeping decisions with community.",
    audience:
      "Aboriginal community organisations, their Boards, staff and members",
    status:
      "A proposed peer-support project. Funding and participating organisations are still to be confirmed.",
    introduction:
      "Strong community organisations help local people have a stronger say. Mob and Country Connections, or MCC, is IRAAC’s proposal to share practical experience with other Aboriginal community organisations. The idea is simple: work alongside people who ask for support, share useful tools and leave each organisation better able to do the work its community wants.",
    sections: [
      {
        id: "who",
        title: "Who MCC is for",
        paragraphs: [
          "MCC is intended for Aboriginal community organisations involved in Local Decision Making, including recognised regional Alliances and organisations connected to that work. Local Decision Making is a way for Aboriginal communities to help shape government decisions and services affecting them.",
          "The proposal also considers organisations rebuilding towards active participation, where the funding arrangements allow. Support starts with an invitation and a conversation about what would actually help. Each organisation keeps authority over its priorities, decisions and community information.",
        ],
      },
      {
        id: "support",
        title: "Practical support, shaped around local needs",
        paragraphs: [
          "IRAAC proposes to share systems it has developed through its own organisational work. Directors and staff would choose the areas they need help with, then work through real tasks with peer coaching and mentoring.",
        ],
        points: [
          "Running meetings: agendas, minutes, decisions and a clear record of who will follow up.",
          "Managing money: budgets, financial reporting and records showing how funding has been used.",
          "Supporting Boards and staff: governance refreshers, director responsibilities and plain-language guidance.",
          "Organising everyday work: shared documents, sensible filing, digital office tools and reporting routines.",
          "Listening to community: surveys, conversations, contact options and ways to record service gaps.",
          "Reporting back: useful updates for community, Boards and government drawn from the same checked information.",
        ],
      },
      {
        id: "approach",
        title: "How working together would look",
        paragraphs: [
          "The proposed approach starts through trusted relationships and listening on Country. IRAAC and the participating organisation would talk through its circumstances, identify what is working and agree where support is wanted.",
          "Together they would set a starting point and a practical support plan. Templates and tools would be adapted to local culture, governance and priorities. Coaching would help people use those tools in everyday work, rather than simply receiving a folder of documents.",
          "The aim is for local directors and staff to gain confidence and keep using the systems independently. Progress would be checked with the organisation, including what has become easier and what still needs attention.",
        ],
      },
      {
        id: "voice",
        title: "Community should see what happens next",
        paragraphs: [
          "MCC puts reporting back to community at the centre of the proposal. A useful update should explain what people said, what was learned, what action was requested, who is responsible and what happens next. Community members should also be able to correct something that does not reflect their experience.",
          "The same checked evidence can support different reports: an accessible community update, a Board briefing and information for government or funders. Personal stories and culturally sensitive information need appropriate permission and local rules about access and release. Participating organisations retain control of their own information.",
        ],
      },
      {
        id: "next",
        title: "Where MCC is up to",
        paragraphs: [
          "IRAAC has prepared a Special Projects funding proposal for MCC. It sets out a time-limited project with coaching, reusable resources and reporting back as core activities. The source material reviewed does not confirm a funded rollout or an open intake.",
          "If your organisation is interested, ask IRAAC about the current proposal and explain the kind of support you are looking for. An enquiry is a starting conversation, not a commitment to participate.",
        ],
      },
    ],
    questions: [
      {
        question: "Does MCC take over an organisation’s decisions?",
        answer:
          "No. The proposed model is invitation-based peer support. Each organisation keeps its own priorities, governance, cultural authority and decisions.",
      },
      {
        question: "Can I ask about MCC as a community member?",
        answer:
          "Yes. You can ask what MCC means for your organisation or community. Participation arrangements would need to be agreed with the organisation itself.",
      },
      {
        question: "Are there fees or confirmed places?",
        answer:
          "Fees, funded places and delivery dates are not confirmed in the information available for this page. Ask IRAAC for the current arrangements before making plans.",
      },
    ],
  },
  {
    id: "youthscape",
    title: "YouthScape",
    strapline: "Learning, culture and a place to belong.",
    audience: "Children, young people, parents and carers",
    status:
      "In development. Session times, locations, age eligibility and enrolment arrangements are not yet confirmed.",
    introduction:
      "YouthScape is IRAAC’s proposed community-based program for children and young people. It brings learning, cultural connection, mentoring and family support together. The aim is for young people to feel known, build confidence and get practical help early, with trusted adults and stronger links between home, school and community.",
    sections: [
      {
        id: "who",
        title: "For young people and the people around them",
        paragraphs: [
          "The original program briefing proposes activities for three age groups: children aged 4–7, children aged 8–12, and young people aged 13 and over. These are planning groups, not confirmed enrolment criteria. The final pilot ages and locations still need to be agreed.",
          "Young people’s interests, strengths and learning needs would help shape their support. Parents, carers, Elders, cultural mentors and qualified educators all have a place in the proposed model. Families should be able to understand the learning plan and take part without complicated processes or shame.",
        ],
      },
      {
        id: "learning",
        title: "Extra help with learning",
        paragraphs: [
          "One part of YouthScape focuses on reading, writing and maths. The education proposal includes individual or small-group support, regular practice and clear learning goals, with qualified educational oversight.",
          "Support would connect with what a young person is learning at school. Cultural mentors would help build confidence, belonging and family connection, while qualified educators guide teaching and review progress. YouthScape is intended to complement school, not replace it.",
        ],
        points: [
          "Reading, writing and oral language practice.",
          "Foundational maths and everyday numeracy.",
          "Homework support and learning confidence.",
          "Individual goals agreed with the learner and family, linked with school where appropriate.",
          "Help reconnecting with school, training or other learning opportunities.",
        ],
      },
      {
        id: "belonging",
        title: "Culture, activities and trusted relationships",
        paragraphs: [
          "The broader proposal includes after-school and school-holiday activities using art, play, sport and learning. Cultural mentoring, connection to Country and relationships with Elders are part of the intended approach.",
          "Regular contact can give young people a chance to talk, ask for help and build supportive friendships. Planned wellbeing activities focus on confidence, emotional wellbeing and connection. Where a young person needs specialist help, the model is to connect them with an appropriate service.",
          "Practical participation support, such as transport and light food, appears in the planning documents. What can actually be offered would depend on the funded program, permission and safe arrangements.",
        ],
      },
      {
        id: "family",
        title: "Helping families find the right support",
        paragraphs: [
          "A second YouthScape proposal focuses on practical help when a young person or family is dealing with justice services, court, bail or returning from custody. This could include connecting with a lawyer, finding the right agency, planning appointments and accessing housing, health or education support.",
          "This part of the program is about trusted guidance between services. It does not provide legal representation or make court decisions. Learning support and cultural mentoring have their own purpose; they should not be used to investigate a young person’s alleged conduct.",
          "Families may need help with several things at once. The proposal recognises that school, housing, wellbeing, transport and family relationships are connected, and aims to make reaching the right service less confusing.",
        ],
      },
      {
        id: "next",
        title: "Where YouthScape is up to",
        paragraphs: [
          "IRAAC has prepared separate education and justice partnership proposals. They describe the intended support, staff responsibilities and safeguards, but they are not confirmation that sessions or participant intake have started.",
          "Before delivery, the program needs agreed funding, qualified oversight, child-safe staffing, consent, supervision and clear information for families. You can ask IRAAC about progress or share what would make the program useful for your family.",
        ],
      },
    ],
    questions: [
      {
        question: "Can I enrol my child now?",
        answer:
          "Enrolment dates, places and session details have not been confirmed for this page. Ask IRAAC for the latest information before arranging attendance.",
      },
      {
        question:
          "Is YouthScape only for young people involved with justice services?",
        answer:
          "No. The broader proposal covers learning, culture, wellbeing and family connection. Justice navigation is a separate area of planned support; each pilot’s eligibility still needs to be agreed.",
      },
      {
        question: "Will it replace school or a teacher?",
        answer:
          "No. The education proposal adds community-based support alongside school, with qualified educational oversight and links to families and teachers.",
      },
    ],
  },
  {
    id: "thecrew",
    title: "The Crew",
    strapline: "Practical work. New skills. Homes ready for community.",
    audience: "Aboriginal people interested in supported work and training",
    status:
      "A proposed housing and employment pilot. Jobs, contracts, work locations and applications are not yet confirmed.",
    introduction:
      "The Crew brings two community priorities together: creating supported employment for Aboriginal people and helping get vacant homes ready for people to move into. IRAAC’s latest proposal is for a supervised Aboriginal crew to carry out agreed cleaning, gardening and safe, low-risk property preparation work.",
    sections: [
      {
        id: "who",
        title: "A supported pathway into work",
        paragraphs: [
          "The Crew is designed around people who may need more than a job referral. A supported work setting can offer a chance to build routine, practise skills, gain confidence and work alongside people who understand their circumstances.",
          "Earlier program planning also considers people rebuilding their lives after alcohol and other drug treatment, unemployment or housing instability. The latest housing proposal focuses on creating paid work and training through an agreed vacant-home pilot. Final participant criteria and vacancies have not been confirmed.",
        ],
      },
      {
        id: "work",
        title: "What the proposed crew would do",
        paragraphs: [
          "The latest proposal describes work at selected vacant properties, with authorised access, supervision and a clear list of permitted tasks. The housing provider would check and accept completed work.",
        ],
        points: [
          "General cleaning and approved removal of non-hazardous rubbish.",
          "Lawns, weeding, light pruning and garden presentation within safe limits.",
          "Approved external tidy-up and property readiness checks.",
          "Precisely agreed low-risk presentation tasks covered by training and supervision.",
          "Recording completed work and referring defects to the right contractor.",
        ],
      },
      {
        id: "skills",
        title: "Learning through real, supported work",
        paragraphs: [
          "The proposal connects practical tasks with training, competent supervision and pathways towards property services and trades. The broader planning includes work readiness, licences or tickets where required, mentoring and help overcoming practical barriers to participation.",
          "Paid work is a central aim. It should give people useful experience and a way to build towards longer-term employment or an Aboriginal enterprise. Wage rates, hours, available roles and training arrangements would need to be set out in actual employment and delivery agreements.",
          "The Crew’s broader connection to recovery is about routine, purpose and support after treatment. Clinical care, counselling and rehabilitation remain with the appropriate health services.",
        ],
      },
      {
        id: "homes",
        title: "What this could mean for community",
        paragraphs: [
          "The housing proposal aims to help suitable vacant homes return to use sooner while creating local Aboriginal work opportunities. It also seeks to give Aboriginal organisations and businesses a practical place in housing supply chains.",
          "The Crew would prepare properties within an agreed scope. It would not decide who receives a home, manage tenancies or replace licensed trades. Electrical, plumbing, structural and hazardous work belong with suitably qualified contractors.",
          "The current proposal is for vacant homes. It is not an available household repair booking service, and work in occupied homes would need a separately agreed model.",
        ],
      },
      {
        id: "next",
        title: "Where The Crew is up to",
        paragraphs: [
          "IRAAC has developed a draft partnership proposal for Homes NSW and the Aboriginal Housing Office. It sets out a possible pilot, training and safety arrangements, and ways to assess whether the work benefits community.",
          "Earlier planning explored opportunities in Taree, Kempsey and Nambucca as well as the Illawarra. These should not be read as confirmed work locations. Contracts, funding, sites and available roles still need to be agreed.",
          "If you are interested in future work or training, ask IRAAC about the current stage. Housing providers and Aboriginal organisations can also discuss potential involvement. An enquiry does not guarantee a job, contract or place.",
        ],
      },
    ],
    questions: [
      {
        question: "Can I apply for a job with The Crew?",
        answer:
          "No recruitment opening is confirmed on this page. You can ask IRAAC about future opportunities and what information will be available when roles are ready.",
      },
      {
        question: "Can The Crew repair my home?",
        answer:
          "The latest proposal is a pilot for authorised work in selected vacant properties. It is not a general repairs service. Existing repairs should continue through your housing provider’s usual pathway.",
      },
      {
        question: "How does The Crew connect with DARC?",
        answer:
          "Earlier planning explores supported employment as part of life after treatment and recovery. DARC and The Crew still require their own agreed delivery arrangements; neither page offers a guaranteed referral or placement.",
      },
    ],
  },
  {
    id: "darc",
    title: "DARC",
    strapline: "A more connected path through recovery.",
    audience:
      "Aboriginal people and families seeking better local recovery pathways",
    status:
      "In development. DARC is not open for treatment or admissions. Its site, age groups and final service model are not confirmed.",
    introduction:
      "DARC stands for Drug and Alcohol Rehabilitation Centre. It is IRAAC’s proposed initiative to improve culturally safe alcohol and other drug recovery support in the Illawarra. The aim is to connect care, culture, family, housing and life after treatment, so people have a clearer path through support and back into community.",
    sections: [
      {
        id: "why",
        title: "Why IRAAC is developing DARC",
        paragraphs: [
          "People seeking recovery may also be dealing with housing uncertainty, family pressures, mental health needs or difficulty reaching services. IRAAC’s proposal recognises these needs together, with community leadership and clinical care working alongside one another.",
          "The intended approach is respectful and grounded in culture, family, kinship and connection to Country. It aims to reduce judgement and unnecessary repetition of personal stories, while giving people a say in the support they receive.",
        ],
      },
      {
        id: "pathway",
        title: "What the recovery pathway could include",
        paragraphs: [
          "The latest proposal leaves the final combination of services open to development with community and qualified providers. Options being considered include:",
        ],
        points: [
          "A clearer first contact, assessment and supported referrals to existing services.",
          "Community outreach, navigation and coordination between services.",
          "Cultural mentoring, family support and connections with peer workers.",
          "Counselling, day programs or residential rehabilitation where an approved clinical model supports them.",
          "Transport and links with housing, health and other practical support.",
          "Aftercare and help reconnecting with community, education, training or work.",
        ],
      },
      {
        id: "housing",
        title: "Recovery includes what happens afterwards",
        paragraphs: [
          "Earlier DARC planning explores a staged pathway: treatment and stabilisation, supported housing and work, then greater independence with continued mentoring. The Crew is considered as a possible supported employment connection.",
          "This describes the ambition behind the proposal, not an available sequence of placements. Accommodation, jobs and clinical support would each require their own arrangements. The newer partnership document does not assume that DARC must be residential or that any particular property is approved.",
          "The practical question remains the same: how can someone keep receiving useful support after an initial period of treatment, rather than having to navigate every next step alone?",
        ],
      },
      {
        id: "community",
        title: "Community and family have a place in the design",
        paragraphs: [
          "DARC is intended to be shaped with Aboriginal people in the region, including lived-experience voices, cultural mentors and existing services. Community priorities should help determine the model, workforce and what a good outcome looks like.",
          "The planning includes a youth-and-community focus, but the final age groups and eligibility are still to be agreed. Families and carers would be involved where the person agrees and where it is safe and appropriate.",
          "The proposal also calls for clear information about choice, privacy, complaints, referral and aftercare. Cultural support and peer work would have defined roles alongside qualified clinical care.",
        ],
      },
      {
        id: "next",
        title: "Where DARC is up to",
        paragraphs: [
          "IRAAC has prepared a discussion proposal for working with health agencies on the service gap, possible delivery models, location, workforce and funding. The reviewed material does not confirm an approved centre, an operating provider or an opening date.",
          "DARC is not currently an intake or treatment service. If you are looking for support now, contact an existing health or alcohol and other drug service rather than waiting for DARC to open. You can ask IRAAC about the proposal or share what better local recovery support would mean for you and your family.",
        ],
      },
    ],
    questions: [
      {
        question: "Can I book treatment or a place at DARC?",
        answer:
          "No. Treatment, residential places and admissions are not available through this page. The service model and clinical arrangements are still in development.",
      },
      {
        question: "Where will DARC be based?",
        answer:
          "The initiative is proposed for the Illawarra. No final site is confirmed for this page, so there is no DARC address for appointments or drop-in visits.",
      },
      {
        question: "Is DARC only for young people?",
        answer:
          "Earlier plans have a youth-and-community focus. The latest proposal leaves the final target group and age eligibility to be agreed through the design process.",
      },
    ],
  },
];
