import React from 'react';
import { Link } from '@inertiajs/react';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="font-bold text-xl text-gray-800">
                                    ArchAlley Forum
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
} 