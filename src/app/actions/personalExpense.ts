'use server';

import { z } from 'zod';
import { formSchema } from '@/app/project/personal-expenses/_components/Form';
import { db } from '@/db';
import { personalExpensesTransactions } from '@/db/schema/personalExpense';
import { desc, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createUserContext } from './auth';
import { NeonDbError } from '@neondatabase/serverless';
import { AuthError } from '@/lib/error';

export async function addPersonalExpense(values: z.infer<typeof formSchema>) {
    try {
        const { userId } = createUserContext();

        await db.insert(personalExpensesTransactions).values({
            userId,
            category: values.category,
            amount: Number(values.amount),
            note: values.note,
            date: values.date.toISOString(),
        });

        revalidatePath('/tracker/personal');
    } catch (error) {
        if (error instanceof AuthError) {
            throw new Error(`Auth Error: ${error.message}`);
        } else if (error instanceof NeonDbError) {
            throw new Error(`Database error: ${error.message}`);
        } else {
            throw new Error(
                'An unexpected error occurred. Please try again later.'
            );
        }
    }
}

export async function getPersonalExpenses() {
    const { userId } = createUserContext();

    return await db
        .select({
            id: personalExpensesTransactions.id,
            category: personalExpensesTransactions.category,
            amount: personalExpensesTransactions.amount,
            note: personalExpensesTransactions.note,
            date: personalExpensesTransactions.date,
        })
        .from(personalExpensesTransactions)
        .where(eq(personalExpensesTransactions.userId, userId))
        .orderBy(desc(personalExpensesTransactions.createdAt));
}

export async function getTotalExpenseAndExpensePerCategory() {
    const { userId } = createUserContext();

    const totalExpense = await db
        .select({
            total: sql<number>`cast(sum(${personalExpensesTransactions.amount}) as int)`,
        })
        .from(personalExpensesTransactions)
        .where(eq(personalExpensesTransactions.userId, userId));

    const expensePerCategory = await db
        .select({
            category: personalExpensesTransactions.category,
            total: sql<number>`cast(sum(${personalExpensesTransactions.amount}) as int)`,
        })
        .from(personalExpensesTransactions)
        .where(eq(personalExpensesTransactions.userId, userId))
        .groupBy(personalExpensesTransactions.category);

    return { total: totalExpense[0].total, expensePerCategory };
}
