import { NextResponse } from "next/server";
import { createReferral, type Referral } from "../../../lib/referrals";

// In-memory store for server-side operations (complementing localStorage on client)
let serverReferrals: Referral[] = [];

export async function GET() {
  return NextResponse.json(serverReferrals);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, serviceName, serviceCategory, requesterName, requesterPhone, requesterEmail, needCategory, message, consentToFollowUp } = body;

    if (!serviceId || !serviceName || !requesterName || !requesterPhone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const referral = createReferral({
      serviceId,
      serviceName,
      serviceCategory: serviceCategory || "Other",
      requesterName,
      requesterPhone,
      requesterEmail: requesterEmail || "",
      needCategory: needCategory || "Other",
      message: message || "",
      consentToFollowUp: !!consentToFollowUp,
    });

    serverReferrals.push(referral);
    return NextResponse.json(referral, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, staffNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const idx = serverReferrals.findIndex((r) => r.id === id);
    if (idx < 0) {
      return NextResponse.json({ error: "Referral not found" }, { status: 404 });
    }

    serverReferrals[idx] = {
      ...serverReferrals[idx],
      status,
      staffNotes: staffNotes !== undefined ? staffNotes : serverReferrals[idx].staffNotes,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(serverReferrals[idx]);
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}