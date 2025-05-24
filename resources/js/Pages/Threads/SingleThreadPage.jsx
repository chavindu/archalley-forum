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
import CommentItem from '@/Components/Comments/CommentItem';

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
                <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
                    <div className="animate-pulse space-y-6 sm:space-y-8">
                        {/* Thread header skeleton */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <div className="h-3 sm:h-4 bg-gray-100 dark:bg-gray-700 rounded w-24 sm:w-32"></div>
                                    <div className="h-2.5 sm:h-3 bg-gray-100 dark:bg-gray-700 rounded w-20 sm:w-24"></div>
                                </div>
                            </div>
                        </div>
                        {/* Thread content skeleton */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="h-3 sm:h-4 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-3 sm:h-4 bg-gray-100 dark:bg-gray-700 rounded w-5/6"></div>
                            <div className="h-3 sm:h-4 bg-gray-100 dark:bg-gray-700 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg p-4 sm:p-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading thread</h3>
                                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                                    <p>{error}</p>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href="/discussions"
                                        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-sm font-medium rounded-md text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
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

    // Find best answer and other comments
    const comments = thread.comments || [];
    const bestAnswer = comments.find(c => c.is_best_answer);
    const otherComments = comments.filter(c => !c.is_best_answer);

    return (
        <MainLayout>
            <Head title={thread.title} />

            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
                {/* Thread Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {thread.title}
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <div className="inline-flex items-center">
                                    <UserIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                                    <Link
                                        href={`/users/${thread.user_id}`}
                                        className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                    >
                                        {thread.user?.name || 'Anonymous User'}
                                    </Link>
                                </div>
                                <div className="inline-flex items-center">
                                    <TagIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                                    <Link
                                        href={`/categories/${thread.category_id}`}
                                        className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                    >
                                        {thread.category?.name || 'Uncategorized'}
                                    </Link>
                                </div>
                                <div className="inline-flex items-center">
                                    <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
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
                                className="p-1.5 sm:p-2 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors duration-200"
                                title="Edit thread"
                            >
                                <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <button
                                type="button"
                                className="p-1.5 sm:p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/20 transition-colors duration-200"
                                title="Delete thread"
                            >
                                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Thread Content */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex gap-4 sm:gap-6">
                        {/* Voting Section */}
                        <div className="flex flex-col items-center space-y-1 pt-1">
                            <button
                                type="button"
                                className="p-1 sm:p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors duration-200"
                                aria-label="Upvote"
                            >
                                <ArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            <span className={`text-xs sm:text-sm font-medium ${
                                netVotes > 0 
                                    ? 'text-indigo-600 dark:text-indigo-400' 
                                    : netVotes < 0 
                                        ? 'text-red-500 dark:text-red-400' 
                                        : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                {netVotes}
                            </span>
                            <button
                                type="button"
                                className="p-1 sm:p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-400/20 transition-colors duration-200"
                                aria-label="Downvote"
                            >
                                <ArrowDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 prose prose-sm dark:prose-invert max-w-none">
                            <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                                {thread.content}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-4 sm:space-y-6">
                    <CreateCommentForm
                        threadId={thread.id}
                        onCommentCreated={fetchThread}
                    />
                    {/* Best Answer Highlight */}
                    {bestAnswer && (
                        <div className="border-2 border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 sm:p-4 mb-4 flex items-start gap-3 sm:gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="10" />
                                    <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="text-green-700 dark:text-green-400 font-semibold text-xs sm:text-sm bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                                        Best Answer
                                    </span>
                                </div>
                                <CommentItem comment={bestAnswer} threadId={thread.id} highlightBestAnswer />
                            </div>
                        </div>
                    )}
                    <CommentList 
                        comments={otherComments}
                        threadId={thread.id}
                    />
                </div>
            </div>
        </MainLayout>
    );
} 