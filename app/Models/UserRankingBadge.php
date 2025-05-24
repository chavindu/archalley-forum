<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserRankingBadge extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'icon_svg',
        'description',
        'min_threads_created',
        'min_upvotes_received',
        'min_best_answers'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'min_threads_created' => 'integer',
        'min_upvotes_received' => 'integer',
        'min_best_answers' => 'integer'
    ];

    /**
     * Get the users that have this ranking badge.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'ranking_badge_id');
    }
}
