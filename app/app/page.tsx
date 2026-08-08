import { services } from "../data";
import CrisisStrip from "../../components/app/CrisisStrip";
import BottomNav from "../../components/app/BottomNav";

export const metadata = {
  title: "1800 Mob Link | IRAAC",
  description: "Find Aboriginal and community services near you — health, legal, housing, crisis support and more.",
};

export default function MobLinkHome() {
  return (
    <main className="app-page">
      <div className="phone-shell phone-shell-compact">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">South Coast, NSW</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>

        <header className="app-top app-top-compact">
          <div>
            <p className="app-kicker">1800 Mob Link</p>
            <h1>Find support near you</h1>
          </div>
        </header>

        <CrisisStrip />

        <BottomNav current="/app/" />
      </div>
    </main>
  );
}