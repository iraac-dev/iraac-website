import { communityReports } from "../../reports/report-data";

export const audiences = ["Community", "IRAAC", "Government"] as const;
export type Audience = (typeof audiences)[number];
export const preparedDate = "13 September 2026";
export const archivePeriod = "March – August 2026";
export type ReportSection = {
  title: string;
  paragraphs?: string[];
  points?: string[];
};

type Edition = {
  title: string;
  summary: string;
  action: string;
  evidence: string;
};
type Theme = {
  slug: string;
  label: string;
  editions: Record<Audience, Edition>;
};

const themes: Theme[] = [
  {
    slug: "bail-conditions-community-issue",
    label: "Justice & practical support",
    editions: {
      Community: {
        title: "Bail, support and a clear next step",
        summary:
          "A plain-language account of the practical help people may need alongside qualified legal advice: a trusted contact, transport and a clear way to ask for support.",
        action:
          "A proposed IRAAC pathway would begin by asking what makes the next appointment difficult. With the person’s agreement, a worker could help connect them with legal assistance and practical services, then check whether that connection worked. Community should help decide how this pathway feels welcoming and safe.",
        evidence:
          "The existing August project report identifies an early concern about bail and service access. It does not provide a validated count or establish how widespread the issue is. Further listening should focus on barriers and support, without collecting court documents or publishing individual stories.",
      },
      IRAAC: {
        title: "Bail navigation: an operating proposal",
        summary:
          "A draft staff briefing on defining IRAAC’s practical support role, agreeing referral responsibilities and keeping legal decisions with qualified practitioners.",
        action:
          "Management should nominate a proposed pathway owner and confirm referral arrangements with appropriate legal services before offering a new service. The intake conversation should establish safe contact preferences and practical access needs. Staff must not interpret conditions, promise a variation or mark a referral complete simply because a number was supplied.",
        evidence:
          "A future operational review could measure consented referrals, confirmed connections and unresolved access barriers. Those measures need agreed definitions and a protected source record. No referral totals, client details, legal outcomes or staff performance results have been supplied for this edition.",
      },
      Government: {
        title: "Bail support: closing the practical access gap",
        summary:
          "A discussion brief proposing a locally designed support pathway and an evidence plan before any claim about reduced remand or improved compliance.",
        action:
          "The proposed request is for relevant justice and Aboriginal affairs teams to discuss how transport, communication and culturally safe navigation could complement existing legal services. Any pilot should be designed with Aboriginal organisations and participants, with clear responsibilities, resourcing and an agreed evaluation before delivery begins.",
        evidence:
          "The local signal is exploratory. It cannot demonstrate a change in offending, bail compliance or remand. State-level research may provide context but cannot be treated as evidence of IRAAC outcomes. A proposal would need a baseline, participant safeguards and independently agreed measures before funding claims could be made.",
      },
    },
  },
  {
    slug: "have-your-say-july-2026",
    label: "Community voice",
    editions: {
      Community: {
        title: "Have Your Say: listening should lead somewhere",
        summary:
          "The July theme is a simple one: people should be able to reach a person, choose how to meet and understand what happens after asking for help.",
        action:
          "IRAAC’s proposed next step is to make office, phone and community contact choices easier to understand. People should be able to explain access needs without repeating their story to several services. A later community update should say which changes were made and invite people to explain what is still missing.",
        evidence:
          "The existing July report describes a very small early response set. This edition deliberately avoids repeating response combinations that could identify contributors. Early themes are questions to explore, not a statement of what the whole community wants.",
      },
      IRAAC: {
        title: "From listening to a reliable follow-up",
        summary:
          "An internal working brief on turning requests for contact into clear ownership, safe follow-up and an honest account of unresolved needs.",
        action:
          "The proposed workflow assigns one responsible worker after a person requests contact. That worker confirms the person’s preferred channel and records the agreed next step in the protected case system. A monthly review should examine whether people reached support, rather than reward the number of forms collected.",
        evidence:
          "Before reporting performance, management should reconcile consent, contact attempts and confirmed outcomes against the original records. This draft contains no extracted response data. Response rates and satisfaction measures remain unverified, and unanswered contact must not be counted as a successful outcome.",
      },
      Government: {
        title: "Community voice needs a human pathway",
        summary:
          "A policy discussion about supporting assisted participation and follow-up alongside digital access, with evidence proportionate to the small early signal.",
        action:
          "A proposed conversation with Aboriginal Affairs NSW would examine support for face-to-face and assisted participation. The request should explain the practical resources required for follow-up and ask how community-defined access measures could inform future reporting. No funding commitment or agency agreement is implied.",
        evidence:
          "The July project material supports exploratory service-design questions only. It is not a representative consultation or regional needs assessment. Any government submission should disclose the collection period, recruitment approach and limitations, with identifiable responses excluded from the report.",
      },
    },
  },
  {
    slug: "mcc-peer-to-peer-model",
    label: "MCC & organisational capability",
    editions: {
      Community: {
        title: "Sharing knowledge, respecting local authority",
        summary:
          "How Mob and Country Connections could help Aboriginal organisations share useful governance experience while keeping decisions with each organisation.",
        action:
          "A useful next step is to invite participating organisations to identify one practical area where shared experience would help. A template or conversation should be adapted to their circumstances. Community reporting should describe only work that participants have confirmed and agreed can be shared.",
        evidence:
          "This edition explains the peer-to-peer model described in the June project report. It does not verify workshops, participating organisations, hours of support or benefits. Those details should come from agreed records and participant feedback before being reported as results.",
      },
      IRAAC: {
        title: "MCC: a practical framework for peer support",
        summary:
          "An operating brief for invitation-led support, clear boundaries and a manageable record of what was requested, shared and learned.",
        action:
          "A proposed MCC engagement should record the invitation, the requested assistance and who can approve shared materials. IRAAC can offer adaptable examples of meeting records, reporting calendars and administrative processes. The receiving organisation retains authority over its own decisions and should review any description of its experience.",
        evidence:
          "The next internal review should distinguish an enquiry from an agreed engagement, and a resource shared from a demonstrated improvement. No confirmed delivery register accompanies this draft. Management should validate records before using them in a board report or funding acquittal.",
      },
      Government: {
        title: "MCC: investing in community-controlled capability",
        summary:
          "A discussion brief on peer-led organisational support and the conditions needed to evaluate it without imposing a single operating model.",
        action:
          "The proposed discussion asks whether capability support can be funded around priorities identified by participating organisations. Evaluation should be jointly agreed and proportionate, recognising that useful changes may include clearer responsibilities or more reliable reporting. A detailed budget and delivery plan would be needed before a funding request.",
        evidence:
          "The program model is described in existing IRAAC project material, but delivery and impact are not established by this archive. Future claims should be supported by participant-approved accounts and appropriate records. An organisation’s willingness to receive support is not permission to name it publicly.",
      },
    },
  },
  {
    slug: "local-decision-making-practice",
    label: "Local decision making",
    editions: {
      Community: {
        title: "Local priorities, visible answers",
        summary:
          "A community report about following a priority from the first conversation through a decision and back to the people who raised it.",
        action:
          "The proposed approach is to publish a plain-language account of each agreed priority: what was raised, which organisation can act, what response was received and what remains open. Community should have a way to correct that account. A meeting alone should not be presented as a resolved issue.",
        evidence:
          "The May project report explains a desired accountability process. This edition does not record a negotiated agreement, completed government action or endorsed regional priority. Those claims require confirmation from the people and organisations involved.",
      },
      IRAAC: {
        title: "Local decision making: tracking commitments",
        summary:
          "An internal proposal for maintaining a clear connection between community priorities, organisational decisions and follow-through.",
        action:
          "IRAAC should propose a simple commitments register with a responsible owner, an agreed action, supporting records and a next review date. Staff should distinguish matters within IRAAC’s authority from matters requiring another body’s decision. Any public update should accurately reflect the status of that decision.",
        evidence:
          "The register is a recommendation, not evidence of existing commitments. Before recording a response as agreed, the responsible organisation should confirm its wording. An unanswered request remains open; it should not be described as acceptance or support.",
      },
      Government: {
        title: "Making local decision making accountable",
        summary:
          "A proposed brief on clear government responses, community authority and reporting that follows decisions through to delivery.",
        action:
          "The proposed request is for agencies to identify the appropriate decision-maker for each priority and agree how a response will return to community. A useful response states what can be done, what cannot yet be agreed and when the matter will be revisited. Local organisations should help define the reporting approach.",
        evidence:
          "This draft is based on IRAAC’s May discussion report. It does not assert that an agency has accepted a priority or entered an agreement. Formal policy references and any negotiated commitments should be checked with the relevant agency before this edition is submitted.",
      },
    },
  },
  {
    slug: "governance-foundation",
    label: "Governance & accountability",
    editions: {
      Community: {
        title: "Good governance protects community work",
        summary:
          "A plain-language report on why clear decisions, responsible use of resources and honest updates matter to community programs.",
        action:
          "The proposed community update should explain how decisions are recorded and how questions can be raised. It should distinguish planned activities from completed work and describe unresolved issues plainly. Financial information should be shared only after reconciliation and approval, in a form people can understand.",
        evidence:
          "The April project report sets out governance principles. It is not an audit opinion or proof of financial compliance. This edition includes no verified financial balances, board attendance figures or acquittal results.",
      },
      IRAAC: {
        title: "Governance: a reporting discipline that lasts",
        summary:
          "A board-oriented working brief on the records, responsibilities and review steps needed to support reliable reporting.",
        action:
          "Management should maintain a reporting calendar against actual obligations, identify an owner for each requirement and retain the evidence behind every submitted statement. Board papers should make unresolved matters easy to see and separate a recommendation from an approved decision. Material changes should return for review.",
        evidence:
          "A future review should reconcile meeting decisions, financial records and submission receipts. The archive does not establish that any obligation has been met or missed. Dates and recipients for statutory and grant reporting must be confirmed against the relevant agreement or requirement.",
      },
      Government: {
        title: "Accountability that supports community control",
        summary:
          "A discussion paper on proportionate reporting, clear evidence and the organisational capability needed to sustain community programs.",
        action:
          "The proposed agency discussion should seek clarity on evidence expectations and opportunities to reduce duplicated reporting. Any simplification must preserve accountability for agreed outcomes and resources. A shared reporting calendar could be explored once the actual funding agreements and obligations are confirmed.",
        evidence:
          "This document is a policy discussion draft, not an acquittal or compliance declaration. It supplies no expenditure totals or assurance findings. Any formal submission needs reconciled records, authorised sign-off and the correct recipient for the relevant funding arrangement.",
      },
    },
  },
  {
    slug: "young-people-culture-connection",
    label: "YouthScape & belonging",
    editions: {
      Community: {
        title: "Young people, culture and belonging",
        summary:
          "A report on YouthScape’s intended direction: bringing cultural connection, trusted relationships and practical opportunities together.",
        action:
          "The next proposed step is to hear directly from young people about the activities, places and support that would make participation worthwhile. Families and trusted adults should be involved appropriately. Transport and accessibility need attention from the start, so an invitation becomes a realistic opportunity. An initial listening session could explore preferred meeting places, suitable times and the role of trusted community members. Before inviting participation, the organiser should explain what is being proposed, what support is available and how young people can decline or change their minds.",
        evidence:
          "The March project report describes program intentions. It does not verify attendance, completed activities or changes in wellbeing. Young people should help decide what success means and which stories, if any, they want shared.",
      },
      IRAAC: {
        title: "YouthScape: turning direction into a delivery plan",
        summary:
          "An internal planning brief on youth participation, cultural authority, practical access and a credible approach to recording outcomes.",
        action:
          "Before delivery is described as established, IRAAC should confirm the proposed activities, responsible adults, appropriate safeguards and practical access arrangements. Young people should influence the plan. Staff should agree how participation and feedback are recorded without treating attendance alone as evidence of improved wellbeing.",
        evidence:
          "The source material gives a program direction rather than a delivery record. This edition therefore contains no participant counts or outcome claims. Internal reporting should verify dates, activities and consent before any material moves into a community story or government report.",
      },
      Government: {
        title: "YouthScape: supporting culture and opportunity",
        summary:
          "A discussion brief proposing support for a youth-shaped program and an evaluation approach that respects culture, relationships and local priorities.",
        action:
          "A future proposal should explain how young people will shape delivery, what practical barriers need funding and how local cultural authority will be respected. Agencies should be invited to discuss appropriate measures alongside community-defined outcomes. A costed plan is required before a specific funding request can be made.",
        evidence:
          "No verified reach, delivery cost or impact data is available in this archive. The program rationale should not be presented as evidence of success. Any funding brief must distinguish intended benefits from observed outcomes and explain how evidence will be collected responsibly.",
      },
    },
  },
];

