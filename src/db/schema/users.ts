// id
// username
// name
// created at
// level

import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  username: integer('username').notNull(),
  level: integer('level').default(1).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});
