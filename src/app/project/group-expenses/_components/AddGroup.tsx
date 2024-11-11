'use client';
import { addGroup } from '@/app/actions/groupExpense';
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
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function AddGroup() {
    const [members, setMembers] = useState<string[]>(['']);
    const [groupName, setGroupName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { toast } = useToast();
    const newInputRef = useRef<HTMLInputElement | null>(null);

    const addGroupMember = () => {
        setMembers([...members, '']);
    };

    useEffect(() => {
        if (newInputRef.current) {
            newInputRef.current.focus();
        }
    }, [members]);

    const handleMemberChange = (
        evt: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newMembers = [...members];
        newMembers[index] = evt.target.value;
        setMembers(newMembers);
    };

    const handleAddGroup = async () => {
        if (!groupName.trim() || members.some((member) => !member.trim())) {
            toast({
                title: 'Group name and members cannot be empty',
            });
            return;
        }

        setLoading(true);
        await addGroup(groupName, members);
        setLoading(false);
        toast({
            color: 'green',
            title: 'Group Added Successfully',
        });
        reset();
        setOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<SVGElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            addGroupMember();
        }
    };

    const reset = () => {
        setMembers(['']);
        setGroupName('');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button tabIndex={0}>
                    <PlusIcon size={16} />
                    Add Group
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg ">
                <DialogHeader>
                    <DialogTitle>Add Group</DialogTitle>
                </DialogHeader>
                <div className="mt-1">
                    <Input
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Group Name"
                        tabIndex={0}
                    />
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                    <Input placeholder="You" disabled tabIndex={-1} />
                    {members.map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Input
                                placeholder={'Name ' + Number(i + 1)}
                                onChange={(e) => handleMemberChange(e, i)}
                                tabIndex={0}
                            />
                            {i === members.length - 1 && (
                                <PlusIcon
                                    size={24}
                                    className="cursor-pointer"
                                    onClick={addGroupMember}
                                    onKeyDown={handleKeyDown}
                                    tabIndex={0}
                                    role="button"
                                    aria-label="Add group member"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <DialogFooter className="sm:justify-start mt-2">
                    <Button
                        loading={loading}
                        variant="default"
                        onClick={handleAddGroup}
                        tabIndex={0}
                    >
                        <CheckIcon size={16} />
                        Create Group
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddGroup;
