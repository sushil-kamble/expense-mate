'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import ThemeSwitcher from './ThemeSwitcher';
import { LayersIcon } from '@radix-ui/react-icons';
import { SidebarTrigger } from './ui/sidebar';

const Header = () => {
    return (
        <div className="border-b flex items-center sticky top-0 z-10 h-16 px-4 md:px-0 bg-background">
            <div className="flex justify-between items-center w-full ml-2 mr-6">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <Link href="/" className="flex gap-2 items-center">
                        <LayersIcon className="h-8 w-8" />
                        <div>
                            <h2 className="text-xl font-bold">ExpenseMate</h2>
                            <p className="text-[10px]">
                                A minimalistic group & personal expense tracker
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <ThemeSwitcher />
                    <ClerkLoaded>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Link href="/sign-up">
                                <Button>Sign In</Button>
                            </Link>
                        </SignedOut>
                    </ClerkLoaded>
                </div>
            </div>
        </div>
    );
};

export default Header;
