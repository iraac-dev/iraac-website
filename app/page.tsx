import Link from "next/link";
import CommunityImage, { PaintedDivider } from "./CommunityImage";
import { programs } from "./data";
import { communityReports } from "./reports/report-data";
import SiteShell, { FrontDoor } from "./SiteShell";

export default function Home() {
  const latest = communityReports[0];
  return (
    <SiteShell>
      <main id="main-content" tabIndex={-1}>
        <FrontDoor />
        <section className="community-intro">
          <div className="container community-intro-grid">
            <div>
              <div className="eyebrow">New here?</div>
              <h2>Get to know IRAAC</h2>
              <p>
                IRAAC works with and for Aboriginal community. We bring people
                together through community programs and help make sure community
                priorities are part of the decisions that affect us.
              </p>
              <Link href="/about/" className="text-link">
                More about IRAAC <span aria-hidden="true">→</span>
              </Link>
              <aside className="welcome-note">
                <h3>You don’t need to know where to start.</h3>
                <p>
                  You don’t need to know a program name before asking a
                  question. You can learn about IRAAC first, or choose a way to
                  get in touch that works for you.
                </p>
                <Link href="/contact/" className="text-link">
                  See ways to get in touch <span aria-hidden="true">→</span>
                </Link>
              </aside>
            </div>
            <CommunityImage kind="office" />
          </div>
        </section>
        <PaintedDivider />
        <section className="home-programs" id="programs">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">What we do</div>
                <h2>Our community programs</h2>
              </div>
              <p>
                Find out what each program is about, who it supports and how it
                is developing. If something interests you, you can ask us about
                it.
              </p>
            </div>
            <div className="home-community-photo">
              <CommunityImage kind="gathering" />
            </div>
            <div className="program-grid">
              {programs.map((program) => (
                <Link
                  href={`/programs/${program.id}/`}
                  className={`program-card program-${program.id}`}
                  key={program.id}
                >
                  <div className="program-card-top">
                    <span>{program.tag}</span>
                  </div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <div className="program-card-bottom">
                    <span>Find out more</span>
                    <span className="round-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {latest && (
          <section className="home-report">
            <div className="container">
              <div className="section-heading compact">
                <div>
                  <div className="eyebrow">Community voices</div>
                  <h2>What we’re hearing from community</h2>
                </div>
                <Link href="/reports/" className="text-link">
                  All reports <span aria-hidden="true">→</span>
                </Link>
              </div>
              <Link href={`/reports/${latest.slug}/`} className="latest-report">
                <div>
                  <span className="eyebrow">
                    Latest report · {latest.month}
                  </span>
                  <span className="report-type">{latest.type}</span>
                </div>
                <div>
                  <h3>{latest.title}</h3>
                  <p>{latest.summary}</p>
                </div>
                <span className="round-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </section>
        )}
        <section className="community-accountability">
          <div className="container">
            <div>
              <h2>How IRAAC is run</h2>
              <p>
                Learn about our Board, how decisions are made and how we report
                back.
              </p>
            </div>
            <Link href="/governance/" className="text-link">
              How we work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
