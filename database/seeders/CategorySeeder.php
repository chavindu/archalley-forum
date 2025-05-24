<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Business',
                'description' => 'Discussions about business strategies, entrepreneurship, and industry insights.'
            ],
            [
                'name' => 'Design',
                'description' => 'Topics related to architecture, interior design, and creative design processes.'
            ],
            [
                'name' => 'Career',
                'description' => 'Career development, job opportunities, and professional growth in architecture and related fields.'
            ],
            [
                'name' => 'Construction',
                'description' => 'Construction methods, materials, and project management discussions.'
            ],
            [
                'name' => 'Academic',
                'description' => 'Educational topics, research, and academic discussions in architecture and related disciplines.'
            ],
            [
                'name' => 'Informative',
                'description' => 'General information, news, and updates about architecture and the built environment.'
            ],
            [
                'name' => 'Other',
                'description' => 'Miscellaneous topics that don\'t fit into other categories.'
            ]
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description']
            ]);
        }
    }
}
