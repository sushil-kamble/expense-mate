import React from 'react';
import AddGroup from './_components/AddGroup';

const GroupExpenses = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-medium">Groups</h2>
                    <p className="text-xs font-light">List of all the groups</p>
                </div>
                <AddGroup />
            </div>
        </div>
    );
};

export default GroupExpenses;
