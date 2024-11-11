'use client';
import { handleDeleteTransaction } from '@/app/actions/groupExpense';
import AmountPill from '@/components/AmountPill';
import { Button } from '@/components/ui/button';
import { GroupTransaction } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function Transaction({ transaction }: { transaction: GroupTransaction }) {
    const pathname = usePathname();
    const group = decodeURIComponent(pathname.split('/').at(-1)!)?.split('-$-');
    const groupId = group[1];
    const groupName = group[0];
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        await handleDeleteTransaction(groupName, groupId, transaction.id);
        setLoading(false);
    };

    return (
        <tr className="hover:bg-secondary">
            <td>{transaction.payer.name}</td>
            <td>{transaction.amount}</td>
            <td className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {transaction.members.map((member) => (
                    <AmountPill
                        key={member.id}
                        name={member.member.name}
                        amount={member.amount}
                        type="credit"
                    />
                ))}
            </td>
            <td className="text-xs lg:text-sm font-light">
                {transaction.note}
            </td>
            <td>
                <Button
                    size={'sm'}
                    variant={'destructive'}
                    onClick={() => handleDelete()}
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </td>
        </tr>
    );
}

export default Transaction;
