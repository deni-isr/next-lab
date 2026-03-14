import client from '@/lib/db';
import { Tag } from 'hybrid-types';

export const postTag = async (tag_name: string, media_id: number) => {
  try {
    await client.execute({
      sql: 'INSERT INTO Tags (tag_name) VALUES (?) ON CONFLICT(tag_name) DO UPDATE SET tag_name=tag_name',
      args: [tag_name]
    });

    const tagResult = await client.execute({
      sql: 'SELECT tag_id FROM Tags WHERE tag_name = ?',
      args: [tag_name]
    });
    
    const tag_id = tagResult.rows[0].tag_id;

    await client.execute({
      sql: 'INSERT INTO MediaItemTags (media_id, tag_id) VALUES (?, ?)',
      args: [media_id, tag_id]
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const fetchTagsByMediaId = async (media_id: number): Promise<Tag[]> => {
  try {
    const result = await client.execute({
      sql: 'SELECT Tags.tag_name FROM Tags JOIN MediaItemTags ON Tags.tag_id = MediaItemTags.tag_id WHERE MediaItemTags.media_id = ?',
      args: [media_id]
    });
    return (result.rows as unknown as Tag[]) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};