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
            <table className="table-fixed text-left w-full">
                <thead>
                    <tr className="[&>*]:text-sm [&>*]:font-medium">
                        <th className="md:w-[200px]">Payer</th>
                        <th className="md:w-[100px]">Amount</th>
                        <th className="md:w-full">Members</th>
                        <th className="md:w-[150px]">Note</th>
                        <th className="md:w-[200px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <Transaction
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListTransactions;
