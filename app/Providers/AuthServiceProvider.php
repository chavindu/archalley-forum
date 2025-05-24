<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Thread;
use App\Policies\ThreadPolicy;
use App\Models\Comment;
use App\Policies\CommentPolicy;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Thread::class => ThreadPolicy::class,
        Comment::class => CommentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        // Admin Gates
        Gate::define('access-admin-dashboard', function ($user) {
            return $user->isAdmin();
        });

        Gate::define('manage-users', function ($user) {
            return $user->isAdmin();
        });

        Gate::define('manage-roles', function ($user) {
            return $user->isAdmin();
        });

        // Moderator Gates (accessible by both Admins and Moderators)
        Gate::define('moderate-content', function ($user) {
            return $user->isAdminOrModerator();
        });

        Gate::define('pin-thread', function ($user) {
            return $user->isAdminOrModerator();
        });

        Gate::define('unpin-thread', function ($user) {
            return $user->isAdminOrModerator();
        });

        Gate::define('lock-thread', function ($user) {
            return $user->isAdminOrModerator();
        });

        Gate::define('unlock-thread', function ($user) {
            return $user->isAdminOrModerator();
        });

        // Content Management Gates
        Gate::define('delete-thread', function ($user, Thread $thread) {
            return $user->isAdminOrModerator() || $user->id === $thread->user_id;
        });

        Gate::define('delete-comment', function ($user, Comment $comment) {
            return $user->isAdminOrModerator() || $user->id === $comment->user_id;
        });

        // Member Gates
        Gate::define('create-thread', function ($user) {
            return $user !== null; // Any authenticated user
        });

        Gate::define('create-comment', function ($user) {
            return $user !== null; // Any authenticated user
        });

        Gate::define('edit-thread', function ($user, Thread $thread) {
            return $user->id === $thread->user_id;
        });

        Gate::define('edit-comment', function ($user, Comment $comment) {
            return $user->id === $comment->user_id;
        });

        Gate::define('moderate-threads', function ($user) {
            return in_array($user->role, ['admin', 'moderator']);
        });
    }
}
