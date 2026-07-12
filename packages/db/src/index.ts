export { prisma } from "./client"; // exports instance of prisma
export * from "../generated/prisma/client"; // exports generated types from prisma

console.log(process.env.DATABASE_URL);