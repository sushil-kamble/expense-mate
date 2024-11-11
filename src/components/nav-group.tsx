'use client';

import { type LucideIcon } from 'lucide-react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';

type Group = {
    name: string;
    url: string;
    icon: LucideIcon;
};

const NavGroup = ({ title, group }: { title: string; group: Group[] }) => {
    const { toggleSidebar, isMobile } = useSidebar();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {group.map((item: Group) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild tooltip={item.name}>
                            <Link
                                href={item.url}
                                onClick={() => isMobile && toggleSidebar()}
                            >
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default NavGroup;
