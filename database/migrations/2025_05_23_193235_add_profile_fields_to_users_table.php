<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('company')->nullable();
            $table->string('profession')->nullable();
            $table->text('bio')->nullable();
            $table->json('social_media_links')->nullable();
            $table->string('website_link')->nullable();
            $table->string('business_email')->nullable()->unique();
            $table->string('phone_number')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('directory_visible')->default(true);
            $table->unsignedBigInteger('ranking_badge_id')->nullable();
            
            // Add foreign key constraint for ranking_badge_id
            // Note: We'll add the actual foreign key constraint later when the user_ranking_badges table exists
            // $table->foreign('ranking_badge_id')->references('id')->on('user_ranking_badges')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'company',
                'profession',
                'bio',
                'social_media_links',
                'website_link',
                'business_email',
                'phone_number',
                'is_verified',
                'directory_visible',
                'ranking_badge_id'
            ]);
        });
    }
};
