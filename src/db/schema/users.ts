import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    uuid: uuid('uuid').defaultRandom().notNull().unique(),
    username: text('username'),
    email: text('email').notNull(),
    phone: text('phone'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    profileImage: text('profile_image'),
    createdAt: timestamp('created_at').default(sql`now()`),
    updatedAt: timestamp('updated_at'),
    isDeleted: boolean('is_deleted').notNull().default(false),
});
