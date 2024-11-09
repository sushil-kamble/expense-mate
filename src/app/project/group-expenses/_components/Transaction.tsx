import AmountPill from '@/components/AmountPill';
import { GroupTransaction } from '@/lib/types';
import React from 'react';

function Transaction({ transaction }: { transaction: GroupTransaction }) {
    return (
        <div className="grid grid-cols-6 border px-4 py-2 rounded-md">
            <div className="col-span-1">{transaction.payer.name}</div>
            <div className="col-span-1">{transaction.amount}</div>
            <div className="flex gap-2 items-center col-span-4 overflow-x-auto no-scrollbar">
                {transaction.members.map((member) => (
                    <AmountPill
                        key={member.id}
                        name={member.member.name}
                        amount={member.amount}
                        type="credit"
                    />
                ))}
            </div>
        </div>
    );
}

export default Transaction;
