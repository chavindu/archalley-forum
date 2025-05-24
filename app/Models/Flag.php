<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Flag extends Model
{
    protected $fillable = [
        'user_id',
        'flaggable_id',
        'flaggable_type',
        'reason',
        'status',
        'resolution_notes',
        'resolved_by',
        'resolved_at',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    /**
     * Get the user who created the flag.
     */
    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the user who resolved the flag.
     */
    public function resolver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    /**
     * Get the flaggable model (Thread, Comment, or User).
     */
    public function flaggable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope a query to only include open flags.
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    /**
     * Scope a query to only include resolved flags.
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Mark the flag as resolved.
     */
    public function resolve(string $notes, User $resolver): bool
    {
        return $this->update([
            'status' => 'resolved',
            'resolution_notes' => $notes,
            'resolved_by' => $resolver->id,
            'resolved_at' => now(),
        ]);
    }
} 