import { getTotalExpenseAndExpensePerCategory } from '@/app/actions/personalExpense';
import { formatCurrency } from '@/lib/utils';
import React from 'react';

const ExpenseBreakdown = async () => {
    const breakdown = await getTotalExpenseAndExpensePerCategory();

    return (
        <div>
            <div className="text-lg font-semibold border-b">
                Expense Breakdown
            </div>
            <div className="mt-4">
                <div className="flex justify-between">
                    <div className="text-lg">Total Expenses</div>
                    <div className="text-lg font-semibold">
                        {formatCurrency(breakdown.total)}
                    </div>
                </div>
                <div className="mt-2">
                    <div className="text-base border-b"> Categories</div>
                    <div className="flex flex-col gap-2 mt-2">
                        {breakdown.expensePerCategory.map((category) => (
                            <div
                                key={category.category}
                                className="flex justify-between text-sm"
                            >
                                <div className="capitalize ">
                                    {category.category}
                                </div>
                                <div className="font-medium">
                                    {formatCurrency(category.total)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseBreakdown;
