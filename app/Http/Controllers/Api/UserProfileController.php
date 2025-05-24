<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserProfileResource;
use App\Http\Resources\UserPrivateProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserProfileController extends Controller
{
    /**
     * Display the public profile of a user.
     */
    public function show(Request $request, string $identifier)
    {
        $user = User::query()
            ->when(is_numeric($identifier), function ($query) use ($identifier) {
                return $query->where('id', $identifier);
            }, function ($query) use ($identifier) {
                return $query->where('name', $identifier);
            })
            ->with('ranking_badge')
            ->withCount(['threads', 'comments'])
            ->firstOrFail();

        return new UserProfileResource($user);
    }

    /**
     * Display the authenticated user's full profile.
     */
    public function me(Request $request)
    {
        $user = $request->user()
            ->load('ranking_badge')
            ->loadCount(['threads', 'comments']);

        return new UserPrivateProfileResource($user);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'profession' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:1000'],
            'website_link' => ['nullable', 'url', 'max:255'],
            'business_email' => ['nullable', 'email', 'max:255'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'social_media_links' => ['nullable', 'array'],
            'social_media_links.*' => ['url', 'max:255'],
            'directory_visible' => ['boolean'],
        ]);

        // Ensure social_media_links only contains allowed platforms
        if (isset($validated['social_media_links'])) {
            $allowedPlatforms = ['linkedin', 'twitter', 'instagram', 'facebook', 'behance', 'dribbble', 'github'];
            $validated['social_media_links'] = array_intersect_key(
                $validated['social_media_links'],
                array_flip($allowedPlatforms)
            );
        }

        $user->update($validated);

        return new UserPrivateProfileResource($user);
    }

    /**
     * Upload and update the user's profile picture.
     */
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:2048', 'dimensions:min_width=100,min_height=100'], // 2MB max, minimum 100x100
        ]);

        $user = $request->user();

        // Delete old profile picture if exists
        if ($user->profile_picture_path) {
            Storage::disk('public')->delete($user->profile_picture_path);
        }

        // Store new profile picture
        $file = $request->file('avatar');
        $path = $file->store('avatars/' . $user->id, 'public');

        // Update user's profile picture path
        $user->update(['profile_picture_path' => $path]);

        return new UserPrivateProfileResource($user);
    }
} 