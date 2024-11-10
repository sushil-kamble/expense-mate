'use server';

import { db } from '@/db';
import {
    expenses,
    expensesMembers,
    groups,
    members,
} from '@/db/schema/groupExpense';
import { createUserContext } from './auth';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function addGroup(groupName: string, groupMembers: string[]) {
    try {
        const { userId } = createUserContext();

        const group = await db
            .insert(groups)
            .values({
                name: groupName,
                userId,
            })
            .returning({ id: groups.id });

        const groupId = group[0].id;
        await addGroupMembers(groupId, groupMembers);

        revalidatePath('/project/group-expenses');
    } catch (error) {
        console.log(error);
    }
}

const addGroupMembers = async (groupId: string, groupMembers: string[]) => {
    try {
        const { userId } = createUserContext();
        const allMembers = [
            {
                name: 'You',
                groupId,
                userId,
            },
            ...groupMembers.map((name) => ({
                name,
                groupId,
                userId,
            })),
        ];
        await db.insert(members).values(allMembers);
    } catch (error) {
        console.log(error);
    }
};

type MembersExpense = {
    id: string;
    share: string;
};

export const addExpense = async ({
    groupId,
    groupName,
    payerId,
    amount,
    note,
    date,
    members,
}: {
    groupId: string;
    groupName: string;
    payerId: string;
    amount: string;
    note?: string;
    date?: Date;
    members: MembersExpense[];
}) => {
    try {
        const expense = await db
            .insert(expenses)
            .values({
                groupId,
                payerId,
                amount,
                note,
                date,
            })
            .returning({ id: expenses.id });
        const expenseId = expense[0].id;
        const expensesMembersData = members.map((member) => ({
            expenseId,
            memberId: member.id,
            amount: member.share,
        }));
        await db.insert(expensesMembers).values(expensesMembersData);
        revalidatePath(
            `/project/group-expenses/${encodeURIComponent(groupName)}-$-${groupId}`
        );
    } catch (error) {
        console.log(error);
    }
};

export const getGroupTransactions = async ({
    groupId,
}: {
    groupId: string;
}) => {
    const transactions = await db.query.expenses.findMany({
        columns: {
            id: true,
            payerId: true,
            amount: true,
            note: true,
            date: true,
        },
        with: {
            members: {
                columns: {
                    id: true,
                    amount: true,
                },
                with: {
                    member: {
                        columns: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            payer: {
                columns: {
                    id: true,
                    name: true,
                },
            },
        },
        where: (expenses, { eq }) => eq(expenses.groupId, groupId),
    });
    return transactions;
};

export const handleGroupMemberEdit = async (
    id: string,
    newName: string,
    groupId: string,
    groupName: string
) => {
    await db.update(members).set({ name: newName }).where(eq(members.id, id));
    revalidatePath(
        `/project/group-expenses/${encodeURIComponent(groupName)}-$-${groupId}`
    );
};

export const handleGroupMemberRemovalToggle = async (
    id: string,
    groupId: string,
    groupName: string
) => {
    const member = await db
        .select({ isDeleted: members.isDeleted })
        .from(members)
        .where(eq(members.id, id));

    await db
        .update(members)
        .set({ isDeleted: !member[0].isDeleted })
        .where(eq(members.id, id));

    revalidatePath(
        `/project/group-expenses/${encodeURIComponent(groupName)}-$-${groupId}`
    );
};
