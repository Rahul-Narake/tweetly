import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/db';
import bcrypt from 'bcrypt';
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'email',
          type: 'text',
          placeholder: 'Enter email',
          required: true,
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: '',
          required: true,
        },
      },

      async authorize(credentials: any): Promise<any> {
        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials?.username },
            select: {
              password: true,
              id: true,
              name: true,
              email: true,
              isVerified: true,
            },
          });
          if (
            user &&
            user.password &&
            user.isVerified &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return {
              id: user.id,
              name: user.name,
              email: credentials.username,
            };
          }
        } catch (error: any) {
          console.log(error);
          throw new Error(error?.message);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
