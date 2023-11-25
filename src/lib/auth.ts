'use server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import prisma from './prisma';

const login = async (username: string): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        name: username,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
};
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({ name: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;
          const user = await login(name);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.picture = user.imgUrl;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.img = token.img;
      }
      return session;
    },
  },
});
