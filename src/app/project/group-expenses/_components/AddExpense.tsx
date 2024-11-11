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
import { memo, useEffect, useMemo, useState } from 'react';

type MembersExpense = {
    id: string;
    share: string;
};

type Mode = 'auto' | 'manual';

interface CalculateShareParams {
    mode?: Mode;
    total?: number;
    individual?: { id: string; share: number };
    newMemberExpenses?: MembersExpense[];
    manualMember?: { id: string; state: boolean }[];
}

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
    const [note, setNote] = useState<string>('');
    const [payer, setPayer] = useState<string>('');
    const [memberExpenses, setMemberExpenses] = useState<MembersExpense[]>(
        groupMembers.map((member) => ({ id: member.id, share: '' }))
    );
    const [mode, setMode] = useState<Mode>('auto');
    const [manualMemberExpenses, setManualMemberExpenses] = useState<
        { id: string; state: boolean }[]
    >(groupMembers.map((member) => ({ id: member.id, state: false })));
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!open) reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const { toast } = useToast();

    const submitChecker = useMemo(() => {
        const messages = [];
        let state = true;
        if (!payer) {
            messages.push('Select a payer');
            state = false;
        }
        if (!amount) {
            messages.push('Enter amount');
            state = false;
        }

        const totalShare = memberExpenses.reduce(
            (acc, member) => acc + parseFloat(member.share),
            0
        );
        const totalShareRounded =
            Math.round((totalShare + Number.EPSILON) * 100) / 100;

        if (Math.abs(totalShare - totalShareRounded) > 0.01) {
            messages.push('Individual share does not match total amount');
            state = false;
        }

        return { state, messages };
    }, [payer, amount, memberExpenses]);

    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const newShare = Math.max(
            0,
            Math.min(Number(e.target.value), Number(amount))
        );
        const newMemberExpenses = memberExpenses.map((member) => {
            if (member.id === id) {
                return {
                    id,
                    share: newShare.toString(),
                };
            }
            return member;
        });
        setMemberExpenses(newMemberExpenses);
        const manualMember = manualMemberExpenses.map((manual) => {
            if (manual.id === id) {
                return {
                    id,
                    state: true,
                };
            }
            return manual;
        });
        setManualMemberExpenses(manualMember);
        calculateShare({
            mode,
            individual: {
                id,
                share: parseFloat(e.target.value),
            },
            newMemberExpenses,
            manualMember,
        });
    };

    const handlePayerChange = (value: string) => {
        setPayer(value);
    };

    const handleModeChange = (val: Mode) => {
        setMode(val);
        if (val === 'auto') {
            setManualMemberExpenses((prev) =>
                prev.map((manual) => ({
                    id: manual.id,
                    state: false,
                }))
            );
            calculateShare({ mode: val, total: parseFloat(amount) });
        } else {
            setManualMemberExpenses((prev) =>
                prev.map((manual) => ({
                    id: manual.id,
                    state: true,
                }))
            );
        }
    };

    const handleTotalAmountChange = (
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAmount(evt.target.value);

        setManualMemberExpenses((prev) =>
            prev.map((manual) => ({
                ...manual,
                state: false,
            }))
        );

        calculateShare({ mode, total: parseFloat(evt.target.value) });
    };

    const calculateShare = ({
        total,
        individual,
        mode = 'auto',
        newMemberExpenses,
        manualMember,
    }: CalculateShareParams) => {
        if (mode !== 'auto') return;
        if (!total && !individual) return;
        if (total) {
            const equalShare = total / groupMembers.length;
            setMemberExpenses(
                groupMembers.map((member) => ({
                    id: member.id,
                    share: equalShare.toFixed(2),
                }))
            );
            return;
        }

        if (individual) {
            if (!manualMember || !newMemberExpenses) return;
            // Divide the total (amount) remaining amount equally where manual expense is false
            const manualExpIds = manualMember
                .filter((member) => member.state)
                .map((member) => member.id);
            const totalManualAmount = manualExpIds.reduce((acc, id) => {
                const member = newMemberExpenses.find(
                    (member) => member.id === id
                );
                return acc + Number(member?.share);
            }, 0);
            const remainingAmount = Number(amount) - totalManualAmount;
            const equalShare =
                remainingAmount / (groupMembers.length - manualExpIds.length);

            setMemberExpenses((prev) =>
                prev.map((member) => {
                    if (member.id === individual.id) {
                        return {
                            id: member.id,
                            share: isNaN(individual.share)
                                ? ''
                                : individual.share.toString(),
                        };
                    }
                    if (manualExpIds.includes(member.id)) {
                        return member;
                    }
                    return {
                        id: member.id,
                        share: equalShare.toFixed(2),
                    };
                })
            );
        }
    };

    const handleAddExpense = async () => {
        setLoading(true);
        const { status, message } = await addExpense({
            groupId,
            groupName,
            amount,
            date: new Date(),
            payerId: payer,
            members: memberExpenses,
            note,
        });
        setLoading(false);
        toast({
            title: message,
            className: status ? 'bg-credit' : 'bg-debit',
        });
        reset();
        setOpen(false);
    };

    const reset = () => {
        setAmount('');
        setMode('auto');
        setPayer('');
        setNote('');
        setMemberExpenses(
            groupMembers.map((member) => ({ id: member.id, share: '' }))
        );
        setManualMemberExpenses(
            groupMembers.map((member) => ({ id: member.id, state: false }))
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
                    onChange={handleTotalAmountChange}
                    placeholder="Enter Amount"
                    tabIndex={0}
                    type="number"
                />
                <div className="flex justify-end">
                    <ToggleGroup
                        type="single"
                        value={mode}
                        variant={'outline'}
                        onValueChange={(val: Mode) => handleModeChange(val)}
                    >
                        <ToggleGroupItem value="auto" aria-label="Toggle bold">
                            Auto Mode
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="manual"
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
                                type="number"
                                min={0}
                                max={Number(amount)}
                                value={
                                    memberExpenses.find(
                                        (exp) => exp.id === member.id
                                    )?.share || '0'
                                }
                                onChange={(e) =>
                                    handleAmountChange(e, member.id)
                                }
                            />
                        </div>
                    ))}
                </RadioGroup>

                <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                    tabIndex={0}
                />

                <div className="flex flex-col">
                    {submitChecker.messages.map((message, idx) => (
                        <p key={idx} className="text-destructive text-sm">
                            {message}
                        </p>
                    ))}
                </div>

                <DialogFooter className="sm:justify-start">
                    <Button
                        loading={loading}
                        variant="default"
                        onClick={handleAddExpense}
                        tabIndex={0}
                        disabled={!submitChecker.state}
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
