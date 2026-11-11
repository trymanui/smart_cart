import { clearPurchasedItems } from "@/lib/server/db-actons";

export async function POST() {
  try {
    await clearPurchasedItems();
    return Response.json({ ok: true });
  } catch (error) {
    error instanceof Error ? error.message : "failed to clear completed items";

    return Response.json({ error: message }, { status: 500 });
  }
}
