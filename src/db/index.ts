import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

// Ne pas bloquer le build si pas de DB en production
if (!databaseUrl && process.env.NODE_ENV === "production") {
  console.warn("No DATABASE_URL provided - running in static mode");
} else if (!databaseUrl) {
  throw new Error("DATABASE_URL is required in development");
}

let pool: Pool | null = null;

if (databaseUrl) {
  const globalForDb = globalThis as typeof globalThis & {
    __arenaNextJsPostgresqlPool?: Pool;
  };

  pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
      // Force TLS en production, jamais de connexion en clair vers la DB
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
      // Limite basse adaptée au contexte serverless (évite l'épuisement de connexions côté hébergeur)
      max: 5,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }
}

export const db = databaseUrl ? drizzle(pool!) : null;
