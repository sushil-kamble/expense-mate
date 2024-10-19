'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { addPersonalExpense } from '@/app/actions/personalExpense';
import { useState } from 'react';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export const formSchema = z.object({
    category: z.string().min(1, { message: 'Category must be selected.' }),
    amount: z.coerce
        .number()
        .refine((val) => Number(val) >= 1 && Number(val) <= 10000, {
            message: 'Amount must be between 1 and 10000.',
        }),
    note: z
        .string()
        .max(50, { message: 'Note cannot exceed 50 characters.' })
        .optional(),
    date: z.date(),
});

const PersonalExpenseForm = () => {
    const [loading, setLoading] = useState(false);
    const categories = [
        { value: 'others', label: 'Others' },
        { value: 'food', label: 'Food' },
        { value: 'transport', label: 'Transport' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'shopping', label: 'Shopping' },
        { value: 'bills', label: 'Bills' },
    ];

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            note: '',
            amount: '' as unknown as number,
            category: '',
            date: new Date(),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await addPersonalExpense(values);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Categories</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        {...field}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.value}
                                                    value={category.value}
                                                >
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Which category does this expense belong to?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Amount"
                                    {...field}
                                    type="number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                                <Input placeholder="Note" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full pl-3 text-left font-normal',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? 'Adding...' : 'Add Expense'}
                </Button>
            </form>
        </Form>
    );
};

export default PersonalExpenseForm;
