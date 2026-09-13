import Link from "next/link";
import { notFound } from "next/navigation";
import { programs, publicPages, type PageKey } from "../data";
import SiteShell from "../SiteShell";
import CommunityImage from "../CommunityImage";
import { programDetails } from "../program-details";

export function generateStaticParams() {
  return Object.keys(publicPages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = publicPages[slug as PageKey];
  return page
    ? { title: `${page.title} | IRAAC`, description: page.description }
    : {};
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = publicPages[slug as PageKey];
  if (!page) notFound();
  const contents =
    slug === "programs"
      ? programs.map((p) => ({ id: p.id, title: p.title }))
      : page.sections.map((s, i) => ({
          id: `section-${i + 1}`,
          title: s.title,
        }));
  return (
    <SiteShell>
      <main id="main-content" tabIndex={-1}>
        <section className="page-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.title}</span>
            </nav>
            <div className="page-intro-with-image">
              <div>
                <div className="eyebrow">{page.eyebrow}</div>
                <h1>{page.hero}</h1>
                <p>{page.lead}</p>
              </div>
              <CommunityImage
                kind={
                  ["contact", "offices", "book-a-call", "support"].includes(
                    slug,
                  )
                    ? "office"
                    : "gathering"
                }
                priority
              />
            </div>
          </div>
        </section>
        <div className="container content-layout">
          <aside className="page-sidebar">
            <nav aria-label="On this page">
              <span className="eyebrow">On this page</span>
              {contents.map((item) => (
                <a href={`#${item.id}`} key={item.id}>
                  {item.title}
                  <span aria-hidden="true">↘</span>
                </a>
              ))}
            </nav>
            {slug !== "contact" && (
              <Link className="sidebar-contact" href="/contact/">
                You do not need to know the right program name before asking for
                help.<strong>Get in touch ↗</strong>
              </Link>
            )}
          </aside>
          <div className="content-sections">
            {slug === "programs"
              ? programs.map((program, index) => (
                  <article
                    className={`program-detail program-${program.id}`}
                    id={program.id}
                    key={program.id}
                  >
                    <div className="program-card-top">
                      <span>{program.tag}</span>
                      <span>0{index + 1}</span>
                    </div>
                    <h2>{program.title}</h2>
                    <p>{program.description}</p>
                    <p className="program-index-status">
                      <strong>In development.</strong>{" "}
                      {
                        programDetails.find((item) => item.id === program.id)
                          ?.audience
                      }
                      .
                    </p>
                    <Link
                      href={`/programs/${program.id}/`}
                      className="text-link"
                    >
                      Explore {program.id === "mcc" ? "MCC" : program.title}{" "}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </article>
                ))
              : page.sections.map((section, index) => (
                  <section
                    className="editorial-section"
                    id={`section-${index + 1}`}
                    key={section.title}
                  >
                    <span className="section-number">0{index + 1}</span>
                    <h2>{section.title}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.cardTitle && (
                      <aside className="editorial-note">
                        <h3>{section.cardTitle}</h3>
                        <p>{section.cardBody}</p>
                      </aside>
                    )}
                  </section>
                ))}
            {slug === "contact" && (
              <section className="editorial-section" id="contact-options">
                <div className="eyebrow">Choose what works for you</div>
                <h2>Start a conversation</h2>
                <div className="contact-options">
                  <Link href="/book-a-call/">
                    <strong>Book a Free 15-Min Call</strong>
                    <span>Read the current phone pathway details →</span>
                  </Link>
                  <Link href="/offices/">
                    <strong>Visit a Local Office</strong>
                    <span>Check office and drop-in information →</span>
                  </Link>
                  <Link href="/app/survey/" prefetch={false}>
                    <strong>Have Your Say</strong>
                    <span>Tell IRAAC what matters to you →</span>
                  </Link>
                  <div>
                    <strong>Request a Home Visit</strong>
                    <p>
                      Home visit request details are not yet available on this
                      website.
                    </p>
                  </div>
                </div>
              </section>
            )}
            {slug === "news" && (
              <Link href="/reports/" className="related-link">
                <span>More from IRAAC</span>
                <strong>Read the latest community reports →</strong>
              </Link>
            )}
            {slug !== "contact" && (
              <Link
                href={
                  slug === "governance" || slug === "enhanced-bail-article"
                    ? "/reports/"
                    : "/contact/"
                }
                className="related-link"
              >
                <span>Keep exploring</span>
                <strong>
                  {slug === "governance" || slug === "enhanced-bail-article"
                    ? "Read Community Reports"
                    : "Get in Touch"}{" "}
                  <span aria-hidden="true">↗</span>
                </strong>
              </Link>
            )}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
