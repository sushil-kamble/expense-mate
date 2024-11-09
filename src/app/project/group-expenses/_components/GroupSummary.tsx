import { GroupTransaction } from '@/lib/types';
import React from 'react';
import GroupSettlementCalculator from '../group-calculations';
import AmountPill from '@/components/AmountPill';
import { ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Amount from '@/components/Amount';

function GroupSummary({
    transactions,
    groupName,
}: {
    transactions: GroupTransaction[];
    groupName: string;
}) {
    const settlements =
        GroupSettlementCalculator.calculateSettlements(transactions);
    return (
        <div className="border p-4 rounded-lg">
            <div className="flex items-center gap-4">
                <div className="md:max-w-[240px]">
                    <h2
                        className="text-lg font-light line-clamp-1"
                        title={groupName}
                    >
                        {groupName}
                    </h2>
                    <p className="text-3xl font-medium">
                        <Amount
                            showDecimals
                            amount={settlements.totalGroupExpense}
                        />
                    </p>
                </div>
                <div>
                    <ChevronRight size={32} className="text-primary/40" />
                </div>
                <div className="flex flex-col">
                    {settlements.settlements.map((settlement, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-8 gap-x-4 items-center"
                        >
                            <h3 className="col-span-2">
                                {settlement.from.name}
                            </h3>
                            <ChevronRight size={16} className="col-span-1" />
                            <h3 className="col-span-2">{settlement.to.name}</h3>
                            <Amount
                                amount={settlement.amount}
                                className="col-span-1"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-8 flex items-center gap-4 mt-2">
                <span className="font-light">Total Settlement</span>
                <ChevronRight size={16} />
                {settlements.memberBalances.map((member) => (
                    <AmountPill
                        key={member.memberId}
                        name={member.name}
                        amount={member.amount + ''}
                        type={Number(member.amount) > 0 ? 'credit' : 'debit'}
                    />
                ))}
            </div>
            <div className="mt-2">
                <Button variant={'outline'}>
                    <Settings size={16} />
                    Manage Group
                </Button>
            </div>
        </div>
    );
}

export default GroupSummary;
