import { fetchMediaById } from '@/models/mediaModel';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { deleteMediaAction } from '@/actions/media';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SingleMediaPage({ params }: Props) {
  const resolvedParams = await params;
  const mediaItem = await fetchMediaById(Number(resolvedParams.slug));

  if (!mediaItem) {
    notFound();
  }

  
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  let currentUserId: number | null = null;

  if (token) {
    try {
      const secret = process.env.JWT_SECRET || '';
      const decoded = jwt.verify(token, secret) as { user_id: number };
      currentUserId = decoded.user_id;
    } catch (e) {
      console.error('JWT verify error', e);
    }
  }

  
  const uploadUrl = process.env.UPLOAD_URL || 'https://media2.edu.metropolia.fi/upload-api/uploads/';

  
  let displayDescription = mediaItem.description || "";
  if (mediaItem.description) {
    try {
      const parsed = JSON.parse(mediaItem.description);
      displayDescription = parsed.p || parsed.title || mediaItem.description;
    } catch (e) {
      // Оставляем как есть
    }
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">
          &larr; Takaisin listaan (Back)
        </Link>

        {currentUserId === mediaItem.user_id && (
          <form action={async () => {
            'use server';
            await deleteMediaAction(mediaItem.media_id);
          }}>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-bold">
              Poista (Delete)
            </button>
          </form>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-6 text-teal-800">{mediaItem.title}</h1>

      <div className="flex justify-center bg-black rounded-2xl overflow-hidden shadow-2xl min-h-[300px]">
        {}
        {mediaItem.media_type.includes('video') ? (
          <video 
            src={uploadUrl + mediaItem.filename} 
            controls 
            className="max-w-full max-h-[70vh]"
          />
        ) : (
          <Image
            src={uploadUrl + mediaItem.filename}
            alt={mediaItem.title || 'Media'}
            width={1280}
            height={720}
            className="object-contain max-h-[70vh] w-auto h-auto"
            priority
          />
        )}
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-2">Kuvaus (Description)</h3>
        <p className="text-xl text-gray-800 leading-relaxed">{displayDescription}</p>
        
        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between text-sm text-gray-400">
          <p>Tyyppi: {mediaItem.media_type}</p>
          <p>Lisätty: {new Date(mediaItem.created_at).toLocaleDateString('fi-FI')}</p>
        </div>
      </div>
    </main>
  );
}