import { getTotalExpenseAndExpensePerCategory } from '@/app/actions/personalExpense';
import React from 'react';
import Breakdown from './Breakdown';

const BreakdownWrapper = async () => {
    const breakdown = await getTotalExpenseAndExpensePerCategory();

    return <Breakdown breakdown={breakdown} />;
};

export default BreakdownWrapper;
