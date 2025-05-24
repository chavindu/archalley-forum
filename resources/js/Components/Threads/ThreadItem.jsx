import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function ThreadItem({ thread }) {
    // Placeholder data - these will be replaced with real data later
    const authorName = thread.user?.name || 'Anonymous User';
    const categoryName = thread.category?.name || 'Uncategorized';
    const upvotes = thread.upvotes_count || 0;
    const downvotes = thread.downvotes_count || 0;
    const commentsCount = thread.comments_count || 0;

    return (
        <div className="bg-light-bg border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors duration-200">
            <div className="flex gap-4">
                {/* Voting Section */}
                <div className="flex flex-col items-center space-y-1">
                    <button
                        type="button"
                        className="p-1 rounded-full text-light-text-secondary hover:text-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        aria-label="Upvote"
                    >
                        <ArrowUpIcon className="h-5 w-5" />
                    </button>
                    <span className="text-sm font-medium text-light-text-primary">
                        {upvotes - downvotes}
                    </span>
                    <button
                        type="button"
                        className="p-1 rounded-full text-light-text-secondary hover:text-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                        aria-label="Downvote"
                    >
                        <ArrowDownIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <Link
                        href={`/threads/${thread.id}`}
                        className="block hover:no-underline"
                    >
                        <h3 className="text-lg font-medium text-light-text-primary hover:text-primary transition-colors duration-200">
                            {thread.title}
                        </h3>
                    </Link>
                    
                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-light-text-secondary">
                        <span className="inline-flex items-center">
                            Posted by{' '}
                            <Link
                                href={`/users/${thread.user_id}`}
                                className="ml-1 font-medium hover:text-primary transition-colors duration-200"
                            >
                                {authorName}
                            </Link>
                        </span>
                        <span className="mx-1">•</span>
                        <Link
                            href={`/categories/${thread.category_id}`}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
                        >
                            {categoryName}
                        </Link>
                        <span className="mx-1">•</span>
                        <span className="inline-flex items-center">
                            <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                        </span>
                        <span className="mx-1">•</span>
                        <time dateTime={thread.created_at} className="text-sm">
                            {new Date(thread.created_at).toLocaleDateString()}
                        </time>
                    </div>
                </div>
            </div>
        </div>
    );
} 