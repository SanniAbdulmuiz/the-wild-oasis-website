import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

// 👇 Export a function called auth that returns the current session
export async function auth() {
  return await getServerSession(authConfig);
}

// 🔹 Export handler for API routes
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
