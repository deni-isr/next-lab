import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { UserWithNoPassword, User } from 'hybrid-types';

export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const [rows] = await pool.execute<User[] & RowDataPacket[]>(
      'SELECT * FROM Users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (e) {
    console.error('getUserByUsername error', (e as Error).message);
    return null;
  }
};

export const getUserById = async (id: number): Promise<UserWithNoPassword | null> => {
  try {
    const [rows] = await pool.execute<UserWithNoPassword[] & RowDataPacket[]>(
      'SELECT user_id, username, email, created_at FROM Users WHERE user_id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (e) {
    console.error('getUserById error', (e as Error).message);
    return null;
  }
};