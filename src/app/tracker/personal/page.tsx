import React from 'react';
import Form from './Form';
import ExpenseBreakdown from './ExpenseBreakdown';
import Listings from './Listings';
import {
    getPersonalExpenses,
    getTotalExpenseAndExpensePerCategory,
} from '@/app/actions/personalExpense';

const PersonalExpense = async () => {
    const transactions = await getPersonalExpenses();
    const getBreakdown = await getTotalExpenseAndExpensePerCategory();
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 pl-0">
                    <Form />
                </div>
                <div className="p-4 pr-0">
                    <ExpenseBreakdown breakdown={getBreakdown} />
                </div>
                <div className="md:col-span-2 border-t py-4">
                    <Listings transactions={transactions} />
                </div>
            </div>
        </div>
    );
};

export default PersonalExpense;
