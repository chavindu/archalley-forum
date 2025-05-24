import React from 'react';
import { Link } from '@inertiajs/react';

// Heroicons
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <header className="bg-light-bg border-b border-gray-200 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Primary Nav */}
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link 
                                href="/" 
                                className="font-bold text-xl text-light-text-primary hover:text-primary transition-colors duration-200"
                            >
                                ArchAlley Forum
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <Link
                                href="/"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-light-text-primary border-b-2 border-primary"
                            >
                                Home
                            </Link>
                            <Link
                                href="/discussions"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-light-text-secondary hover:text-light-text-primary hover:border-gray-300 border-b-2 border-transparent transition-colors duration-200"
                            >
                                Discussions
                            </Link>
                            <Link
                                href="/members"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-light-text-secondary hover:text-light-text-primary hover:border-gray-300 border-b-2 border-transparent transition-colors duration-200"
                            >
                                Members
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Search Icon */}
                        <button
                            type="button"
                            className="p-1.5 rounded-full text-light-text-secondary hover:text-light-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* Notifications Icon */}
                        <button
                            type="button"
                            className="p-1.5 rounded-full text-light-text-secondary hover:text-light-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {/* User Profile Icon */}
                        <button
                            type="button"
                            className="p-1.5 rounded-full text-light-text-secondary hover:text-light-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
} 