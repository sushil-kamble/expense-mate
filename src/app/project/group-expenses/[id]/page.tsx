import React from 'react';
import AddExpense from '../_components/AddExpense';
import { db } from '@/db';
import { members } from '@/db/schema/groupExpense';
import { eq } from 'drizzle-orm';
import { GroupTransaction } from '@/lib/types';
import GroupSummary from '../_components/GroupSummary';
import ListTransactions from '../_components/ListTransactions';
import { getGroupTransactions } from '@/app/actions/groupExpense';

export const dynamic = 'force-dynamic';

async function Group({ params }: { params: { id: string } }) {
    const group = decodeURIComponent(params.id)?.split('-$-');
    const groupId = group[1];
    const groupName = group[0];

    const groupMembers = await db
        .select({ id: members.id, name: members.name })
        .from(members)
        .where(eq(members.groupId, groupId));
    const transactions: GroupTransaction[] = await getGroupTransactions({
        groupId,
    });
    return (
        <div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-medium">Transactions</h2>
                        <p className="text-xs font-light">
                            List of all the transactions
                        </p>
                    </div>
                    <AddExpense
                        groupName={groupName}
                        groupId={groupId}
                        groupMembers={groupMembers}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <GroupSummary
                    groupName={groupName}
                    transactions={transactions}
                />
                <ListTransactions transactions={transactions} />
            </div>
        </div>
    );
}

export default Group;
