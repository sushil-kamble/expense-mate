import { useState } from 'react';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <Button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800"
        >
            {theme === 'light' ? (
                <SunIcon className="w-8 h-8 text-yellow-500" />
            ) : (
                <MoonIcon className="w-8 h-8 text-gray-300" />
            )}
        </Button>
    );
};

export default ThemeSwitcher;
