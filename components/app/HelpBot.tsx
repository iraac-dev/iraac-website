"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { services } from "../../app/data";

type Message = {
  role: "bot" | "user";
  text: string;
  services?: { id: string; name: string; category: string; distance: string }[];
};

const keywords: Record<string, string[]> = {
  health: ["health", "doctor", "gp", "sick", "medical", "hospital", "nurse", "wellbeing"],
  legal: ["legal", "law", "court", "bail", "police", "lawyer", "justice"],
  housing: ["housing", "home", "rent", "homeless", "shelter", "accommodation", "tenant"],
  crisis: ["crisis", "emergency", "urgent", "suicide", "danger", "help now", "desperate"],
  mental: ["mental", "depressed", "anxiety", "counselling", "counsel", "therapy", "headspace"],
  family: ["family", "parent", "child", "kids", "relationship", "domestic", "violence"],
  youth: ["youth", "young", "teen", "school", "student"],
  financial: ["money", "financial", "centrelink", "bill", "debt", "food", "voucher", "emergency relief"],
  addiction: ["addiction", "alcohol", "drug", "drink", "rehab", "counselling"],
  culture: ["culture", "cultural", "aboriginal", "community", "connection", "elders"],
  employment: ["job", "work", "employment", "career", "training", "tafe"],
  disability: ["disability", "ndis", "disabled", "access", "support worker"],
};

function findServices(text: string) {
  const lower = text.toLowerCase();
  const matchedCategories = new Set<string>();

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((w) => lower.includes(w))) {
      matchedCategories.add(category);
    }
  }

  const categoryMap: Record<string, string[]> = {
    health: ["Health"],
    legal: ["Legal"],
    housing: ["Housing"],
    crisis: ["Crisis"],
    mental: ["Mental Health"],
    family: ["Family"],
    youth: ["Youth"],
    financial: ["Financial", "Centrelink"],
    addiction: ["Addiction"],
    culture: ["Culture"],
    employment: ["Education", "Employment"],
    disability: ["Disability"],
  };

  const serviceCategories = new Set<string>();
  matchedCategories.forEach((cat) => {
    const mapped = categoryMap[cat] || [];
    mapped.forEach((c) => serviceCategories.add(c));
  });

  if (serviceCategories.size === 0) return [];

  return services
    .filter((s) => Array.from(serviceCategories).some((c) => s.category === c))
    .slice(0, 4)
    .map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      distance: s.distance,
    }));
}

const initialMessages: Message[] = [
  {
    role: "bot",
    text:
      "Hi, I'm the MobLink guide. 👋\n\n" +
      "Tell me what's going on — I'll listen, find services that can help, " +
      "or prepare a request for a participating service.\n\n" +
      "For example, you can say things like:\n" +
      '• "I need somewhere to live"\n' +
      '• "I\'m having legal trouble"\n' +
      '• "I need to see a doctor"\n' +
      '• "I\'m feeling really down"\n\n' +
      "You can also:\n" +
      "• Tap **Talk to a person** to request a human follow-up\n" +
      "• Browse services by need and location",
  },
];

