'use server'; 

import { getUserByUsername } from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Käyttäjätunnus ja salasana vaaditaan' };
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return { error: 'Käyttäjää ei löytynyt' };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { error: 'Väärä salasana' };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET puuttuu .env.local -tiedostosta!');
    return { error: 'Palvelinvirhe' };
  }

  const token = jwt.sign({ user_id: user.user_id,}, secret, {
    expiresIn: '24h',
  });

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, 
    path: '/',
  });

  redirect('/profile');
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}