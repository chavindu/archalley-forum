import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon, ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import UserName from '@/Components/UserName';
import FlagButton from '@/Components/FlagButton';

export default function ThreadItem({ thread, currentUserVote }) {
    const [upvotes, setUpvotes] = useState(thread.upvotes_count || 0);
    const [downvotes, setDownvotes] = useState(thread.downvotes_count || 0);
    const [userVote, setUserVote] = useState(currentUserVote || null); // 'upvote', 'downvote', or null
    const [loading, setLoading] = useState(false);

    // Placeholder data - these will be replaced with real data later
    const authorName = thread.user?.name || 'Anonymous User';
    const categoryName = thread.category?.name || 'Uncategorized';
    const commentsCount = thread.comments_count || 0;
    const netVotes = upvotes - downvotes;

    const handleVote = async (voteType) => {
        if (loading) return;
        setLoading(true);
        let newUpvotes = upvotes;
        let newDownvotes = downvotes;
        let newUserVote = userVote;
        // Optimistic update
        if (userVote === voteType) {
            // Undo vote
            if (voteType === 'upvote') newUpvotes--;
            if (voteType === 'downvote') newDownvotes--;
            newUserVote = null;
        } else {
            if (voteType === 'upvote') {
                newUpvotes++;
                if (userVote === 'downvote') newDownvotes--;
            } else {
                newDownvotes++;
                if (userVote === 'upvote') newUpvotes--;
            }
            newUserVote = voteType;
        }
        setUpvotes(newUpvotes);
        setDownvotes(newDownvotes);
        setUserVote(newUserVote);
        try {
            await axios.post('/api/votes', {
                votable_id: thread.id,
                votable_type: 'thread',
                vote_type: newUserVote || voteType, // If undo, send the last voteType
            });
        } catch (e) {
            // Revert on error
            setUpvotes(thread.upvotes_count || 0);
            setDownvotes(thread.downvotes_count || 0);
            setUserVote(currentUserVote || null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <article className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500/20 dark:hover:border-indigo-400/20 hover:shadow-sm transition-all duration-200">
            <div className="p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-6">
                    {/* Voting Section */}
                    <div className="flex flex-col items-center space-y-1 pt-1">
                        <button
                            type="button"
                            className={`p-1 sm:p-1.5 rounded-full transition-colors duration-200 ${
                                userVote === 'upvote' 
                                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
                                    : 'text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                            } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                            aria-label="Upvote"
                            onClick={() => handleVote('upvote')}
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
                            className={`p-1 sm:p-1.5 rounded-full transition-colors duration-200 ${
                                userVote === 'downvote' 
                                    ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30' 
                                    : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
                            } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                            aria-label="Downvote"
                            onClick={() => handleVote('downvote')}
                        >
                            <ArrowDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <Link
                            href={`/discussions/${thread.id}`}
                            className="block hover:no-underline group-hover:no-underline focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 rounded-md"
                            aria-label={`View thread: ${thread.title}`}
                        >
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
                                {thread.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                {thread.excerpt || 'No description available'}
                            </p>
                        </Link>
                        
                        <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            {/* Author */}
                            <div className="inline-flex items-center gap-1.5 sm:gap-2">
                                {/* Profile Picture */}
                                <span className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                                    {thread.user?.profile_picture_url ? (
                                        <img 
                                            src={thread.user.profile_picture_url} 
                                            alt={authorName} 
                                            className="h-full w-full object-cover" 
                                        />
                                    ) : (
                                        <svg className="h-full w-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    )}
                                </span>
                                <UserName user={thread.user} />
                            </div>

                            {/* Category */}
                            <div className="inline-flex items-center">
                                <TagIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-gray-400 dark:text-gray-500" />
                                <Link
                                    href={`/categories/${thread.category_id}`}
                                    className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    {categoryName}
                                </Link>
                            </div>

                            {/* Comments */}
                            <div className="inline-flex items-center">
                                <ChatBubbleLeftIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-gray-400 dark:text-gray-500" />
                                <span>
                                    {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                                </span>
                            </div>

                            {/* Time */}
                            <div className="inline-flex items-center">
                                <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-gray-400 dark:text-gray-500" />
                                <time dateTime={thread.created_at}>
                                    {new Date(thread.created_at).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>

                            {/* Flag Button */}
                            <div className="ml-auto">
                                <FlagButton
                                    flaggableId={thread.id}
                                    flaggableType="App\\Models\\Thread"
                                    flaggableName={thread.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
} 