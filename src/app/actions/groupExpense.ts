'use server';

import { db } from '@/db';
import { groups, members } from '@/db/schema/groupExpense';
import { createUserContext } from './auth';

export async function addGroup(groupName: string, groupMembers: string[]) {
    try {
        const group = await db
            .insert(groups)
            .values({
                name: groupName,
            })
            .returning({ id: groups.id });

        const groupId = group[0].id;
        await addGroupMembers(groupId, groupMembers);
    } catch (error) {
        console.log(error);
    }
}

const addGroupMembers = async (groupId: string, groupMembers: string[]) => {
    try {
        const { userId } = createUserContext();
        const memberValues = groupMembers.map((name) => ({
            name,
            groupId,
            userId,
        }));
        await db.insert(members).values(memberValues);
    } catch (error) {
        console.log(error);
    }
};
