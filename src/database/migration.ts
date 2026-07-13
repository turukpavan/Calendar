import { db } from './database';

export async function createTables() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      type TEXT NOT NULL,

      title TEXT NOT NULL,
      description TEXT,

      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,

      allDay INTEGER NOT NULL DEFAULT 0,

      repeatType TEXT NOT NULL DEFAULT 'none',

      completed INTEGER NOT NULL DEFAULT 0,

      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);
}