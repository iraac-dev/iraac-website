import Link from "next/link";
import Header from "./SiteHeader";
import { PaintedDivider } from "./CommunityImage";
import "./public.css";

export function FrontDoor() {
  const cards = [
    [
      "01",
      "Talk with us",
      "Find out about a free 15-minute phone call.",
      "/book-a-call/",
    ],
    [
      "02",
      "Visit an office",
      "Check local office and drop-in details.",
      "/offices/",
    ],
    [
      "03",
      "Ask about a home visit",
      "Find out about meeting with someone at home.",
      "/contact/#contact-options",
    ],
    [
      "04",
      "Have your say",
      "Tell us what matters to you and your community.",
      "/app/survey/",
    ],
  ];
  return (
    <section className="contact-pathways" aria-labelledby="frontdoor-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">With community. For community.</div>
            <h1 id="frontdoor-title">
              Welcome to IRAAC.
              <br />
              How can we help?
            </h1>
          </div>
          <p>
            We’re an Aboriginal community organisation. You might want to talk
            with someone, learn about our programs or share what matters to you.
            Choose where you’d like to start.
          </p>
        </div>
        <div className="pathway-grid">
          {cards.map(([number, title, body, href]) => (
            <Link
              href={href}
              prefetch={!href.startsWith("/app/")}
              className="pathway"
              key={title}
            >
              <span className="pathway-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {number === "01" ? (
                    <path d="M8 3H4v4c0 7.2 5.8 13 13 13h4v-4l-5-2-2 3c-3-1-6-4-7-7l3-2-2-5Z" />
                  ) : number === "02" ? (
                    <>
                      <path d="M4 21V4h16v17M2 21h20M10 21v-5h4v5M8 8h1m6 0h1M8 12h1m6 0h1" />
                    </>
                  ) : number === "03" ? (
                    <path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7" />
                  ) : (
                    <path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5ZM8 10h8M8 14h5" />
                  )}
                </svg>
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="round-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="wordmark" aria-label="IRAAC home">
            IRAAC<span>.</span>
          </Link>
          <p>
            An Aboriginal community organisation.
            <br />
            With community. For community.
          </p>
          <Link href="/contact/" className="footer-contact">
            Let’s start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="footer-grid">
          <div className="acknowledgement">
            <h2>Acknowledgement of Country</h2>
            <p>
              IRAAC acknowledges the Traditional Custodians of the lands on
              which we work, live and gather, and pays respect to Elders past,
              present and emerging.
            </p>
          </div>
          <div>
            <h2>Explore IRAAC</h2>
            <ul>
              <li>
                <Link href="/about/">Our Story</Link>
              </li>
              <li>
                <Link href="/governance/">Governance & Reporting</Link>
              </li>
              <li>
                <Link href="/reports/">Community Reports</Link>
              </li>
              <li>
                <Link href="/news/">Latest Updates</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Our Programs</h2>
            <ul>
              <li>
                <Link href="/programs/mcc/">Mob and Country Connections</Link>
              </li>
              <li>
                <Link href="/programs/youthscape/">YouthScape</Link>
              </li>
              <li>
                <Link href="/programs/thecrew/">The Crew</Link>
              </li>
              <li>
                <Link href="/programs/darc/">DARC</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Connect</h2>
            <ul>
              <li>
                <Link href="/support/">Support for ACOs</Link>
              </li>
              <li>
                <Link href="/contact/">Get in Touch</Link>
              </li>
              <li>
                <Link href="/offices/">Office Locations</Link>
              </li>
              <li>
                <Link
                  href="https://www.iraac-aco.com/admin/"
                  prefetch={false}
                >
                  Staff Admin ↗
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 IRAAC. All rights reserved.</span>
          <span>
            Site content is a working draft — contact the Secretary to update.
          </span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      {children}
      <PaintedDivider />
      <Footer />
    </div>
  );
}
