'use server';

import { z } from 'zod';
import { formSchema } from '@/app/tracker/personal/Form';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { personalExpenses } from '@/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addPersonalExpense(values: z.infer<typeof formSchema>) {
    const { userId } = auth();
    if (!userId) {
        throw new Error('User not found');
    }
    await db.insert(personalExpenses).values({
        userId,
        category: values.category,
        amount: Number(values.amount),
        note: values.note,
        date: values.date.toISOString(),
    });

    revalidatePath('/tracker/personal');
}

export async function getPersonalExpenses() {
    const { userId } = auth();
    if (!userId) {
        throw new Error('User not found');
    }
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
        .orderBy(desc(personalExpenses.date));
}

export async function getTotalExpenseAndExpensePerCategory() {
    const { userId } = auth();
    if (!userId) {
        throw new Error('User not found');
    }
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
