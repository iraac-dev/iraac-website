import Link from "next/link";
import { programs } from "./data";
import SiteShell from "./SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="hero-flex">
          <div className="container">
            <div>
              <div className="eyebrow">Aboriginal Community Organisation - Local Decision Making</div>
              <h1>Strong governance. Strong programs. Strong community.</h1>
              <p>
                IRAAC is a community organisation working with and for community through Local Decision Making. It
                delivers programs, builds governance capability and helps Aboriginal Community Organisations do the same.
              </p>
              <Link href="/book-a-call/" className="btn btn-primary">
                Book a Free 15-Min Call
              </Link>
              <Link href="/programs/" className="btn btn-outline">
                See Our Programs
              </Link>
            </div>
            <div className="art-panel">
              <img src="https://picsum.photos/seed/iraac-art-placeholder/900/900" alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h2 className="section-title">What We Do</h2>
            <p className="section-lead">
              IRAAC runs a small group of community programs and is building the governance and reporting systems that
              show funders and community alike that IRAAC is well run.
            </p>
            <div className="grid">
              {programs.map((program) => (
                <article className="card" key={program.id}>
                  <img src={program.image} alt="" />
                  <div className="card-body">
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <Link href={`/programs/#${program.id}`} className="card-link">
                      Learn more
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="container two-col">
            <div>
              <h2 className="section-title">Governed Well, Reported Openly</h2>
              <p>
                IRAAC is building the systems that let it show clearly and consistently that it meets the governance and
                reporting standards expected by Local Decision Making, Aboriginal Affairs NSW, ORIC and other funding
                bodies.
              </p>
              <Link href="/governance/" className="btn btn-primary">
                See Our Governance
              </Link>
            </div>
            <img src="https://picsum.photos/seed/iraac-meeting/1200/800" alt="" />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
