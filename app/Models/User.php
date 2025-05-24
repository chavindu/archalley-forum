<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\UserRole;
use App\Enums\VerificationStatus;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'company',
        'profession',
        'bio',
        'social_media_links',
        'website_link',
        'business_email',
        'phone_number',
        'is_verified',
        'directory_visible',
        'ranking_badge_id',
        'provider',
        'provider_id',
        'provider_token',
        'provider_refresh_token',
        'provider_token_expires_at',
        'avatar_url',
        'role',
        'profile_picture_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'provider_token',
        'provider_refresh_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'social_media_links' => 'array',
        'is_verified' => 'boolean',
        'directory_visible' => 'boolean',
        'provider_token_expires_at' => 'datetime',
        'role' => UserRole::class,
    ];

    /**
     * Get the threads created by the user.
     */
    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class);
    }

    public function ranking_badge()
    {
        return $this->belongsTo(\App\Models\UserRankingBadge::class, 'ranking_badge_id');
    }

    /**
     * Get the URL for the user's profile picture.
     *
     * @return string
     */
    public function getProfilePictureUrlAttribute(): string
    {
        if ($this->profile_picture_path) {
            return asset('storage/' . $this->profile_picture_path);
        }

        // Return a default avatar URL if no profile picture is set
        return asset('images/default-avatar.png');
    }

    // Role-related methods
    public function isAdmin(): bool
    {
        return $this->role->isAdmin();
    }

    public function isModerator(): bool
    {
        return $this->role->isModerator();
    }

    public function isAdminOrModerator(): bool
    {
        return $this->role->isAdminOrModerator();
    }

    public function hasRole(UserRole $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Get the verification requests for the user.
     */
    public function verificationRequests(): HasMany
    {
        return $this->hasMany(VerificationRequest::class);
    }

    /**
     * Get the latest verification request for the user.
     */
    public function latestVerificationRequest()
    {
        return $this->verificationRequests()->latest()->first();
    }

    /**
     * Check if the user has a pending verification request.
     */
    public function hasPendingVerificationRequest(): bool
    {
        return $this->verificationRequests()
            ->where('status', VerificationStatus::PENDING)
            ->exists();
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function unreadNotifications(): HasMany
    {
        return $this->notifications()->whereNull('read_at');
    }

    public function markAllNotificationsAsRead(): void
    {
        $this->unreadNotifications()->update(['read_at' => now()]);
    }
}
