import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "next-auth/react";
import SessionProviders from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import NavMenu from "./components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionProviders session={session}> */}
          <main className="mx-auto max-w-5xl text-2xl flex gap-2">
            {/* <NavMenu/> */}
            {children}
          </main>
        {/* </SessionProviders> */}
      </body>
    </html>
  );
}