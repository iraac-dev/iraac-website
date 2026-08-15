import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";

import {
  addReferralMessage,
  createReferral,
  getReferrals,
  saveReferral,
  updateReferralStatus,
} from "./referrals.ts";

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  clear() {
    this.values.clear();
  }
}

const storage = new MemoryStorage();
Object.defineProperty(globalThis, "window", { value: globalThis, configurable: true });
Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });

beforeEach(() => storage.clear());

function makeReferral(consentToFollowUp = true) {
  return createReferral({
    serviceId: "centrelink-nowra",
    serviceName: "Nowra Centrelink Support",
    serviceCategory: "Centrelink",
    requesterName: "Test person",
    requesterPhone: "0400 000 000",
    requesterEmail: "",
    postcode: "2541",
    needCategory: "Centrelink",
    message: "Help with a Centrelink claim",
    consentToFollowUp,
    source: "hotline",
    preferredContact: "sms",
  });
}

test("creates, saves, and reads a consented referral", () => {
  const referral = makeReferral();
  saveReferral(referral);

  const stored = getReferrals();
  const created = stored.find((item) => item.id === referral.id);
  assert.ok(created);
  assert.equal(created.supplierNotification, "queued");
  assert.match(created.conversation[0]?.body ?? "", /has been shared/);
});

test("does not describe a non-consented referral as shared", () => {
  const referral = makeReferral(false);

  assert.equal(referral.supplierNotification, "not_required");
  assert.match(referral.conversation[0]?.body ?? "", /has not been shared/);
});

test("updates status, notes, and the connected conversation", () => {
  const referral = makeReferral();
  saveReferral(referral);

  const updated = updateReferralStatus(referral.id, "triage", "Call after 2pm");
  assert.equal(updated?.status, "triage");
  assert.equal(updated?.staffNotes, "Call after 2pm");

  const messaged = addReferralMessage(referral.id, {
    sender: "provider",
    senderName: "Nowra Centrelink Support",
    body: "We can help tomorrow.",
  });
  assert.equal(messaged?.conversation.at(-1)?.body, "We can help tomorrow.");
});

test("falls back to demo data for malformed browser storage", () => {
  storage.setItem("moblink_referrals", JSON.stringify({ invalid: true }));
  assert.equal(getReferrals()[0]?.id, "lead_demo_centrelink");
});
