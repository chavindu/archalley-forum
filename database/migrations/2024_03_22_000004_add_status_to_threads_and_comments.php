<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->string('status')->default('published')->after('content');
            $table->timestamp('published_at')->nullable()->after('status');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->string('status')->default('published')->after('content');
            $table->timestamp('published_at')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            $table->dropColumn(['status', 'published_at']);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn(['status', 'published_at']);
        });
    }
}; 