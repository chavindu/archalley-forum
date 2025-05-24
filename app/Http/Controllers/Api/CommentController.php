<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Http\Requests\StoreCommentRequest;
use App\Services\MentionService;
use App\Models\Notification;

class CommentController extends Controller
{
    protected $mentionService;

    public function __construct(MentionService $mentionService)
    {
        $this->mentionService = $mentionService;
    }

    /**
     * Store a newly created comment for a specific thread.
     */
    public function store(Request $request, $threadId)
    {
        $thread = Thread::findOrFail($threadId);

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        $comment = $thread->comments()->create([
            'content' => $validated['content'],
            'user_id' => $request->user()->id,
        ]);

        // Handle mentions
        $this->mentionService->createMentionNotifications(
            $comment->content,
            $request->user(),
            'comment',
            "/discussions/{$thread->id}#comment-{$comment->id}",
            "on thread: {$thread->title}"
        );

        // Notify thread author if it's not the same user
        if ($thread->user_id !== $request->user()->id) {
            Notification::create([
                'user_id' => $thread->user_id,
                'type' => 'reply',
                'message' => sprintf(
                    '%s replied to your thread "%s"',
                    $request->user()->name,
                    $thread->title
                ),
                'link' => "/discussions/{$thread->id}#comment-{$comment->id}",
            ]);
        }

        return response()->json([
            'message' => 'Comment created successfully',
            'data' => $comment->load('author'),
        ], 201);
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
