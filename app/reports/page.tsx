import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../SiteShell";
import CommunityImage from "../CommunityImage";
import { communityReports } from "./report-data";

export const metadata: Metadata = {
  title: "Community Reports | IRAAC",
  description:
    "Read IRAAC’s plain-language community reports and see how community feedback is turned into action.",
};

export default function ReportsPage() {
  return (
    <SiteShell>
      <main id="main-content" tabIndex={-1}>
        <section className="reports-hero">
          <div className="container reports-hero-grid imagery-reports-grid">
            <div>
              <div className="eyebrow">Community voices, reported openly</div>
              <h1>Reports</h1>
              <p>
                IRAAC listens through community conversations, local visits,
                programs and Have Your Say. These reports bring together what we
                are hearing, why it matters and what should happen next.
              </p>
              <div className="reports-hero-actions">
                <a className="btn btn-primary" href="#all-reports">
                  Browse reports
                </a>
                <Link
                  className="btn btn-outline"
                  href="/app/survey/"
                  prefetch={false}
                >
                  Have Your Say
                </Link>
              </div>
            </div>
            <div className="reports-visual">
              <CommunityImage kind="gathering" priority />
              <aside
                className="reports-purpose"
                aria-label="How community reports work"
              >
                <span className="reports-purpose-number">Six months</span>
                <h2>Listening should lead somewhere.</h2>
                <p>
                  We group shared themes, protect personal details and report
                  back in plain language.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="reports-process"
          aria-labelledby="reports-process-title"
        >
          <div className="container">
            <div className="reports-section-heading">
              <div>
                <div className="eyebrow">Why these reports exist</div>
                <h2 id="reports-process-title">From listening to action</h2>
              </div>
              <p>
                Each report explains the evidence available at the time. Early
                signals are labelled clearly and are never presented as the view
                of the whole community.
              </p>
            </div>
            <ol className="reports-steps">
              <li>
                <span>01</span>
                <strong>Community speaks</strong>
                <p>People share priorities through trusted IRAAC pathways.</p>
              </li>
              <li>
                <span>02</span>
                <strong>IRAAC reviews</strong>
                <p>
                  Shared themes are grouped without publishing personal details.
                </p>
              </li>
              <li>
                <span>03</span>
                <strong>We report back</strong>
                <p>
                  The issue, limits and practical next steps are explained
                  openly.
                </p>
              </li>
              <li>
                <span>04</span>
                <strong>Action is tracked</strong>
                <p>
                  Later reports should show what changed and what remains
                  unresolved.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="reports-archive" id="all-reports">
          <div className="container">
            <div className="reports-section-heading">
              <div>
                <div className="eyebrow">March–August 2026</div>
                <h2>Community report archive</h2>
              </div>
              <p>
                Select any report to read the complete story, recommendations
                and next steps.
              </p>
            </div>
            <div className="report-list">
              {communityReports.map((report, index) => {
                const [month, year] = report.month.split(" ");
                return (
                  <Link
                    className={
                      index === 0
                        ? "report-card report-card-featured"
                        : "report-card"
                    }
                    href={"/reports/" + report.slug + "/"}
                    key={report.slug}
                  >
                    <div className="report-card-date">
                      <span>{month}</span>
                      {year}
                    </div>
                    <div className="report-card-copy">
                      <div className="report-type">{report.type}</div>
                      <h3>{report.title}</h3>
                      <p>{report.summary}</p>
                    </div>
                    <div className="report-card-action" aria-hidden="true">
                      Read report <span>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="reports-feedback">
          <div className="container reports-feedback-inner">
            <div>
              <div className="eyebrow">Keep the conversation open</div>
              <h2>What should IRAAC explore next?</h2>
            </div>
            <p>
              If a report misses something important, tell us. Your feedback can
              guide future listening and reporting.
            </p>
            <Link
              className="btn btn-primary"
              href="/app/survey/"
              prefetch={false}
            >
              Share your view
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
