import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : ["error"], // seta o log para que em desenvolvimento exiba no console as queries executadas
});
