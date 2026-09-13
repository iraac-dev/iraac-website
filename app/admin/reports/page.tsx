"use client";

import { StaffLink as Link } from "../../staff/Workspace";
import { useState } from "react";
import { archivePeriod, audiences, reportLibrary } from "./report-library";
import styles from "./reports.module.css";

export default function AdminReportsPage() {
  const [audience, setAudience] = useState("All audiences");
  const [month, setMonth] = useState("All months");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All reports");
  const months = [...new Set(reportLibrary.map((report) => report.month))];
  const visible = reportLibrary.filter(
    (report) =>
      (audience === "All audiences" || report.audience === audience) &&
      (month === "All months" || report.month === month) &&
      status !== "Sent" &&
      `${report.title} ${report.topic} ${report.id} ${report.recipients}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  function reset() {
    setAudience("All audiences");
    setMonth("All months");
    setQuery("");
    setStatus("All reports");
  }

  return (
    <div className={styles.workspace}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>IRAAC / Reporting workspace</p>
          <h1>
            Reports & insights<span>.</span>
          </h1>
          <p>Community voice. Clear decisions. A record of what comes next.</p>
        </div>
        <span className={styles.period}>{archivePeriod}</span>
      </header>
      <section className={styles.overview} aria-label="Report library overview">
        <div>
          <strong>{reportLibrary.length}</strong>
          <span>Written reports</span>
        </div>
        <div>
          <strong>6</strong>
          <span>Reporting months</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Audience editions</span>
        </div>
        <div>
          <strong>0</strong>
          <span>Verified sends</span>
        </div>
      </section>
      <aside className={styles.notice}>
        <strong>A new archive, with an honest starting point.</strong> These 18
        draft editions were prepared on 13 September 2026 for the six months
        shown. They are demonstration reports based on existing project themes,
        not historical submissions. Recipients are proposed; no reports have
        been sent from this library.
      </aside>
      <section className={styles.feature}>
        <div>
          <p className={styles.eyebrow}>In focus / August 2026</p>
          <h2>
            Bail, support and
            <br />a clear next step.
          </h2>
          <p>
            Explore the issue through community, operational and government
            perspectives.
          </p>
          <Link
            className={styles.lightButton}
            href="/admin/reports/bail-conditions-community-issue-community"
          >
            Read the community edition <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.featureEditions}>
          {audiences.map((item, index) => (
            <Link
              key={item}
              href={`/admin/reports/bail-conditions-community-issue-${item.toLowerCase()}`}
            >
              <span>0{index + 1}</span>
              <div>
                <strong>{item}</strong>
                <small>
                  {item === "Community"
                    ? "Understanding the issue"
                    : item === "IRAAC"
                      ? "Planning the response"
                      : "Informing the discussion"}
                </small>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section aria-labelledby="library-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>The report register</p>
            <h2 id="library-title">Six months. Three perspectives.</h2>
          </div>
          <p aria-live="polite">
            {visible.length} of {reportLibrary.length} reports
          </p>
        </div>
        <div className={styles.tabs} aria-label="Filter by audience">
          {["All audiences", ...audiences].map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={audience === item}
              onClick={() => setAudience(item)}
            >
              {item}
              <span>{item === "All audiences" ? 18 : 6}</span>
            </button>
          ))}
        </div>
        <div className={styles.filters}>
          <label className={styles.search}>
            Search reports
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topic, title or recipient…"
              type="search"
            />
          </label>
          <label>
            Reporting month
            <select
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            >
              <option>All months</option>
              {months.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Report status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>All reports</option>
              <option>Draft</option>
              <option>Sent</option>
            </select>
          </label>
        </div>
        {visible.length === 0 ? (
          <div className={styles.empty}>
            <h3>
              {status === "Sent"
                ? "No verified sends yet"
                : "No reports match these filters"}
            </h3>
            <p>
              {status === "Sent"
                ? "This archive contains prepared drafts. A sent record requires confirmed recipients and delivery evidence."
                : "Try a different topic, month or audience."}
            </p>
            <button className={styles.darkButton} onClick={reset}>
              Reset filters
            </button>
          </div>
        ) : (
          months
            .filter((item) => visible.some((report) => report.month === item))
            .map((item) => (
              <div className={styles.monthGroup} key={item}>
                <h3>
                  {item}
                  <span>
                    {visible.filter((report) => report.month === item).length}{" "}
                    editions
                  </span>
                </h3>
                <div className={styles.reportGrid}>
                  {visible
                    .filter((report) => report.month === item)
                    .map((report) => (
                      <Link
                        className={styles.reportCard}
                        href={`/admin/reports/${report.slug}`}
                        key={report.slug}
                      >
                        <div className={styles.cardMeta}>
                          <span
                            className={styles.audience}
                            data-audience={report.audience}
                          >
                            {report.audience}
                          </span>
                          <span className={styles.draft}>Draft</span>
                        </div>
                        <p className={styles.topic}>{report.topic}</p>
                        <h4>{report.title}</h4>
                        <p className={styles.summary}>{report.summary}</p>
                        <div className={styles.recipient}>
                          <span>Prepared for</span>
                          <strong>{report.recipients}</strong>
                        </div>
                        <div className={styles.cardFooter}>
                          <small>{report.id}</small>
                          <span>
                            Read report <span aria-hidden="true">↗</span>
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))
        )}
      </section>

      <footer className={styles.footer}>
        IRAAC reporting archive · Draft editions · March–August 2026
      </footer>
    </div>
  );
}
