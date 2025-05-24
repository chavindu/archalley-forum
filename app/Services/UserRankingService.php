<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserRankingBadge;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserRankingService
{
    /**
     * Evaluate and update rankings for all users
     */
    public function evaluateAllUsers(): array
    {
        $stats = [
            'users_evaluated' => 0,
            'badges_updated' => 0,
            'new_member_badges' => 0,
            'conversation_starter_badges' => 0,
        ];

        // Get all badges ordered by their requirements (ascending)
        $badges = UserRankingBadge::orderBy('required_threads')
            ->orderBy('required_upvotes')
            ->orderBy('required_best_answers')
            ->get();

        // Get the default "New Member" badge
        $newMemberBadge = $badges->firstWhere('name', 'New Member');
        if (!$newMemberBadge) {
            throw new \RuntimeException('Default "New Member" badge not found');
        }

        // Get user activity metrics in a single query
        $userMetrics = $this->getUserActivityMetrics();

        // Process each user
        foreach ($userMetrics as $userId => $metrics) {
            $stats['users_evaluated']++;

            // Find the appropriate badge based on metrics
            $newBadge = $this->determineUserBadge($metrics, $badges, $newMemberBadge);

            // Update user's badge if it has changed
            if ($this->updateUserBadge($userId, $newBadge)) {
                $stats['badges_updated']++;
                
                // Track which badge was assigned
                if ($newBadge->name === 'New Member') {
                    $stats['new_member_badges']++;
                } elseif ($newBadge->name === 'Conversation Starter') {
                    $stats['conversation_starter_badges']++;
                }
            }
        }

        return $stats;
    }

    /**
     * Get activity metrics for all users in a single query
     */
    private function getUserActivityMetrics(): Collection
    {
        return DB::table('users')
            ->leftJoin('threads', 'users.id', '=', 'threads.user_id')
            ->leftJoin('comments', 'users.id', '=', 'comments.user_id')
            ->leftJoin('votes', function ($join) {
                $join->on('users.id', '=', 'votes.user_id')
                    ->where('votes.votable_type', '=', 'App\\Models\\Thread');
            })
            ->leftJoin('votes as comment_votes', function ($join) {
                $join->on('users.id', '=', 'comment_votes.user_id')
                    ->where('comment_votes.votable_type', '=', 'App\\Models\\Comment');
            })
            ->leftJoin('comments as best_answers', function ($join) {
                $join->on('users.id', '=', 'best_answers.user_id')
                    ->where('best_answers.is_best_answer', '=', true);
            })
            ->select([
                'users.id',
                DB::raw('COUNT(DISTINCT threads.id) as thread_count'),
                DB::raw('COUNT(DISTINCT comments.id) as comment_count'),
                DB::raw('COUNT(DISTINCT votes.id) + COUNT(DISTINCT comment_votes.id) as total_upvotes'),
                DB::raw('COUNT(DISTINCT best_answers.id) as best_answers_count'),
            ])
            ->groupBy('users.id')
            ->get()
            ->keyBy('id')
            ->map(function ($user) {
                return [
                    'thread_count' => (int) $user->thread_count,
                    'comment_count' => (int) $user->comment_count,
                    'total_upvotes' => (int) $user->total_upvotes,
                    'best_answers_count' => (int) $user->best_answers_count,
                ];
            });
    }

    /**
     * Determine the appropriate badge for a user based on their metrics
     */
    private function determineUserBadge(array $metrics, Collection $badges, UserRankingBadge $newMemberBadge): UserRankingBadge
    {
        // Start with the highest badge and work down
        foreach ($badges->reverse() as $badge) {
            if ($this->userQualifiesForBadge($metrics, $badge)) {
                return $badge;
            }
        }

        // If no other badge is qualified, return the default "New Member" badge
        return $newMemberBadge;
    }

    /**
     * Check if a user qualifies for a specific badge
     */
    private function userQualifiesForBadge(array $metrics, UserRankingBadge $badge): bool
    {
        // Check each requirement
        if ($badge->required_threads > 0 && $metrics['thread_count'] < $badge->required_threads) {
            return false;
        }

        if ($badge->required_upvotes > 0 && $metrics['total_upvotes'] < $badge->required_upvotes) {
            return false;
        }

        if ($badge->required_best_answers > 0 && $metrics['best_answers_count'] < $badge->required_best_answers) {
            return false;
        }

        return true;
    }

    /**
     * Update a user's badge if it has changed
     */
    private function updateUserBadge(int $userId, UserRankingBadge $newBadge): bool
    {
        $user = User::find($userId);
        if (!$user) {
            Log::warning("User not found while updating badge", ['user_id' => $userId]);
            return false;
        }

        if ($user->ranking_badge_id !== $newBadge->id) {
            $user->ranking_badge_id = $newBadge->id;
            $user->save();
            
            Log::info("User badge updated", [
                'user_id' => $userId,
                'old_badge' => $user->rankingBadge?->name,
                'new_badge' => $newBadge->name
            ]);
            
            return true;
        }

        return false;
    }
} 