export default function HelpBot({ onBackToContact }: { onBackToContact?: () => void }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [humanMode, setHumanMode] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string, svcs?: { id: string; name: string; category: string; distance: string }[]) => {
    setMessages((prev) => [...prev, { role: "bot", text, services: svcs }]);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || waiting) return;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text }]);
    setWaiting(true);

    const lower = text.toLowerCase();

    setTimeout(() => {
      setWaiting(false);

      // Check for crisis keywords
      if (keywords.crisis.some((w) => lower.includes(w))) {
        addBotMessage(
          "🚨 If you're in immediate danger, please call **000** right now.\n\n" +
            "If you need to talk to someone, **13YARN** (13 92 76) has Aboriginal and Torres Strait Islander crisis supporters available 24/7.\n\n" +
            "**Lifeline** (13 11 14) is also available 24/7 for crisis support.\n\n" +
            "Would you like me to show you other services that might help?"
        );
        const crisisServices = findServices("crisis health");
        if (crisisServices.length > 0) {
          addBotMessage("Here are some services that may be relevant:", crisisServices);
        }
        return;
      }

      // Check for escalation to human
      if (
        lower.includes("talk to a person") ||
        lower.includes("real person") ||
        lower.includes("human") ||
        lower.includes("speak to someone") ||
        lower.includes("talk to someone")
      ) {
        showHumanMode();
        return;
      }

      // Check for phone call request
      if (
        lower.includes("call") ||
        lower.includes("phone") ||
        lower.includes("ring") ||
        lower.includes("number")
      ) {
        addBotMessage(
          "The MobLink hotline is being prepared for launch.\n\n" +
            "For now, I can help you search services in the app or prepare a request for a participating provider. " +
            "Call **000** if you are in immediate danger.\n\n" +
            "Would you like me to help with anything else in the meantime?"
        );
        return;
      }

      // Check for thanks
      if (lower.includes("thank") || lower.includes("thanks") || lower.includes("cheers")) {
        addBotMessage(
          "You're welcome! 😊\n\n" +
            "Is there anything else I can help you with?\n\n" +
            "You can also:\n" +
            "• Browse all services on the **Search** tab\n" +
            "• **Request help** from any service page\n" +
            "• Tap **Talk to a person** to request human follow-up"
        );
        return;
      }

      // Check for greetings
      if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("gday") || lower.includes("yo")) {
        addBotMessage(
          "Hello! 👋\n\n" +
            "What kind of support are you looking for today? Tell me a bit about what's going on " +
            "and I'll help find the right services for you.\n\n" +
            "Or if you'd prefer, you can tap **Talk to a person** above to request human follow-up."
        );
        return;
      }

      // Find services based on keywords
      const matched = findServices(text);

      if (matched.length > 0) {
        const categories = [...new Set(matched.map((s) => s.category))].join(", ");
        addBotMessage(
          `Based on what you've told me, here are some services that might be able to help with **${categories}**:`,
          matched
        );
        addBotMessage(
          "You can tap any service to see more details, or **Request help** to send that provider a consented lead.\n\n" +
            "If none of these are quite right, tell me more and I'll look again. " +
            "Or tap **Talk to a person** to request human follow-up."
        );
      } else {
        addBotMessage(
          "Thanks for sharing. I'm not quite sure which service would be best based on what you've said.\n\n" +
            "Could you tell me a bit more? For example:\n" +
            "• What kind of support do you need?\n" +
            "• What area are you in?\n\n" +
            "Or you can **browse all services** or tap **Talk to a person** to request human follow-up."
        );
      }
    }, 800);
  };

  const showHumanMode = () => {
    setHumanMode(true);
    addBotMessage(
      "I've noted that you'd like to speak with a real person. This prototype records the request but does not yet notify a live operator.\n\n" +
        "In the meantime, here are some ways to reach us:"
    );
    const all = services.filter((s) => !s.isCrisis).slice(0, 3);
    if (all.length > 0) {
      addBotMessage(
        "Recommended services in your area:",
        all.map((s) => ({ id: s.id, name: s.name, category: s.category, distance: s.distance }))
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="help-bot">
      <div className="help-bot-header">
        <div className="help-bot-header-info">
          <span className="help-bot-avatar">🤖</span>
          <div>
            <strong>MobLink guide</strong>
            <span className="help-bot-status">Online</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {humanMode && <span className="help-bot-escalated-badge">Agent requested</span>}
          {!humanMode && (
            <button
              type="button"
              className="help-bot-human-toggle"
              onClick={() => {
                setHumanMode(true);
                showHumanMode();
              }}
            >
              🙋 Talk to a person
            </button>
          )}
        </div>
      </div>

      <div className="help-bot-chat">
        {messages.map((msg, i) => (
          <div key={i}>
            <div className={`help-bot-msg ${msg.role === "user" ? "help-bot-msg-user" : "help-bot-msg-bot"}`}>
              <div className="help-bot-msg-text">
                {msg.text.split("\n").map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
            {msg.services && msg.services.length > 0 && (
              <div className="help-bot-services">
                {msg.services.map((s) => (
                  <Link
                    href={`/app/service/${s.id}`}
                    className="help-bot-service-link"
                    key={s.id}
                  >
                    <strong>{s.name}</strong>
                    <span>{s.category} · {s.distance}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {waiting && (
          <div className="help-bot-msg help-bot-msg-bot">
            <div className="help-bot-typing">
              <span className="help-bot-dot" />
              <span className="help-bot-dot" />
              <span className="help-bot-dot" />
            </div>
          </div>
        )}
        <div ref={chatEnd} />
      </div>

      {humanMode && (
        <div className="chat-human-mode">
          <div className="chat-human-mode-icon">🙋</div>
          <h3>We&apos;re here to help</h3>
          <p>
            This prototype has recorded your preference for human support. Live operator follow-up is not connected yet; you can still browse and request help from listed services.
          </p>
          <div className="chat-human-actions">
            <Link href="/app/search/" className="chat-human-btn chat-human-btn-primary" onClick={onBackToContact}>
              Find a participating service
            </Link>
            <button
              type="button"
              className="chat-human-btn chat-human-btn-outline"
              onClick={() => {
                setHumanMode(false);
                addBotMessage(
                  "OK, I'm back! Let me know if you need help finding services or support. 😊"
                );
              }}
            >
              💬 Continue chatting with the bot
            </button>
          </div>
        </div>
      )}

      {!humanMode && (
        <div className="help-bot-input-row">
          <input
            type="text"
            className="help-bot-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={waiting}
            aria-label="Type your message"
          />
          <button
            type="button"
            className="help-bot-send"
            onClick={handleSend}
            disabled={!input.trim() || waiting}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
