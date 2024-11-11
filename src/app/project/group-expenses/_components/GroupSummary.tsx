import { GroupTransaction } from '@/lib/types';
import GroupSettlementCalculator from '../group-calculations';
import AmountPill from '@/components/AmountPill';
import Amount from '@/components/Amount';
import ManageGroupWrapper from './ManageGroupWrapper';
import Settlement from './Settlement';

function GroupSummary({
    groupId,
    transactions,
    groupName,
}: {
    groupId: string;
    transactions: GroupTransaction[];
    groupName: string;
}) {
    const settlements =
        GroupSettlementCalculator.calculateSettlements(transactions);

    return (
        <div className="border px-4 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-6 pb-2 gap-y-2 lg:gap-y-0">
                <div className="w-full col-span-1 lg:border-r lg:pr-2 pt-2">
                    <h2
                        className="text-lg font-light line-clamp-1"
                        title={groupName}
                    >
                        {groupName}
                    </h2>
                    <p className="text-3xl font-medium mb-2">
                        <Amount
                            showDecimals
                            amount={settlements.totalGroupExpense}
                        />
                    </p>
                    <ManageGroupWrapper
                        groupName={groupName}
                        groupId={groupId}
                    />
                </div>

                <div className="col-span-3 px-4 ">
                    <table className="text-center table-fixed w-full">
                        <thead>
                            <tr className="text-sm pb-4">
                                <th>From</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {settlements.settlements.map((settlement, idx) => (
                                <Settlement
                                    groupId={groupId}
                                    groupName={groupName}
                                    key={idx}
                                    settlement={settlement}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-span-2 lg:border-l lg:pl-2 pt-2">
                    <h2 className="text-lg font-light line-clamp-1">
                        Total Settlements
                    </h2>
                    <hr className="mt-1 mb-3" />
                    <div className="flex flex-wrap gap-x-4 gap-y-1  h-fit w-full">
                        {settlements.memberBalances.map((member) => (
                            <AmountPill
                                key={member.memberId}
                                name={member.name}
                                amount={member.amount + ''}
                                type={
                                    Number(member.amount) > 0
                                        ? 'credit'
                                        : 'debit'
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupSummary;
