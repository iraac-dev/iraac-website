import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../SiteShell";
import { communityReports, findCommunityReport } from "../report-data";

export function generateStaticParams() {
  return communityReports.map((report) => ({ report: report.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ report: string }> }): Promise<Metadata> {
  const { report: slug } = await params;
  const report = findCommunityReport(slug);
  if (!report) return {};
  return { title: report.title + " | IRAAC Reports", description: report.summary };
}

export default async function ReportDetailPage({ params }: { params: Promise<{ report: string }> }) {
  const { report: slug } = await params;
  const report = findCommunityReport(slug);
  if (!report) notFound();

  return (
    <SiteShell>
      <main className="report-detail">
        <section className="report-detail-hero">
          <div className="container report-detail-hero-inner">
            <Link className="report-back" href="/reports/">← Back to all reports</Link>
            <div className="report-detail-meta"><span>{report.type}</span><time>{report.date}</time></div>
            <h1>{report.title}</h1>
            <p className="report-detail-summary">{report.summary}</p>
          </div>
        </section>

        <section className="report-detail-body">
          <div className="container report-reading-layout">
            <article className="report-article">
              <div className="report-central-message">
                <span>Central message</span>
                <p>{report.centralMessage}</p>
              </div>
              {report.notice ? <div className="report-notice"><strong>Read this report in context</strong><p>{report.notice}</p></div> : null}
              {report.sections.map((section, index) => (
                <section className="report-section" id={`section-${index + 1}`} key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.points ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
                </section>
              ))}
              <div className="report-end">
                <div><span>End of report</span><h2>Keep the conversation going</h2><p>Tell IRAAC what this report missed or what needs closer attention.</p></div>
                <Link className="btn btn-primary" href="/app/survey/">Have Your Say</Link>
              </div>
            </article>
            <aside className="report-side">
              <div className="report-side-card"><span>Report date</span><strong>{report.date}</strong></div>
              <div className="report-side-card"><span>Report type</span><strong>{report.type}</strong></div>
              <nav className="report-contents" aria-label="Report contents">
                <span>In this report</span>
                <ol>
                  {report.sections.map((section, index) => (
                    <li key={section.title}><a href={`#section-${index + 1}`}>{section.title}</a></li>
                  ))}
                </ol>
              </nav>
              <Link className="report-side-back" href="/reports/">View all reports →</Link>
            </aside>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
