import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="antialiased">{children}</body>
            </html>
        </ClerkProvider>
    );
}
