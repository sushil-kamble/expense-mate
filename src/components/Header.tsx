import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
    return (
        <div className="border-b border-zinc-100 py-3 sticky top-0 z-10 bg-white">
            <div className="container mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold">Expense Tracker</h2>
                <Button>Sign In</Button>
            </div>
        </div>
    );
};
export default Header;
