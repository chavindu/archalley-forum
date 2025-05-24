import React, { useEffect, useRef, useState } from 'react';
import Tribute from 'tributejs';
import axios from 'axios';
import { VerifiedBadge } from '@/Components/VerifiedBadge';

const RichTextEditor = ({ 
    value, 
    onChange, 
    placeholder = 'Write your message...',
    className = '',
    minHeight = '150px'
}) => {
    const editorRef = useRef(null);
    const tributeRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mentionCache, setMentionCache] = useState({});

    useEffect(() => {
        // Initialize Tribute.js
        tributeRef.current = new Tribute({
            trigger: '@',
            selectTemplate: (item) => `@${item.original.username}`,
            menuItemTemplate: (item) => `
                <div class="flex items-center gap-2 p-2">
                    <img src="${item.original.avatar || '/images/default-avatar.png'}" 
                         alt="${item.original.value}" 
                         class="w-6 h-6 rounded-full"
                         onerror="this.src='/images/default-avatar.png'">
                    <span class="font-medium">${item.original.value}</span>
                    ${item.original.is_verified ? '<svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.5 14.5l-4-4 1.5-1.5 2.5 2.5 5-5 1.5 1.5-6.5 6.5z"/></svg>' : ''}
                    <span class="text-gray-500 text-sm">@${item.original.username}</span>
                </div>
            `,
            lookup: 'value',
            values: async (text, cb) => {
                if (text.length < 1) {
                    cb([]);
                    return;
                }

                // Check cache first
                if (mentionCache[text]) {
                    cb(mentionCache[text]);
                    return;
                }

                try {
                    setIsLoading(true);
                    const response = await axios.get(`/api/users/search?query=${encodeURIComponent(text)}`);
                    const users = response.data;
                    
                    // Update cache
                    setMentionCache(prev => ({
                        ...prev,
                        [text]: users
                    }));
                    
                    cb(users);
                } catch (error) {
                    console.error('Error fetching user suggestions:', error);
                    cb([]);
                } finally {
                    setIsLoading(false);
                }
            },
            menuShowMinLength: 1,
            menuItemLimit: 5,
            noMatchTemplate: () => '<span class="p-2 text-gray-500">No users found</span>',
            loadingTemplate: () => '<span class="p-2 text-gray-500">Loading...</span>',
        });

        // Attach Tribute to the editor
        tributeRef.current.attach(editorRef.current);

        // Cleanup
        return () => {
            if (tributeRef.current) {
                tributeRef.current.detach(editorRef.current);
            }
        };
    }, []);

    // Add styles for Tribute.js
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .tribute-container {
                position: absolute;
                top: 0;
                left: 0;
                height: auto;
                max-height: 300px;
                max-width: 500px;
                overflow-y: auto;
                display: block;
                z-index: 999999;
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                border: 1px solid #e5e7eb;
            }
            .tribute-container ul {
                margin: 0;
                padding: 0;
                list-style: none;
            }
            .tribute-container li {
                cursor: pointer;
                padding: 0.25rem 0.5rem;
            }
            .tribute-container li:hover {
                background-color: #f3f4f6;
            }
            .tribute-container li.highlight {
                background-color: #f3f4f6;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="relative">
            <div
                ref={editorRef}
                contentEditable
                className={`prose prose-sm max-w-none focus:outline-none ${className}`}
                style={{ minHeight }}
                placeholder={placeholder}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: value }}
                role="textbox"
                aria-multiline="true"
            />
            {isLoading && (
                <div className="absolute right-2 top-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
                </div>
            )}
        </div>
    );
};

export default RichTextEditor; 