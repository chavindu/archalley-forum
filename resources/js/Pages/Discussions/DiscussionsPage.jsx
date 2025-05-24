import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Components/Layout/MainLayout';
import ThreadList from '@/Components/Threads/ThreadList';

export default function DiscussionsPage() {
    return (
        <MainLayout>
            <Head title="Discussions" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-light-text-primary">Discussions</h1>
                        <p className="mt-1 text-sm text-light-text-secondary">Join the conversation and share your ideas.</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href="/discussions/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            Start a Discussion
                        </Link>
                    </div>
                </div>
                {/* Filter Section */}
                <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="category" className="sr-only">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        >
                            <option value="">All Categories</option>
                            {/* Categories will be populated dynamically */}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="sort" className="sr-only">Sort by</label>
                        <select
                            id="sort"
                            name="sort"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        >
                            <option value="latest">Latest</option>
                            <option value="popular">Most Popular</option>
                            <option value="comments">Most Comments</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label htmlFor="search" className="sr-only">
                            Search threads
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="block w-full rounded-md border-gray-300 pl-4 pr-10 focus:border-primary focus:ring-primary sm:text-sm"
                                placeholder="Search threads..."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Thread List Section */}
                <div className="mt-6">
                    <ThreadList />
                </div>
            </div>
        </MainLayout>
    );
} 