<?php

namespace Database\Seeders;

use App\Models\UserRankingBadge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserRankingBadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $badges = [
            [
                'name' => 'New Member',
                'description' => 'Welcome to ArchAlley! Start participating to earn more badges.',
                'icon' => '👋',
                'color' => '#6B7280', // gray-500
                'required_threads' => 0,
                'required_upvotes' => 0,
                'required_best_answers' => 0,
            ],
            [
                'name' => 'Conversation Starter',
                'description' => 'Created multiple engaging threads that sparked discussions.',
                'icon' => '💭',
                'color' => '#3B82F6', // blue-500
                'required_threads' => 5,
                'required_upvotes' => 10,
                'required_best_answers' => 0,
            ],
            [
                'name' => 'Helpful Contributor',
                'description' => 'Provided valuable answers that were marked as best answers.',
                'icon' => '✅',
                'color' => '#10B981', // green-500
                'required_threads' => 0,
                'required_upvotes' => 20,
                'required_best_answers' => 3,
            ],
            [
                'name' => 'Community Pillar',
                'description' => 'A respected member who consistently contributes quality content.',
                'icon' => '🏆',
                'color' => '#F59E0B', // amber-500
                'required_threads' => 10,
                'required_upvotes' => 50,
                'required_best_answers' => 5,
            ],
        ];

        foreach ($badges as $badge) {
            UserRankingBadge::updateOrCreate(
                ['name' => $badge['name']],
                $badge
            );
        }
    }
}
