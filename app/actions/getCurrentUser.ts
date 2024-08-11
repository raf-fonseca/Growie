// This is a direct communicating with the db through a server conponent
import { getServerSession } from "next-auth/next";

import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}


export default async function getCurrentUser() {
    try {
        const session = await getSession();

        // if there is no session or user email, return null
        if(!session?.user?.email){
            return null;
        }

        // get the current user from the db
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });

        if (!currentUser){
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString || null
        }
    } catch (error: any){
        return null;
    }

}