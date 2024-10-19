import React, { FC } from 'react';
import Listings from './Listings';
import { getPersonalExpenses } from '@/app/actions/personalExpense';

const ListingWrapper: FC = async () => {
    const transactions = await getPersonalExpenses();

    return (
        <>
            <Listings transactions={transactions} />
        </>
    );
};

export default ListingWrapper;
