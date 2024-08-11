import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";



export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials');
                }
                // check if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                // check if user exists
                if(!user || !user.hashedPassword){
                    throw new Error('Invalid credentials');
                }
                
                // check if password is correct
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        }),
    ],
    pages: { // redirect to main page if some error occurs
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development', // enable debug in dev mode 
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);