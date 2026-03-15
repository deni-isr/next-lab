'use server';

import { postMedia, deleteMedia, fetchAllMedia } from '@/models/mediaModel';
import { postTag } from '@/models/tagModel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import MediaCard from '@/components/MediaCard';

export async function uploadMedia(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return { error: 'Sinun täytyy kirjautua sisään' };
  }

  try {
    // Жестко задаем ссылку на случай, если Vercel "забудет" переменную
    const uploadServerUrl = process.env.UPLOAD_SERVER || 'https://media2.edu.metropolia.fi/upload-api/api/v1';
    
    const uploadResponse = await fetch(uploadServerUrl + '/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    const uploadResult = await uploadResponse.json();
    
    // Логируем ответ, чтобы видеть его в Vercel Logs, если что-то пойдет не так
    console.log('Upload server response:', uploadResult);

    if (!uploadResponse.ok) {
      return { error: uploadResult.message || 'Upload failed' };
    }

    const { filename, filesize, media_type } = uploadResult.data;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as { user_id: number };

    const newMediaId = await postMedia({
      user_id: decoded.user_id,
      filename,
      filesize,
      media_type,
      title,
      description,
    });

    const tag = formData.get('tag') as string;
    if (newMediaId && tag) {
      await postTag(tag, newMediaId);
    }

  } catch (e) {
    console.error('Lataus virhe:', e);
    return { error: 'Palvelinvirhe latauksessa' };
  }

  redirect('/');
}

export async function deleteMediaAction(media_id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return { error: 'Kirjaudu sisään ensin' };

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as { user_id: number };

    const success = await deleteMedia(media_id, decoded.user_id);
    
    if (!success) {
      return { error: 'Poisto epäonnistui' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'Virhe poistettaessa' };
  }

  redirect('/');
}

export async function fetchNextPage(page: number) {
  const items = await fetchAllMedia(page, 6);
  if (!items || items.length === 0) return null;

  return items.map((item) => <MediaCard key={item.media_id} item={item} />);
}