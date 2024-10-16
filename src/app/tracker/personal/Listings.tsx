'use client';

import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PersonalTransaction } from '@/lib/types';

export const columns: ColumnDef<PersonalTransaction>[] = [
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('category')}</div>
        ),
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Amount
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </div>
            );
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
            const amountA = parseFloat(rowA.getValue('amount'));
            const amountB = parseFloat(rowB.getValue('amount'));
            return amountA - amountB;
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));

            const formatted = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
            }).format(amount);

            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: 'note',
        header: 'Note',
        cell: ({ row }) => <div>{row.getValue('note')}</div>,
    },
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center cursor-pointer select-none"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Date
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </div>
            );
        },
        cell: ({ row }) => <div>{row.getValue('date')}</div>,
    },
];

const Listings = ({
    transactions,
}: {
    transactions: PersonalTransaction[];
}) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0, // initial page index
        pageSize: 10, // default page size
    });

    const table = useReactTable({
        data: transactions,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination, // update the pagination state
        state: {
            sorting,
            pagination,
        },
    });

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
                <div className="text-sm text-gray-500">
                    Showing {pagination.pageIndex * pagination.pageSize + 1}-
                    {Math.min(
                        (pagination.pageIndex + 1) * pagination.pageSize,
                        transactions.length
                    )}{' '}
                    of {transactions.length} results
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Listings;
