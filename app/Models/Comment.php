<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Comment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'thread_id',
        'parent_id',
        'content',
        'is_best_answer',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_best_answer' => 'boolean',
    ];

    /**
     * Get the user that owns the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the thread that this comment belongs to.
     */
    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }

    /**
     * Get the parent comment (if this is a reply).
     */
    public function parentComment(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Get the replies for this comment.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
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
}
