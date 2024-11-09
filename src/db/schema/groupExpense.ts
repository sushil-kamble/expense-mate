import { relations, sql } from 'drizzle-orm';
import {
    boolean,
    pgSchema,
    text,
    timestamp,
    varchar,
    numeric,
    index,
} from 'drizzle-orm/pg-core';
import { SCHEMAS } from '../constants';
import { users } from './users';
import createId from '@/lib/cuid';

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

export const expensesMembers = schema.table(
    'expenses_members',
    {
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
    },
    (table) => ({
        expenseMemberIdx: index('expense_member_idx').on(
            table.expenseId,
            table.memberId
        ),
    })
);

// Relations
export const groupsRelations = relations(groups, ({ one, many }) => ({
    user: one(users, {
        fields: [groups.userId],
        references: [users.id],
    }),
    expenses: many(expenses),
}));

export const membersRelation = relations(members, ({ one, many }) => ({
    group: one(groups, {
        fields: [members.groupId],
        references: [groups.id],
    }),
    user: one(users, {
        fields: [members.userId],
        references: [users.id],
    }),
    expenses: many(expenses),
}));

export const expensesRelations = relations(expenses, ({ many, one }) => ({
    members: many(expensesMembers),
    group: one(groups, {
        fields: [expenses.groupId],
        references: [groups.id],
    }),
    payer: one(members, {
        fields: [expenses.payerId],
        references: [members.id],
    }),
}));

export const expenseMembersRelations = relations(
    expensesMembers,
    ({ one }) => ({
        expense: one(expenses, {
            fields: [expensesMembers.expenseId],
            references: [expenses.id],
        }),
        member: one(members, {
            fields: [expensesMembers.memberId],
            references: [members.id],
        }),
    })
);
