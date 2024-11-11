'use client';
import React, { useState } from 'react';
import type { Settlement } from '../group-calculations';
import Amount from '@/components/Amount';
import { Button } from '@/components/ui/button';
import { addExpense } from '@/app/actions/groupExpense';

function Settlement({
    settlement,
    groupId,
    groupName,
}: {
    settlement: Settlement;
    groupId: string;
    groupName: string;
}) {
    const [loading, setLoading] = useState(false);

    const handleSettle = async () => {
        setLoading(true);
        await addExpense({
            groupId,
            groupName,
            payerId: settlement.from.id,
            amount: settlement.amount.toString(),
            members: [
                { id: settlement.to.id, share: settlement.amount.toString() },
            ],
            date: new Date(),
            note: 'Settlement',
        });
        setLoading(false);
    };

    return (
        <tr>
            <td className="text-sm font-medium">{settlement.from.name}</td>
            <td className="text-sm font-medium">{settlement.to.name}</td>
            <td>
                <Amount
                    amount={settlement.amount}
                    className="text-sm font-bold"
                />
            </td>
            <td>
                <Button
                    variant="outline"
                    onClick={handleSettle}
                    disabled={loading}
                    size={'sm'}
                >
                    {loading ? 'Settling...' : 'Settle'}
                </Button>
            </td>
        </tr>
    );
}

export default Settlement;
