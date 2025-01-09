import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Import the CredentialsProvider
import { NextAuthOptions } from "next-auth";
import { signInCallbackController } from "@/helper/auth.callback";
import prisma from "../../../../prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.password === credentials.password) {
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ user }) {
      return await signInCallbackController(user);
    },
    async session({ session }) {
      try {
        if (!session.user) throw new Error("User not found");
        const existingUser = await prisma.user.findUnique({
          where: {
            email: session.user.email as string,
          },
        });
        if (existingUser) session.user.id = existingUser?.id as string;
      } catch (error) {
        console.error(error);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
