import React from 'react';
import Navigation from './_components/Navigation';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navigation />
            <hr className="mb-2" />
            {children}
        </div>
    );
}
