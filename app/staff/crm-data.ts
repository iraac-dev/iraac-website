export const programs = [
  {
    id: "mcc",
    name: "MCC",
    fullName: "Mob and Country Connections",
    description:
      "Organisation relationships, peer support and community report-back.",
  },
  {
    id: "youthscape",
    name: "YouthScape",
    fullName: "YouthScape",
    description: "Young people, family connection and learning support.",
  },
  {
    id: "thecrew",
    name: "The Crew",
    fullName: "The Crew",
    description: "Employment interest, training and housing-work pathways.",
  },
  {
    id: "darc",
    name: "DARC",
    fullName: "DARC",
    description: "Community input into recovery support and future pathways.",
  },
] as const;
export type ProgramId = (typeof programs)[number]["id"];
export type Membership = {
  program: ProgramId;
  stage: "Enquiry" | "Interested" | "Participating" | "Paused" | "Completed";
  role: string;
  since: string;
};
export type Person = {
  id: string;
  name: string;
  region: string;
  owner: string;
  preference: string;
  permission: "Agreed contact" | "Check first" | "Do not contact";
  memberships: Membership[];
  strengths: string;
};
export type Activity = {
  id: string;
  personId: string;
  date: string;
  type:
    | "Conversation"
    | "Survey"
    | "Home visit"
    | "Office visit"
    | "Program update";
  program: ProgramId | "general";
  summary: string;
  theme: string;
  share: "Private to staff" | "De-identified themes only";
  author: string;
};
export type FollowUp = {
  id: string;
  personId: string;
  due: string;
  time: string;
  kind: "Phone call" | "Home visit" | "Office visit" | "Program check-in";
  reason: string;
  owner: string;
  status: "Requested" | "Scheduled" | "Completed" | "Cancelled";
  source: string;
};
export type CrmState = {
  people: Person[];
  activities: Activity[];
  followUps: FollowUp[];
};
export const demoToday = "2026-09-13";
export const initialState: CrmState = {
  people: [
    {
      id: "demo-01",
      name: "Alex · example person",
      region: "Port Kembla",
      owner: "Community team",
      preference: "Phone, afternoons",
      permission: "Agreed contact",
      strengths:
        "Wants to help shape local activities and stay involved in community decisions.",
      memberships: [
        {
          program: "youthscape",
          stage: "Interested",
          role: "Parent / carer",
          since: "2026-09-01",
        },
        {
          program: "mcc",
          stage: "Enquiry",
          role: "Community contributor",
          since: "2026-09-08",
        },
      ],
    },
    {
      id: "demo-02",
      name: "Jordan · example person",
      region: "Wollongong",
      owner: "Program team",
      preference: "Office visit",
      permission: "Agreed contact",
      strengths:
        "Interested in practical training and wants clear information about future opportunities.",
      memberships: [
        {
          program: "thecrew",
          stage: "Interested",
          role: "Prospective participant",
          since: "2026-09-02",
        },
      ],
    },
    {
      id: "demo-03",
      name: "Casey · example person",
      region: "Illawarra",
      owner: "Community team",
      preference: "Ask before arranging a visit",
      permission: "Check first",
      strengths: "Would like to contribute ideas about better local support.",
      memberships: [
        {
          program: "darc",
          stage: "Enquiry",
          role: "Community contributor",
          since: "2026-09-04",
        },
      ],
    },
    {
      id: "demo-04",
      name: "Morgan · example person",
      region: "Port Kembla",
      owner: "Program team",
      preference: "Phone, mornings",
      permission: "Agreed contact",
      strengths: "Shares practical experience of running community meetings.",
      memberships: [
        {
          program: "mcc",
          stage: "Participating",
          role: "Organisation contact",
          since: "2026-08-20",
        },
      ],
    },
    {
      id: "demo-05",
      name: "Taylor · example person",
      region: "Shellharbour",
      owner: "Unassigned",
      preference: "Not yet agreed",
      permission: "Check first",
      strengths:
        "New website enquiry; listen to what support they want before assigning a program.",
      memberships: [],
    },
    {
      id: "demo-06",
      name: "Riley · example person",
      region: "Wollongong",
      owner: "Community team",
      preference: "No further contact",
      permission: "Do not contact",
      strengths: "Previously contributed ideas; has asked for contact to stop.",
      memberships: [
        {
          program: "youthscape",
          stage: "Paused",
          role: "Community contributor",
          since: "2026-08-12",
        },
      ],
    },
  ],
  activities: [
    {
      id: "a1",
      personId: "demo-01",
      date: "2026-09-10",
      type: "Survey",
      program: "youthscape",
      summary:
        "Example feedback: families want to understand how learning activities would fit around school.",
      theme: "Learning and family",
      share: "De-identified themes only",
      author: "Community team",
    },
    {
      id: "a2",
      personId: "demo-02",
      date: "2026-09-09",
      type: "Conversation",
      program: "thecrew",
      summary:
        "Example conversation: asked about future work readiness and training. No job or place promised.",
      theme: "Work and training",
      share: "Private to staff",
      author: "Program team",
    },
    {
      id: "a3",
      personId: "demo-03",
      date: "2026-09-08",
      type: "Survey",
      program: "darc",
      summary:
        "Example feedback: clearer information about existing local support would help families.",
      theme: "Access to support",
      share: "De-identified themes only",
      author: "Community team",
    },
    {
      id: "a4",
      personId: "demo-04",
      date: "2026-09-11",
      type: "Program update",
      program: "mcc",
      summary:
        "Example update: reviewed a meeting template and agreed a follow-up conversation.",
      theme: "Community voice",
      share: "De-identified themes only",
      author: "Program team",
    },
    {
      id: "a5",
      personId: "demo-05",
      date: "2026-09-12",
      type: "Conversation",
      program: "general",
      summary:
        "Example website request for a home visit. Purpose, permission and practical arrangements still need confirmation.",
      theme: "Access to support",
      share: "Private to staff",
      author: "Website example",
    },
    {
      id: "a6",
      personId: "demo-06",
      date: "2026-09-05",
      type: "Conversation",
      program: "youthscape",
      summary:
        "Example preference update: asked to pause contact. No further follow-ups scheduled.",
      theme: "Contact preference",
      share: "Private to staff",
      author: "Community team",
    },
  ],
  followUps: [
    {
      id: "f1",
      personId: "demo-01",
      due: "2026-09-12",
      time: "14:00",
      kind: "Phone call",
      reason: "Discuss family questions about YouthScape",
      owner: "Community team",
      status: "Requested",
      source: "Phone enquiry · example",
    },
    {
      id: "f2",
      personId: "demo-02",
      due: "2026-09-14",
      time: "10:30",
      kind: "Office visit",
      reason: "Talk through future work and training interests",
      owner: "Program team",
      status: "Scheduled",
      source: "Office conversation · example",
    },
    {
      id: "f3",
      personId: "demo-05",
      due: "2026-09-15",
      time: "",
      kind: "Home visit",
      reason: "Confirm what the person wants and agree safe visit arrangements",
      owner: "Unassigned",
      status: "Requested",
      source: "Website home-visit request · example",
    },
    {
      id: "f4",
      personId: "demo-04",
      due: "2026-09-16",
      time: "11:00",
      kind: "Program check-in",
      reason: "Review meeting notes and agreed next steps",
      owner: "Program team",
      status: "Scheduled",
      source: "MCC follow-up · example",
    },
  ],
};
export function lastActivity(
  state: CrmState,
  personId: string,
  type?: Activity["type"],
) {
  return state.activities
    .filter((a) => a.personId === personId && (!type || a.type === type))
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}
export function openFollowUps(state: CrmState) {
  return state.followUps
    .filter((f) => f.status === "Requested" || f.status === "Scheduled")
    .sort((a, b) => (a.due + a.time).localeCompare(b.due + b.time));
}
export function programPeople(state: CrmState, program: string) {
  return state.people.filter((p) =>
    p.memberships.some((m) => m.program === program),
  );
}
export function metrics(state: CrmState, today: string) {
  const open = openFollowUps(state);
  return {
    people: state.people.length,
    open: open.length,
    overdue: open.filter((f) => f.due < today).length,
    surveys: state.activities.filter((a) => a.type === "Survey").length,
    unassigned: open.filter((f) => f.owner === "Unassigned").length,
  };
}
export function displayDate(date?: string) {
  return date
    ? new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Australia/Sydney",
      }).format(new Date(`${date}T12:00:00Z`))
    : "Not recorded";
}
export type CrmAction =
  | { type: "add-person"; person: Person }
  | { type: "add-activity"; activity: Activity }
  | { type: "add-follow-up"; followUp: FollowUp }
  | { type: "update-person"; person: Person }
  | {
      type: "update-follow-up";
      id: string;
      status: FollowUp["status"];
      owner: string;
    }
  | { type: "reset" };
