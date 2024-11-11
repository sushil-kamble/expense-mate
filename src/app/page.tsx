import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import {
    BanknoteIcon,
    GroupIcon,
    LockIcon,
    MonitorSmartphoneIcon,
    SunMoonIcon,
} from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Home() {
    const features = [
        {
            icon: 'lock',
            title: 'Google & Email Authentication by Clerk',
        },
        {
            icon: 'banknote',
            title: 'Personal Expense Tracker',
        },
        {
            icon: 'group',
            title: 'Smart Group Expense Splitter',
        },
        {
            icon: 'coins',
            title: 'Smart Group settlement',
        },
        {
            icon: 'monitor-smartphone',
            title: 'Responsive design',
        },
        {
            icon: 'sun-moon',
            title: 'Dark Mode',
        },
        {
            icon: 'cpu',
            title: 'Modern Technologies',
        },
        {
            icon: 'layout-dashboard',
            title: 'Minimal UI',
        },
        {
            icon: 'server',
            title: 'Server Side Rendering',
        },
    ];
    return (
        <div className="container mx-auto my-10 p-5">
            <section className="text-center">
                <h1 className="text-8xl font-[900] mb-4">Expense Mate</h1>
                <p className="text-lg mb-6">
                    A minimalistic personal expense tracker and a smart group
                    expense splitter built with nextgen technologies
                </p>
                <div className="flex items-center justify-center gap-2">
                    <Link href={ROUTES.PROJECT.PERSONAL_EXPENSES}>
                        <Button>Personal Expense</Button>
                    </Link>
                    <Link href={ROUTES.PROJECT.GROUP_EXPENSES}>
                        <Button>Group Expense</Button>
                    </Link>
                    <Link href="#">
                        <Button variant="outline">
                            <GitHubLogoIcon className="h-6 w-6" />
                            View on GitHub
                        </Button>
                    </Link>
                </div>
            </section>
            <section className="mt-10 md:mt-20">
                <h2 className="text-center text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-lg"
                        >
                            <Icon name={feature.icon} />
                            <p className="font-semibold">{feature.title}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mt-10 md:mt-20 text-center">
                <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                    Proudly Open Source
                </h2>
                <p className="mt-4 text-lg">
                    Expense Mate is open source and available on GitHub. Feel
                    free to contribute!
                </p>
                <div className="mt-4">
                    <Link href="#">
                        <Button variant="outline">
                            <GitHubLogoIcon className="h-6 w-6" />
                            View on GitHub
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
