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
import { login } from './actions';
import { signIn, auth, providerMap } from '../../../../auth';
import { redirect } from 'next/navigation';
import { FaGithub, FaGoogle, FaKey } from 'react-icons/fa';

export default async function Login() {
  const session = await auth();
  if (session?.user) redirect('/home');
  return (
    <div className="flex flex-1 items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.values(providerMap).map((provider, index) => (
              <form
                key={index}
                action={async () => {
                  'use server';
                  await signIn(provider.id);
                }}
              >
                <Button className="w-full" variant="default" type="submit">
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
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