export function crmReducer(state: CrmState, action: CrmAction): CrmState {
  if (action.type === "reset") return structuredClone(initialState);
  if (action.type === "add-person")
    return { ...state, people: [...state.people, action.person] };
  if (action.type === "update-person") {
    const blocked = action.person.permission === "Do not contact";
    return {
      ...state,
      people: state.people.map((p) =>
        p.id === action.person.id ? action.person : p,
      ),
      followUps: state.followUps.map((f) =>
        blocked &&
        f.personId === action.person.id &&
        ["Requested", "Scheduled"].includes(f.status)
          ? { ...f, status: "Cancelled" }
          : f,
      ),
    };
  }
  if (action.type === "add-activity")
    return state.people.some((p) => p.id === action.activity.personId)
      ? { ...state, activities: [...state.activities, action.activity] }
      : state;
  if (action.type === "add-follow-up") {
    const person = state.people.find((p) => p.id === action.followUp.personId);
    if (
      !person ||
      person.permission === "Do not contact" ||
      (action.followUp.status === "Scheduled" &&
        person.permission !== "Agreed contact")
    )
      return state;
    return { ...state, followUps: [...state.followUps, action.followUp] };
  }
  if (action.type === "update-follow-up")
    return {
      ...state,
      followUps: state.followUps.map((f) => {
        if (f.id !== action.id) return f;
        const person = state.people.find((p) => p.id === f.personId);
        if (
          (action.status === "Scheduled" || action.status === "Requested") &&
          (!person ||
            person.permission === "Do not contact" ||
            (action.status === "Scheduled" &&
              person.permission !== "Agreed contact"))
        )
          return f;
        return { ...f, status: action.status, owner: action.owner };
      }),
    };
  return state;
}
