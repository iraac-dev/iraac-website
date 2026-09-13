import { StaffLink as Link } from "../../../staff/Workspace";
import { notFound } from "next/navigation";
import { findLibraryReport, reportLibrary } from "../report-library";
import PrintReport from "../PrintReport";
import styles from "../reports.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return reportLibrary.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const report = findLibraryReport((await params).slug);
  return {
    title: report ? `${report.title} | IRAAC reports` : "Report not found",
    robots: { index: false, follow: false },
  };
}
export default async function ReportPage({ params }: Props) {
  const report = findLibraryReport((await params).slug);
  if (!report) notFound();
  const siblings = reportLibrary.filter(
    (item) => item.sourceSlug === report.sourceSlug,
  );
  return (
    <div className={styles.reader}>
      <nav className={styles.readerToolbar} aria-label="Report navigation">
        <Link href="/admin/reports">← All reports</Link>
        <PrintReport />
      </nav>
      <div className={styles.readerLayout}>
        <article className={styles.paper}>
          <header className={styles.cover}>
            <div className={styles.coverTop}>
              <strong>IRAAC.</strong>
              <span>
                {report.month} / {report.audience} edition
              </span>
            </div>
            <p className={styles.eyebrow}>{report.topic}</p>
            <h1>{report.title}</h1>
            <p className={styles.standfirst}>{report.summary}</p>
            <div className={styles.coverBottom}>
              <span>
                {report.id} · Version {report.version}
              </span>
              <span>Draft · Not sent</span>
            </div>
          </header>
          <div className={styles.paperBody}>
            <p className={styles.reportNotice}>
              <strong>Draft demonstration edition.</strong> Prepared{" "}
              {report.preparedDate} for the {report.month} reporting period.
              This is a newly written discussion report, not evidence of a
              historical submission, approved decision or verified program
              outcome.
            </p>
            {report.sections.map((section, index) => (
              <section
                className={styles.writtenSection}
                id={`section-${index + 1}`}
                key={section.title}
              >
                <span className={styles.sectionNumber}>0{index + 1}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
            <section className={styles.sources} id="sources">
              <h2>Sources & preparation notes</h2>
              <p>
                The reporting month describes the archive theme. Research was
                checked when this edition was prepared; it does not establish
                what was known or sent during that month.
              </p>
              <ol>
                {report.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href}>{source.title}</a>
                    <p>{source.note}</p>
                  </li>
                ))}
              </ol>
              <p>
                No private participant records, personal recipient addresses or
                invented delivery receipts are included.
              </p>
            </section>
            <footer className={styles.paperFooter}>
              IRAAC · {report.month} · {report.audience} · Draft v
              {report.version}
            </footer>
          </div>
        </article>
        <aside className={styles.reportAside}>
          <section>
            <p className={styles.eyebrow}>Report details</p>
            <h2>Purpose & destination</h2>
            <dl>
              <dt>Prepared for</dt>
              <dd>{report.recipients}</dd>
              <dt>Why this audience</dt>
              <dd>{report.purpose}</dd>
              <dt>Intended channel</dt>
              <dd>{report.channel}</dd>
              <dt>Prepared</dt>
              <dd>{report.preparedDate}</dd>
              <dt>Reporting period</dt>
              <dd>{report.month}</dd>
            </dl>
          </section>
          <section>
            <p className={styles.eyebrow}>Delivery record</p>
            <h2>Not sent</h2>
            <p>
              No confirmed recipients or delivery evidence are recorded.
              Intended audiences above are proposals, not a mailing list.
            </p>
            <ol className={styles.timeline}>
              <li>
                <strong>Draft prepared</strong>
                <span>
                  {report.preparedDate} · Version {report.version}
                </span>
              </li>
              <li>
                <strong>Review pending</strong>
                <span>Evidence and wording need authorised review.</span>
              </li>
              <li>
                <strong>Delivery not recorded</strong>
                <span>A verified receipt is required to show a send.</span>
              </li>
            </ol>
          </section>
          <section className={styles.contents}>
            <p className={styles.eyebrow}>In this report</p>
            {report.sections.map((section, index) => (
              <a key={section.title} href={`#section-${index + 1}`}>
                {String(index + 1).padStart(2, "0")} {section.title}
              </a>
            ))}
            <a href="#sources">Sources & preparation notes</a>
          </section>
          <section className={styles.siblings}>
            <p className={styles.eyebrow}>The same issue, three perspectives</p>
            {siblings.map((item) => (
              <Link
                href={`/admin/reports/${item.slug}`}
                key={item.slug}
                aria-current={item.slug === report.slug ? "page" : undefined}
              >
                {item.audience}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
}
