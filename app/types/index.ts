import { User } from "@prisma/client"

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

// Datetime objects can cause issues when serializing to JSON, so they must be converted to strings
