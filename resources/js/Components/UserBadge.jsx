import React from 'react';

export default function UserBadge({ badge, className = "" }) {
    if (!badge) return null;

    return (
        <span 
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
            style={{ backgroundColor: `${badge.color}15`, color: badge.color }}
            title={badge.description}
        >
            {badge.icon_svg ? (
                <span 
                    dangerouslySetInnerHTML={{ __html: badge.icon_svg }} 
                    className="h-3.5 w-3.5 inline-block align-text-bottom"
                />
            ) : (
                <span className="text-base">{badge.icon}</span>
            )}
            <span>{badge.name}</span>
        </span>
    );
} 