import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="text-center text-sm text-gray-500">
                    © ArchAlley Forum {new Date().getFullYear()}
                </div>
            </div>
        </footer>
    );
} 