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
    payerId,
    amount,
    note,
    date,
    members,
}: {
    groupId: string;
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
    } catch (error) {
        console.log(error);
    }
};
