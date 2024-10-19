import React from 'react';

const ExpenseBreakdownLoading: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="flex justify-center gap-4 mb-4">
                <div className="w-20 h-5 bg-gray-300 rounded"></div>
                <div className="w-20 h-5 bg-gray-300 rounded"></div>
            </div>
            {/* Total Expenses */}
            <div className="flex justify-between">
                <div className="text-lg w-32 h-5 bg-gray-300 rounded"></div>
                <div className="text-lg font-semibold w-20 h-5 bg-gray-300 rounded"></div>
            </div>

            {/* Categories */}
            <div className="mt-4">
                <div className="text-base border-b w-24 h-5 bg-gray-300 rounded"></div>
                <div className="flex flex-col gap-2 mt-4">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center"
                        >
                            <div className="capitalize w-20 h-4 bg-gray-300 rounded"></div>
                            <div className="font-medium w-16 h-4 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpenseBreakdownLoading;
