import React from 'react';
import { UserIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function CommentItem({ comment, onReply }) {
    const user = comment.user || {};
    return (
        <div className="bg-white border border-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
                {/* Profile Picture */}
                <span className="inline-block h-7 w-7 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                    {user.profile_picture_url ? (
                        <img src={user.profile_picture_url} alt={user.name || 'Anonymous User'} className="h-full w-full object-cover" />
                    ) : (
                        <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    )}
                </span>
                <span className="font-medium text-light-text-primary flex items-center gap-1">
                    {user.name || 'Anonymous User'}
                    {/* Verified Blue Tick (placeholder) */}
                    <span title="Verified" className="ml-0.5">
                        <svg className="inline h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="10" fill="#3b82f6" />
                            <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    {/* User Ranking Badge (placeholder) */}
                    {user.ranking_badge ? (
                        <span className="ml-1 flex items-center gap-1" title={user.ranking_badge.name}>
                            {user.ranking_badge.icon_svg ? (
                                <span dangerouslySetInnerHTML={{ __html: user.ranking_badge.icon_svg }} className="h-4 w-4 inline-block align-text-bottom" />
                            ) : (
                                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="10" />
                                </svg>
                            )}
                            <span className="text-xs text-yellow-700 font-semibold">{user.ranking_badge.name}</span>
                        </span>
                    ) : null}
                </span>
                <ClockIcon className="h-4 w-4 text-gray-400 ml-4" />
                <span className="text-xs text-light-text-secondary">
                    {new Date(comment.created_at).toLocaleString()}
                </span>
            </div>
            <div className="prose prose-sm max-w-none text-light-text-primary" dangerouslySetInnerHTML={{ __html: comment.content }} />
            {onReply && (
                <button
                    type="button"
                    onClick={() => onReply(comment)}
                    className="mt-2 text-xs text-primary hover:underline"
                >
                    Reply
                </button>
            )}
        </div>
    );
} 