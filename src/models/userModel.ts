import client from '@/lib/db';
import { User, UserWithNoPassword } from 'hybrid-types';

export const getUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM Users WHERE username = ?',
      args: [username]
    });

    if (result.rows.length === 0) return null;
    
    return result.rows[0] as unknown as User;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserById = async (id: number): Promise<UserWithNoPassword | null> => {
  try {
    const result = await client.execute({
      sql: 'SELECT user_id, username, email, created_at FROM Users WHERE user_id = ?',
      args: [id]
    });
    
    if (result.rows.length === 0) return null;
    
    return result.rows[0] as unknown as UserWithNoPassword;
  } catch (e) {
    console.error(e);
    return null;
  }
};