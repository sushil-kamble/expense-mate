import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

export default function Home() {
    return (
        <div className="container mx-auto my-10 p-5">
            <section className="text-center">
                <h1 className="text-8xl font-[900] mb-4">Sassy Saas</h1>
                <p className="text-lg mb-6">
                    Ultimate template for your future saas
                </p>
                <Link href={ROUTES.PROJECT.PERSONAL_EXPENSES}>
                    <Button>Get Started</Button>
                </Link>
            </section>
            <section className="mt-10">
                <h2 className="text-4xl font-bold mb-4">Features</h2>
                <ul className="list-disc list-inside text-left">
                    <li className="mb-2">Authentication with OAuth and JWT</li>
                    <li className="mb-2">Integrated database with Prisma</li>
                    <li className="mb-2">Customizable UI components</li>
                    <li className="mb-2">Server-side rendering with Next.js</li>
                    <li className="mb-2">API routes for backend logic</li>
                    <li className="mb-2">
                        Loading spinners and skeleton screens
                    </li>
                    <li className="mb-2">Responsive design</li>
                </ul>
            </section>
        </div>
    );
}
