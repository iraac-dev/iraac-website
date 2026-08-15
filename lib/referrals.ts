export type ReferralStatus =
  | "requested"
  | "triage"
  | "referred"
  | "follow_up_due"
  | "resolved"
  | "could_not_connect"
  | "escalated"
  | "withdrawn";

export type ReferralSource = "app" | "hotline" | "ai_outbound" | "provider";
export type PreferredContact = "phone" | "sms" | "in_app";
export type SupplierNotificationStatus = "not_required" | "queued" | "sent";

export interface ReferralMessage {
  id: string;
  sender: "community" | "provider" | "moblink";
  senderName: string;
  body: string;
  createdAt: string;
}

export interface Referral {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail: string;
  postcode: string;
  needCategory: string;
  message: string;
  consentToFollowUp: boolean;
  source: ReferralSource;
  preferredContact: PreferredContact;
  supplierNotification: SupplierNotificationStatus;
  conversation: ReferralMessage[];
  status: ReferralStatus;
  staffNotes: string;
  createdAt: string;
  updatedAt: string;
}

type ReferralInput = Omit<
  Referral,
  | "id"
  | "status"
  | "staffNotes"
  | "createdAt"
  | "updatedAt"
  | "conversation"
  | "supplierNotification"
  | "postcode"
  | "source"
  | "preferredContact"
> & {
  conversation?: ReferralMessage[];
  supplierNotification?: SupplierNotificationStatus;
  postcode?: string;
  source?: ReferralSource;
  preferredContact?: PreferredContact;
};

const STORAGE_KEY = "moblink_referrals";
const LEGACY_STORAGE_KEY = "iraac_referrals";

export function createReferral(data: ReferralInput): Referral {
  const now = new Date().toISOString();
  return {
    ...data,
    postcode: data.postcode ?? "",
    source: data.source ?? "app",
    preferredContact: data.preferredContact ?? "phone",
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "requested",
    staffNotes: "",
    supplierNotification: data.supplierNotification ?? (data.consentToFollowUp ? "queued" : "not_required"),
    conversation: data.conversation ?? [
      {
        id: `msg_${Date.now()}_welcome`,
        sender: "moblink",
        senderName: "MobLink",
        body: data.consentToFollowUp
          ? `Your request has been shared with ${data.serviceName}. You can keep the conversation here.`
          : `This request is saved on this device and has not been shared with ${data.serviceName}.`,
        createdAt: now,
      },
    ],
    createdAt: now,
    updatedAt: now,
  };
}

export function getReferrals(): Referral[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return demoReferrals;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return demoReferrals;
    const referrals = parsed.filter(isStoredReferral).map(normalizeReferral);
    return referrals.length > 0 || parsed.length === 0 ? referrals : demoReferrals;
  } catch {
    return demoReferrals;
  }
}

export function saveReferral(referral: Referral): void {
  if (typeof window === "undefined") return;
  const referrals = getReferrals();
  const idx = referrals.findIndex((r) => r.id === referral.id);
  if (idx >= 0) {
    referrals[idx] = { ...referral, updatedAt: new Date().toISOString() };
  } else {
    referrals.push(referral);
  }
  writeReferrals(referrals);
}

export function updateReferralStatus(id: string, status: ReferralStatus, notes?: string): Referral | undefined {
  const referrals = getReferrals();
  const r = referrals.find((ref) => ref.id === id);
  if (!r) return undefined;
  if (r.status === status && (notes === undefined || r.staffNotes === notes)) return r;
  r.status = status;
  if (notes !== undefined) r.staffNotes = notes;
  r.updatedAt = new Date().toISOString();
  writeReferrals(referrals);
  return r;
}

export function addReferralMessage(
  id: string,
  message: Pick<ReferralMessage, "sender" | "senderName" | "body">,
): Referral | undefined {
  const referrals = getReferrals();
  const referral = referrals.find((item) => item.id === id);
  if (!referral || !message.body.trim()) return undefined;

  referral.conversation.push({
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    body: message.body.trim(),
    createdAt: new Date().toISOString(),
  });
  referral.updatedAt = new Date().toISOString();
  writeReferrals(referrals);
  return referral;
}

export function getReferralById(id: string): Referral | undefined {
  return getReferrals().find((r) => r.id === id);
}

