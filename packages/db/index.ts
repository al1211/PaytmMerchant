import dotenv from "dotenv";
import path from "path";

// Resolves path relative to the running application (apps/user-app)
dotenv.config({
  path: path.resolve(process.cwd(), "../../packages/db/.env")
});

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });

console.log("Database URL:", process.env.DATABASE_URL);