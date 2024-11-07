'use client';
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Navigation() {
    const pathname = usePathname();
    const paths = pathname.split('/');
    const currentRouteName = decodeURIComponent(paths[paths.length - 1]);
    const getGroupName = currentRouteName.split('-$-')[0];

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/project/group-expenses">Groups</Link>
                    </BreadcrumbItem>
                    {currentRouteName !== 'group-expenses' && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="capitalize">
                                    {getGroupName}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default Navigation;
