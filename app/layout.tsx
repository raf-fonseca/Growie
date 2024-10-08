import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Growie",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="logoSmall.png" type="image/x-icon" />
            </head>
          <body className={inter.className}>
            <ToasterProvider />
            <SearchModal />
            <RegisterModal />
            <RentModal />
            <LoginModal />
            <Navbar currentUser={currentUser}/>
            <div className="pb-20 pt-28">
                {children}
            </div>
          </body>
        </html>
    );
}
