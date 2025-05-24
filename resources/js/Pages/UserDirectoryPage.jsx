import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import axios from 'axios';
import UserName from '@/Components/UserName';
import { debounce } from 'lodash';

const SORT_OPTIONS = [
    { value: 'name', label: 'Name' },
    { value: 'profession', label: 'Profession' },
];

const RANKING_BADGES = {
    master: { label: 'Master', color: 'bg-purple-100 text-purple-800' },
    expert: { label: 'Expert', color: 'bg-blue-100 text-blue-800' },
    contributor: { label: 'Contributor', color: 'bg-green-100 text-green-800' },
    member: { label: 'Member', color: 'bg-gray-100 text-gray-800' },
};

export default function UserDirectoryPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        sort_by: 'name',
        sort_direction: 'asc',
    });
    const [filters, setFilters] = useState({
        search: '',
        profession: '',
        sort_by: 'name',
        sort_direction: 'asc',
    });

    const fetchUsers = async (page = 1) => {
        try {
            setLoading(true);
            const params = {
                page,
                ...filters,
            };
            const response = await axios.get('/api/directory/users', { params });
            setUsers(response.data.data);
            setMeta(response.data.meta);
            setError(null);
        } catch (err) {
            setError('Failed to load users. Please try again later.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedFetch = debounce((page) => {
        fetchUsers(page);
    }, 300);

    useEffect(() => {
        debouncedFetch(1);
        return () => debouncedFetch.cancel();
    }, [filters]);

    const handleSearchChange = (e) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const handleSortChange = (sortBy) => {
        setFilters(prev => ({
            ...prev,
            sort_by: sortBy,
            sort_direction: prev.sort_by === sortBy && prev.sort_direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    return (
        <MainLayout>
            <Head title="User Directory" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Browse and connect with professionals in the architecture industry
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by name or profession..."
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={filters.search}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="flex space-x-2">
                        {SORT_OPTIONS.map(option => (
                            <button
                                key={option.value}
                                onClick={() => handleSortChange(option.value)}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${
                                    filters.sort_by === option.value
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border border-gray-300`}
                            >
                                {option.label}
                                {filters.sort_by === option.value && (
                                    <span className="ml-1">
                                        {filters.sort_direction === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* User Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map(user => (
                                <div key={user.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={user.profile_picture_url}
                                                alt={user.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <UserName user={user} className="text-lg" />
                                                {user.profession && (
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {user.profession}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${RANKING_BADGES[user.ranking].color}`}>
                                                {RANKING_BADGES[user.ranking].label}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {user.threads_count} threads • {user.comments_count} comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {meta.last_page > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {[...Array(meta.last_page)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                meta.current_page === i + 1
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* No Results */}
                        {users.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No users found matching your criteria.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
} 