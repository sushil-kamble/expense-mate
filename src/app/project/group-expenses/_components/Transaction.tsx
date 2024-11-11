import AmountPill from '@/components/AmountPill';
import { Button } from '@/components/ui/button';
import { GroupTransaction } from '@/lib/types';

function Transaction({ transaction }: { transaction: GroupTransaction }) {
    return (
        <tr>
            <td>{transaction.payer.name}</td>
            <td>{transaction.amount}</td>
            <td className="flex gap-2 overflow-x-auto no-scrollbar">
                {transaction.members.map((member) => (
                    <AmountPill
                        key={member.id}
                        name={member.member.name}
                        amount={member.amount}
                        type="credit"
                    />
                ))}
            </td>
            <td>
                <Button size={'sm'} variant={'outline'}>
                    Edit
                </Button>
                <Button size={'sm'} variant={'outline'} className="ml-2">
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default Transaction;
