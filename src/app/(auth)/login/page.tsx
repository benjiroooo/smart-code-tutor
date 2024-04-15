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
import { signIn, config, auth } from '../../../../auth';
import { redirect } from 'next/navigation';

async function getSession() {
  const session = await auth();
  return {
    session,
  };
}

export default async function Login() {
  const { session } = await getSession();

  // The user is already logged in, redirect to homepage.
  // Make sure is not the same URL to avoid an infinite loop!
  if (session) return redirect('/');
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
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            {Object.values(config.providers).map((provider, index) => (
              <form key={index} action={provider.authorization.url} method="POST">
                <Button className="flex flex-row gap-2" type="submit">
                  <span>Sign in with {provider.name}</span>
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
