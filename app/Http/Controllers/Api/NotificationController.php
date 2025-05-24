<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Get unread notifications for the authenticated user
     */
    public function index(): JsonResponse
    {
        $notifications = Auth::user()
            ->unreadNotifications()
            ->latest()
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'message' => $notification->message,
                    'link' => $notification->link,
                    'created_at' => $notification->created_at->diffForHumans(),
                ];
            });

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $notifications->count(),
        ]);
    }

    /**
     * Mark notifications as read
     */
    public function markAsRead(Request $request): JsonResponse
    {
        $request->validate([
            'notification_ids' => 'sometimes|array',
            'notification_ids.*' => 'exists:notifications,id',
        ]);

        $user = Auth::user();
        $query = $user->unreadNotifications();

        // If specific notification IDs are provided, mark only those as read
        if ($request->has('notification_ids')) {
            $query->whereIn('id', $request->notification_ids);
        }

        $count = $query->update(['read_at' => now()]);

        return response()->json([
            'message' => $count . ' notification(s) marked as read',
            'unread_count' => $user->unreadNotifications()->count(),
        ]);
    }
} 