const audienceDetails: Record<
  Audience,
  { recipients: string; purpose: string; channel: string; closing: string }
> = {
  Community: {
    recipients: "Community members and participating families",
    purpose:
      "Return a clear account of the issue, invite corrections and explain the proposed next step.",
    channel: "Proposed: community webpage and consented newsletter",
    closing:
      "Community should be able to question this account, suggest what is missing and choose whether to participate further. Feedback should inform a later edition; it is not an approval to publish someone’s personal experience.",
  },
  IRAAC: {
    recipients: "IRAAC Board and authorised program staff",
    purpose:
      "Support decisions, assign responsibilities and identify the evidence needed for a reliable update.",
    channel: "Proposed: protected board and staff workspace",
    closing:
      "The next internal step is to nominate an owner, confirm the source material and take any proposed decision through the appropriate review process. This publicly viewable demonstration edition contains no private operational records and does not confer approval or authority to act.",
  },
  Government: {
    recipients:
      "Relevant NSW agency policy and program teams — recipients to be confirmed",
    purpose:
      "Explain the issue, propose a discussion and identify the evidence required before a formal submission.",
    channel: "Proposed: approved agency correspondence",
    closing:
      "Before submission, confirm the agency remit, recipient, supporting evidence and authorised sign-off. No agency endorsement, funding decision or delivery commitment is recorded here. A later report should quote the verified response accurately and explain what remains unresolved.",
  },
};

