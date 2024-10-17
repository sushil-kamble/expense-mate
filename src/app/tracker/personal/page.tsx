import React, { Suspense } from 'react';
import Form from './Form';
import ExpenseBreakdown from './ExpenseBreakdown';
import ListingWrapper from './ListingWrapper';
import Loading from './loading';

const PersonalExpense = async () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-0 gap-y-8 md:gap-y-0 justify-center">
            <div className="md:pb-4 md:pr-4 pl-0">
                <Form />
            </div>

            <Suspense fallback={<Loading classes="grid place-items-center" />}>
                <div className="md:pb-4 md:pl-4 pr-0">
                    <ExpenseBreakdown />
                </div>
            </Suspense>

            <div className="md:col-span-2 border-t py-4">
                <Suspense
                    fallback={<Loading classes="flex justify-center mt-6" />}
                >
                    <ListingWrapper />
                </Suspense>
            </div>
        </div>
    );
};

export default PersonalExpense;
