import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { GroupMember } from '@/lib/types';
import { Settings } from 'lucide-react';
import ManageGroupMember from './ManageGroupMember';

function ManageGroup({ groupMembers }: { groupMembers: GroupMember[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <Settings size={16} />
                    Manage Group
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg ">
                <DialogHeader>
                    <DialogTitle>Manage Group</DialogTitle>
                </DialogHeader>
                <div className="mt-1 flex flex-col gap-2">
                    {groupMembers.map((member) => (
                        <ManageGroupMember key={member.id} member={member} />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ManageGroup;
