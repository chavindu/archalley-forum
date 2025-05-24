import React, { useState, useEffect } from 'react';
import { Head, useParams } from '@inertiajs/react';
import axios from 'axios';
import MainLayout from '@/Components/Layout/MainLayout';
import { Link } from '@inertiajs/react';
import { 
    ArrowUpIcon, 
    ArrowDownIcon, 
    ChatBubbleLeftIcon, 
    ClockIcon, 
    UserIcon, 
    TagIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import CommentList from '@/Components/Comments/CommentList';
import CreateCommentForm from '@/Components/Comments/CreateCommentForm';

export default function SingleThreadPage() {
    const { id } = useParams();
    const [thread, setThread] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchThread = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.get(`/api/threads/${id}`);
            setThread(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch thread');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchThread();
    }, [id]);

    if (isLoading) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-8">
                        {/* Thread header skeleton */}
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-100 rounded w-32"></div>
                                    <div className="h-3 bg-gray-100 rounded w-24"></div>
                                </div>
                            </div>
                        </div>
                        {/* Thread content skeleton */}
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-50 border border-red-100 rounded-lg p-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading thread</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/discussions"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                    >
                                        Back to Discussions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!thread) {
        return null;
    }

    const netVotes = (thread.upvotes_count || 0) - (thread.downvotes_count || 0);

    return (
        <MainLayout>
            <Head title={thread.title} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Thread Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold text-light-text-primary sm:text-3xl">
                                {thread.title}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-light-text-secondary">
                                <div className="inline-flex items-center">
                                    <UserIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                    <Link
                                        href={`/users/${thread.user_id}`}
                                        className="font-medium hover:text-primary transition-colors duration-200"
                                    >
                                        {thread.user?.name || 'Anonymous User'}
                                    </Link>
                                </div>
                                <div className="inline-flex items-center">
                                    <TagIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                    <Link
                                        href={`/categories/${thread.category_id}`}
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        {thread.category?.name || 'Uncategorized'}
                                    </Link>
                                </div>
                                <div className="inline-flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                    <time dateTime={thread.created_at}>
                                        {new Date(thread.created_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                        {/* Thread Actions */}
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                className="p-2 text-light-text-secondary hover:text-primary hover:bg-primary/5 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
                                title="Edit thread"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="p-2 text-light-text-secondary hover:text-red-500 hover:bg-red-50 rounded-full focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors duration-200"
                                title="Delete thread"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Thread Content */}
                <div className="bg-light-bg border border-gray-100 rounded-lg p-6 mb-8">
                    <div className="flex gap-6">
                        {/* Voting Section */}
                        <div className="flex flex-col items-center space-y-1 pt-1">
                            <button
                                type="button"
                                className="p-1.5 rounded-full text-light-text-secondary hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
                                aria-label="Upvote"
                            >
                                <ArrowUpIcon className="h-5 w-5" />
                            </button>
                            <span className={`text-sm font-medium ${netVotes > 0 ? 'text-primary' : netVotes < 0 ? 'text-red-500' : 'text-light-text-secondary'}`}>
                                {netVotes}
                            </span>
                            <button
                                type="button"
                                className="p-1.5 rounded-full text-light-text-secondary hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors duration-200"
                                aria-label="Downvote"
                            >
                                <ArrowDownIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 prose prose-sm max-w-none">
                            <div className="text-light-text-primary whitespace-pre-wrap">
                                {thread.content}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                    <CreateCommentForm
                        threadId={thread.id}
                        onCommentCreated={fetchThread}
                    />
                    <CommentList 
                        comments={thread.comments || []}
                    />
                </div>
            </div>
        </MainLayout>
    );
} 