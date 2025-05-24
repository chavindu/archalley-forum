<?php

namespace App\Filament\Resources;

use Filament\Resources\Resource as BaseResource;
use Illuminate\Database\Eloquent\Builder;

abstract class Resource extends BaseResource
{
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationBadge(): ?string
    {
        if (method_exists(static::class, 'getNavigationBadgeCount')) {
            return static::getNavigationBadgeCount();
        }

        return null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'primary';
    }

    protected static function getNavigationSort(): int
    {
        return match (static::getModel()) {
            \App\Models\User::class => 1,
            \App\Models\Thread::class => 2,
            \App\Models\Comment::class => 3,
            \App\Models\Category::class => 4,
            \App\Models\UserRankingBadge::class => 5,
            \App\Models\Flag::class => 6,
            \App\Models\VerificationRequest::class => 7,
            \App\Models\StaticPage::class => 8,
            default => 100,
        };
    }
} 