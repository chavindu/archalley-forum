import React, { useEffect, useState } from 'react';
import { Head, useParams, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import UserName from '@/Components/UserName';

const PROFESSIONS = [
    'Architect',
    'Interior Designer',
    'Landscape Architect',
    'Urban Planner',
    'Construction Manager',
    'Civil Engineer',
    'Structural Engineer',
    'MEP Engineer',
    'Architectural Technologist',
    'Building Surveyor',
    'Project Manager',
    'Student',
    'Other'
];

const SOCIAL_PLATFORMS = {
    linkedin: { label: 'LinkedIn', icon: 'linkedin' },
    twitter: { label: 'Twitter', icon: 'twitter' },
    instagram: { label: 'Instagram', icon: 'instagram' },
    facebook: { label: 'Facebook', icon: 'facebook' },
    behance: { label: 'Behance', icon: 'behance' },
    dribbble: { label: 'Dribbble', icon: 'dribbble' },
    github: { label: 'GitHub', icon: 'github' },
};

export default function ProfilePage() {
    const { identifier } = useParams();
    const { user: authUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/users/${identifier}`);
                setProfile(response.data.data);
                setError(null);
            } catch (err) {
                setError('Failed to load profile. Please try again later.');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [identifier]);

    const isOwnProfile = authUser && profile && authUser.id === profile.id;

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!profile) {
        return (
            <MainLayout>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Profile not found</h2>
                        <p className="mt-2 text-gray-600">The profile you're looking for doesn't exist or has been removed.</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={`${profile.name}'s Profile`} />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
                        {/* Profile Picture */}
                        <div className="absolute -bottom-16 left-8">
                            <img
                                src={profile.profile_picture_url}
                                alt={profile.name}
                                className="h-32 w-32 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                        {/* Edit Profile Button */}
                        {isOwnProfile && (
                            <div className="absolute top-4 right-4">
                                <Link
                                    href="/profile/edit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 pb-8 px-8">
                        <div className="flex items-center">
                            <UserName user={profile} showLink={false} className="text-2xl" />
                        </div>

                        {/* Professional Info */}
                        <div className="mt-4 space-y-4">
                            {(profile.company || profile.profession) && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                    {profile.company && (
                                        <span className="font-medium">{profile.company}</span>
                                    )}
                                    {profile.company && profile.profession && (
                                        <span>•</span>
                                    )}
                                    {profile.profession && (
                                        <span>{profile.profession}</span>
                                    )}
                                </div>
                            )}

                            {profile.bio && (
                                <p className="text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
                            )}

                            {/* Social Links */}
                            {profile.social_media_links && Object.keys(profile.social_media_links).length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {Object.entries(profile.social_media_links).map(([platform, url]) => (
                                        SOCIAL_PLATFORMS[platform] && (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                                                title={SOCIAL_PLATFORMS[platform].label}
                                            >
                                                <i className={`fab fa-${SOCIAL_PLATFORMS[platform].icon} text-xl`}></i>
                                            </a>
                                        )
                                    ))}
                                </div>
                            )}

                            {/* Website Link */}
                            {profile.website_link && (
                                <div className="mt-4">
                                    <a
                                        href={profile.website_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
                                    >
                                        <i className="fas fa-globe"></i>
                                        <span>Visit Website</span>
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Activity Stats */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex space-x-8">
                                <div>
                                    <span className="block text-2xl font-semibold text-gray-900">
                                        {profile.threads_count || 0}
                                    </span>
                                    <span className="block text-sm text-gray-600">Threads</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-semibold text-gray-900">
                                        {profile.comments_count || 0}
                                    </span>
                                    <span className="block text-sm text-gray-600">Comments</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-semibold text-gray-900">
                                        {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}
                                    </span>
                                    <span className="block text-sm text-gray-600">Member Since</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 