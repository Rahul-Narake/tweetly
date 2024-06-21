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
              profile: true,
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
              image: user?.profile,
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
  secret:
    process.env.JWT_SECRET ||
    'f7eb09f3218f5e1262edc9c91f2c988e258c0ddeee9f273d4e3b7dd0bc47489a893b4f46ab9ef497e6ce8e339294b82844255c9358e01e3dea66310c63ddb0efb337a528c40894c54352e0a022b5e9434ca3be1aea6d208b6b3b62341e2640cc58f2620d0f3cccc0c861ed6ac648c0dd1dd36819c6f713cfd0a1dc7c40acf3b3640bc2ae1e76c17e5bf84183fad7ffc7cfb0c2a5af7be92efced221c55d6efa39795d3a22f08aa24ba997ac8ba25c57ebbe06838e639eb3d3120a4d478effa095c540b443e7209d2dbbd1e2958eec5b3b7fdae3629c0992616fa7d705dd1653d74fab267e549069f1025da656cb02372341651527ab3a8aa7afad38d0800981f',
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
