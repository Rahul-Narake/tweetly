import NextAuth, { DefaultSession } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
    } & DefaultSession['user'];
  }
}
