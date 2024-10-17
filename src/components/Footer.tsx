import React from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
    return (
        <div className="border-t border-zinc-100 py-3 px-4 md:px-0">
            <div className="container mx-auto flex justify-between items-center">
                <p className="text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} Expense Tracker. All
                    rights reserved. Expense Tracker. All rights reserved.
                </p>
                <Button>Contact Us</Button>
            </div>
        </div>
    );
};
export default Footer;
