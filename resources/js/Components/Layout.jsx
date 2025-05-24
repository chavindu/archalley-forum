import React from 'react';
import { Link } from '@inertiajs/react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

export default function Layout({ children, user }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
} 