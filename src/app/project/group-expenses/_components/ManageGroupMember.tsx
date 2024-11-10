'use client';
import {
    handleGroupMemberEdit,
    handleGroupMemberRemovalToggle,
} from '@/app/actions/groupExpense';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GroupMember } from '@/lib/types';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface ManageGroupMemberProps {
    member: GroupMember;
}

const ManageGroupMember: React.FC<ManageGroupMemberProps> = ({ member }) => {
    const pathname = usePathname();
    const group = decodeURIComponent(pathname.split('/').at(-1)!)?.split('-$-');
    const groupId = group[1];
    const groupName = group[0];
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState(member.name);
    const [saveLoading, setSaveLoading] = useState(false);
    const [toggleLoading, setToggleLoading] = useState(false);

    const handleSave = async () => {
        setSaveLoading(true);
        await handleGroupMemberEdit(member.id, name, groupId, groupName);
        setEditable(false);
        setSaveLoading(false);
    };
    const handleToggle = async () => {
        setToggleLoading(true);
        await handleGroupMemberRemovalToggle(member.id, groupId, groupName);
        setToggleLoading(false);
    };

    return (
        <div className="flex items-center justify-between gap-2">
            {editable ? (
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSave();
                        }
                    }}
                />
            ) : (
                <h3>{name}</h3>
            )}
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    tabIndex={0}
                    onClick={() =>
                        editable ? handleSave() : setEditable(true)
                    }
                    disabled={saveLoading || toggleLoading}
                >
                    {saveLoading ? 'Saving...' : editable ? 'Save' : 'Edit'}
                </Button>
                <Button
                    variant="outline"
                    tabIndex={0}
                    onClick={() => handleToggle()}
                    disabled={saveLoading || toggleLoading}
                >
                    {toggleLoading
                        ? 'Processing...'
                        : member.isDeleted
                          ? 'Restore'
                          : 'Delete'}
                </Button>
            </div>
        </div>
    );
};

export default ManageGroupMember;
