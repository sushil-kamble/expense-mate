'use client';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import type { Settlement } from '../group-calculations';
import Amount from '@/components/Amount';
import { Button } from '@/components/ui/button';

function Settlement({ settlement }: { settlement: Settlement }) {
    const [loading, setLoading] = useState(false);

    const handleSettle = async () => {
        setLoading(true);
        try {
            // Add settlement logic here
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Remove this line when adding real logic
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr className="hover:bg-slate-50 py-1">
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
