import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { ThemeProvider } from './theme-provider';
import { SidebarProvider } from './ui/sidebar';

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
                <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
        </ClerkProvider>
    );
};

export default Providers;
