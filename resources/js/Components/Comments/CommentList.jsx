import React, { useState } from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import CommentItem from './CommentItem';

export default function CommentList({ comments = [], onAddComment }) {
    const [replyingTo, setReplyingTo] = useState(null);

    const handleReply = (comment) => {
        setReplyingTo(comment);
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
    };

    const handleSubmitReply = async (content) => {
        if (onAddComment) {
            await onAddComment(content, replyingTo?.id);
            setReplyingTo(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Comments Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-light-text-primary">
                    Comments ({comments.length})
                </h2>
                <button
                    type="button"
                    onClick={() => handleReply(null)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                >
                    Add Comment
                </button>
            </div>

            {/* Reply Form (shown when replying) */}
            {replyingTo && (
                <div className="bg-light-bg border border-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <div className="mb-2 text-sm text-light-text-secondary">
                                Replying to{' '}
                                <span className="font-medium text-light-text-primary">
                                    {replyingTo.user?.name || 'Anonymous User'}
                                </span>
                            </div>
                            <textarea
                                rows="3"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                placeholder="Write your reply..."
                            />
                            <div className="mt-3 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancelReply}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-light-text-secondary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSubmitReply(document.querySelector('textarea').value)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                                >
                                    Post Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onReply={handleReply}
                    />
                ))}

                {comments.length === 0 && (
                    <div className="text-center py-8">
                        <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-light-text-primary">No comments</h3>
                        <p className="mt-1 text-sm text-light-text-secondary">
                            Be the first to share your thoughts.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 