export function getReferralStats() {
  const referrals = getReferrals();
  return {
    total: referrals.length,
    requested: referrals.filter((r) => r.status === "requested").length,
    triage: referrals.filter((r) => r.status === "triage").length,
    referred: referrals.filter((r) => r.status === "referred").length,
    followUpDue: referrals.filter((r) => r.status === "follow_up_due").length,
    resolved: referrals.filter((r) => r.status === "resolved").length,
    couldNotConnect: referrals.filter((r) => r.status === "could_not_connect").length,
    escalated: referrals.filter((r) => r.status === "escalated").length,
    withdrawn: referrals.filter((r) => r.status === "withdrawn").length,
    byCategory: groupBy(referrals, "needCategory"),
    byService: groupBy(referrals, "serviceName"),
  };
}

function groupBy(items: Referral[], key: keyof Referral): Record<string, number> {
  return items.reduce(
    (acc, item) => {
      const k = String(item[key]);
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

function writeReferrals(referrals: Referral[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
}

function normalizeReferral(referral: Referral): Referral {
  return {
    ...referral,
    postcode: referral.postcode || "",
    source: referral.source || "app",
    preferredContact: referral.preferredContact || "phone",
    supplierNotification: referral.supplierNotification || "not_required",
    conversation: referral.conversation || [],
  };
}

function isStoredReferral(value: unknown): value is Referral {
  if (!value || typeof value !== "object") return false;
  const referral = value as Partial<Referral>;
  return (
    typeof referral.id === "string" &&
    typeof referral.serviceId === "string" &&
    typeof referral.serviceName === "string" &&
    typeof referral.requesterName === "string" &&
    typeof referral.requesterPhone === "string" &&
    typeof referral.message === "string" &&
    typeof referral.consentToFollowUp === "boolean" &&
    typeof referral.status === "string" &&
    typeof referral.createdAt === "string"
  );
}

export const demoReferrals: Referral[] = [
  {
    id: "lead_demo_centrelink",
    serviceId: "shoalhaven-aboriginal-pension",
    serviceName: "Shoalhaven Aboriginal Pension Support",
    serviceCategory: "Centrelink",
    requesterName: "Demo community member",
    requesterPhone: "04•• ••• 214",
    requesterEmail: "",
    postcode: "2541",
    needCategory: "Centrelink",
    message: "Needs help understanding and completing a Centrelink application.",
    consentToFollowUp: true,
    source: "hotline",
    preferredContact: "sms",
    supplierNotification: "queued",
    status: "requested",
    staffNotes: "Confirm the correct payment type before requesting documents.",
    conversation: [
      {
        id: "msg_demo_1",
        sender: "moblink",
        senderName: "MobLink call centre",
        body: "This person asked MobLink for Centrelink application support and agreed to an SMS follow-up.",
        createdAt: "2026-08-15T08:35:00.000Z",
      },
      {
        id: "msg_demo_2",
        sender: "community",
        senderName: "Community member",
        body: "I would like to know what documents I need before we start.",
        createdAt: "2026-08-15T08:42:00.000Z",
      },
    ],
    createdAt: "2026-08-15T08:35:00.000Z",
    updatedAt: "2026-08-15T08:42:00.000Z",
  },
];

export const referralStatusLabels: Record<ReferralStatus, string> = {
  requested: "New — pending review",
  triage: "In triage",
  referred: "Referred to service",
  follow_up_due: "Follow-up due",
  resolved: "Resolved",
  could_not_connect: "Could not connect",
  escalated: "Escalated",
  withdrawn: "Withdrawn",
};

export const referralSourceLabels: Record<ReferralSource, string> = {
  app: "MobLink app",
  hotline: "MobLink hotline",
  ai_outbound: "AI-assisted outbound call",
  provider: "Provider-created",
};

export const preferredContactLabels: Record<PreferredContact, string> = {
  phone: "Phone call",
  sms: "Text message",
  in_app: "MobLink chat",
};

export const supplierNotificationLabels: Record<SupplierNotificationStatus, string> = {
  not_required: "Not required",
  queued: "Queued",
  sent: "Sent",
};

export const referralStatusColors: Record<ReferralStatus, string> = {
  requested: "#f59e0b",
  triage: "#3b82f6",
  referred: "#10b981",
  follow_up_due: "#8b5cf6",
  resolved: "#6b7280",
  could_not_connect: "#ef4444",
  escalated: "#dc2626",
  withdrawn: "#9ca3af",
};

export const needCategories = [
  "Housing",
  "Legal",
  "Health",
  "Mental Health",
  "Addiction",
  "Family",
  "Youth",
  "Elderly Care",
  "Disability",
  "Employment",
  "Education",
  "Financial",
  "Centrelink",
  "Culture",
  "Transport",
  "Food",
  "Other",
];
