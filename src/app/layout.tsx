import './globals.css';
import { Noto_Serif, JetBrains_Mono } from 'next/font/google';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import { Viewport } from 'next';
import { AppSidebar } from '@/components/app-sidebar';
import NextTopLoaderWrapper from '@/components/NextTopLoaderWrapper';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const NotoSerif = Noto_Serif({
    variable: '--font-sans',
    subsets: ['latin'],
    display: 'swap',
});

const JetBrainsMono = JetBrains_Mono({
    variable: '--font-mono',
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${NotoSerif.variable} ${JetBrainsMono.variable}`}
        >
            <body className="antialiased">
                <Providers>
                    <AppSidebar />
                    <main className="flex flex-col min-h-screen w-full">
                        <Header />
                        <section className="px-1 md:px-4 grow my-3">
                            <NextTopLoaderWrapper />
                            {children}
                        </section>
                        <Footer />
                    </main>
                </Providers>
            </body>
        </html>
    );
}
