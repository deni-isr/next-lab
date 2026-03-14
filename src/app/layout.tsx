
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers'; 
import { logoutUser } from '@/actions/auth'; 

export const metadata: Metadata = {
  title: 'Next Labs',
  description: 'Hybrid Apps 2026',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('session');

  return (
    <html lang="fi">
      <body className="bg-gray-50 text-black min-h-screen">
        <nav className="flex items-center justify-between bg-teal-600 p-6 shadow-lg text-white">
          <div className="flex items-center mr-6">
            <Link href="/" className="font-bold text-2xl tracking-tight hover:text-teal-200 transition">
              Next Labs
            </Link>
          </div>

          <ul className="flex space-x-6 items-center font-medium">
            <li>
              <Link href="/" className="hover:text-teal-200 transition">Home</Link>
            </li>

            {}
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/profile" className="hover:text-teal-200 transition">Profile</Link>
                </li>
                <li>
                  <Link href="/upload" className="hover:text-teal-200 transition">Upload</Link>
                </li>
                <li>
                  {}
                  <form action={logoutUser}>
                    <button type="submit" className="bg-teal-700 hover:bg-red-500 px-4 py-2 rounded-lg transition duration-300">
                      Logout
                    </button>
                  </form>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="bg-white text-teal-600 px-5 py-2 rounded-lg font-bold hover:bg-teal-100 transition">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="container mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}