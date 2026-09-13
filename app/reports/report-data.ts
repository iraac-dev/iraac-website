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
          "This issue deserves careful reporting because a condition that looks straightforward on paper may be difficult to meet in daily life. A person may need to travel at a particular time, keep an appointment, remain contactable or understand a direction that was explained during a stressful moment. The practical question is not whether the condition matters. It is whether the person has a fair opportunity to understand it and reach the right support before a problem grows.",
          "IRAAC is treating the feedback as a signal for further listening, not as a finished finding. The purpose of this report is to set out the questions raised, describe the boundaries of IRAAC’s role and identify practical areas that Aboriginal organisations, legal services and other partners may need to examine together.",
        ],
      },
      {
        title: "The practical barriers behind the issue",
        paragraphs: [
          "Bail conditions can sit alongside other pressures. A person may be dealing with unstable housing, limited phone credit, caring responsibilities, work, health needs or a lack of transport. These circumstances do not remove the need to comply with a lawful condition, but they can affect whether someone can reach an appointment, receive an update or ask for help early enough.",
          "Distance also matters. Services may be available in a regional centre but difficult to reach from another town or community. Public transport timetables may not match appointment times. A lift from family may not always be available. When several organisations are involved, a person may be asked to repeat the same story while still being unsure who owns the next step.",
          "Communication can create another barrier. Written information may use unfamiliar language, and verbal instructions may be hard to recall later. Some people may prefer to speak face to face or with a trusted support person present. A culturally safe response starts by checking what the person understood, what could prevent them from acting and how they want to be contacted.",
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
        paragraphs: [
          "Taken together, these points suggest that a useful response needs to connect legal information with practical support. No single organisation is likely to hold every part of the answer. Clear roles, warm referrals and reliable follow-up matter because the cost of a missed handover may fall on the person who is already trying to manage several pressures.",
          "The feedback also points to the value of prevention. It is better to identify a transport, phone or appointment problem at the first conversation than after a deadline has passed. This requires staff to ask practical questions without making assumptions about a person’s circumstances or treating support needs as a failure.",
        ],
      },
      {
        title: "What better support could look like",
        paragraphs: [
          "A useful pathway begins with a plain-language explanation, a named point of contact and confirmation of who is responsible for the next action. Transport, telephone access, appointment location, caring responsibilities and communication needs should be discussed early.",
          "Where another organisation is needed, a warm referral can be more effective than asking someone to start again. Personal information must only be shared with consent.",
          "A warm referral means more than passing on a number. With the person’s permission, it can include confirming that the receiving service is appropriate, helping make the first contact, checking what information may be shared and telling the person when to expect a response. If the service cannot assist, the pathway should return to a named worker rather than ending without an explanation.",
          "Support should remain clear about professional boundaries. IRAAC can listen, help identify barriers and connect people with qualified services. It should not interpret bail conditions, advise someone about legal choices or imply that a referral guarantees an outcome. Being precise about this boundary protects community members and helps legal practitioners focus on the advice only they can provide.",
        ],
      },
      {
        title: "A culturally safe first conversation",
        paragraphs: [
          "The first conversation should give the person time to explain what is happening in their own words. Staff can ask what they have been told, what they understand the next step to be and whether anything may prevent them from completing it. The aim is to uncover practical needs and connect the person with appropriate help, not to test their legal knowledge.",
          "Choice should be visible. A person may want an office appointment, a telephone call, a home or community visit, or support from a trusted family or community member. Any involvement of another person must be chosen by the individual, and private information should not be shared merely because someone is known to the organisation.",
          "The conversation should end with a short, concrete plan: who will contact whom, when that contact should happen, what the person can do if they hear nothing and which matters require a qualified legal service. A written summary can help, but staff should first confirm that writing is useful and safe for that person.",
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
        paragraphs: [
          "These recommendations are a starting point for discussion. Before adopting a pathway, IRAAC should confirm the role of each participating organisation, the hours and locations in which help is available, the process for urgent matters and the point at which a referral is considered complete. Community feedback should be used to test whether the pathway makes sense outside an organisational meeting room.",
          "Any shared process should record only the information needed for the agreed purpose. Consent to contact a service should be specific, and a person should be told what will be shared. Operational reporting should focus on whether referrals connected people with help, without turning private circumstances into public case studies.",
        ],
      },
      {
        title: "How IRAAC can track progress responsibly",
        paragraphs: [
          "Progress can be tracked without publishing identities. Useful measures may include how many people asked for navigation support, the kinds of practical barriers they chose to report, whether a referral was accepted, whether the person received a clear next step and whether follow-up occurred within the agreed time. Counts should be reported only when the underlying records are complete enough to support them.",
          "Numbers alone will not show whether support felt safe or useful. IRAAC should also invite people to say whether they understood the plan, whether they had to repeat their story and whether there was a point at which the pathway stopped working. Feedback should remain voluntary and should not affect access to help.",
          "Future public updates should separate three things: what community members reported, what IRAAC did in response and what partner organisations confirmed. This makes it easier to see progress without attributing an outcome to IRAAC that depended on another service or presenting an early observation as settled evidence.",
        ],
      },
      {
        title: "Questions for the next report",
        points: [
          "Which bail-related practical barriers are raised most often, and are the available records strong enough to report a pattern?",
          "Where do people currently go for qualified legal advice, and where are the gaps in location, timing or accessibility?",
          "Which transport and communication problems can be addressed early through existing services?",
          "Do people receive a named contact and a clear explanation after a referral is made?",
          "What do community members say would make the pathway easier to trust and use?",
          "What actions have partners agreed to take, and when should IRAAC report back on them?",
        ],
        paragraphs: [
          "The next report should answer only those questions supported by verified information. If evidence remains limited, it should say so plainly and explain how IRAAC will continue listening. Honest limits are part of accountability: they prevent a serious issue from being exaggerated while ensuring it is not ignored.",
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
          "The two responses should be read as individual requests that may point towards themes worth exploring. They do not establish how common a concern is, how experiences differ across places or age groups, or what the wider community would prioritise. This distinction matters because a monthly report should create accountability without giving a small set of answers more weight than they can carry.",
          "The strongest shared message is about the pathway into support. Both people chose human contact rather than a purely digital next step. Their answers reinforce the need for IRAAC to offer several ways to continue a conversation after a form is submitted, including options that are practical for people who prefer face-to-face contact.",
        ],
      },
      {
        title: "How to read a report based on two responses",
        paragraphs: [
          "This is an early-signal report. It records what was present in the July responses and uses those answers to improve follow-up and future questions. It does not estimate community-wide demand, compare communities or claim that the two respondents speak for anyone else.",
          "A small response set can still be useful when the limits are visible. It can show whether the survey pathway works, whether people are choosing contact, whether the available response options make sense and whether IRAAC can follow through safely. It can also reveal topics that staff should listen for in community conversations before drawing broader conclusions.",
          "Future reports should keep the number of responses beside any summary of themes. If IRAAC combines survey responses with conversations, program feedback or staff observations, it should label each source separately. This prevents different kinds of evidence from being blended into a single number or presented as though they were collected in the same way.",
        ],
      },
      {
        title: "What the questions tell us",
        paragraphs: [
          "The survey records topics and provides an entry point into a conversation. A person who asks for contact should not have to complete another long process before someone acknowledges the request. The immediate service standard is simple: confirm receipt, explain who will respond and give a realistic next step.",
          "The July answers also show why broad categories should not become rigid boxes. Culture and connection may relate to young people, family, wellbeing, Country, events, transport or support from a trusted person. Follow-up should allow the respondent to explain what the selection means to them instead of assuming the category already provides the answer.",
        ],
        points: [
          "Connection should come before asking a person to navigate service categories.",
          "Face-to-face contact must remain visible and easy to request.",
          "Culture, family, young people and practical support can be closely connected.",
          "Online forms should lead to a human response rather than another dead end.",
          "Location, transport and the choice of where to meet can determine whether someone participates.",
        ],
      },
      {
        title: "The importance of choice and human follow-up",
        paragraphs: [
          "People should be able to choose how IRAAC contacts them and where a conversation happens. An office may suit one person, while another may prefer a community setting or a home visit. A telephone call can be convenient, but it should not be treated as the default when the person selected face-to-face support.",
          "Choice also applies to timing, support people and the amount of information shared. Staff should check whether it is safe to leave a message, whether the person wants anyone else involved and whether accessibility or communication support is required. Consent to one form of contact does not automatically cover every channel or future campaign.",
          "Good follow-up closes the loop. After listening, the staff member should explain what IRAAC can do, what requires another organisation and when the person can expect an update. If the answer is not yet known, an honest holding message is better than silence. The person should have a named route back into the conversation without submitting the survey again.",
        ],
      },
      {
        title: "What July suggests for service design",
        paragraphs: [
          "The responses support a service design that begins with the person rather than a directory. A welcoming first contact can help identify whether the need relates to an IRAAC program, another Aboriginal organisation, a specialist service or several connected supports. The process should remain simple even when the underlying service system is complicated.",
          "Digital access should complement this human pathway. The survey can collect a preference and provide a clear confirmation, but it should not suggest that a form has solved the request. Staff need a protected source record, a way to assign responsibility and a visible follow-up status. Public reports should describe the process without publishing information that could identify a respondent.",
          "A small monthly report is also an opportunity to improve the questions. IRAAC can examine where respondents paused, which options were chosen together and whether the final contact choices were clear. Any material change to the survey should be reviewed and versioned so that answers collected under different questions are not silently treated as equivalent.",
        ],
      },
      {
        title: "Priorities for the next month",
        paragraphs: [
          "The first priority is not to increase the headline response number. It is to complete the commitments already created by the two responses. IRAAC should confirm that each request reached the right staff member, that the person’s contact preference was respected and that any agreed referral or visit had a clear owner.",
          "The second priority is careful outreach. IRAAC can invite more people to participate through existing trusted pathways, but the invitation should explain why the survey is being run, how information will be used and that participation is voluntary. Newsletter distribution, survey follow-up and service contact are different activities and should use the permission appropriate to each one.",
        ],
        points: [
          "Follow up each request through the protected source record.",
          "Keep office, home and community visits easy to find.",
          "Tell each person what will happen next and who is responsible.",
          "Include transport and access needs in the first conversation.",
          "Collect more responses before making broader conclusions.",
          "Continue reporting themes without publishing personal information.",
        ],
      },
      {
        title: "How future monthly reports should improve",
        paragraphs: [
          "As the response base grows, IRAAC may be able to compare recurring themes over time. That should happen only when the questions, reporting period and source records make the comparison fair. A change in the number of mentions can reflect outreach, question wording or access to the survey, not necessarily a change in community need.",
          "A useful monthly series should therefore combine consistency with honesty. The same core headings can help readers compare reports, while a short evidence note can explain what changed in collection or coverage. This gives community members a clearer view of what the report can and cannot show.",
        ],
        points: [
          "Show the reporting period and the number of responses included.",
          "Separate direct survey responses from program feedback and staff observations.",
          "State when a theme is an early signal rather than a reliable pattern.",
          "Report whether requested follow-up was completed without revealing personal details.",
          "Explain what IRAAC changed after listening and what remains open.",
          "Invite corrections and further community input through a clear pathway.",
        ],
      },
      {
        title: "Questions to carry into August",
        paragraphs: [
          "IRAAC should listen for what culture and connection mean in practical terms to different people. This may include access to events, time on Country, support for young people, a trusted person to speak with or a stronger link between programs and family. The answer should come from further participation rather than being defined in advance by the organisation.",
          "Staff should also examine whether people can move from raising an issue to receiving a response without repeating their story. Where a referral is needed, IRAAC should ask whether the receiving service was available, appropriate and explained clearly. Where IRAAC retains responsibility, the next report should say what action was taken.",
          "August reporting should retain the same privacy standard. Public information should describe shared themes and organisational actions. Names, contact details, locations and private written comments belong in protected operational records and should never be copied into a public report merely to make it feel more detailed.",
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
          "The value of peer support is practical. A conversation between organisations can begin with the real task in front of them: preparing a meeting, organising records, clarifying a responsibility, responding to a reporting request or building a consistent way to follow up actions. The starting point is the organisation’s own priority, not a standard package selected elsewhere.",
          "MCC is therefore different from taking control of another organisation’s work. IRAAC can demonstrate a process, share an editable resource and talk through what it has learned. The participating organisation decides whether the material fits, what needs to change and who has authority to approve its use.",
        ],
      },
      {
        title: "Why invitation and relationship matter",
        paragraphs: [
          "Capability support can become unhelpful when it arrives as a judgement about what an organisation lacks. An invitation-led approach begins with respect for existing knowledge, leadership and community responsibilities. It gives the organisation space to name the problem it wants to solve and the kind of assistance that would be useful.",
          "Relationships also make it easier to discuss the parts of organisational work that are difficult to put in a formal request. A template may be simple, but the surrounding questions can involve workload, confidence, unclear roles or a history of systems that were introduced and then abandoned. Trust allows those practical realities to be discussed without turning them into public shortcomings.",
          "This does not mean expectations should remain vague. A useful MCC engagement should still have a shared purpose, a clear contact person, agreed boundaries and a point at which both organisations review whether the support is helping. Relationship and accountability should reinforce one another.",
        ],
      },
      {
        title: "What practical capability sharing can include",
        paragraphs: [
          "Support may involve governance calendars, meeting preparation, action registers, policy review, program records, funding acquittal preparation or ways to organise evidence for reporting. These examples describe areas of work, not a promise that MCC provides every professional service. Legal, financial, audit and specialist advice must remain with appropriately qualified people.",
          "The most useful resource is often one that can be used immediately and changed locally. An editable agenda, decision record or reporting checklist can reduce the effort required to start. A short working session can then connect the tool to the organisation’s actual roles and deadlines. The aim is not a perfect document; it is a process that people understand and can maintain.",
          "IRAAC should avoid transferring unnecessary information. Peer support may require seeing the structure of a process without receiving personal records, confidential Board material or community data. Before any document is shared, both organisations should agree what is needed, what can be de-identified and where working copies will be stored.",
        ],
      },
      {
        title: "What IRAAC is learning",
        paragraphs: [
          "The lessons below describe the principles guiding MCC. They are not presented as measured program outcomes. Future reporting should distinguish what participating organisations have confirmed from what IRAAC believes may be useful based on its own experience.",
          "One emerging lesson is that systems last when they fit the people who will use them. A detailed process can look impressive but fail if it adds work, depends on one person or uses language that is unclear. Capability grows when the organisation can explain the process, adapt it and continue using it after the immediate support ends.",
        ],
        points: [
          "Trust and invitation are essential to a useful working relationship.",
          "Practical templates are most valuable when they can be adapted locally.",
          "Governance support should strengthen authority rather than replace it.",
          "Reporting systems can protect programs by reducing missed requirements and unclear responsibilities.",
          "Outcomes should be described only after participating organisations agree they are accurate.",
        ],
      },
      {
        title: "A respectful working process",
        points: [
          "Begin with the organisation’s stated priority and confirm what success would look like to them.",
          "Agree who can make decisions, who will do the work and what information can be shared.",
          "Use existing processes where they are working instead of replacing them without reason.",
          "Work on a real task so the support produces something immediately useful.",
          "Leave editable resources and a clear explanation rather than creating dependency on IRAAC.",
          "Review the engagement with the participating organisation before describing it publicly.",
        ],
        paragraphs: [
          "This process keeps authority visible. It also reduces the risk that support becomes a series of conversations with no usable result. Each engagement should end with an agreed action, owner and review point. If the need is outside MCC’s role, IRAAC should say so early and, where appropriate, help identify a more suitable source of assistance.",
          "The participating organisation should be able to stop, change or narrow the work. Consent to receive support is not permission for IRAAC to use the organisation’s name, materials or experience in promotion. Public examples require separate agreement and should be checked by the organisation before release.",
        ],
      },
      {
        title: "How MCC can strengthen reporting without taking it over",
        paragraphs: [
          "Reporting can be difficult when information is held across emails, notebooks, meeting papers and the knowledge of individual staff. MCC can help an organisation map where evidence is created and decide how actions, attendance, spending, outputs and community feedback should be recorded. The organisation remains responsible for approving the system and the final report.",
          "A good reporting process starts before a deadline. It identifies what must be recorded during delivery, who checks the information and how differences between planned and completed work will be explained. This can reduce last-minute pressure and make it easier to give funders and community a truthful account of progress.",
          "Reporting should not be reduced to positive stories. It should record what was completed, what changed, what could not proceed and what was learned. When community information is involved, public reporting should use de-identified themes and approved figures rather than detailed stories that could reveal who participated.",
        ],
      },
      {
        title: "How progress should be assessed",
        paragraphs: [
          "MCC should be assessed by usefulness and ownership, not by the number of templates distributed. Possible measures include whether an agreed task was completed, whether staff can use the process without IRAAC, whether responsibilities are clearer and whether the organisation chose to continue or adapt the resource. Any measure should be agreed with the participating organisation.",
          "Qualitative feedback matters because capability is not always captured by a count. Participating organisations can be asked what saved time, what created extra work, what felt culturally or organisationally appropriate and what they would change. Feedback should be invited without tying a positive answer to future access to support.",
          "Public figures should appear only when records are complete, definitions are consistent and participating organisations have agreed that publication is appropriate. Until then, IRAAC should report the model, the learning questions and the improvements being made rather than inventing reach or impact.",
        ],
      },
      {
        title: "What comes next",
        paragraphs: [
          "IRAAC will continue refining MCC through feedback from participating organisations. Future reports can include verified workshops, resources and outcomes once they have been approved for public release.",
          "The next stage should clarify a simple engagement pathway: how an organisation expresses interest, how scope and boundaries are agreed, how work is recorded and how both parties close or continue the engagement. This pathway should remain flexible enough to respect different organisations while giving staff a consistent safeguarding and follow-up process.",
          "IRAAC can also build a small library of editable resources based on repeated requests. Each item should identify its purpose, the decisions it cannot make and the parts an organisation is expected to adapt. Resources should be reviewed when legislation, funding requirements or organisational policy changes.",
          "The next public update should report confirmed activity only after the relevant organisations have reviewed the description. It should explain what MCC helped with, what the participating organisation retained control over and what IRAAC learned about making peer support more useful. Where results are not yet measurable, the report should say that plainly.",
        ],
      },
      {
        title: "Questions for future learning",
        points: [
          "Which practical tasks are organisations asking MCC to help with most often?",
          "What resources are being adapted and maintained after an engagement ends?",
          "Where does a peer-support role need to stop and qualified specialist advice begin?",
          "How can IRAAC reduce the information organisations need to share while still providing useful support?",
          "What do participating organisations say made the relationship respectful and effective?",
          "Which outcomes can be verified and approved for community reporting?",
        ],
        paragraphs: [
          "These questions give MCC a learning agenda without pre-judging the answers. The program should develop through real invitations and feedback, with participating organisations shaping what good support means. The strongest evidence of success will be an organisation’s ability to own and use the result, not its resemblance to IRAAC’s internal way of working.",
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
          "The principle becomes meaningful only when participation can influence what happens next. A meeting, survey or consultation may collect views, but Local Decision Making requires a pathway from those views to a recorded priority, a responsible decision-maker and a response that comes back to community.",
          "Different organisations hold different responsibilities. Community members identify experiences and priorities. Aboriginal organisations may deliver programs, represent issues or coordinate local action. Alliances and Assemblies can bring shared priorities together. Government agencies retain responsibility for the decisions, services and resources within their authority. Clear reporting helps readers see where each matter currently sits.",
        ],
      },
      {
        title: "From a community issue to a shared priority",
        paragraphs: [
          "An issue may first be raised in a conversation, program, meeting, survey or request for assistance. IRAAC should record the issue in a way that protects the person while preserving the practical detail needed to understand it. Similar issues can then be grouped carefully, without assuming that every person experienced the same thing.",
          "Before calling something a shared priority, IRAAC should check the evidence. It should ask who has been heard, who may be missing, whether the issue affects one place or several and whether people had a genuine opportunity to disagree or add context. An urgent individual matter can require action even when it is not yet a community-wide pattern.",
          "When a priority is carried forward, community should know what wording is being used and what outcome is being sought. A broad phrase such as access to services may hide different needs involving transport, opening hours, cultural safety, eligibility or communication. Specific language makes it easier to identify who can act and whether the response addresses the issue that was actually raised.",
        ],
      },
      {
        title: "What good participation requires",
        paragraphs: [
          "Participation should be accessible, voluntary and connected to a clear purpose. People need to know why IRAAC is asking, how their input may be used and whether the conversation is about service support, community reporting, program design or formal representation. Agreement to one purpose should not be treated as permission for every later use.",
          "Several participation options are needed because a single meeting or online form will not reach everyone. Face-to-face conversations, community visits, program feedback and Have Your Say can complement one another. Each source should remain identifiable in the evidence so that a handful of responses is not presented as a complete community mandate.",
          "IRAAC should make room for people who are less confident speaking in groups, need communication support or prefer to involve a trusted person. It should also report who was not reached when that gap affects the strength of a conclusion. Good participation is not measured only by attendance; it is measured by whether people could understand the question and contribute safely.",
        ],
      },
      {
        title: "How reporting supports accountability",
        paragraphs: [
          "Community participation is more meaningful when people can see what followed. Reports should show what community said, what IRAAC raised, who responded, what changed and what remains unresolved.",
          "A report should preserve the chain between the original issue and the action taken. If the wording changes as the matter moves through meetings or agencies, IRAAC should explain why. If a request is declined, delayed or redirected, the status should remain visible rather than disappearing from the next update.",
          "Reporting also helps separate advocacy from delivery. IRAAC may be able to change its own program or referral process directly. Other matters require a decision from government or another organisation. Readers should be able to see which action belongs to IRAAC, which action has been requested from someone else and what evidence supports any claim of progress.",
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
        title: "A practical pathway for action",
        points: [
          "Record the issue, source, date and consent boundaries in the protected system.",
          "Check whether immediate individual support is required before treating the matter as a policy issue.",
          "Test the wording with further community listening where a broader priority is being claimed.",
          "Identify the organisation or decision-maker with authority to act.",
          "Agree the action requested, the owner and the next review date.",
          "Return to community with the response, evidence of change or an honest explanation of delay.",
        ],
        paragraphs: [
          "This pathway should be simple enough to use consistently. A complicated system can create its own barrier if staff cannot tell which matters are active or when an update is due. A clear issue register can support accountability, provided access is protected and public reports contain de-identified information only.",
          "Not every issue will follow a straight line. New evidence may change the proposed response, responsibility may be shared or a community priority may need to be considered alongside another one. The record should show these changes rather than rewriting the history as though the final pathway was obvious from the beginning.",
        ],
      },
      {
        title: "The role of Alliances, Assemblies and organisations",
        paragraphs: [
          "Regional and local structures can help bring priorities together, test whether concerns are shared and coordinate engagement with government. Aboriginal community organisations contribute direct program and service experience. Community members bring the lived knowledge that gives a priority its meaning. Each role adds something different and should not be collapsed into a single organisational voice.",
          "Representation requires a clear mandate. A person attending a meeting should know which matters they are authorised to speak on and how they will report back. Meeting participation alone does not prove that community endorsed every position discussed. Records should distinguish information shared, decisions made, actions accepted and matters requiring further consultation.",
          "IRAAC can support this system by presenting issues in plain language, carrying evidence with care and maintaining an update pathway. It should not imply that it represents every Aboriginal person or organisation. Its authority comes from its role, its governance and the specific participation behind each matter.",
        ],
      },
      {
        title: "How progress can be measured",
        paragraphs: [
          "Process measures can show whether the accountability pathway is functioning. These may include whether an issue has an owner, whether the responsible organisation acknowledged it, whether a next action and review date were recorded and whether community received an update. Such measures do not prove that the underlying issue has been solved.",
          "Outcome evidence should relate to the change community asked for. Depending on the issue, that may involve improved access, a changed procedure, a funded activity, a service delivered differently or a barrier removed. The evidence and decision-maker will vary, so IRAAC should not use one generic success measure for every priority.",
          "Community judgement remains essential. A change can be completed administratively and still fail to address the practical experience that led to the request. Follow-up should ask whether the response made a difference and what remains unresolved, while making clear that feedback is voluntary and will not affect access to support.",
        ],
      },
      {
        title: "The standard IRAAC is working towards",
        paragraphs: [
          "The test is not how many meetings took place or how many documents were produced. The test is whether decisions and services reflect what community identified as important, and whether IRAAC returns with an honest account of progress.",
          "That standard requires IRAAC to keep evidence, decisions and responsibilities connected. It should be possible to trace a public update back to a protected source record and an authorised organisational action without exposing the people who contributed. Claims should be reviewed before publication, especially where another organisation’s response is described.",
          "The standard also includes reporting when progress is limited. Community trust is not served by removing unresolved matters from view or turning routine activity into an outcome. A concise explanation of what is delayed, who holds the next action and when it will be reviewed gives people more useful information than a general statement that work is continuing.",
          "Future reports should include worked examples only where the underlying information is verified and safe to publish. Until then, IRAAC can report the framework it is building, the issues community chooses to raise and the actions that have been formally confirmed.",
        ],
      },
      {
        title: "Questions for the next accountability update",
        points: [
          "Which priorities currently have a recorded owner, action and review date?",
          "What evidence shows that the wording reflects the community issue originally raised?",
          "Which matters require wider listening before IRAAC presents them as shared priorities?",
          "What responses have government or partner organisations formally confirmed?",
          "Where has an action changed a service, program or practical barrier?",
          "Which matters remain unresolved, and when will community hear about them again?",
        ],
        paragraphs: [
          "Answering these questions consistently would allow later reports to show a genuine history of action. The aim is not to create more paperwork. It is to prevent community input from becoming disconnected from the decisions made in its name and to make responsibility visible when progress depends on several organisations.",
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
          "Governance is also the routine work between meetings. Actions need an owner and a due date. Conflicts of interest need to be declared and managed. Policies need to be understood by the people expected to follow them. Important records need to be stored where authorised people can find them rather than remaining in one person’s inbox or memory.",
          "A governance system should fit the organisation. It must meet legal, financial and funding responsibilities, but it should also be clear enough for directors and staff to use confidently. A long policy is not evidence of good governance if nobody knows when it applies. Practical tools, consistent habits and respectful discussion are what turn written rules into accountable decisions.",
        ],
      },
      {
        title: "The responsibilities behind a Board decision",
        paragraphs: [
          "A Board provides direction, oversight and accountability. It should understand the decision in front of it, the information relied upon, the risks involved and who will carry the decision out. Minutes should record the decision and any declared conflict without becoming a transcript of private discussion.",
          "Staff and program teams have a different role. They bring operational information, implement authorised decisions and report on progress. Clear delegation allows routine work to continue without sending every detail back to the Board, while reserving significant commitments, risks and strategic choices for the appropriate authority.",
          "Community accountability sits across both roles. Directors and staff should be able to explain how community priorities informed a program or position, what constraints affected the choice and how people will hear about the result. Community input should be recorded through safe participation pathways rather than assumed from informal contact alone.",
        ],
      },
      {
        title: "Good information leads to better decisions",
        paragraphs: [
          "Decision-makers need information that is timely, relevant and honest about uncertainty. A Board paper should state the decision required, provide the essential background, identify financial and operational effects and explain any risks or alternatives. Sending a large collection of documents without a clear question can make oversight harder rather than stronger.",
          "Information quality also depends on recordkeeping. Program attendance, spending, agreements, actions and community feedback should be recorded consistently and checked before they are summarised. Where evidence is incomplete, reports should identify the gap instead of filling it with an estimate presented as fact.",
          "Sensitive information requires stronger controls. Directors may need enough detail to govern a risk without receiving unnecessary personal information. Public reporting should use approved totals and de-identified themes. Access to a Board or staff group does not create permission to publish the information discussed there.",
        ],
      },
      {
        title: "Why it protects programs",
        paragraphs: [
          "Community programs depend on more than a good idea. They need authorised budgets, clear roles, safe delivery processes, reliable records and a way to identify problems early. Governance connects these parts so the program does not rely entirely on the knowledge or effort of one person.",
          "When responsibilities are unclear, small issues can become service interruptions. An agreement may not be renewed, a report may be missed or a risk may remain with nobody assigned to manage it. Regular oversight gives the organisation a chance to correct the process before community participants carry the consequences.",
        ],
        points: [
          "Clear decisions reduce confusion about responsibility.",
          "Reliable records help IRAAC follow through on commitments.",
          "Accurate reporting protects funding relationships.",
          "Regular review helps problems surface before they interrupt services.",
          "Community reporting makes accountability visible beyond the organisation.",
        ],
      },
      {
        title: "Financial stewardship and funding confidence",
        paragraphs: [
          "Financial stewardship means understanding what funding is for, approving spending through the right authority and comparing actual activity with the budget. It also means identifying restrictions, reporting dates and evidence requirements before the money is spent. Good records protect both the program and the people responsible for it.",
          "A variance is not automatically a failure. Costs, timing and program needs can change. The governance question is whether the change was identified, explained, authorised where required and reflected in the next decision. Hiding a difficulty until acquittal time makes it harder to respond and weakens confidence.",
          "Public reports should not publish private financial detail or imply that external assurance has occurred unless it has. They can explain how IRAAC oversees resources, the kinds of controls used and any verified program-level information approved for release. Formal financial statements, audits and funding acquittals remain separate records with their own requirements.",
        ],
      },
      {
        title: "Risk, safeguarding and speaking up",
        paragraphs: [
          "Risk management should help people notice and respond to threats to community, staff, programs, finances and reputation. A useful register states the risk, existing controls, further action, responsible owner and review date. It should be discussed when circumstances change, not updated only for an annual compliance exercise.",
          "Safeguarding requires clear reporting routes. Community members, young people, families, staff and partners should know how to raise a concern and what will happen after they do. Urgent safety matters need an immediate pathway, while complaints and feedback need fair handling, privacy and protection from retaliation.",
          "A healthy governance culture makes it possible to question a decision respectfully. Directors and staff should be able to raise uncertainty, request better information and record a different view. The aim is not agreement at any cost; it is a properly authorised decision made after relevant concerns have been heard.",
        ],
      },
      {
        title: "Governance and community control",
        paragraphs: [
          "Strong governance is not the opposite of self-determination. It helps demonstrate that decisions and resources can be held locally with clear accountability to community.",
          "Community control is strengthened when authority is understood. The organisation can decide through its own governance structures, explain who participated in the decision and show how it will be reviewed. External partners should respect these structures rather than bypassing them when a faster answer appears convenient.",
          "Accountability must also move back towards community. IRAAC should report what it has decided, what programs are intended to do and what verified evidence shows. It should provide ways for people to correct, challenge or add to that account. This does not require publishing confidential minutes; it requires a clear public explanation of purpose, action and limits.",
          "Governance should make participation safer, not more distant. Plain-language summaries, accessible feedback routes and scheduled reporting can help community members see where their input enters the organisation. The Board remains responsible for deciding how that input is balanced with legal duties, resources and the interests of the organisation as a whole.",
        ],
      },
      {
        title: "A practical governance cycle",
        points: [
          "Plan the annual calendar around meetings, reporting dates, policy reviews and funding obligations.",
          "Prepare decision papers that identify the question, evidence, options, risks and recommendation.",
          "Record decisions, conflicts, delegated actions and review dates clearly.",
          "Monitor actions, budgets, risks and program information between meetings.",
          "Escalate delays or new risks early enough for the organisation to respond.",
          "Report verified progress to community, partners and funders through the appropriate channel.",
        ],
        paragraphs: [
          "This cycle links planning, decision-making, delivery and reporting. Each stage creates information for the next one. When an action is overdue or evidence is missing, the organisation can see the gap and decide what to do. The purpose is dependable oversight, not paperwork for its own sake.",
          "The cycle should be reviewed after use. IRAAC can ask directors and staff which information helped, which steps created unnecessary work and where responsibilities remained unclear. Changes should be approved and documented so that improvements do not accidentally remove an important control.",
        ],
      },
      {
        title: "What IRAAC should report next",
        paragraphs: [
          "Future governance reports can move from principles to verified practice. They may describe whether scheduled meetings occurred, whether key actions were followed up, whether policies reached their review points and whether program and financial reports were provided to the appropriate decision-makers. Figures should come from checked records and be approved before publication.",
          "The report should also explain significant improvements or unresolved gaps. Examples could include a clearer delegation, a revised register or a reporting process that still needs work, but only where those changes have actually been completed or formally recorded. The public account should distinguish an intention, an action in progress and a finished change.",
          "Community readers should be invited to say what accountability information is useful to them. This feedback can guide later reports, but it does not replace formal Board approval or professional assurance. Strong governance is shown through a consistent record of responsible decisions, transparent limits and follow-through over time.",
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
          "Young people do not experience education, family, culture, health, transport and opportunity as separate systems. A difficulty in one area can affect participation in another. A program that focuses on only one category may miss the relationships and practical conditions that help a young person feel safe enough to take part.",
          "This report sets out a direction for YouthScape rather than a claim about completed delivery. Activities, participation and outcomes should be reported only after they have occurred and the information has been checked. The immediate responsibility is to build a program approach that young people and community can shape before success is defined on their behalf.",
        ],
      },
      {
        title: "Culture and belonging at the centre",
        paragraphs: [
          "Culture can provide connection to identity, family, community and Country. The way that connection is expressed will differ between young people and places. YouthScape should not reduce culture to a single activity or assume that every participant begins with the same knowledge, confidence or relationships.",
          "Cultural content should be guided by people with the right community authority and knowledge. Elders, cultural leaders, families and local organisations may have different roles depending on the activity and location. Their involvement should be invited respectfully, planned properly and supported rather than treated as a last-minute addition to a program timetable.",
          "Belonging also depends on the everyday experience of the program. Young people should know who will be there, what will happen, how to ask for support and whether they can bring someone they trust. Staff behaviour, transport, food, timing and the physical setting can all affect whether a culturally grounded activity feels genuinely welcoming.",
        ],
      },
      {
        title: "Young people should help shape the program",
        paragraphs: [
          "Participation in design means more than asking young people to choose from activities already decided. They should have opportunities to describe what matters, identify barriers, suggest formats and respond to what is proposed. Different ways to contribute are needed so that the loudest or most confident voices do not become the only source of direction.",
          "The purpose and limits of participation should be clear. If a decision is constrained by safety, funding, staffing or cultural authority, staff should explain that rather than implying every suggestion can be adopted. Reporting back on what changed, what did not and why shows that the contribution was considered seriously.",
          "Youth participation requires appropriate consent, privacy and safeguarding. A young person’s agreement to join an activity does not automatically permit photographs, public stories, future marketing or contact through every channel. Each use should have a clear purpose and the permission required for that person’s age and circumstances.",
        ],
      },
      {
        title: "Principles for the program",
        paragraphs: [
          "These principles describe the standard YouthScape should work towards. They are a basis for planning and later evaluation, not evidence that each feature has already been delivered. IRAAC should test them with young people, families and people holding relevant cultural and safeguarding responsibilities.",
          "The principles also need to be visible in ordinary program decisions. A commitment to access should influence location and transport. A commitment to youth voice should influence planning and review. A commitment to privacy should influence records, photographs, communication and public reporting.",
        ],
        points: [
          "Young people should help shape the activities intended for them.",
          "Culture and community relationships should sit at the centre of delivery.",
          "Participation should be welcoming and practical to access.",
          "Families and trusted adults should be involved appropriately.",
          "Public reporting should distinguish planned activity from verified outcomes.",
        ],
      },
      {
        title: "Making participation practical",
        paragraphs: [
          "A program can be appealing and still be inaccessible. IRAAC should consider how young people will travel, whether timing fits school, work and family responsibilities, what the activity costs to attend and how information reaches people who are not already connected to the organisation. A transport plan should be part of program design rather than an afterthought.",
          "Registration should collect only what is needed for safe delivery. Staff should explain who can see the information, how it will be used and how a participant or parent or carer can update it. Where online registration creates a barrier, an assisted or face-to-face option should remain available.",
          "The program should also plan for different communication, mobility, sensory and support needs. Asking early allows staff to make reasonable arrangements without placing the burden on the young person at the door. A participant should know who to contact privately if something changes or they have a concern.",
        ],
      },
      {
        title: "Safety, trust and the role of adults",
        paragraphs: [
          "Trusted adults can support participation, but their role should be clear. Depending on the activity, families, carers, Elders, mentors and workers may help with consent, transport, cultural guidance or wellbeing. Young people should still be listened to directly and treated with respect for their developing independence.",
          "Staff and volunteers need defined responsibilities, appropriate checks, safe conduct expectations and a clear response process for concerns. Participants should be told in plain language what behaviour is expected and how to get help. Safeguarding should be built into supervision, transport, digital communication, photography and off-site activities.",
          "Trust grows through consistency. Staff should do what they say they will do, avoid promises they cannot keep and explain changes early. If a young person is referred to another service, the handover should be supported where consent allows, and the participant should not be left to navigate an unfamiliar system without a clear next step.",
        ],
      },
      {
        title: "Connecting activities to opportunity",
        paragraphs: [
          "Opportunity can include cultural learning, education, training, creative work, sport, leadership, employment exposure, mentoring and community contribution. YouthScape should avoid treating one pathway as the definition of success. The useful question is whether the program helps a young person move towards an opportunity they value with the support needed to participate.",
          "Activities should have a clear purpose while leaving room for relationships to develop. A workshop may teach a skill, but it can also provide a safe introduction to mentors or services. Staff should not overstate these secondary benefits. They should record what was offered, what participants chose and what follow-up was agreed.",
          "Partnerships may broaden opportunity, but every partner should understand the program’s cultural, privacy and safeguarding expectations. Young people should know when an external organisation is involved and what information, if any, will be shared. A partnership name on a flyer is not evidence that participants received a lasting outcome.",
        ],
      },
      {
        title: "What IRAAC needs to learn next",
        paragraphs: [
          "Future reports should describe the age groups reached, activities delivered, participation, feedback and outcomes only after those details have been confirmed. Young people’s privacy and consent must remain central to any public story.",
          "IRAAC first needs to hear from young people about what would make YouthScape relevant and safe. It should also ask families, cultural authorities and local organisations where coordination is needed and what existing work should be respected rather than duplicated. The listening process should include people who may not attend a formal meeting.",
          "Program learning should separate reach, experience and outcome. Reach describes who participated in de-identified terms. Experience describes whether people felt welcomed, understood the activity and would change anything. Outcome describes a verified change linked carefully to the program. These measures answer different questions and should not be combined into one success figure.",
          "Future reports should include difficulties as well as progress. Low attendance, transport problems, activities that did not fit or feedback that challenges the original plan can all improve the program when reported honestly. Public detail must remain proportionate so that a small group or individual cannot be identified indirectly.",
        ],
      },
      {
        title: "A responsible approach to measuring progress",
        points: [
          "Record planned and delivered activities separately.",
          "Use checked, de-identified participation figures with clear date ranges.",
          "Ask young people what was useful and what should change through voluntary feedback.",
          "Track agreed follow-up without publishing personal support needs.",
          "Confirm any partner contribution before describing it publicly.",
          "Treat photographs and personal stories as optional, separately consented material rather than proof of impact.",
        ],
        paragraphs: [
          "Measures should help IRAAC improve decisions, not place unnecessary reporting work on participants. A short feedback conversation may be more suitable than a long form. Young people should be able to take part in an activity without agreeing to promotion or evaluation beyond what is needed for safe delivery.",
          "The next report should state which measures were actually used and where the evidence remains incomplete. This will allow community to see YouthScape develop over time without turning an early program direction into a claim of demonstrated impact.",
        ],
      },
    ],
  },
];

export function findCommunityReport(slug: string) {
  return communityReports.find((report) => report.slug === slug);
}