export const reportLibrary = themes.flatMap((theme, index) => {
  const source = communityReports.find((report) => report.slug === theme.slug)!;
  return audiences.map((audience) => {
    const edition = theme.editions[audience];
    const details = audienceDetails[audience];
    const sections: ReportSection[] = [
      {
        title: "Executive summary",
        paragraphs: [edition.summary, source.centralMessage],
      },
      { title: "Context and evidence", paragraphs: [edition.evidence] },
      { title: "Proposed response", paragraphs: [edition.action] },
      {
        title: "Purpose and intended audience",
        paragraphs: [
          `This ${audience.toLowerCase()} edition is prepared for ${details.recipients.toLowerCase()}. ${details.purpose} It should be read alongside the other audience editions, which consider the same issue from different responsibilities. The proposed destination does not establish that anyone received, endorsed or approved this report.`,
        ],
      },
      {
        title: "What a useful next update would show",
        paragraphs: [
          "The next edition should identify which proposed actions were accepted, what was actually completed and what still needs attention. Supporting records should be checked before any result is reported. If evidence remains limited, the report should say so rather than infer progress from activity alone.",
          details.closing,
        ],
      },
    ];
    const sources = [
      {
        title: `IRAAC project report: ${source.title}`,
        href: `/reports/${source.slug}`,
        note: "Existing project narrative; not independently validated operational evidence.",
      },
    ];
    if (theme.slug === "bail-conditions-community-issue") {
      sections.splice(2, 0, {
        title: "Bail: the legal support boundary",
        paragraphs: [
          "NSW Government guidance explains that bail involves attending court and following the conditions in a person’s order. Anyone seeking a change should obtain legal advice. IRAAC’s proposed role is practical navigation; it cannot vary a condition or determine a person’s legal obligations.",
          "Aboriginal Legal Service NSW/ACT offers assistance with bail applications and understanding or meeting conditions. Its published contact number is 1800 765 767. Availability and eligibility must be confirmed with the service. Its named Front-Up and Ngurrambai programs operate in the ACT and are not presented here as local NSW programs.",
        ],
      });
      sources.push(
        {
          title: "NSW Government — Understanding bail",
          href: "https://www.nsw.gov.au/legal-and-justice/going-to-court-as-a-defendant/bail",
          note: "General NSW guidance, checked 13 September 2026; not individual legal advice.",
        },
        {
          title: "Aboriginal Legal Service NSW/ACT — Bail",
          href: "https://www.alsnswact.org.au/bail",
          note: "Legal support and service scope, checked 13 September 2026.",
        },
      );
    }
    return {
      id: `IRAAC-2026-${String(8 - index).padStart(2, "0")}-${audience === "Community" ? "COM" : audience === "IRAAC" ? "ORG" : "GOV"}`,
      slug: `${source.slug}-${audience.toLowerCase()}`,
      month: source.month,
      topic: theme.label,
      audience,
      title: edition.title,
      summary: edition.summary,
      status: "Draft" as const,
      version: "1.0",
      preparedDate,
      sourceSlug: source.slug,
      ...details,
      sections,
      sources,
    };
  });
});

export type LibraryReport = (typeof reportLibrary)[number];
export function findLibraryReport(slug: string) {
  return reportLibrary.find((report) => report.slug === slug);
}
