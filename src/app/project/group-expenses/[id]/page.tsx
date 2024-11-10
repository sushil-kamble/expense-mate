import React from 'react';
import { GroupTransaction } from '@/lib/types';
import GroupSummary from '../_components/GroupSummary';
import ListTransactions from '../_components/ListTransactions';
import { getGroupTransactions } from '@/app/actions/groupExpense';
import AddExpenseWrapper from '../_components/AddExpenseWrapper';

export const dynamic = 'force-dynamic';

async function Group({ params }: { params: { id: string } }) {
    const group = decodeURIComponent(params.id)?.split('-$-');
    const groupId = group[1];
    const groupName = group[0];

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
                    <AddExpenseWrapper
                        groupId={groupId}
                        groupName={groupName}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <GroupSummary
                    groupId={groupId}
                    groupName={groupName}
                    transactions={transactions}
                />
                <ListTransactions transactions={transactions} />
            </div>
        </div>
    );
}

export default Group;
