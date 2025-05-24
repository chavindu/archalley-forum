import React, { useEffect, useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

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
    linkedin: { label: 'LinkedIn', icon: 'linkedin', placeholder: 'https://linkedin.com/in/username' },
    twitter: { label: 'Twitter', icon: 'twitter', placeholder: 'https://twitter.com/username' },
    instagram: { label: 'Instagram', icon: 'instagram', placeholder: 'https://instagram.com/username' },
    facebook: { label: 'Facebook', icon: 'facebook', placeholder: 'https://facebook.com/username' },
    behance: { label: 'Behance', icon: 'behance', placeholder: 'https://behance.net/username' },
    dribbble: { label: 'Dribbble', icon: 'dribbble', placeholder: 'https://dribbble.com/username' },
    github: { label: 'GitHub', icon: 'github', placeholder: 'https://github.com/username' },
};

// Verification Request Modal Component
function VerificationRequestModal({ isOpen, onClose, onSubmit, loading, error }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        notes: '',
    });

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
            setError('Please select a PDF, JPG, or PNG file.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size should be less than 5MB.');
            return;
        }

        setSelectedFile(file);
        setError(null);

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('proof_document', selectedFile);
        formData.append('notes', data.notes);

        try {
            await onSubmit(formData);
            // Reset form
            setSelectedFile(null);
            setPreviewUrl(null);
            setData('notes', '');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onClose();
        } catch (err) {
            // Error is handled by parent component
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Request Verification
                            </h3>
                            <div className="mt-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Proof Document
                                        </label>
                                        <div className="mt-1 flex items-center space-x-4">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileSelect}
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                className="hidden"
                                                id="proof-document"
                                            />
                                            <label
                                                htmlFor="proof-document"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                            >
                                                Choose File
                                            </label>
                                            <span className="text-sm text-gray-500">
                                                {selectedFile?.name || 'No file chosen'}
                                            </span>
                                        </div>
                                        {selectedFile && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                {selectedFile.type.startsWith('image/') ? 'Image' : 'PDF'} file, {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
                                            </p>
                                        )}
                                        {previewUrl && (
                                            <div className="mt-2">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="max-h-48 rounded-lg object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            rows={3}
                                            value={data.notes}
                                            onChange={e => setData('notes', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Add any additional information that might help with verification..."
                                        />
                                    </div>

                                    {error && (
                                        <div className="rounded-md bg-red-50 p-4">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    {/* Form Actions */}
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            disabled={!selectedFile || processing}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                        >
                                            {processing ? 'Submitting...' : 'Submit Request'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditProfilePage() {
    const { user: authUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [verificationError, setVerificationError] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        company: '',
        profession: '',
        bio: '',
        website_link: '',
        business_email: '',
        phone_number: '',
        social_media_links: {},
        directory_visible: false,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/me');
                const profile = response.data.data;
                
                // Initialize form data
                setData({
                    name: profile.name || '',
                    company: profile.company || '',
                    profession: profile.profession || '',
                    bio: profile.bio || '',
                    website_link: profile.website_link || '',
                    business_email: profile.business_email || '',
                    phone_number: profile.phone_number || '',
                    social_media_links: profile.social_media_links || {},
                    directory_visible: profile.directory_visible ?? false,
                });
                
                setError(null);
            } catch (err) {
                setError('Failed to load profile. Please try again later.');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchVerificationStatus = async () => {
            try {
                const response = await axios.get('/api/profile/verification-status');
                setVerificationStatus(response.data.data);
            } catch (err) {
                console.error('Error fetching verification status:', err);
            }
        };

        fetchVerificationStatus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);

        put('/api/profile', {
            onSuccess: () => {
                setSuccess(true);
                // Reset success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            },
        });
    };

    const handleSocialLinkChange = (platform, value) => {
        setData('social_media_links', {
            ...data.social_media_links,
            [platform]: value,
        });
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file.');
            return;
        }

        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size should be less than 2MB.');
            return;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        const file = fileInputRef.current?.files[0];
        if (!file) return;

        try {
            setUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('avatar', file);

            const response = await axios.post('/api/profile/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update the preview with the new image URL
            setPreviewUrl(response.data.data.profile_picture_url);
            setSuccess('Profile picture updated successfully!');
            
            // Clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload profile picture. Please try again.');
            console.error('Error uploading profile picture:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleVerificationSubmit = async (formData) => {
        try {
            setVerificationError(null);
            const response = await axios.post('/api/profile/request-verification', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setVerificationStatus(response.data.data);
            setSuccess('Verification request submitted successfully!');
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setVerificationError(err.response?.data?.message || 'Failed to submit verification request. Please try again.');
            throw err;
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Edit Profile" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="md:flex md:items-center md:justify-between mb-8">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                Edit Profile
                            </h2>
                        </div>
                        {!authUser.is_verified && (
                            <div className="mt-4 flex md:mt-0 md:ml-4">
                                {verificationStatus?.status === 'pending' ? (
                                    <div className="inline-flex items-center px-4 py-2 border border-yellow-300 text-sm font-medium rounded-md text-yellow-700 bg-yellow-50">
                                        <svg className="mr-2 h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Verification Pending
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setShowVerificationModal(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Request Verification
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-600">{success}</p>
                        </div>
                    )}

                    {/* Verification Request Modal */}
                    <VerificationRequestModal
                        isOpen={showVerificationModal}
                        onClose={() => {
                            setShowVerificationModal(false);
                            setVerificationError(null);
                        }}
                        onSubmit={handleVerificationSubmit}
                        loading={uploading}
                        error={verificationError}
                    />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Picture Section */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Picture</h3>
                            
                            <div className="flex items-center space-x-6">
                                {/* Current Profile Picture */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={previewUrl || authUser.profile_picture_url}
                                        alt="Profile"
                                        className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                                    />
                                </div>

                                {/* Upload Controls */}
                                <div className="flex-grow">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-grow">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileSelect}
                                                accept="image/*"
                                                className="hidden"
                                                id="avatar-upload"
                                            />
                                            <label
                                                htmlFor="avatar-upload"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                            >
                                                Choose File
                                            </label>
                                            <span className="ml-3 text-sm text-gray-500">
                                                {fileInputRef.current?.files[0]?.name || 'No file chosen'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleUpload}
                                            disabled={!fileInputRef.current?.files[0] || uploading}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                        >
                                            {uploading ? 'Uploading...' : 'Upload'}
                                        </button>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        JPG, PNG or GIF. Max size of 2MB. Recommended size: 400x400 pixels.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                            errors.name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={data.company}
                                        onChange={e => setData('company', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                                        Profession
                                    </label>
                                    <select
                                        id="profession"
                                        value={data.profession}
                                        onChange={e => setData('profession', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                    >
                                        <option value="">Select a profession</option>
                                        {PROFESSIONS.map(profession => (
                                            <option key={profession} value={profession}>
                                                {profession}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone_number"
                                        value={data.phone_number}
                                        onChange={e => setData('phone_number', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    rows={4}
                                    value={data.bio}
                                    onChange={e => setData('bio', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Contact Information</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="business_email" className="block text-sm font-medium text-gray-700">
                                        Business Email
                                    </label>
                                    <input
                                        type="email"
                                        id="business_email"
                                        value={data.business_email}
                                        onChange={e => setData('business_email', e.target.value)}
                                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                            errors.business_email ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.business_email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.business_email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="website_link" className="block text-sm font-medium text-gray-700">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        id="website_link"
                                        value={data.website_link}
                                        onChange={e => setData('website_link', e.target.value)}
                                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                            errors.website_link ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.website_link && (
                                        <p className="mt-1 text-sm text-red-600">{errors.website_link}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Social Media Links</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {Object.entries(SOCIAL_PLATFORMS).map(([platform, { label, placeholder }]) => (
                                    <div key={platform}>
                                        <label htmlFor={`social_${platform}`} className="block text-sm font-medium text-gray-700">
                                            {label}
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                                <i className={`fab fa-${platform} text-lg`}></i>
                                            </span>
                                            <input
                                                type="url"
                                                id={`social_${platform}`}
                                                value={data.social_media_links[platform] || ''}
                                                onChange={e => handleSocialLinkChange(platform, e.target.value)}
                                                placeholder={placeholder}
                                                className={`flex-1 min-w-0 block w-full rounded-none rounded-r-md border-gray-300 sm:text-sm ${
                                                    errors[`social_media_links.${platform}`] ? 'border-red-300' : ''
                                                }`}
                                            />
                                        </div>
                                        {errors[`social_media_links.${platform}`] && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors[`social_media_links.${platform}`]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Privacy Settings</h3>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="directory_visible" className="text-sm font-medium text-gray-700">
                                        Directory Visibility
                                    </label>
                                    <p className="text-sm text-gray-500">
                                        When enabled, your profile will be visible in the user directory
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={data.directory_visible}
                                    onClick={() => setData('directory_visible', !data.directory_visible)}
                                    className={`${
                                        data.directory_visible ? 'bg-indigo-600' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                >
                                    <span className="sr-only">Toggle directory visibility</span>
                                    <span
                                        aria-hidden="true"
                                        className={`${
                                            data.directory_visible ? 'translate-x-5' : 'translate-x-0'
                                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                    />
                                </button>
                            </div>
                            {errors.directory_visible && (
                                <p className="mt-2 text-sm text-red-600">{errors.directory_visible}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
} 