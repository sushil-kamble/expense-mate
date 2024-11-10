import React from 'react';
import AddExpense from './AddExpense';
import { db } from '@/db';
import { members } from '@/db/schema/groupExpense';
import { and, eq, ne } from 'drizzle-orm';

async function AddExpenseWrapper({
    groupId,
    groupName,
}: {
    groupId: string;
    groupName: string;
}) {
    const groupMembers = await db
        .select({ id: members.id, name: members.name })
        .from(members)
        .where(and(eq(members.groupId, groupId), eq(members.isDeleted, false)))
        .orderBy(members.name);
    return (
        <AddExpense
            groupId={groupId}
            groupName={groupName}
            groupMembers={groupMembers}
        />
    );
}

export default AddExpenseWrapper;
