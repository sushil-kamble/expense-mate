import React from 'react';
import Amount from './Amount';

interface AmountPillProps {
    name: string;
    amount: string;
    type: 'credit' | 'debit';
}

const AmountPill: React.FC<AmountPillProps> = ({ name, amount, type }) => {
    const bgColor = type === 'credit' ? 'bg-credit' : 'bg-debit';
    const absoluteAmount = Math.abs(Number(amount));

    return (
        <div className="flex items-center border rounded-md">
            <h3 className="text-sm bg-secondary px-1 rounded-l-sm">{name}</h3>
            <h3 className={`text-sm font-medium ${bgColor} px-1 rounded-r-sm`}>
                <Amount amount={absoluteAmount} />
            </h3>
        </div>
    );
};

export default AmountPill;
