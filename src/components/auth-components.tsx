import { LogOut } from 'lucide-react';
import { signIn, signOut } from '../../auth';
import { Button } from './ui/button';

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <Button {...props}>Login</Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="w-full"
    >
      <Button
        variant="ghost"
        className="justify-start h-8 w-full p-0"
        {...props}
      >
        <LogOut className="h-4 w-4 mr-2 text-rose-500" />{' '}
        <span className="text-rose-500">Sign Out</span>
      </Button>
    </form>
  );
}
