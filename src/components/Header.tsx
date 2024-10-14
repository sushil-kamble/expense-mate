'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';

const Header = () => {
    const { isLoaded, userId } = useAuth();

    return (
        <div className="border-b border-zinc-100 flex items-center sticky top-0 z-10 bg-white h-14">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h2 className="text-2xl font-bold">Expense Tracker</h2>
                </Link>
                {!isLoaded ? (
                    <Skeleton className="h-8 w-20" />
                ) : userId ? (
                    <UserButton />
                ) : (
                    <Link href="/sign-up">
                        <Button>Sign In</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
