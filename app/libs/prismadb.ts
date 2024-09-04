import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | null;
}

const client = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV != 'production') globalThis.prisma = client; // check if in development mode

export default client;