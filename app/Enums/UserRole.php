<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case MODERATOR = 'moderator';
    case MEMBER = 'member';

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::MODERATOR => 'Moderator',
            self::MEMBER => 'Member',
        };
    }

    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    public function isModerator(): bool
    {
        return $this === self::MODERATOR;
    }

    public function isAdminOrModerator(): bool
    {
        return $this === self::ADMIN || $this === self::MODERATOR;
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
} 