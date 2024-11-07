import { sql } from 'drizzle-orm';
import {
    boolean,
    integer,
    pgSchema,
    text,
    timestamp,
    varchar,
    decimal,
    numeric,
} from 'drizzle-orm/pg-core';
import { SCHEMAS } from '../constants';
import { users } from './users';
import createId from '@/lib/cuid';
import { number } from 'zod';

export const schema = pgSchema(SCHEMAS.GROUP_EXPENSES);

export const groups = schema.table('groups', {
    id: varchar({ length: 32 })
        .primaryKey()
        .$defaultFn(() => createId()),
    userId: text('user_id')
        .references(() => users.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    name: text().notNull(),
    description: text(),
    createdAt: timestamp('created_at')
        .default(sql`now()`)
        .notNull(),
    updatedAt: timestamp('updated_at'),
    isDeleted: boolean('is_deleted').default(false).notNull(),
});

export const members = schema.table('members', {
    id: varchar({ length: 32 })
        .primaryKey()
        .$defaultFn(() => createId()),
    name: text().notNull(),
    groupId: varchar({ length: 32 }).references(() => groups.id, {
        onDelete: 'cascade',
    }),
    userId: text('user_id')
        .references(() => users.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    createdAt: timestamp('created_at')
        .default(sql`now()`)
        .notNull(),
    updatedAt: timestamp('updated_at'),
    isDeleted: boolean('is_deleted').default(false).notNull(),
});

export const expenses = schema.table('expenses', {
    id: varchar({ length: 32 })
        .primaryKey()
        .$defaultFn(() => createId()),
    groupId: varchar({ length: 32 })
        .references(() => groups.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    payerId: varchar({ length: 32 })
        .references(() => members.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    note: text(),
    date: timestamp().default(sql`now()`),
    createdAt: timestamp('created_at')
        .default(sql`now()`)
        .notNull(),
    updatedAt: timestamp('updated_at'),
    isDeleted: boolean('is_deleted').default(false).notNull(),
});

export const expensesMembers = schema.table('expenses_members', {
    id: varchar({ length: 32 })
        .primaryKey()
        .$defaultFn(() => createId()),
    expenseId: varchar({ length: 32 })
        .references(() => expenses.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    memberId: varchar({ length: 32 })
        .references(() => members.id, {
            onDelete: 'cascade',
        })
        .notNull(),
    amount: numeric({ precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at')
        .default(sql`now()`)
        .notNull(),
    updatedAt: timestamp('updated_at'),
    isDeleted: boolean('is_deleted').default(false).notNull(),
});
