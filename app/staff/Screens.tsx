"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { StaffLink, useCrm } from "./Workspace";
import {
  programs,
  demoToday,
  displayDate,
  lastActivity,
  metrics,
  openFollowUps,
  programPeople,
  type Activity,
  type Person,
  type FollowUp,
  type ProgramId,
  type Membership,
} from "./crm-data";

const owners = ["Unassigned", "Community team", "Program team"];
const uid = () => crypto.randomUUID();
function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="staff-title">
      <div className="staff-eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="staff-badge">{children}</span>;
}
function ProgramName({ id }: { id: string }) {
  return <>{programs.find((p) => p.id === id)?.name || "Organisation-wide"}</>;
}
function PeopleTable({ people }: { people: Person[] }) {
  const { state } = useCrm();
  return people.length ? (
    <div className="staff-table-scroll">
      <table className="staff-table">
        <thead>
          <tr>
            <th>Person</th>
            <th>Programs / relationship</th>
            <th>Last contact</th>
            <th>Last survey</th>
            <th>Responsible team</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id}>
              <td data-label="Person">
                <StaffLink href={`/admin/crm/person/${p.id}/`}>
                  <strong>{p.name}</strong>
                </StaffLink>
                <small>
                  {p.region} · {p.permission}
                </small>
              </td>
              <td data-label="Programs">
                {p.memberships.length
                  ? p.memberships.map((m) => (
                      <div key={m.program}>
                        <ProgramName id={m.program} />{" "}
                        <span className="staff-muted">· {m.stage}</span>
                      </div>
                    ))
                  : "No program yet"}
              </td>
              <td data-label="Last contact">
                {displayDate(lastActivity(state, p.id)?.date)}
              </td>
              <td data-label="Last survey">
                {displayDate(lastActivity(state, p.id, "Survey")?.date)}
              </td>
              <td data-label="Owner">{p.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="staff-empty">
      <h3>No people match these filters</h3>
      <p>Try another name, program or relationship stage.</p>
    </div>
  );
}
function FollowUps({
  personId,
  onlyOpen = false,
}: {
  personId?: string;
  onlyOpen?: boolean;
}) {
  const { state, dispatch } = useCrm();
  const [statusFilter, setStatusFilter] = useState("all");
  const [kindFilter, setKindFilter] = useState("all");
  const rows = (
    onlyOpen
      ? openFollowUps(state)
      : [...state.followUps].sort((a, b) => a.due.localeCompare(b.due))
  ).filter(
    (f) =>
      (!personId || f.personId === personId) &&
      (statusFilter === "all" || f.status === statusFilter) &&
      (kindFilter === "all" || f.kind === kindFilter),
  );
  return (
    <div className="staff-task-list">
      {!personId && !onlyOpen && (
        <div className="staff-toolbar">
          <label>
            Request status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              {["Requested", "Scheduled", "Completed", "Cancelled"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Visit or contact type
            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value)}
            >
              <option value="all">All types</option>
              {[
                "Phone call",
                "Home visit",
                "Office visit",
                "Program check-in",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {!rows.length && <p className="staff-empty">No follow-ups here.</p>}
      {rows.map((f) => {
        const person = state.people.find((p) => p.id === f.personId);
        const blocked = person?.permission !== "Agreed contact";
        return (
          <article className="staff-task" key={f.id}>
            <div className="staff-task-date">
              <strong>{displayDate(f.due)}</strong>
              <span>{f.time || "Time to agree"}</span>
              {f.due < demoToday &&
                ["Requested", "Scheduled"].includes(f.status) && (
                  <span className="staff-overdue">Overdue in example</span>
                )}
            </div>
            <div>
              <div className="staff-task-type">
                {f.kind} · {f.status}
              </div>
              <StaffLink href={`/admin/crm/person/${f.personId}/`}>
                <h3>{person?.name}</h3>
              </StaffLink>
              <p>{f.reason}</p>
              <small>{f.source}</small>
              {blocked && (
                <p className="staff-permission">
                  {person?.permission === "Do not contact"
                    ? "Contact stopped at the person’s request."
                    : "Contact permission needs checking before scheduling."}
                </p>
              )}
            </div>
            <div className="staff-task-controls">
              <label>
                Owner
                <select
                  aria-label={`Owner for ${f.reason}`}
                  value={f.owner}
                  onChange={(e) =>
                    dispatch({
                      type: "update-follow-up",
                      id: f.id,
                      status: f.status,
                      owner: e.target.value,
                    })
                  }
                >
                  {owners.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label>
                Status
                <select
                  aria-label={`Status for ${f.reason}`}
                  value={f.status}
                  onChange={(e) =>
                    dispatch({
                      type: "update-follow-up",
                      id: f.id,
                      status: e.target.value as FollowUp["status"],
                      owner: f.owner,
                    })
                  }
                >
                  {["Requested", "Scheduled", "Completed", "Cancelled"].map(
                    (s) => (
                      <option
                        key={s}
                        disabled={
                          (s === "Scheduled" && blocked) ||
                          (s === "Requested" &&
                            person?.permission === "Do not contact")
                        }
                      >
                        {s}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>
          </article>
        );
      })}
    </div>
  );
}
function ActivityList({
  personId,
  surveyOnly = false,
}: {
  personId?: string;
  surveyOnly?: boolean;
}) {
  const { state } = useCrm();
  const entries = state.activities
    .filter(
      (a) =>
        (!personId || a.personId === personId) &&
        (!surveyOnly || a.type === "Survey"),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="staff-timeline">
      {entries.length === 0 && (
        <p className="staff-empty">Nothing recorded yet.</p>
      )}
      {entries.map((a) => (
        <article key={a.id}>
          <div className="staff-timeline-meta">
            {displayDate(a.date)} · {a.type} · <ProgramName id={a.program} />
          </div>
          {!personId && (
            <StaffLink href={`/admin/crm/person/${a.personId}/`}>
              <h3>{state.people.find((p) => p.id === a.personId)?.name}</h3>
            </StaffLink>
          )}
          <p>{a.summary}</p>
          <div className="staff-inline">
            <Badge>{a.theme}</Badge>
            <small>
              {a.share} · {a.author}
            </small>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Overview() {
  const { state } = useCrm();
  const m = metrics(state, demoToday);
  return (
    <>
      <PageTitle
        eyebrow="Organisation at a glance"
        title="People first. A clear next step."
        description="See who needs a response, what community is saying and where each program stands."
      />
      <div className="staff-day">
        <span>Example working day · {displayDate(demoToday)}</span>
        <StaffLink href="/admin/crm/requests/">View all follow-ups →</StaffLink>
      </div>
      <div className="staff-metrics">
        {[
          [m.people, "People across IRAAC", "/admin/crm/"],
          [m.open, "Open follow-ups", "/admin/crm/requests/"],
          [m.overdue, "Overdue follow-ups", "/admin/crm/requests/"],
          [m.surveys, "Survey conversations", "/admin/crm/surveys/"],
        ].map(([value, label, href]) => (
          <StaffLink key={label} href={String(href)}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>Example records ↗</small>
          </StaffLink>
        ))}
      </div>
      <section className="staff-panel">
        <div className="staff-section-title">
          <div>
            <span className="staff-eyebrow">Keep the promise</span>
            <h2>People waiting for a next step</h2>
          </div>
          <Badge>{m.unassigned} unassigned</Badge>
        </div>
        <FollowUps onlyOpen />
      </section>
      <section className="staff-panel">
        <div className="staff-section-title">
          <div>
            <span className="staff-eyebrow">
              Four programs. One organisation.
            </span>
            <h2>Across our programs</h2>
          </div>
          <StaffLink href="/admin/crm/programs/">
            View program records →
          </StaffLink>
        </div>
        <div className="staff-program-grid">
          {programs.map((p) => {
            const members = programPeople(state, p.id);
            const active = members.filter((person) =>
              person.memberships.some(
                (m) => m.program === p.id && m.stage === "Participating",
              ),
            ).length;
            return (
              <StaffLink
                className={`staff-program staff-program-${p.id}`}
                key={p.id}
                href={`/admin/crm/program/${p.id}/`}
              >
                <span>Program in development</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <strong>{members.length} linked people</strong>
                <small>
                  {active} example active relationships · Open program →
                </small>
              </StaffLink>
            );
          })}
        </div>
        <p className="staff-footnote">
          People can be linked to more than one program. Program totals overlap;
          the organisation count includes each person once. Participation shown
          here is fictional.
        </p>
      </section>
      <section className="staff-panel">
        <div className="staff-section-title">
          <h2>What community is telling us</h2>
          <StaffLink href="/admin/crm/surveys/">
            Survey conversations →
          </StaffLink>
        </div>
        <ActivityList surveyOnly />
        <p className="staff-footnote">
          Individual records stay in the CRM. Community and government reports
          use separately reviewed, de-identified information.
        </p>
      </section>
    </>
  );
}

function CrmNav({ active }: { active: string }) {
  return (
    <nav className="staff-tabs" aria-label="CRM sections">
      {[
        ["people", "", "People"],
        ["requests", "/requests", "Requests & visits"],
        ["surveys", "/surveys", "Surveys & listening"],
        ["programs", "/programs", "Programs"],
      ].map(([id, path, label]) => (
        <StaffLink
          key={id}
          href={`/admin/crm${path}/`}
          aria-current={active === id ? "page" : undefined}
        >
          {label}
        </StaffLink>
      ))}
    </nav>
  );
}

function AddPerson() {
  const { dispatch, base } = useCrm();
  const router = useRouter();
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name) {
      setError("Enter a fictional name to continue.");
      return;
    }
    const id = uid();
    dispatch({
      type: "add-person",
      person: {
        id,
        name: `${name} · example person`,
        region: String(data.get("region") || "Not recorded"),
        owner: "Unassigned",
        preference: "Not yet agreed",
        permission: "Check first",
        memberships: [],
        strengths:
          "New example record. Start by listening to the person’s priorities.",
      },
    });
    router.push(`${base}/crm/person/${id}/`);
  }
  return (
    <details className="staff-add-person">
      <summary>Add an example person</summary>
      <form className="staff-form" onSubmit={submit}>
        <p>
          Use fictional details only. This preview does not store real contact
          information.
        </p>
        <label>
          Fictional name
          <input required maxLength={60} name="name" placeholder="e.g. Sam" />
        </label>
        <label>
          Community / region
          <input maxLength={80} name="region" placeholder="e.g. Illawarra" />
        </label>
        {error && <p role="alert">{error}</p>}
        <button className="staff-primary">Create example record</button>
      </form>
    </details>
  );
}

export function CrmScreen({ path = [] }: { path?: string[] }) {
  const { state } = useCrm();
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("all");
  const [stage, setStage] = useState("all");
  const [owner, setOwner] = useState("all");
  const section = path[0] || "people";
  if (section === "person") return <PersonScreen key={path[1]} id={path[1]} />;
  if (section === "program")
    return <ProgramScreen key={path[1]} id={path[1]} />;
  const people = state.people.filter(
    (p) =>
      (p.name + " " + p.region).toLowerCase().includes(query.toLowerCase()) &&
      (program === "all" ||
        (program === "none"
          ? p.memberships.length === 0
          : p.memberships.some((m) => m.program === program))) &&
      (owner === "all" || p.owner === owner) &&
      (stage === "all" ||
        p.memberships.some(
          (m) =>
            m.stage === stage && (program === "all" || m.program === program),
        )),
  );
  return (
    <>
      <PageTitle
        eyebrow="IRAAC CRM"
        title="One person. Their whole story."
        description="People, program relationships, requests and conversations in one place. Start with the person, even when no program has been chosen."
      />
      <CrmNav active={section} />
      {section === "people" && (
        <>
          <div className="staff-toolbar">
            <label>
              Find a person
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or community"
              />
            </label>
            <label>
              Program
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option value="all">All programs</option>
                <option value="none">No program yet</option>
                {programs.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Relationship
              <select value={stage} onChange={(e) => setStage(e.target.value)}>
                {[
                  "all",
                  "Enquiry",
                  "Interested",
                  "Participating",
                  "Paused",
                  "Completed",
                ].map((s) => (
                  <option value={s} key={s}>
                    {s === "all" ? "All stages" : s}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Owner
              <select value={owner} onChange={(e) => setOwner(e.target.value)}>
                <option value="all">All teams</option>
                {owners.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="staff-section-title">
            <p aria-live="polite">
              {people.length} of {state.people.length} people
            </p>
            <button
              className="staff-secondary"
              onClick={() => {
                setQuery("");
                setProgram("all");
                setStage("all");
                setOwner("all");
              }}
            >
              Clear filters
            </button>
          </div>
          <section className="staff-panel">
            <PeopleTable people={people} />
          </section>
          <AddPerson />
        </>
      )}
      {section === "requests" && (
        <section className="staff-panel">
          <h2>Requests, visits and follow-ups</h2>
          <p>
            Website requests belong to a person’s record. Agree the purpose,
            owner and contact permission before scheduling. These examples are
            not connected to the public website.
          </p>
          <FollowUps />
        </section>
      )}
      {section === "surveys" && (
        <section className="staff-panel">
          <h2>Surveys & community listening</h2>
          <p>
            Record when a conversation happened, what was heard and what may be
            shared. Full survey responses and release history stay in the
            governed survey platform; this preview shows a summary linked to
            each person.
          </p>
          <ActivityList surveyOnly />
        </section>
      )}
      {section === "programs" && (
        <div className="staff-program-grid">
          {programs.map((p) => (
            <StaffLink
              className={`staff-program staff-program-${p.id}`}
              key={p.id}
              href={`/admin/crm/program/${p.id}/`}
            >
              <span>In development</span>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <strong>
                {programPeople(state, p.id).length} linked example people
              </strong>
              <small>Open program →</small>
            </StaffLink>
          ))}
        </div>
      )}
      {!["people", "requests", "surveys", "programs"].includes(section) && (
        <p>
          Page not found.{" "}
          <StaffLink href="/admin/crm/">Return to CRM</StaffLink>
        </p>
      )}
    </>
  );
}

function ProgramScreen({ id }: { id: string }) {
  const { state } = useCrm();
  const p = programs.find((p) => p.id === id);
  if (!p)
    return (
      <p>
        Program not found.{" "}
        <StaffLink href="/admin/crm/programs/">All programs</StaffLink>
      </p>
    );
  const people = programPeople(state, id);
  const activities = state.activities
    .filter((a) => a.program === id)
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <StaffLink className="staff-back" href="/admin/crm/programs/">
        ← All programs
      </StaffLink>
      <PageTitle
        eyebrow="Program workspace · in development"
        title={p.fullName}
        description={p.description}
      />
      <div className="staff-metrics">
        <div>
          <span>Linked people</span>
          <strong>{people.length}</strong>
          <small>Example records</small>
        </div>
        <div>
          <span>Latest program update</span>
          <strong className="staff-date-stat">
            {displayDate(activities[0]?.date)}
          </strong>
        </div>
        <div>
          <span>Survey conversations</span>
          <strong>
            {activities.filter((a) => a.type === "Survey").length}
          </strong>
        </div>
      </div>
      <section className="staff-panel">
        <h2>People & relationships</h2>
        <p>
          Open a person to review their participation stage, contact
          preferences, last survey and next step.
        </p>
        <PeopleTable people={people} />
      </section>
      <section className="staff-panel">
        <h2>Program activity</h2>
        {activities.length ? (
          activities.map((a) => (
            <article className="staff-program-activity" key={a.id}>
              <small>
                {displayDate(a.date)} · {a.type}
              </small>
              <StaffLink href={`/admin/crm/person/${a.personId}/`}>
                <h3>{state.people.find((p) => p.id === a.personId)?.name}</h3>
              </StaffLink>
              <p>{a.summary}</p>
            </article>
          ))
        ) : (
          <p>No activity recorded for this program.</p>
        )}
      </section>
    </>
  );
}

function PersonScreen({ id }: { id: string }) {
  const { state, dispatch } = useCrm();
  const person = state.people.find((p) => p.id === id);
  const [tab, setTab] = useState("timeline");
  const [message, setMessage] = useState("");
  if (!person)
    return (
      <section className="staff-panel">
        <h1>Record not available</h1>
        <p>New example records are cleared when the preview reloads.</p>
        <StaffLink href="/admin/crm/">Return to people →</StaffLink>
      </section>
    );
  function saveContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    dispatch({
      type: "update-person",
      person: {
        ...person!,
        owner: String(d.get("owner")),
        preference: String(d.get("preference")).trim(),
        permission: d.get("permission") as Person["permission"],
      },
    });
    setMessage(
      "Contact preferences updated in this preview. Stopping contact cancels open follow-ups.",
    );
  }
  return (
    <>
      <StaffLink className="staff-back" href="/admin/crm/">
        ← All people
      </StaffLink>
      <PageTitle
        eyebrow={`${person.region} · Fictional record`}
        title={person.name}
        description={person.strengths}
      />
      <div className="staff-person-summary">
        <div>
          <span>Responsible team</span>
          <strong>{person.owner}</strong>
        </div>
        <div>
          <span>Contact preference</span>
          <strong>{person.preference}</strong>
        </div>
        <div>
          <span>Permission</span>
          <strong>{person.permission}</strong>
        </div>
        <div>
          <span>Last survey</span>
          <strong>
            {displayDate(lastActivity(state, id, "Survey")?.date)}
          </strong>
        </div>
      </div>
      <div
        className="staff-tabs"
        role="group"
        aria-label="Person record sections"
      >
        {[
          ["timeline", "Conversations & surveys"],
          ["programs", "Program relationships"],
          ["followups", "Requests & next steps"],
          ["preferences", "Contact & preferences"],
        ].map(([value, label]) => (
          <button
            key={value}
            aria-pressed={tab === value}
            onClick={() => {
              setTab(value);
              setMessage("");
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="status" className="staff-save-message">
        {message}
      </div>
      {tab === "timeline" && (
        <>
          <section className="staff-panel">
            <h2>What we’ve heard and done</h2>
            <ActivityList personId={id} />
          </section>
          <RecordActivity person={person} onSave={setMessage} />
        </>
      )}
      {tab === "programs" && (
        <section className="staff-panel">
          <h2>Across programs</h2>
          <p>
            An interest, an enquiry and participation are different stages. A
            program link is not consent to contact or share someone’s story.
          </p>
          {programs.map((program) => {
            const membership = person.memberships.find(
              (m) => m.program === program.id,
            );
            return (
              <div className="staff-membership" key={program.id}>
                <div>
                  <StaffLink href={`/admin/crm/program/${program.id}/`}>
                    <h3>{program.name}</h3>
                  </StaffLink>
                  <p>
                    {membership
                      ? `${membership.role} · linked ${displayDate(membership.since)}`
                      : "Not linked"}
                  </p>
                </div>
                <label>
                  Relationship stage
                  <select
                    aria-label={`${program.name} relationship stage`}
                    value={membership?.stage || "none"}
                    onChange={(e) => {
                      const value = e.target.value;
                      const memberships = person.memberships.filter(
                        (m) => m.program !== program.id,
                      );
                      if (value !== "none")
                        memberships.push({
                          program: program.id,
                          stage: value as Membership["stage"],
                          role: membership?.role || "Community contact",
                          since: membership?.since || demoToday,
                        });
                      dispatch({
                        type: "update-person",
                        person: { ...person, memberships },
                      });
                      setMessage(
                        "Program relationship updated in this preview.",
                      );
                    }}
                  >
                    <option value="none">Not linked</option>
                    {[
                      "Enquiry",
                      "Interested",
                      "Participating",
                      "Paused",
                      "Completed",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
            );
          })}
        </section>
      )}
      {tab === "followups" && (
        <>
          <section className="staff-panel">
            <h2>Requests & next steps</h2>
            <FollowUps personId={id} />
          </section>
          <AddFollowUp person={person} onSave={setMessage} />
        </>
      )}
      {tab === "preferences" && (
        <section className="staff-panel">
          <h2>Contact & preferences</h2>
          <p>
            No phone numbers, addresses or sensitive personal details are
            collected in this preview. Record and respect each person’s
            preferred way of staying in touch.
          </p>
          <form className="staff-form" onSubmit={saveContact}>
            <label>
              Responsible team
              <select name="owner" defaultValue={person.owner}>
                {owners.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label>
              Preferred contact / time
              <input
                name="preference"
                maxLength={160}
                defaultValue={person.preference}
              />
            </label>
            <label>
              Contact permission
              <select name="permission" defaultValue={person.permission}>
                {["Agreed contact", "Check first", "Do not contact"].map(
                  (p) => (
                    <option key={p}>{p}</option>
                  ),
                )}
              </select>
            </label>
            <p>
              “Do not contact” cancels all open follow-ups. A later change of
              preference does not automatically reopen them.
            </p>
            <button className="staff-primary">Save example preferences</button>
          </form>
        </section>
      )}
    </>
  );
}

function RecordActivity({
  person,
  onSave,
}: {
  person: Person;
  onSave: (message: string) => void;
}) {
  const { dispatch } = useCrm();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const summary = String(d.get("summary")).trim();
    if (!summary) return;
    dispatch({
      type: "add-activity",
      activity: {
        id: uid(),
        personId: person.id,
        date: String(d.get("date")),
        type: d.get("type") as Activity["type"],
        program: d.get("program") as Activity["program"],
        summary,
        theme: String(d.get("theme")),
        share: d.get("share") as Activity["share"],
        author: "Preview user",
      },
    });
    e.currentTarget.reset();
    onSave(
      "Conversation added to this example record. No report was published or sent.",
    );
  }
  return (
    <section className="staff-panel">
      <h2>Record a conversation or update</h2>
      <form className="staff-form" onSubmit={submit}>
        <div className="staff-form-grid">
          <label>
            Type
            <select name="type">
              {[
                "Conversation",
                "Survey",
                "Home visit",
                "Office visit",
                "Program update",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input
              required
              type="date"
              name="date"
              defaultValue={demoToday}
              max={demoToday}
            />
          </label>
          <label>
            Program
            <select name="program">
              <option value="general">Organisation-wide</option>
              {programs.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Theme
            <select name="theme">
              {[
                "Community voice",
                "Access to support",
                "Learning and family",
                "Work and training",
                "Housing",
                "Other",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          What was said, what happened and what comes next?
          <textarea
            name="summary"
            required
            maxLength={2000}
            rows={4}
            placeholder="Fictional example notes only. Keep the person’s own priorities clear."
          />
        </label>
        <label>
          Use of this summary
          <select name="share">
            <option>Private to staff</option>
            <option>De-identified themes only</option>
          </select>
        </label>
        <p>
          Choosing a theme does not authorise publication. Reports need a
          separate review; original survey answers are not edited here.
        </p>
        <button className="staff-primary">Save example update</button>
      </form>
    </section>
  );
}
function AddFollowUp({
  person,
  onSave,
}: {
  person: Person;
  onSave: (message: string) => void;
}) {
  const { dispatch } = useCrm();
  const blocked = person.permission === "Do not contact";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (blocked) return;
    const d = new FormData(e.currentTarget);
    const reason = String(d.get("reason")).trim();
    if (!reason) return;
    dispatch({
      type: "add-follow-up",
      followUp: {
        id: uid(),
        personId: person.id,
        due: String(d.get("due")),
        time: String(d.get("time")),
        kind: d.get("kind") as FollowUp["kind"],
        reason,
        owner: String(d.get("owner")),
        status: "Requested",
        source: "Staff-created example",
      },
    });
    e.currentTarget.reset();
    onSave(
      "Follow-up added as Requested. No invitation or message has been sent.",
    );
  }
  return (
    <section className="staff-panel">
      <h2>Agree a next step</h2>
      {blocked ? (
        <p className="staff-permission">
          This person has asked for no further contact. A new follow-up cannot
          be created.
        </p>
      ) : (
        <form className="staff-form" onSubmit={submit}>
          <div className="staff-form-grid">
            <label>
              Contact type
              <select name="kind">
                {[
                  "Phone call",
                  "Home visit",
                  "Office visit",
                  "Program check-in",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Responsible team
              <select name="owner">
                {owners.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label>
              Proposed date
              <input
                required
                type="date"
                name="due"
                min={demoToday}
                defaultValue={demoToday}
              />
            </label>
            <label>
              Proposed time
              <input type="time" name="time" />
            </label>
          </div>
          <label>
            Purpose and next step
            <textarea required name="reason" maxLength={600} rows={3} />
          </label>
          <p>
            Requests are not confirmed appointments. Agree permission, location,
            accessibility and visit arrangements before marking Scheduled.
          </p>
          <button className="staff-primary">Add example follow-up</button>
        </form>
      )}
    </section>
  );
}

export function OrganisationProfile() {
  return (
    <>
      <PageTitle
        eyebrow="Organisation profile"
        title="The people behind IRAAC."
        description="Organisation details, key responsibilities and the contacts staff need to keep work moving."
      />
      <section className="staff-profile-banner">
        <div className="staff-profile-mark">IRAAC.</div>
        <div>
          <h2>Illawarra Regional Alliance Aboriginal Corporation</h2>
          <p>Aboriginal community organisation · Illawarra, NSW</p>
          <Badge>Four community-identified programs</Badge>
        </div>
      </section>
      <div className="staff-profile-grid">
        <section className="staff-panel">
          <h2>Organisation details</h2>
          <dl className="staff-definition">
            <dt>ABN</dt>
            <dd>93 362 145 286</dd>
            <dt>Corporation number</dt>
            <dd>ICN 8326</dd>
            <dt>Region</dt>
            <dd>Illawarra · NSW 2505</dd>
            <dt>Working framework</dt>
            <dd>Local Decision Making</dd>
            <dt>Website</dt>
            <dd>
              <a href="https://www.iraac-aco.com/">iraac-aco.com</a>
            </dd>
            <dt>Public contact phone / email</dt>
            <dd>Not verified for this profile</dd>
          </dl>
          <p className="staff-footnote">
            Entity name, ABN and postcode checked against{" "}
            <a
              href="https://abr.business.gov.au/ABN/View?abn=93362145286"
              target="_blank"
              rel="noreferrer"
            >
              ABN Lookup
            </a>
            . ICN appears in IRAAC’s program documents.
          </p>
        </section>
        <section className="staff-panel">
          <h2>Key contacts</h2>
          <article className="staff-contact">
            <span>Chairperson</span>
            <h3>Geoffrey Maher</h3>
            <p>Board leadership and organisational decisions.</p>
            <small>
              Named as Chairperson in the 25 August 2026 Board minutes.
            </small>
          </article>
          <article className="staff-contact">
            <span>Secretary</span>
            <h3>Maria Maher</h3>
            <p>
              Organisation coordination, Board records and program
              correspondence.
            </p>
            <small>
              Role named in IRAAC project correspondence; prepared the August
              Board minutes.
            </small>
          </article>
          <p className="staff-footnote">
            Names are source-backed working entries, not a live staff directory.
            Current responsibilities and preferred work contact details should
            be confirmed. Private phone numbers and email addresses are not
            included.
          </p>
        </section>
      </div>
      <section className="staff-panel">
        <h2>Program responsibilities</h2>
        <div className="staff-program-grid">
          {programs.map((p) => (
            <article className="staff-contact" key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <Badge>Named program lead to confirm</Badge>
            </article>
          ))}
        </div>
      </section>
      <section className="staff-panel">
        <h2>Working with community information</h2>
        <p>
          Keep a person’s preferences and permissions visible. Separate program
          relationships from permission to contact, and separate private
          conversations from information approved for reports.
        </p>
        <p>
          The production workspace needs named staff accounts, role-based
          access, change history and the existing governed survey records. This
          preview does not provide staff authentication or access to those
          records.
        </p>
      </section>
    </>
  );
}
