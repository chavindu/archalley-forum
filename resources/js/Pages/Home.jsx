import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function Home({ categories, recentThreads, auth }) {
    return (
        <Layout user={auth.user}>
            <div className="space-y-8">
                {/* Categories Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {category.name}
                                </h3>
                                {category.description && (
                                    <p className="text-gray-600">{category.description}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recent Threads Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Threads</h2>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {recentThreads.map((thread) => (
                            <div
                                key={thread.id}
                                className="border-b border-gray-200 last:border-b-0"
                            >
                                <Link
                                    href={`/threads/${thread.slug}`}
                                    className="block p-6 hover:bg-gray-50"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {thread.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Posted by {thread.author.name} in{' '}
                                                {thread.category.name}
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(thread.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
} 