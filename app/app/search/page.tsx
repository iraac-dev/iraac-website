import { services } from "../../data";
import ServiceList from "../../../components/app/ServiceList";
import CrisisStrip from "../../../components/app/CrisisStrip";
import BottomNav from "../../../components/app/BottomNav";

export const metadata = {
  title: "Search Services | 1800 Mob Link",
  description: "Browse and search Aboriginal and community services by category, keyword, or location.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <main className="app-page">
      <div className="phone-shell">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Search</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top app-top-compact">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Find a service</h1>
          </div>
        </header>

        <CrisisStrip />

        <div className="app-section">
          <ServiceList services={services} title={q ? `Results for "${q}"` : undefined} />
        </div>

        <BottomNav current="/app/search" />
      </div>
    </main>
  );
}