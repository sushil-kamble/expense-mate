'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { PersonalExpenseBreakdown } from '@/lib/types';
import { PersonalExpenseFormCategories } from '@/lib/constants';

const getChartConfig = () => {
    const chartConfig: { [key: string]: { label: string; color?: string } } = {
        expense: {
            label: 'Expense',
        },
    } satisfies ChartConfig;
    Object.entries(PersonalExpenseFormCategories).forEach(([key, value]) => {
        chartConfig[key] = {
            label: value.label,
            color: value.color,
        };
    });
    return chartConfig;
};

const ChartBreakdown = ({
    breakdown,
}: {
    breakdown: PersonalExpenseBreakdown;
}) => {
    const total = breakdown.total;
    const chartConfig = getChartConfig();
    const chartData = breakdown.expensePerCategory.map((item) => ({
        ...item,
        fill: chartConfig[item.category]?.color,
    }));
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Expense by category</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={getChartConfig()}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent prefixer="₹" />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-xl font-bold"
                                                >
                                                    ₹{total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ChartBreakdown;
