'use server';

import { postUser, getUserByUsername } from '@/models/userModel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerAction(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!username || !password || !email) {
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await postUser({ 
      username, 
      email, 
      password: hashedPassword

    });

    if (!result) return;
  } catch (e) {
    console.error('Registration error:', e);
    return;
  }

  redirect('/login');
}

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      console.log('User not found');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Invalid password');
      return;
    }

    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.JWT_SECRET || 'default_secret'
    );

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

  } catch (e) {
    console.error('Login error:', e);
    return;
  }

  redirect('/');
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}