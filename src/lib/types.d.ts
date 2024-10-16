export type PersonalTransaction = {
    id: string;
    category: string;
    amount: number;
    note: string | null;
    date: string;
};

export type PersonalExpenseBreakdown = {
    total: number;
    expensePerCategory: {
        category: string;
        total: number;
    }[];
};
