'use client';
import { addExpense } from '@/app/actions/groupExpense';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

type MembersExpense = {
    id: string;
    share: string;
};

function AddExpense({
    groupId,
    groupMembers,
    groupName,
}: {
    groupId: string;
    groupName: string;
    groupMembers: { id: string; name: string }[];
}) {
    const [amount, setAmount] = useState<string>('');
    const [payer, setPayer] = useState<string>('');
    const [memberExpenses, setMemberExpenses] = useState<MembersExpense[]>(
        groupMembers.map((member) => ({ id: member.id, share: '' }))
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();

    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const newMemberExpenses = memberExpenses.map((member) => {
            if (member.id === id) {
                return {
                    id,
                    share: e.target.value,
                };
            }
            return member;
        });
        setMemberExpenses(newMemberExpenses);
    };

    const handlePayerChange = (value: string) => {
        setPayer(value);
    };

    const handleAddExpense = async () => {
        setLoading(true);
        await addExpense({
            groupId,
            groupName,
            amount,
            date: new Date(),
            payerId: payer,
            members: memberExpenses,
            note: 'Expense added',
        });
        setLoading(false);
        toast({
            title: 'Expense Added Successfully',
        });
        reset();
        setOpen(false);
    };

    const reset = () => {
        setAmount('');
        setPayer('');
        setMemberExpenses(
            groupMembers.map((member) => ({ id: member.id, share: '' }))
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button tabIndex={0}>
                    <PlusIcon size={16} />
                    Add Transaction
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg ">
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>
                <Input
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    tabIndex={0}
                    type="number"
                />
                <div className="flex justify-end">
                    <ToggleGroup type="single">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                            Auto Mode
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle italic"
                        >
                            Manual Split
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <RadioGroup
                    defaultValue="option-one"
                    onValueChange={handlePayerChange}
                >
                    {groupMembers.map((member) => (
                        <div
                            key={member.id}
                            className={`flex items-center space-x-2 `}
                        >
                            <div className="basis-1/2 flex items-center gap-2">
                                <RadioGroupItem
                                    tabIndex={-1}
                                    value={member.id}
                                    id={member.id}
                                />
                                <Label
                                    htmlFor={member.id}
                                    className={`${payer === member.id ? 'text-red-500 font-bold' : ''}`}
                                >
                                    {member.name}
                                </Label>
                            </div>
                            <Input
                                placeholder="Enter Amount"
                                tabIndex={0}
                                onChange={(e) =>
                                    handleAmountChange(e, member.id)
                                }
                            />
                        </div>
                    ))}
                </RadioGroup>

                <DialogFooter className="sm:justify-start mt-2">
                    <Button
                        loading={loading}
                        variant="default"
                        onClick={handleAddExpense}
                        tabIndex={0}
                    >
                        <CheckIcon size={16} />
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddExpense;
