import React, { useState } from 'react';
import { UserIcon, ClockIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import UserName from '@/Components/UserName';
import FlagButton from '@/Components/FlagButton';
import ShareButtons from '@/Components/ShareButtons';

export default function CommentItem({ comment, onReply, currentUserVote, isModeratorOrAdmin = false, threadId, highlightBestAnswer = false }) {
    const user = comment.user || {};
    const [upvotes, setUpvotes] = useState(comment.upvotes_count || 0);
    const [downvotes, setDownvotes] = useState(comment.downvotes_count || 0);
    const [userVote, setUserVote] = useState(currentUserVote || null); // 'upvote', 'downvote', or null
    const [loading, setLoading] = useState(false);
    const [markingBest, setMarkingBest] = useState(false);
    const [markSuccess, setMarkSuccess] = useState(false);

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
                votable_id: comment.id,
                votable_type: 'comment',
                vote_type: newUserVote || voteType,
            });
        } catch (e) {
            setUpvotes(comment.upvotes_count || 0);
            setDownvotes(comment.downvotes_count || 0);
            setUserVote(currentUserVote || null);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkBest = async () => {
        if (markingBest) return;
        setMarkingBest(true);
        setMarkSuccess(false);
        try {
            await axios.post(`/api/threads/${threadId}/comments/${comment.id}/mark-best`);
            setMarkSuccess(true);
        } catch (e) {
            // Optionally show error
        } finally {
            setMarkingBest(false);
        }
    };

    const commentUrl = `${window.location.origin}${route('threads.show', thread.slug)}#comment-${comment.id}`;
    const shareTitle = `Comment on: ${thread.title}`;
    const shareDescription = `Check out this comment on ArchAlley Forum: ${comment.content.substring(0, 100)}...`;

    return (
        <div 
            id={`comment-${comment.id}`}
            className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 ${
                highlightBestAnswer 
                    ? 'border-2 border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20 shadow' 
                    : ''
            }`}
        >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                {/* Profile Picture */}
                <span className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                    {user.profile_picture_url ? (
                        <img 
                            src={user.profile_picture_url} 
                            alt={user.name || 'Anonymous User'} 
                            className="h-full w-full object-cover" 
                        />
                    ) : (
                        <svg className="h-full w-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    )}
                </span>
                <UserName user={user} />
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                    <time dateTime={comment.created_at}>
                        {new Date(comment.created_at).toLocaleString()}
                    </time>
                </div>

                {/* Flag Button */}
                <div className="ml-auto order-last sm:order-none">
                    <FlagButton
                        flaggableId={comment.id}
                        flaggableType="App\\Models\\Comment"
                        flaggableName={`Comment by ${user.name}`}
                    />
                </div>

                {/* Voting Section */}
                <div className="flex flex-row sm:flex-col items-center space-x-2 sm:space-x-0 sm:space-y-1 ml-2 sm:ml-4">
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
                        <ArrowUpIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                    <span className={`text-xs sm:text-sm font-medium ${
                        upvotes - downvotes > 0 
                            ? 'text-indigo-600 dark:text-indigo-400' 
                            : upvotes - downvotes < 0 
                                ? 'text-red-500 dark:text-red-400' 
                                : 'text-gray-500 dark:text-gray-400'
                    }`}>
                        {upvotes - downvotes}
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
                        <ArrowDownIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                </div>
            </div>

            <div 
                className="prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100" 
                dangerouslySetInnerHTML={{ __html: comment.content }} 
            />

            <div className="mt-3 flex flex-wrap items-center gap-2">
                {onReply && (
                    <button
                        type="button"
                        onClick={() => onReply(comment)}
                        className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors"
                    >
                        Reply
                    </button>
                )}
                {isModeratorOrAdmin && (
                    <button
                        type="button"
                        onClick={handleMarkBest}
                        className={`text-xs sm:text-sm px-2 py-1 rounded border border-green-500 dark:border-green-400 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors ${
                            markingBest ? 'opacity-50 pointer-events-none' : ''
                        }`}
                    >
                        {markingBest ? 'Marking...' : 'Mark as Best Answer'}
                    </button>
                )}
                {markSuccess && (
                    <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                        Marked as best answer!
                    </span>
                )}
            </div>

            <div className="mt-3 flex items-center gap-2">
                <ShareButtons
                    url={commentUrl}
                    title={shareTitle}
                    description={shareDescription}
                    className="text-xs sm:text-sm"
                />
            </div>
        </div>
    );
} 