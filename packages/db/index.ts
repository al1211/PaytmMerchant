import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, ".env"),
});
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client";

const connectionString=`${process.env.DATABASE_URL}`

const adapter=new PrismaPg({connectionString});

export const prisma=new PrismaClient({adapter});
console.log(process.env.DATABASE_URL)
console.log("__dirname:", __dirname);
console.log("cwd:", process.cwd());

