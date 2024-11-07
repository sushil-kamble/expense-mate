import React from 'react';
import AddExpense from '../_components/AddExpense';
import { db } from '@/db';
import { groups, members } from '@/db/schema/groupExpense';
import { eq } from 'drizzle-orm';

async function Group({ params }: { params: { id: string } }) {
    const groupId = decodeURIComponent(params.id)?.split('-$-')[1];
    const group = await db
        .select({
            name: groups.name,
        })
        .from(groups)
        .where(eq(groups.id, groupId));
    const groupMembers = await db
        .select({ id: members.id, name: members.name })
        .from(members)
        .where(eq(members.groupId, groupId));
    return (
        <div>
            <AddExpense groupId={groupId} groupMembers={groupMembers} />
        </div>
    );
}

export default Group;
