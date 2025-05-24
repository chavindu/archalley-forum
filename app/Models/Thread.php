<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Thread extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'content',
        'tags',
        'is_pinned',
        'pinned_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tags' => 'array',
        'is_pinned' => 'boolean',
        'pinned_at' => 'datetime',
    ];

    /**
     * Get the user that owns the thread.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that owns the thread.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function votes(): MorphMany
    {
        return $this->morphMany(\App\Models\Vote::class, 'votable');
    }

    public function getUpvotesCountAttribute()
    {
        return $this->votes()->where('vote_type', 'upvote')->count();
    }

    public function getDownvotesCountAttribute()
    {
        return $this->votes()->where('vote_type', 'downvote')->count();
    }

    /**
     * Scope a query to order by pinned status and then by creation date.
     */
    public function scopeOrderByPinned($query)
    {
        return $query->orderBy('is_pinned', 'desc')
                     ->orderBy('pinned_at', 'desc')
                     ->orderBy('created_at', 'desc');
    }

    /**
     * Scope a query to only include pinned threads.
     */
    public function scopePinned($query)
    {
        return $query->where('is_pinned', true);
    }
}
