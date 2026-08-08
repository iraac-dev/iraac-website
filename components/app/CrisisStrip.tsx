export default function CrisisStrip() {
  return (
    <section className="crisis-strip" aria-label="Crisis support">
      <div className="crisis-strip-inner">
        <h2 className="crisis-strip-title">Need help right now?</h2>
        <div className="crisis-strip-links">
          <a
            href="tel:000"
            className="crisis-link crisis-link-emergency"
            aria-label="000 — in immediate danger"
          >
            <span className="crisis-link-number">000</span>
            <span className="crisis-link-label">In immediate danger</span>
          </a>
          <a
            href="tel:139276"
            className="crisis-link crisis-link-yarn"
            aria-label="13YARN — Aboriginal crisis support"
          >
            <span className="crisis-link-number">13YARN</span>
            <span className="crisis-link-label">13 92 76 — Aboriginal crisis support</span>
          </a>
          <a
            href="tel:131114"
            className="crisis-link crisis-link-lifeline"
            aria-label="Lifeline — crisis support"
          >
            <span className="crisis-link-number">Lifeline</span>
            <span className="crisis-link-label">13 11 14 — Crisis support</span>
          </a>
          <a
            href="tel:1800737732"
            className="crisis-link crisis-link-respect"
            aria-label="1800RESPECT — domestic violence support"
          >
            <span className="crisis-link-number">1800RESPECT</span>
            <span className="crisis-link-label">1800 737 732 — Family violence support</span>
          </a>
        </div>
      </div>
    </section>
  );
}