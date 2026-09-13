import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../SiteShell";
import CommunityImage from "../../CommunityImage";
import { programDetails } from "../../program-details";

export function generateStaticParams() {
  return programDetails.map(({ id }) => ({ program: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ program: string }>;
}) {
  const { program } = await params;
  const detail = programDetails.find(({ id }) => id === program);
  return detail
    ? { title: `${detail.title} | IRAAC`, description: detail.introduction }
    : {};
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ program: string }>;
}) {
  const { program } = await params;
  const detail = programDetails.find(({ id }) => id === program);
  if (!detail) notFound();
  return (
    <SiteShell>
      <main id="main-content" tabIndex={-1}>
        <section className={`page-hero program-hero program-${detail.id}`}>
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/programs/">Our programs</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">
                {detail.id === "mcc" ? "MCC" : detail.title}
              </span>
            </nav>
            <div className="page-intro-with-image program-intro-with-image">
              <div>
                <div className="eyebrow">{detail.audience}</div>
                <h1>{detail.title}</h1>
                <p className="program-strapline">{detail.strapline}</p>
                <p>{detail.introduction}</p>
                <aside className="program-status">
                  <strong>Where things stand</strong>
                  <p>{detail.status}</p>
                </aside>
              </div>
              <CommunityImage
                kind={
                  detail.id === "mcc"
                    ? "office"
                    : detail.id === "youthscape"
                      ? "gathering"
                      : "landscape"
                }
                priority
              />
            </div>
          </div>
        </section>
        <div className="container content-layout program-reading">
          <aside className="page-sidebar">
            <nav aria-label="On this page">
              <span className="eyebrow">Explore this program</span>
              {detail.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                  <span aria-hidden="true">↘</span>
                </a>
              ))}
              <a href="#questions">
                Your questions<span aria-hidden="true">↘</span>
              </a>
            </nav>
            <Link className="sidebar-contact" href="/contact/">
              Want to talk it through?<strong>Get in touch →</strong>
            </Link>
          </aside>
          <div className="content-sections">
            {detail.sections.map((section) => (
              <section
                className="editorial-section"
                key={section.id}
                id={section.id}
              >
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul className="program-points">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section
              className="editorial-section program-questions"
              id="questions"
            >
              <h2>Your questions</h2>
              {detail.questions.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </section>
            <aside className="program-next-step">
              <div className="eyebrow">Start with a conversation</div>
              <h2>Ask about {detail.id === "mcc" ? "MCC" : detail.title}</h2>
              <p>
                You can ask a question, tell us what matters to you or find out
                how the proposal is progressing.
              </p>
              <Link className="text-link" href="/contact/">
                See ways to get in touch <span aria-hidden="true">→</span>
              </Link>
            </aside>
            <p className="program-review-note">
              Program information reviewed 13 September 2026. This page
              describes IRAAC’s proposals; confirmed delivery details will be
              added as they become available.
            </p>
            <nav className="program-related" aria-label="Other programs">
              <h2>Explore our other programs</h2>
              {programDetails
                .filter((item) => item.id !== detail.id)
                .map((item) => (
                  <Link key={item.id} href={`/programs/${item.id}/`}>
                    {item.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
