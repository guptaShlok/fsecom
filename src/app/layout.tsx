import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Authprovider from "@/context/Authprovider";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import StoreModel from "@/models/Storemodel";
import { authOptions } from "./api/auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Authprovider>
        <body className={inter.className}>
          <ModalProvider />
          {children}
          <Toaster />
        </body>
      </Authprovider>
    </html>
  );
}
