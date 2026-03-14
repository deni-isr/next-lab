'use client'; 

import { loginUser } from '@/actions/auth';
import { useState } from 'react';

export default function LoginPage() {
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
  const handleSubmit = async (formData: FormData) => {
    const result = await loginUser(formData);
    
    
    if (result?.error) {
      setErrorMessage(result.error);
    }
  };

  return (
    <section className="flex justify-center items-center mt-20">
      <div className="flex flex-col p-8 bg-white shadow-lg rounded-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">Login</h2>
        
        {}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {}
        <form action={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input type="text" name="username" id="username" placeholder="Syötä tunnuksesi" required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" name="password" id="password" placeholder="Syötä salasanasi" required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          
          <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200">
            Kirjaudu sisään
          </button>
        </form>
      </div>
    </section>
  );
}