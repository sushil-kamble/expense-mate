import { sql } from 'drizzle-orm';
import {
    boolean,
    pgSchema,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';
import { SCHEMAS } from '../constants';
import { users } from './users';
import createId from '@/lib/cuid';

export const schema = pgSchema(SCHEMAS.GROUP_EXPENSES);

export const groups = schema.table('groups', {
    id: varchar({ length: 32 })
        .primaryKey()
        .$defaultFn(() => createId()),
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
