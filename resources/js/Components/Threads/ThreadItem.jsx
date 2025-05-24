import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

export default function ThreadItem({ thread }) {
    // Placeholder data - these will be replaced with real data later
    const authorName = thread.user?.name || 'Anonymous User';
    const categoryName = thread.category?.name || 'Uncategorized';
    const upvotes = thread.upvotes_count || 0;
    const downvotes = thread.downvotes_count || 0;
    const commentsCount = thread.comments_count || 0;
    const netVotes = upvotes - downvotes;

    return (
        <article className="group bg-light-bg border border-gray-100 rounded-lg hover:border-primary/20 hover:shadow-sm transition-all duration-200">
            <div className="p-6">
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

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <Link
                            href={`/discussions/${thread.id}`}
                            className="block hover:no-underline group-hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
                            aria-label={`View thread: ${thread.title}`}
                        >
                            <h3 className="text-lg font-semibold text-light-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                {thread.title}
                            </h3>
                            <p className="mt-1 text-sm text-light-text-secondary line-clamp-2">
                                {thread.excerpt || 'No description available'}
                            </p>
                        </Link>
                        
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-light-text-secondary">
                            {/* Author */}
                            <div className="inline-flex items-center gap-2">
                                {/* Profile Picture */}
                                <span className="inline-block h-7 w-7 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                                    {thread.user?.profile_picture_url ? (
                                        <img src={thread.user.profile_picture_url} alt={authorName} className="h-full w-full object-cover" />
                                    ) : (
                                        <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    )}
                                </span>
                                <Link
                                    href={`/users/${thread.user_id}`}
                                    className="font-medium hover:text-primary transition-colors duration-200 flex items-center gap-1"
                                >
                                    <span>{authorName}</span>
                                    {/* Verified Blue Tick (placeholder) */}
                                    <span title="Verified" className="ml-0.5">
                                        <svg className="inline h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="10" fill="#3b82f6" />
                                            <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    {/* User Ranking Badge (placeholder) */}
                                    {thread.user?.ranking_badge ? (
                                        <span className="ml-1 flex items-center gap-1" title={thread.user.ranking_badge.name}>
                                            {thread.user.ranking_badge.icon_svg ? (
                                                <span dangerouslySetInnerHTML={{ __html: thread.user.ranking_badge.icon_svg }} className="h-4 w-4 inline-block align-text-bottom" />
                                            ) : (
                                                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <circle cx="10" cy="10" r="10" />
                                                </svg>
                                            )}
                                            <span className="text-xs text-yellow-700 font-semibold">{thread.user.ranking_badge.name}</span>
                                        </span>
                                    ) : null}
                                </Link>
                            </div>

                            {/* Category */}
                            <div className="inline-flex items-center">
                                <TagIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                <Link
                                    href={`/categories/${thread.category_id}`}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    {categoryName}
                                </Link>
                            </div>

                            {/* Comments */}
                            <div className="inline-flex items-center">
                                <ChatBubbleLeftIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                <span>
                                    {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                                </span>
                            </div>

                            {/* Time */}
                            <div className="inline-flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                <time dateTime={thread.created_at} className="text-sm">
                                    {new Date(thread.created_at).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
} 