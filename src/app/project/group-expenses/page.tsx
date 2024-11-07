import React from 'react';
import AddGroup from './_components/AddGroup';
import GroupsList from './_components/GroupList';

const GroupExpenses = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="font-medium">Groups</h2>
                    <p className="text-xs font-light">List of all the groups</p>
                </div>
                <AddGroup />
            </div>
            <GroupsList />
        </div>
    );
};

export default GroupExpenses;
