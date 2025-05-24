<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Thread;
use App\Models\Comment;
use Illuminate\Support\Facades\Gate;

class MarkAsBestAnswerController extends Controller
{
    public function store(Thread $thread, Comment $comment)
    {
        // Check moderator/admin via gate
        if (!Gate::allows('markBestAnswer', $thread)) {
            return response()->json(['message' => 'Unauthorized. You must be a moderator or admin.'], 403);
        }
        // Ensure the comment belongs to the thread
        if ($comment->thread_id !== $thread->id) {
            return response()->json(['message' => 'Comment does not belong to the given thread.'], 400);
        }
        // Set is_best_answer=false for all other comments
        Comment::where('thread_id', $thread->id)
            ->where('id', '!=', $comment->id)
            ->update(['is_best_answer' => false]);
        // Set is_best_answer=true for the given comment
        $comment->update(['is_best_answer' => true]);
        return response()->json(['message' => 'Comment marked as best answer.'], 200);
    }
} 