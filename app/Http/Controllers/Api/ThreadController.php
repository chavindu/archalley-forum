<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use App\Http\Requests\StoreThreadRequest;
use App\Http\Requests\UpdateThreadRequest;
use App\Services\AIService;
use App\Models\Category;

class ThreadController extends Controller
{
    /**
     * Display a paginated listing of the threads, eager loading user and category.
     */
    public function index(Request $request)
    {
        $threads = Thread::with(['user', 'category'])
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 15));
        return response()->json($threads);
    }

    /**
     * Store a newly created thread in storage, associating with the authenticated user.
     */
    public function store(StoreThreadRequest $request)
    {
        $validated = $request->validated();

        $ai = new AIService();
        $categoryName = $ai->categorizeThread($validated['title'], $validated['content']);
        $category = Category::where('name', $categoryName)->first();
        if (!$category) {
            $category = Category::where('name', 'Other')->first();
        }
        $tags = $ai->generateTags($validated['title'], $validated['content']);

        $thread = Thread::create([
            'user_id' => Auth::id(),
            'category_id' => $category ? $category->id : null,
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'content' => $validated['content'],
            'tags' => $tags,
        ]);

        return response()->json($thread->load(['user', 'category']), 201);
    }

    /**
     * Display the specified thread, eager loading user, category, comments.user, and comments.replies.
     */
    public function show($id)
    {
        $thread = Thread::with([
            'user',
            'category',
            'comments.user',
            'comments.replies',
        ])->findOrFail($id);

        return response()->json($thread);
    }

    /**
     * Update the specified thread in storage (author or admin/moderator only).
     */
    public function update(UpdateThreadRequest $request, $id)
    {
        $thread = Thread::findOrFail($id);
        $this->authorize('update', $thread);

        $validated = $request->validated();
        $thread->update($validated);
        return response()->json($thread->fresh(['user', 'category']));
    }

    /**
     * Remove the specified thread from storage (author or admin/moderator only).
     */
    public function destroy(Request $request, $id)
    {
        $thread = Thread::findOrFail($id);
        $this->authorize('delete', $thread);
        $thread->delete();
        return response()->json(['message' => 'Thread deleted successfully.']);
    }
}
