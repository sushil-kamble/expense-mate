import { relations, sql } from 'drizzle-orm';
import {
    pgTable,
    text,
    timestamp,
    boolean,
    uuid,
    integer,
    date,
} from 'drizzle-orm/pg-core';

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

export const personalExpenses = pgTable('personal_expenses', {
    id: uuid().defaultRandom().notNull().unique(),
    userId: text('user_id')
        .references(() => users.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    category: text().notNull(),
    amount: integer().notNull(),
    note: text(),
    date: date()
        .default(sql`now()`)
        .notNull(),
    createdAt: timestamp('created_at')
        .default(sql`now()`)
        .notNull(),
    updatedAt: timestamp('updated_at'),
});
