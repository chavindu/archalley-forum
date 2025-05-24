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
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('provider_token')->nullable();
            $table->string('provider_refresh_token')->nullable();
            $table->timestamp('provider_token_expires_at')->nullable();
            $table->string('avatar_url')->nullable();

            // Add unique constraint for provider + provider_id combination
            $table->unique(['provider', 'provider_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['provider', 'provider_id']);
            $table->dropColumn([
                'provider',
                'provider_id',
                'provider_token',
                'provider_refresh_token',
                'provider_token_expires_at',
                'avatar_url'
            ]);
        });
    }
}; 