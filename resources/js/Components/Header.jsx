import React from 'react';
import { Link } from '@inertiajs/react';
import NotificationDropdown from '@/Components/NotificationDropdown';
import UserName from '@/Components/UserName';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '@/Components/ThemeToggle';

const Header = ({ user }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
                <div className="flex justify-between h-14 sm:h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link 
                                href="/" 
                                className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                            >
                                ArchAlley
                            </Link>
                        </div>

                        {/* Navigation Links - Hidden on mobile */}
                        <nav className="hidden md:ml-6 md:flex md:space-x-4 lg:space-x-8">
                            <Link
                                href="/"
                                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/categories"
                                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Categories
                            </Link>
                            <Link
                                href="/directory/users"
                                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                            >
                                Users
                            </Link>
                        </nav>
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Theme Toggle */}
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {user ? (
                            <>
                                {/* Notifications - Hidden on smallest screens */}
                                <div className="hidden sm:block ml-2 sm:ml-4">
                                    <NotificationDropdown />
                                </div>

                                {/* Profile dropdown */}
                                <div className="flex items-center">
                                    <Link
                                        href={`/users/${user.username}`}
                                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        <img
                                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover"
                                            src={user.profile_picture_path || '/images/default-avatar.png'}
                                            alt={user.name}
                                        />
                                        <span className="hidden sm:inline-block">
                                            <UserName user={user} showLink={false} />
                                        </span>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 dark:bg-indigo-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-1.5 sm:p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {mobileMenuOpen ? (
                                    <XMarkIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/categories"
                                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Categories
                            </Link>
                            <Link
                                href="/directory/users"
                                className="block px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Users
                            </Link>
                            {user && (
                                <div className="px-3 py-2">
                                    <NotificationDropdown />
                                </div>
                            )}
                            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 