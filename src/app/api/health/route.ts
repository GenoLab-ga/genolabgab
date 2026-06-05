export const dynamic = 'force-dynamic';

// Le reste de ton code existant (ex: export async function GET()...)

import { db } from "@/db";
import { sql } from "drizzle-orm";


export async function GET() {
  try {
    // On vérifie explicitement si db existe pour rassurer TypeScript
    if (!db) {
      return Response.json({ ok: false, error: "Database connection not initialized" }, { status: 500 });
    }

    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
