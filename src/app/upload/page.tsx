'use client';

import { uploadMedia } from '@/actions/media';
import { useState } from 'react';

export default function UploadPage() {
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <main className="flex justify-center mt-10 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">Lataa uusi media</h1>
        
        {msg && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{msg}</p>}

        <form action={async (formData) => {
          const result = await uploadMedia(formData);
          if (result?.error) setMsg(result.error);
        }} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Otsikko </label>
            <input name="title" type="text" required placeholder="Hieno kuva"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kuvaus </label>
            <textarea name="description" required placeholder="Kerro jotain kuvasta..."
              className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valitse tiedosto</label>
            <input name="file" type="file" accept="image/*,video/*" required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tägi</label>
            <input name="tag" type="text" placeholder="esim. kissa, maisema"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>

          <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition shadow-md">
            Lähetä (Upload)
          </button>
        </form>
      </div>
    </main>
  );
}