'use server';

import { z } from 'zod';
import { formSchema } from '@/app/tracker/personal/Form';
import { db } from '@/db';
import { personalExpenses } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { createUserContext } from './auth';
import { NeonDbError } from '@neondatabase/serverless';
import { AuthError } from '@/lib/error';

export async function addPersonalExpense(values: z.infer<typeof formSchema>) {
    try {
        const { userId } = createUserContext();

        await db.insert(personalExpenses).values({
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
            id: personalExpenses.id,
            category: personalExpenses.category,
            amount: personalExpenses.amount,
            note: personalExpenses.note,
            date: personalExpenses.date,
        })
        .from(personalExpenses)
        .where(eq(personalExpenses.userId, userId))
        .orderBy(desc(personalExpenses.createdAt));
}

export async function getTotalExpenseAndExpensePerCategory() {
    const { userId } = createUserContext();

    const totalExpense = await db
        .select({
            total: sql<number>`cast(sum(${personalExpenses.amount}) as int)`,
        })
        .from(personalExpenses)
        .where(eq(personalExpenses.userId, userId));

    const expensePerCategory = await db
        .select({
            category: personalExpenses.category,
            total: sql<number>`cast(sum(${personalExpenses.amount}) as int)`,
        })
        .from(personalExpenses)
        .where(eq(personalExpenses.userId, userId))
        .groupBy(personalExpenses.category);

    return { total: totalExpense[0].total, expensePerCategory };
}
