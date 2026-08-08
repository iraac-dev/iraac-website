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

  // Map keyword categories to service categories
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
    text: "Hi, I'm the IRAAC Help Bot. 👋\n\nI can help you find services and support near you. Just tell me what you need help with, and I'll recommend services that might help.\n\nFor example, you can say things like:\n• \"I need somewhere to live\"\n• \"I'm having legal trouble\"\n• \"I need to see a doctor\"\n• \"I'm feeling really down\"\n\nOr type **talk to a person** to speak with an IRAAC team member.",
  },
];

export default function HelpBot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [escalated, setEscalated] = useState(false);
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
          "🚨 If you're in immediate danger, please call **000** right now.\n\nIf you need to talk to someone, **13YARN** (13 92 76) has Aboriginal and Torres Strait Islander crisis supporters available 24/7.\n\n**Lifeline** (13 11 14) is also available 24/7 for crisis support.\n\nWould you like me to show you other services that might help?"
        );
        const crisisServices = findServices("crisis health");
        if (crisisServices.length > 0) {
          addBotMessage("Here are some services that may be relevant:", crisisServices);
        }
        return;
      }

      // Check for escalation
      if (lower.includes("talk to a person") || lower.includes("real person") || lower.includes("human") || lower.includes("speak to someone")) {
        setEscalated(true);
        addBotMessage(
          "I've noted that you'd like to speak with a real person. An IRAAC team member will be in touch with you.\n\nIn the meantime, here are some services that might help:"
        );
        const all = services.filter((s) => !s.isCrisis).slice(0, 4);
        if (all.length > 0) {
          addBotMessage("Recommended services in your area:", all.map((s) => ({ id: s.id, name: s.name, category: s.category, distance: s.distance })));
        }
        return;
      }

      // Check for thanks
      if (lower.includes("thank") || lower.includes("thanks") || lower.includes("cheers")) {
        addBotMessage("You're welcome! 😊\n\nIs there anything else I can help you with?\n\nYou can also browse all services on the **Search** tab or submit a **Request for help** from any service page.");
        return;
      }

      // Check for greetings
      if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("gday") || lower.includes("yo")) {
        addBotMessage("Hello! 👋\n\nWhat kind of support are you looking for today? Tell me a bit about what's going on and I'll help find the right services for you.");
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
          "You can tap any service to see more details, or **Request help** to have an IRAAC team member follow up with you.\n\nIf none of these are quite right, tell me more and I'll look again. Or type **talk to a person** to speak with an IRAAC team member."
        );
      } else {
        addBotMessage(
          "Thanks for sharing. I'm not quite sure which service would be best based on what you've said.\n\nCould you tell me a bit more? For example:\n• What kind of support do you need?\n• What area are you in?\n\nOr you can **browse all services** to find what you're looking for."
        );
      }
    }, 800);
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
            <strong>IRAAC Help Bot</strong>
            <span className="help-bot-status">Online</span>
          </div>
        </div>
        {escalated && <span className="help-bot-escalated-badge">Agent requested</span>}
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
    </div>
  );
}