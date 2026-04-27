// import { handlers } from '@/lib/nextauth-config';

// export const { GET, POST } = handlers;

import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    // Google provider
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // 🔥 VERY IMPORTANT behind nginx
});

export { handler as GET, handler as POST };