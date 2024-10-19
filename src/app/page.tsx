import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export default function Home() {
    return (
        <div className="container mx-auto my-10 p-5">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Expense Tracker
                </h1>
                <p className="text-lg mb-6">
                    Track your expenses effortlessly and efficiently.
                </p>
                <Link href={ROUTES.PROJECT.PERSONAL_EXPENSES}>
                    <Button>Get Started</Button>
                </Link>
            </section>
        </div>
    );
}
