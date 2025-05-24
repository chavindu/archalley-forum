<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    /**
     * Store (or update) a vote for the authenticated user.
     * votable_type is expected to be 'thread' or 'comment'.
     * vote_type is expected to be 'upvote' or 'downvote'.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'votable_id' => 'required|integer',
            'votable_type' => 'required|in:thread,comment',
            'vote_type' => 'required|in:upvote,downvote',
        ]);
        $user_id = Auth::id();

        // Map votable_type to model class
        $votableTypeMap = [
            'thread' => 'App\\Models\\Thread',
            'comment' => 'App\\Models\\Comment',
        ];
        $votableType = $votableTypeMap[$validated['votable_type']];

        $vote = Vote::updateOrCreate(
            [
                'votable_id' => $validated['votable_id'],
                'votable_type' => $votableType,
                'user_id' => $user_id,
            ],
            [
                'vote_type' => $validated['vote_type'],
            ]
        );

        return response()->json($vote, 201);
    }
}
