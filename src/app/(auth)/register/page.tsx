import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from './actions';
import { _createClient } from '@/app/supabase/client';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { signIn, auth, providerMap } from '../../../../auth';
import { Apple, Github, Key } from 'lucide-react';
import { FaGithub, FaGoogle, FaKey } from 'react-icons/fa';

export default async function Register() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 mt-2">
            {Object.values(providerMap).map((provider, index) => (
              <form
                key={index}
                action={async () => {
                  'use server';
                  await signIn(provider.id);
                }}
              >
                <Button
                  className="w-full mb-2"
                  variant="default"
                  type="submit"
                >
                  {provider.name === 'GitHub' ? (
                    <FaGithub className="mr-2" />
                  ) : (
                    <FaGoogle className="mr-2" />
                  )}{' '}
                  Sign in with {provider.name}
                </Button>
              </form>
            ))}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
