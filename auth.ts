import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

import { SupabaseAdapter } from '@auth/supabase-adapter';

export const config = {
  providers: [Google, GitHub],
  pages: {
    signIn: '/login',
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }),
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
