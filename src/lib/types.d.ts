import exp from 'constants';

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

export type GroupTransaction = {
    date: Date | null;
    id: string;
    payerId: string;
    amount: string;
    note: string | null;
    members: {
        id: string;
        amount: string;
        member: {
            id: string;
            name: string;
        };
    }[];
    payer: {
        id: string;
        name: string;
    };
};

export type GroupMember = {
    id: string;
    name: string;
    isDeleted: boolean;
};
