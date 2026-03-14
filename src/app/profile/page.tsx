import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getUserById } from '@/models/userModel';
import { logoutUser } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    redirect('/login');
  }

  
  let userId: number;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: number };
    userId = decoded.user_id;
  } catch (e) {
    redirect('/login');
  }

  
  const user = await getUserById(userId);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <main className="flex flex-col items-center mt-10 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Oma Profiili</h1>
        
        <div className="space-y-4 text-gray-700 mb-8">
          <p><span className="font-bold">Username:</span> {user.username}</p>
          <p><span className="font-bold">Email:</span> {user.email}</p>
          <p><span className="font-bold">Member since:</span> {new Date(user.created_at).toLocaleDateString('fi-FI')}</p>
        </div>

        {}
        <form action={logoutUser}>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition">
            Kirjaudu ulos (Logout)
          </button>
        </form>
      </div>
    </main>
  );
}