'use client';
import { Button } from '@/components/ui/button';

const Footer = () => {
    const handleContactUs = () => {
        alert('Thanks for contacting us');
    };
    return (
        <div className="border-t py-3 px-4 md:px-0">
            <div className="container mx-auto flex justify-between items-center">
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
