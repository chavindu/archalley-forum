<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class ThreadController extends Controller
{
    /**
     * Pin a thread (Admin/Moderator only)
     */
    public function pin(Thread $thread): JsonResponse
    {
        if (!Gate::allows('moderate-threads')) {
            abort(403, 'You do not have permission to pin threads.');
        }

        $thread->update([
            'is_pinned' => true,
            'pinned_at' => now(),
        ]);

        return response()->json([
            'message' => 'Thread pinned successfully',
            'thread' => $thread->fresh(),
        ]);
    }

    /**
     * Unpin a thread (Admin/Moderator only)
     */
    public function unpin(Thread $thread): JsonResponse
    {
        if (!Gate::allows('moderate-threads')) {
            abort(403, 'You do not have permission to unpin threads.');
        }

        $thread->update([
            'is_pinned' => false,
            'pinned_at' => null,
        ]);

        return response()->json([
            'message' => 'Thread unpinned successfully',
            'thread' => $thread->fresh(),
        ]);
    }
} 