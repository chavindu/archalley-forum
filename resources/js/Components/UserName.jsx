import React from 'react';
import { Link } from '@inertiajs/react';
import VerifiedBadge from '@/Components/VerifiedBadge';
import UserBadge from '@/Components/UserBadge';

export default function UserName({ user, showLink = true, className = "", showBadge = true }) {
    const nameElement = (
        <span className={`font-medium text-gray-900 ${className}`}>
            {user.name}
            {user.is_verified && <VerifiedBadge />}
            {showBadge && user.ranking_badge && (
                <UserBadge badge={user.ranking_badge} className="ml-1.5" />
            )}
        </span>
    );

    if (showLink) {
        return (
            <Link href={`/profile/${user.id}`} className="hover:underline">
                {nameElement}
            </Link>
        );
    }

    return nameElement;
} 