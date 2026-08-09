import Link from "next/link";
import { dropdownItems, navItems } from "./data";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="wordmark" aria-label="IRAAC home">
          IRAAC<span>.</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link href={item.href} key={item.key}>
              {item.label}
            </Link>
          ))}
          <details className="nav-more">
            <summary>More</summary>
            <div className="nav-more-menu">
              {dropdownItems.map((item) => (
                <Link href={item.href} key={item.key}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <Link href="/app/messages/" className="nav-login" aria-label="Login to the 1800 Mob Link prototype">
          Login
        </Link>
      </div>
    </header>
  );
}

function FrontDoor() {
  const cards = [
    ["Book a Free 15-Min Call", "Speak with an IRAAC officer over the phone.", "/book-a-call/"],
    ["Visit a Local Office", "Drop in and speak with someone face to face.", "/offices/"],
    ["Request a Home Visit", "Ask an IRAAC officer to come to you.", "/contact/"],
    ["Complete a Survey", "Tell IRAAC what matters through Have Your Say.", "/app/survey/"],
  ];

  return (
    <section className="frontdoor" aria-labelledby="frontdoor-title">
      <div className="container">
        <div className="frontdoor-head">
          <h2 id="frontdoor-title">Get in Touch - Choose What Works for You</h2>
          <p>Whatever brings you here, IRAAC is here to help. Pick one option below to get started.</p>
        </div>
        <div className="frontdoor-grid">
          {cards.map(([title, body, href], index) => (
            <Link href={href} className={index === 0 ? "fd-card is-primary" : "fd-card"} key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <>
      <div className="acknowledgement">
        <div className="container">
          IRAAC acknowledges the Traditional Custodians of the lands on which we work, live and gather, and pays respect
          to Elders past, present and emerging.
        </div>
      </div>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>IRAAC</h4>
              <ul>
                <li>
                  <Link href="/about/">Our Story</Link>
                </li>
                <li>
                  <Link href="/governance/">Governance & Reporting</Link>
                </li>
                <li>
                  <Link href="/admin/" className="footer-admin-button">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Our Programs</h4>
              <ul>
                <li>
                  <Link href="/programs/#mcc">MCC - Mob and Country Connections</Link>
                </li>
                <li>
                  <Link href="/programs/#youthscape">YouthScape</Link>
                </li>
                <li>
                  <Link href="/programs/#thecrew">The Crew</Link>
                </li>
                <li>
                  <Link href="/programs/#darc">DARC</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get Involved</h4>
              <ul>
                <li>
                  <Link href="/support/">Support for Aboriginal Community Organisations</Link>
                </li>
                <li>
                  <Link href="/news/">Latest Updates</Link>
                </li>
                <li>
                  <Link href="/insights/">Insights</Link>
                </li>
                <li>
                  <Link href="/contact/">Get in Touch</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 IRAAC. All rights reserved.</span>
            <span>Site content is a working draft - contact the Secretary to update.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <FrontDoor />
      {children}
      <Footer />
    </>
  );
}
