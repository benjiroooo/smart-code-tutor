'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/app/supabase/server';

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  console.log(data)

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error(error.message);
    redirect('/error');
  }

  // revalidatePath('/', 'layout')
  redirect('/home');
}
