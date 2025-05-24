import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
// Integrate TipTap editor into the React project for rich text input:
// npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-placeholder --legacy-peer-deps
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

export default function CreateThreadForm() {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    // TipTap editor setup
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write your thread content here...'
            })
        ],
        content: '',
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (err) {
                setError('Failed to load categories');
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setFieldErrors({});
        if (!title.trim()) {
            setFormError('Title is required.');
            return;
        }
        if (!categoryId) {
            setFormError('Please select a category.');
            return;
        }
        if (!editor || !editor.getText().trim()) {
            setFormError('Content is required.');
            return;
        }
        setSubmitting(true);
        try {
            const response = await axios.post('/api/threads', {
                title,
                content: editor.getHTML(),
                category_id: categoryId
            });
            const thread = response.data;
            // Redirect to the new thread page
            if (router) {
                router.visit(`/discussions/${thread.id}`);
            } else {
                window.location.href = `/discussions/${thread.id}`;
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setFieldErrors(err.response.data.errors);
                setFormError('Please fix the errors below.');
            } else if (err.response && err.response.data && err.response.data.message) {
                setFormError(err.response.data.message);
            } else {
                setFormError('Failed to create thread.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-light-bg border border-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-bold text-light-text-primary mb-4">Create a New Thread</h2>
            {formError && <div className="text-red-600 text-sm mb-2">{formError}</div>}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-light-text-secondary mb-1">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${fieldErrors.title ? 'border-red-500' : ''}`}
                    placeholder="Thread title"
                    disabled={submitting}
                />
                {fieldErrors.title && <div className="text-red-600 text-xs mt-1">{fieldErrors.title[0]}</div>}
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-light-text-secondary mb-1">Category</label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={e => setCategoryId(e.target.value)}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${fieldErrors.category_id ? 'border-red-500' : ''}`}
                    disabled={loadingCategories || submitting}
                >
                    <option value="">{loadingCategories ? 'Loading categories...' : 'Select a category'}</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
                {fieldErrors.category_id && <div className="text-red-600 text-xs mt-1">{fieldErrors.category_id[0]}</div>}
            </div>
            <div>
                <label className="block text-sm font-medium text-light-text-secondary mb-1">Content</label>
                <div className={`border border-gray-200 rounded-md bg-white min-h-[150px] p-2 focus-within:border-primary ${fieldErrors.content ? 'border-red-500' : ''}`}>
                    <EditorContent editor={editor} />
                </div>
                {fieldErrors.content && <div className="text-red-600 text-xs mt-1">{fieldErrors.content[0]}</div>}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                    disabled={submitting}
                >
                    {submitting ? 'Creating...' : 'Create Thread'}
                </button>
            </div>
        </form>
    );
} 