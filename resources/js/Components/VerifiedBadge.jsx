import React, { useState } from 'react';

export default function VerifiedBadge({ className = "h-4 w-4" }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative inline-block">
            <svg
                className={`inline-block ml-1 text-blue-500 ${className}`}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Verified Account"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                role="img"
            >
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
            </svg>
            
            {/* Tooltip */}
            {showTooltip && (
                <div 
                    className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                    role="tooltip"
                >
                    <div className="relative">
                        <p>Verified Professional</p>
                        <p className="text-xs text-gray-300 mt-1">This account has been verified as a professional in the architecture industry</p>
                        {/* Tooltip arrow */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                    </div>
                </div>
            )}
        </div>
    );
} 