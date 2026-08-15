import assert from "node:assert/strict";
import test from "node:test";

import { detectNeedCategory, matchServices, type MatchableService } from "./service-matching.ts";

const services: MatchableService[] = [
  {
    id: "centrelink-nowra",
    name: "Nowra Centrelink Support",
    category: "Centrelink",
    subcategory: "Applications and pension support",
    tags: ["Centrelink", "Applications"],
    description: "Help completing Centrelink applications.",
    postcode: "2541",
    suburb: "Nowra",
    isNational: false,
    isAboriginalLed: true,
  },
  {
    id: "legal-nowra",
    name: "Aboriginal Legal Service Nowra",
    category: "Legal",
    subcategory: "Legal advice",
    tags: ["Legal"],
    description: "Free legal help.",
    postcode: "2541",
    suburb: "Nowra",
    isNational: false,
    isAboriginalLed: true,
  },
  {
    id: "national-centrelink",
    name: "National Centrelink Information",
    category: "Centrelink",
    subcategory: "National information",
    tags: ["Centrelink"],
    description: "National information service.",
    postcode: "",
    suburb: "National",
    isNational: true,
    isAboriginalLed: false,
  },
];

test("detects Centrelink needs from natural language", () => {
  assert.equal(detectNeedCategory("I need help with my Centrelink application"), "Centrelink");
});

test("does not mistake a housing application for Centrelink", () => {
  assert.equal(detectNeedCategory("I need help with a housing application"), "Housing");
});

test("ranks a local exact-category provider above a national provider", () => {
  const matches = matchServices(services, {
    need: "help with a Centrelink application",
    postcode: "2541",
  });

  assert.equal(matches[0]?.service.id, "centrelink-nowra");
  assert.ok(matches[0]?.reasons.includes("Matches Centrelink support"));
  assert.ok(matches[0]?.reasons.includes("Located in postcode 2541"));
});

test("uses the stated need to distinguish services in the same location", () => {
  const matches = matchServices(services, {
    need: "I need a lawyer for a legal problem",
    postcode: "2541",
  });

  assert.equal(matches[0]?.service.id, "legal-nowra");
});

test("keeps national services available when the postcode has no local match", () => {
  const matches = matchServices(services, {
    need: "Centrelink pension help",
    postcode: "6000",
  });

  assert.ok(matches.some((match) => match.service.id === "national-centrelink"));
});

test("recognises a provider in the surrounding postcode region", () => {
  const matches = matchServices(services, {
    need: "Centrelink pension help",
    postcode: "2540",
  });

  const local = matches.find((match) => match.service.id === "centrelink-nowra");
  assert.ok(local?.reasons.includes("Serves the surrounding region"));
});
