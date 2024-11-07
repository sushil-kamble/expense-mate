'use client';

import * as React from 'react';
import { BanknoteIcon, Home } from 'lucide-react';

import NavGroup from '@/components/nav-group';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    useSidebar,
} from '@/components/ui/sidebar';
import { StackIcon } from '@radix-ui/react-icons';
import { useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const data = {
    user: {
        name: 'Sushil',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    mainMenu: [
        {
            name: 'Home',
            url: '/',
            icon: Home,
        },
    ],
    projects: [
        {
            name: 'Personal Expenses',
            url: '/project/personal-expenses',
            icon: BanknoteIcon,
        },
    ],
};

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -100 },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useUser();
    const { open, setOpen, isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="p-0">
                <h2
                    className={`text-xl inline-flex items-center h-16 border-b ${open ? 'pl-3 gap-2' : 'justify-center'}`}
                >
                    <StackIcon
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => setOpen(true)}
                    />
                    <motion.span
                        initial={false}
                        animate={open ? 'open' : 'closed'}
                        variants={variants}
                        transition={{ duration: 0.5 }}
                    >
                        {open ? 'Sassy Sass' : ''}
                    </motion.span>
                </h2>
            </SidebarHeader>
            <SidebarContent>
                <NavGroup title="Main Menu" group={data.mainMenu} />
                <NavGroup title="Projects" group={data.projects} />
            </SidebarContent>
            <SidebarFooter
                className={`md:h-16 border-t p-2 ${!open && !isMobile ? 'justify-center self-center' : ''}`}
            >
                {user ? (
                    <NavUser
                        name={user.fullName ?? 'Guest'}
                        avatar={user.imageUrl}
                        email={user.emailAddresses[0].emailAddress}
                    />
                ) : (
                    <Button>Login</Button>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
