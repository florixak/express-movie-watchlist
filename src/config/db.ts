import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

let prismaInstance: PrismaClient | null = null;
let pool: Pool | null = null;

export const connectDB = async (): Promise<void> => {
  try {
    if (prismaInstance) {
      return;
    }

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);
    prismaInstance = new PrismaClient({ adapter });

    await prismaInstance.$connect();
    console.log("DB Connected via Prisma");
  } catch (error) {
    console.error(`Database connection error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (prismaInstance) await prismaInstance.$disconnect();
  if (pool) await pool.end();
};

export const getPrisma = (): PrismaClient => {
  if (!prismaInstance) {
    throw new Error("Prisma not initialized. Call connectDB() first.");
  }
  return prismaInstance;
};
