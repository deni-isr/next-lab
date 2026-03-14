import { registerAction } from '@/actions/auth';

export default function RegisterPage() {
  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">Luo tili (Register)</h1>

      <form 
        action={async (formData) => {
          'use server';
          await registerAction(formData);
        }} 
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Käyttäjänimi</label>
          <input name="username" type="text" required className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sähköposti</label>
          <input name="email" type="email" required className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salasana</label>
          <input name="password" type="password" required className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <button type="submit" className="bg-teal-500 text-white py-2 rounded-lg font-bold hover:bg-teal-600 transition mt-2">
          Rekisteröidy
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Onko sinulla jo tili? <a href="/login" className="text-teal-600 font-bold hover:underline">Kirjaudu tästä</a>
      </p>
    </main>
  );
}