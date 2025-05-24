import React from 'react';
import { Link } from '@inertiajs/react';

const providerIcons = {
    facebook: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
    ),
    google: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
        </svg>
    ),
    microsoft: (
        <svg className="w-5 h-5" viewBox="0 0 23 23">
            <path fill="#f25022" d="M1 1h10v10H1z"/>
            <path fill="#00a4ef" d="M1 12h10v10H1z"/>
            <path fill="#7fba00" d="M12 1h10v10H12z"/>
            <path fill="#ffb900" d="M12 12h10v10H12z"/>
        </svg>
    ),
};

const providerColors = {
    facebook: 'bg-[#1877F2] hover:bg-[#166FE5]',
    google: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    microsoft: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
};

const providerTextColors = {
    facebook: 'text-white',
    google: 'text-gray-700',
    microsoft: 'text-gray-700',
};

export default function SocialLoginButton({ provider, className = '' }) {
    const icon = providerIcons[provider];
    const bgColor = providerColors[provider];
    const textColor = providerTextColors[provider];

    return (
        <Link
            href={`/api/auth/${provider}/redirect`}
            className={`inline-flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-medium rounded-md transition-colors duration-200 ${bgColor} ${textColor} ${className}`}
        >
            {icon}
            <span>Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
        </Link>
    );
} 