import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import RichTextEditor from '@/Components/RichTextEditor';

const ThreadForm = ({ categories, onSubmit, initialData = {} }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: initialData.title || '',
        content: initialData.content || '',
        category_id: initialData.category_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    id="category"
                    value={data.category_id}
                    onChange={e => setData('category_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                )}
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <div className="mt-1">
                    <RichTextEditor
                        value={data.content}
                        onChange={content => setData('content', content)}
                        className="min-h-[200px] p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write your thread content... (Use @ to mention users)"
                    />
                </div>
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {processing ? 'Posting...' : 'Post Thread'}
                </button>
            </div>
        </form>
    );
};

export default ThreadForm; 