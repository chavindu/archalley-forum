<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // e.g., 'mention', 'reply', 'verification'
            $table->string('message');
            $table->string('link')->nullable(); // URL to the relevant content
            $table->timestamp('read_at')->nullable();
            $table->timestamps();

            // Index for faster queries
            $table->index(['user_id', 'read_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}; 