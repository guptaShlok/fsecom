import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbconnect";
import Usermodel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();
        try {
          console.log("email:", credentials.identifier);
          console.log("password:", credentials.password);
          const user = await Usermodel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
              { password: credentials.password },
            ],
          });

          if (!user) {
            console.log("Error:usernot found");
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("Verify before Login");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
};
