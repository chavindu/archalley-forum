import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import ThreadItem from './ThreadItem';

export default function ThreadList() {
    const [threads, setThreads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get('/api/threads');
                setThreads(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch threads');
            } finally {
                setIsLoading(false);
            }
        };

        fetchThreads();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-light-bg border border-gray-100 rounded-lg p-6">
                            <div className="flex gap-6">
                                {/* Voting skeleton */}
                                <div className="flex flex-col items-center space-y-1 pt-1">
                                    <div className="h-5 w-5 bg-gray-100 rounded-full"></div>
                                    <div className="h-4 w-4 bg-gray-100 rounded"></div>
                                    <div className="h-5 w-5 bg-gray-100 rounded-full"></div>
                                </div>
                                {/* Content skeleton */}
                                <div className="flex-1">
                                    <div className="h-6 bg-gray-100 rounded w-3/4 mb-3"></div>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="h-4 bg-gray-100 rounded w-24"></div>
                                        <div className="h-4 bg-gray-100 rounded w-32"></div>
                                        <div className="h-4 bg-gray-100 rounded w-28"></div>
                                        <div className="h-4 bg-gray-100 rounded w-20"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 border border-red-100 rounded-lg p-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error loading threads</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                >
                                    Try again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (threads.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-light-text-primary">No threads</h3>
                    <p className="mt-1 text-sm text-light-text-secondary">
                        Get started by creating a new thread.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/threads/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        >
                            Create Thread
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-4">
                {threads.map((thread) => (
                    <ThreadItem key={thread.id} thread={thread} />
                ))}
            </div>
        </div>
    );
} 