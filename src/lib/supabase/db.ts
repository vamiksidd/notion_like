import * as dotenv from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config();
const connectionString = process.env.DATABASE_URL;

if (!process.env.DATABASE_URL) {
  console.error("🔴 No database url");
  process.exit(1);
}

const client = postgres(connectionString as string, { max: 1 });
const db = drizzle(client, { schema });

const migrateDb = async () => {
  try {
    console.log("🟠 Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Successfully Migrated");
  } catch (error) {
    console.log("🔴 Error Migrating client", error);
  }
};
migrateDb();
export default db