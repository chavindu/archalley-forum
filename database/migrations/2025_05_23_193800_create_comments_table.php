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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('thread_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->text('content');
            $table->boolean('is_best_answer')->default(false);
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('comments')->onDelete('cascade');
            $table->index(['thread_id', 'parent_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
