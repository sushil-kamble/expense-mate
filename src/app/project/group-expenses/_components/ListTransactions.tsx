import { GroupTransaction } from '@/lib/types';
import React from 'react';
import Transaction from './Transaction';

function ListTransactions({
    transactions,
}: {
    transactions: GroupTransaction[];
}) {
    return (
        <div>
            <ul className="flex flex-col gap-2">
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <Transaction transaction={transaction} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListTransactions;
