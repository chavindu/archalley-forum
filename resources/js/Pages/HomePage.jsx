import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import ThreadList from '@/Components/Threads/ThreadList';
// import CategoryList from '@/Components/CategoryList'; // Placeholder for now

export default function HomePage() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-10 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Welcome to ArchAlley Forum
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Connect, discuss, and share knowledge with the architecture community. Start a new discussion or join trending topics!
                    </p>
                    <Link
                        href="/discussions/create"
                        className="inline-block px-8 py-3 rounded-full font-semibold text-white text-lg shadow transition-colors duration-200"
                        style={{ backgroundColor: '#FFA500' }}
                    >
                        Start a Discussion
                    </Link>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Main Feed */}
                    <div className="w-full lg:w-2/3">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Latest Discussions
                        </h2>
                        <ThreadList />
                    </div>

                    {/* Right: Sidebar */}
                    <aside className="w-full lg:w-1/3 flex flex-col gap-8">
                        {/* Categories */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-5">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
                            <ul className="space-y-2">
                                {/* Replace with dynamic categories */}
                                <li>
                                    <Link href="/categories/1" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition">
                                        General
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categories/2" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition">
                                        Design
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categories/3" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition">
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/categories/4" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium transition">
                                        Events
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Featured Discussions (Placeholder) */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-5">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Featured Discussions</h3>
                            <div className="text-gray-500 dark:text-gray-400 text-sm italic">Coming soon...</div>
                        </div>

                        {/* Top Contributors (Placeholder) */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 p-5">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Top Contributors</h3>
                            <div className="text-gray-500 dark:text-gray-400 text-sm italic">Coming soon...</div>
                        </div>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
} 