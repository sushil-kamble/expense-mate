import { sql } from 'drizzle-orm';
import {
    text,
    timestamp,
    uuid,
    integer,
    date,
    pgSchema,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { SCHEMAS } from '../constants';

export const personalExpenses = pgSchema(SCHEMAS.PERSONAL_EXPENSES);

export const personalExpensesTransactions = personalExpenses.table(
    'transactions',
    {
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
    }
);
