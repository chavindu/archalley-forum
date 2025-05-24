import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/notifications');
            setNotifications(response.data.notifications);
            setUnreadCount(response.data.unread_count);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (notificationIds = []) => {
        try {
            const response = await axios.post('/api/notifications/mark-read', {
                notification_ids: notificationIds
            });
            setUnreadCount(response.data.unread_count);
            if (notificationIds.length === 0) {
                // If marking all as read, update all notifications
                setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date() })));
            } else {
                // If marking specific notifications, update only those
                setNotifications(prev => 
                    prev.map(n => 
                        notificationIds.includes(n.id) 
                            ? { ...n, read_at: new Date() }
                            : n
                    )
                );
            }
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    // Fetch notifications when dropdown opens
    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Poll for new notifications every minute
    useEffect(() => {
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                    />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={() => markAsRead()}
                                className="text-xs text-indigo-600 hover:text-indigo-900"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mx-auto mb-2" />
                                Loading notifications...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No notifications
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.map((notification) => (
                                    <Link
                                        key={notification.id}
                                        href={notification.link}
                                        className={`block p-4 hover:bg-gray-50 ${
                                            !notification.read_at ? 'bg-indigo-50' : ''
                                        }`}
                                        onClick={() => markAsRead([notification.id])}
                                    >
                                        <div className="flex items-start">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900">
                                                    {notification.message}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                </p>
                                            </div>
                                            {!notification.read_at && (
                                                <div className="ml-2 flex-shrink-0">
                                                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-600" />
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-2 border-t border-gray-200 bg-gray-50">
                            <Link
                                href="/notifications"
                                className="block text-center text-sm text-indigo-600 hover:text-indigo-900"
                            >
                                View all notifications
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown; 