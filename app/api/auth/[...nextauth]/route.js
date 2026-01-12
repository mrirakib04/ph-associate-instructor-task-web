import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const res = await fetch(
          "https://mrirakib-ejp-nextjs-task-server.vercel.app/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) return null;
        return data.user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_PROVIDER_ID,
      clientSecret: process.env.GOOGLE_PROVIDER_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
