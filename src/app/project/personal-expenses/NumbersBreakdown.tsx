import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonalExpenseBreakdown } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

const NumbersBreakdown = ({
    breakdown,
}: {
    breakdown: PersonalExpenseBreakdown;
}) => {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Expense by category</CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
                <div className="flex justify-between">
                    <div className="text-base">Total Expenses</div>
                    <div className="text-base font-semibold">
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
            </CardContent>
        </Card>
    );
};

export default NumbersBreakdown;
