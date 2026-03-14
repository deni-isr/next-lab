import client from '@/lib/db';
import { MediaItem } from 'hybrid-types';

export const fetchAllMedia = async (page: number = 1, limit: number = 6): Promise<MediaItem[] | null> => {
  try {
    const offset = (page - 1) * limit;
    const result = await client.execute({
      sql: 'SELECT * FROM MediaItems ORDER BY created_at DESC LIMIT ? OFFSET ?',
      args: [limit, offset]
    });
    return (result.rows as unknown as MediaItem[]) || [];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchMediaById = async (id: number): Promise<MediaItem | null> => {
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM MediaItems WHERE media_id = ?',
      args: [id]
    });
    return (result.rows[0] as unknown as MediaItem) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const postMedia = async (
  target: Omit<MediaItem, 'media_id' | 'created_at' | 'thumbnail' | 'screenshots'>
) => {
  try {
    const result = await client.execute({
      sql: 'INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description) VALUES (?, ?, ?, ?, ?, ?)',
      args: [target.user_id, target.filename, target.filesize, target.media_type, target.title, target.description]
    });
    return Number(result.lastInsertRowid);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteMedia = async (media_id: number, user_id: number) => {
  try {
    const result = await client.execute({
      sql: 'DELETE FROM MediaItems WHERE media_id = ? AND user_id = ?',
      args: [media_id, user_id]
    });
    return result.rowsAffected > 0;
  } catch (e) {
    console.error(e);
    return false;
  }
};