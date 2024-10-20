'use client';
import { Button } from '@/components/ui/button';

const Footer = () => {
    const handleContactUs = () => {
        alert('Thanks for contacting us');
    };
    return (
        <div className="border-t md:h-16 flex items-center">
            <div className="p-4 w-full flex justify-between gap-4 items-center">
                <p className="text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} Saasy Saas. All rights
                    reserved. Saasy Saas. All rights reserved.
                </p>
                <Button onClick={handleContactUs}>Contact Us</Button>
            </div>
        </div>
    );
};
export default Footer;
