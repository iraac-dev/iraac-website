"use client";

import HelpBot from "../../../components/app/HelpBot";
import BottomNav from "../../../components/app/BottomNav";

export default function ChatPage() {
  return (
    <main className="app-page">
      <div className="phone-shell phone-shell-compact">
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">Chat</span>
          <span className="phone-signal">1800 MOB LINK</span>
        </div>
        <HelpBot />
        <BottomNav current="/app/messages" />
      </div>
    </main>
  );
}