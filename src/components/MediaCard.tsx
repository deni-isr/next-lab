import Image from 'next/image';
import Link from 'next/link';
import { MediaItem, Tag } from 'hybrid-types';
import { fetchTagsByMediaId } from '@/models/tagModel';

export default async function MediaCard({ item }: { item: MediaItem }) {
  const tags = await fetchTagsByMediaId(item.media_id);
  const uploadUrl = process.env.UPLOAD_URL || 'https://media2.edu.metropolia.fi/upload-api/uploads/';

  let displayDescription = item.description || "";
  if (item.description) {
    try {
      const parsed = JSON.parse(item.description);
      displayDescription = parsed.p || parsed.title || item.description;
    } catch (e) {}
  }

  return (
    <li className="border p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition">
      <Link href={`/single/${item.media_id}`}>
        <h3 className="font-bold text-lg mb-2 text-teal-700">{item.title}</h3>
        {item.filename && (
          <Image 
            src={uploadUrl + item.filename} 
            alt={item.title} 
            width={320} height={200} 
            className="rounded-md object-cover w-full h-48" 
          />
        )}
        <div className="flex flex-wrap gap-2 mt-3 mb-2">
          {tags.map((t: Tag, i: number) => (
            <span key={i} className="bg-teal-100 text-teal-700 text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">
              #{t.tag_name}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{displayDescription}</p>
      </Link>
    </li>
  );
}