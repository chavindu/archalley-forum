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
        Schema::create('user_ranking_badges', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('icon_svg')->nullable();
            $table->string('description')->nullable();
            $table->integer('min_threads_created')->default(0);
            $table->integer('min_upvotes_received')->default(0);
            $table->integer('min_best_answers')->default(0);
            $table->timestamps();

            // Add index for performance on common queries
            $table->index(
                ['min_threads_created', 'min_upvotes_received', 'min_best_answers'],
                'user_ranking_badges_thresholds_index'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_ranking_badges');
    }
};
