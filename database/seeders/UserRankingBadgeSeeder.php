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
                'description' => 'Welcome to the community! Start your journey by participating in discussions.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>',
                'min_threads_created' => 0,
                'min_upvotes_received' => 0,
                'min_best_answers' => 0
            ],
            [
                'name' => 'Conversation Starter',
                'description' => 'You\'ve shown initiative by creating engaging discussions.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
                'min_threads_created' => 5,
                'min_upvotes_received' => 10,
                'min_best_answers' => 0
            ],
            [
                'name' => 'Rising Star',
                'description' => 'Your contributions are gaining recognition in the community.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
                'min_threads_created' => 10,
                'min_upvotes_received' => 25,
                'min_best_answers' => 2
            ],
            [
                'name' => 'Visual Storyteller',
                'description' => 'You excel at sharing architectural concepts through visual content.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
                'min_threads_created' => 15,
                'min_upvotes_received' => 50,
                'min_best_answers' => 3
            ],
            [
                'name' => 'Valued Responder',
                'description' => 'Your thoughtful responses help others in the community.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
                'min_threads_created' => 5,
                'min_upvotes_received' => 75,
                'min_best_answers' => 5
            ],
            [
                'name' => 'Community Expert',
                'description' => 'Your expertise and contributions are highly valued by the community.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
                'min_threads_created' => 20,
                'min_upvotes_received' => 100,
                'min_best_answers' => 8
            ],
            [
                'name' => 'Top Contributor',
                'description' => 'You are among the most active and respected members of the community.',
                'icon_svg' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
                'min_threads_created' => 30,
                'min_upvotes_received' => 200,
                'min_best_answers' => 15
            ]
        ];

        foreach ($badges as $badge) {
            UserRankingBadge::create($badge);
        }
    }
}
