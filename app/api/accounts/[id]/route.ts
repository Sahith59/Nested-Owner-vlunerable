import { NextResponse } from "next/server";
import { findAccountById } from "../../../lib/data";
import { requireUserResponse } from "../../../lib/session";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const auth = await requireUserResponse();
  if (auth.response) return auth.response;

  const { id } = await params;
  const account = findAccountById(id);
  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  // Intentional BOLA for BoLD testing:
  // this route authenticates the caller but intentionally skips the account holder check.
  return NextResponse.json({
    id: account.id,
    data: {
      account: {
        holderId: account.holderId,
        label: account.label,
        tier: account.tier,
        balance: account.balance,
        currency: account.currency,
        openedAt: account.openedAt,
        riskState: account.riskState,
        region: account.region,
        contacts: account.contacts,
        privateNote: account.privateNote
      },
      requestedBy: auth.user
    }
  });
}
