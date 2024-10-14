import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="flex flex-col min-h-screen antialiased">
                    <Header />
                    <main className="grow my-3">{children}</main>
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
