import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DB URL:-------------", process.env.DATABASE_URL);

// Global state ko type-safe banayein taaki prisma aur pool dono cache hon
const globalForPrisma = globalThis as unknown as { 
  prisma?: PrismaClient;
  pgPool?: pg.Pool;
};

// 1. Pool ko sirf ek baar initialize karein aur global par cache karein
if (!globalForPrisma.pgPool) {
  globalForPrisma.pgPool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Transaction handling ke liye connections open rakhega
    idleTimeoutMillis: 30000,
  });
}

// 2. Adapter ko cache pool ke sath attach karein
const adapter = new PrismaPg(globalForPrisma.pgPool);

// 3. Prisma Client ko singleton pattern mein export karein
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}