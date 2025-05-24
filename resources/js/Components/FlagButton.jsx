import React, { useState, useRef, useEffect } from 'react';
import { EllipsisHorizontalIcon, FlagIcon } from '@heroicons/react/24/outline';
import FlagModal from '@/Components/FlagModal';

export default function FlagButton({ flaggableId, flaggableType, flaggableName, className = "" }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="More options"
            >
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
            </button>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                >
                    <div className="py-1">
                        <button
                            type="button"
                            onClick={() => {
                                setShowMenu(false);
                                setShowModal(true);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <FlagIcon className="h-4 w-4 mr-2 text-red-500" />
                            Flag Content
                        </button>
                    </div>
                </div>
            )}

            <FlagModal
                show={showModal}
                onClose={() => setShowModal(false)}
                flaggableId={flaggableId}
                flaggableType={flaggableType}
                flaggableName={flaggableName}
            />
        </div>
    );
} 