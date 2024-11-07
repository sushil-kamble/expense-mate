import React, { Suspense } from 'react';
import Form from './_components/Form';
import ListingWrapper from './_components/ListingWrapper';
import ExpenseBreakdownLoading from './_components/ExpenseBreakdownLoading';
import ListingLoading from './_components/ListingLoading';
import BreakdownWrapper from './_components/BreakdownWrapper';

const PersonalExpense = async () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-0 gap-x-6 gap-y-4 justify-center">
            <div className="border p-4 rounded-lg">
                <Form />
            </div>

            <div className="border p-4 rounded-lg">
                <Suspense fallback={<ExpenseBreakdownLoading />}>
                    <BreakdownWrapper />
                </Suspense>
            </div>

            <div className="md:col-span-2 border p-4 rounded-lg">
                <Suspense fallback={<ListingLoading />}>
                    <ListingWrapper />
                </Suspense>
            </div>
        </div>
    );
};

export default PersonalExpense;
