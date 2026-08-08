export type ReferralStatus =
  | "requested"
  | "triage"
  | "referred"
  | "follow_up_due"
  | "resolved"
  | "could_not_connect"
  | "escalated"
  | "withdrawn";

export interface Referral {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail: string;
  needCategory: string;
  message: string;
  consentToFollowUp: boolean;
  status: ReferralStatus;
  staffNotes: string;
  createdAt: string;
  updatedAt: string;
}

export function createReferral(data: Omit<Referral, "id" | "status" | "staffNotes" | "createdAt" | "updatedAt">): Referral {
  const now = new Date().toISOString();
  return {
    ...data,
    id: `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "requested",
    staffNotes: "",
    createdAt: now,
    updatedAt: now,
  };
}

export function getReferrals(): Referral[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("iraac_referrals");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
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
  localStorage.setItem("iraac_referrals", JSON.stringify(referrals));
}

export function updateReferralStatus(id: string, status: ReferralStatus, notes?: string): void {
  const referrals = getReferrals();
  const r = referrals.find((ref) => ref.id === id);
  if (!r) return;
  r.status = status;
  if (notes !== undefined) r.staffNotes = notes;
  r.updatedAt = new Date().toISOString();
  localStorage.setItem("iraac_referrals", JSON.stringify(referrals));
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