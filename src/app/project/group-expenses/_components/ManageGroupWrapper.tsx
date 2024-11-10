import { members } from '@/db/schema/groupExpense';
import ManageGroup from './ManageGroup';
import { db } from '@/db';
import { eq, ne, and } from 'drizzle-orm';
import { GroupMember } from '@/lib/types';

async function ManageGroupWrapper({
    groupId,
    groupName,
}: {
    groupId: string;
    groupName: string;
}) {
    const groupMembers: GroupMember[] = await db
        .select({
            id: members.id,
            name: members.name,
            isDeleted: members.isDeleted,
        })
        .from(members)
        .where(and(eq(members.groupId, groupId), ne(members.name, 'You')))
        .orderBy(members.name);
    return <ManageGroup groupMembers={groupMembers} />;
}

export default ManageGroupWrapper;
