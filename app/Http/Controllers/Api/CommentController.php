<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Http\Requests\StoreCommentRequest;

class CommentController extends Controller
{
    /**
     * Store a newly created comment for a specific thread.
     */
    public function store(StoreCommentRequest $request, $threadId)
    {
        $thread = Thread::findOrFail($threadId);
        $validated = $request->validated();
        // Ensure parent_id belongs to the same thread if provided
        if (isset($validated['parent_id'])) {
            $parent = Comment::where('id', $validated['parent_id'])->where('thread_id', $thread->id)->first();
            if (!$parent) {
                return response()->json(['message' => 'Invalid parent_id for this thread.'], 422);
            }
        }

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'thread_id' => $thread->id,
            'parent_id' => $validated['parent_id'] ?? null,
            'content' => $validated['content'],
        ]);

        return response()->json($comment->load(['user', 'replies']), 201);
    }

    /**
     * Update the specified comment (author or admin/moderator only).
     */
    public function update(Request $request, $threadId, $commentId)
    {
        $comment = Comment::where('thread_id', $threadId)->findOrFail($commentId);
        $this->authorize('update', $comment);

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update($validated);
        return response()->json($comment->fresh(['user', 'replies']));
    }

    /**
     * Remove the specified comment (author or admin/moderator only).
     */
    public function destroy(Request $request, $threadId, $commentId)
    {
        $comment = Comment::where('thread_id', $threadId)->findOrFail($commentId);
        $this->authorize('delete', $comment);
        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully.']);
    }
}
