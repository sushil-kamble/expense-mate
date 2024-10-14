import React from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="container mx-auto my-10 p-5">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Expense Tracker
                </h1>
                <p className="text-lg mb-6">
                    Track your expenses effortlessly and efficiently.
                </p>
                <Button>Get Started</Button>
            </section>
            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="list-disc list-inside">
                    <li className="mb-2">Easy expense tracking</li>
                    <li className="mb-2">Detailed reports</li>
                    <li className="mb-2">Secure and private</li>
                    <li className="mb-2">Multi-currency support</li>
                    <li className="mb-2">User-friendly interface</li>
                    <li className="mb-2">Real-time data synchronization</li>
                    <li className="mb-2">Customizable categories</li>
                    <li className="mb-2">Budget planning tools</li>
                    <li className="mb-2">Expense reminders</li>
                    <li className="mb-2">Mobile app available</li>
                </ul>
            </section>
            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <p className="mb-4">
                    Expense Tracker is designed to make managing your finances
                    as simple as possible. Just follow these easy steps:
                </p>
                <ol className="list-decimal list-inside">
                    <li className="mb-2">Sign up for an account</li>
                    <li className="mb-2">Add your income and expenses</li>
                    <li className="mb-2">Categorize your transactions</li>
                    <li className="mb-2">Review your reports</li>
                    <li className="mb-2">Adjust your budget as needed</li>
                </ol>
            </section>
            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
                <blockquote className="mb-4">
                    "Expense Tracker has completely changed the way I manage my
                    finances. It's so easy to use and the reports are incredibly
                    detailed."
                    <cite className="block mt-2">- Alex Johnson</cite>
                </blockquote>
                <blockquote className="mb-4">
                    "I love the budget planning tools. They help me stay on
                    track and save money every month."
                    <cite className="block mt-2">- Maria Garcia</cite>
                </blockquote>
                <blockquote className="mb-4">
                    "The mobile app is a game-changer. I can track my expenses
                    on the go!"
                    <cite className="block mt-2">- David Lee</cite>
                </blockquote>
            </section>
            <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-4">
                    Have questions or need support? Reach out to our team:
                </p>
                <ul className="list-disc list-inside">
                    <li className="mb-2">Email: support@expensetracker.com</li>
                    <li className="mb-2">Phone: (123) 456-7890</li>
                    <li className="mb-2">
                        Address: 123 Finance St, Money City, CA 12345
                    </li>
                </ul>
            </section>
        </div>
    );
}
