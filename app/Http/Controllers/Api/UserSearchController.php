<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserSearchController extends Controller
{
    /**
     * Search users for mention suggestions
     */
    public function search(Request $request): JsonResponse
    {
        $request->validate([
            'query' => 'required|string|min:1|max:50',
        ]);

        $users = User::where('name', 'like', $request->query . '%')
            ->orWhere('username', 'like', $request->query . '%')
            ->select('id', 'name', 'username', 'profile_picture_path', 'is_verified')
            ->limit(5)
            ->get()
            ->map(function ($user) {
                return [
                    'key' => $user->username,
                    'value' => $user->name,
                    'username' => $user->username,
                    'avatar' => $user->profile_picture_path,
                    'is_verified' => $user->is_verified,
                ];
            });

        return response()->json($users);
    }
} 