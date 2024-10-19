'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClerkLoaded, ClerkLoading, UserButton, useAuth } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
    const { userId } = useAuth();

    return (
        <div className="border-b border-zinc-100 flex items-center sticky top-0 z-10 bg-white h-14 px-4 md:px-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h2 className="text-2xl font-bold">SAAS Projects</h2>
                </Link>
                <div className="flex gap-4 items-center">
                    <ThemeSwitcher />
                    <ClerkLoading>
                        <Skeleton className="h-8 w-20" />
                    </ClerkLoading>
                    <ClerkLoaded>
                        {userId ? (
                            <UserButton />
                        ) : (
                            <Link href="/sign-up">
                                <Button>Sign In</Button>
                            </Link>
                        )}
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    );
};

export default Header;
