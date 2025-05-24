<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Flag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class FlagController extends Controller
{
    /**
     * Store a new flag.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'flaggable_id' => 'required|integer',
            'flaggable_type' => [
                'required',
                'string',
                Rule::in(['App\\Models\\Thread', 'App\\Models\\Comment', 'App\\Models\\User']),
            ],
            'reason' => 'required|string|min:10|max:1000',
        ]);

        // Check if the flaggable model exists
        $flaggableClass = $validated['flaggable_type'];
        $flaggable = $flaggableClass::find($validated['flaggable_id']);
        
        if (!$flaggable) {
            return response()->json([
                'message' => 'The content you are trying to flag does not exist.',
            ], 404);
        }

        // Check if user has already flagged this content
        $existingFlag = Flag::where('user_id', Auth::id())
            ->where('flaggable_id', $validated['flaggable_id'])
            ->where('flaggable_type', $validated['flaggable_type'])
            ->where('status', 'open')
            ->first();

        if ($existingFlag) {
            return response()->json([
                'message' => 'You have already flagged this content.',
            ], 422);
        }

        // Create the flag
        $flag = Flag::create([
            'user_id' => Auth::id(),
            'flaggable_id' => $validated['flaggable_id'],
            'flaggable_type' => $validated['flaggable_type'],
            'reason' => $validated['reason'],
        ]);

        // Notify moderators (to be implemented)
        // event(new ContentFlagged($flag));

        return response()->json([
            'message' => 'Content has been flagged successfully.',
            'flag' => $flag,
        ], 201);
    }
} 