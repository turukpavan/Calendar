import { db } from './database';
export interface Schedule {
  id?: number;
  type: 'task' | 'event';
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  repeatType: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function insertSchedule(schedule: Schedule) {
  const now = new Date();

  let startDate = new Date(schedule.startDate);
  let endDate = new Date(schedule.endDate);

  if (schedule.allDay) {
    startDate.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    endDate.setHours(23, 59, 59, 999);
  }

  if (schedule.repeatType === 'daily') {
    endDate.setDate(endDate.getDate() + 30);
  }

  const createdAt = new Date().toISOString();

  return await db.execute(
    `
    INSERT INTO schedules (
      type,
      title,
      description,
      startDate,
      endDate,
      allDay,
      repeatType,
      completed,
      createdAt,
      updatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      schedule.type,
      schedule.title,
      schedule.description,
      startDate.toISOString(),
      endDate.toISOString(),
      schedule.allDay ? 1 : 0,
      schedule.repeatType,
      schedule.completed ? 1 : 0,
      createdAt,
      createdAt,
    ]
  );
}

export async function getSchedules(): Promise<Schedule[]> {
  const currentDate = new Date().toISOString();

  const result = await db.execute(
    `
    SELECT *
    FROM schedules
    WHERE
      (type = 'task' AND startDate > ?)
      OR
      (type = 'event' AND endDate > ?)
    `,
    [currentDate, currentDate]
  );

  return result.rows._array.map(row => ({
    id: Number(row.id),
    type: row.type as 'task' | 'event',
    title: String(row.title),
    description: String(row.description ?? ''),
    startDate: String(row.startDate),
    endDate: String(row.endDate),
    allDay: Boolean(row.allDay),
    repeatType: String(row.repeatType),
    completed: Boolean(row.completed),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt),
  }));
}