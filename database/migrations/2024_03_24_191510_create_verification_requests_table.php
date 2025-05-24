<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\VerificationStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('verification_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('proof_document_path');
            $table->enum('status', array_column(VerificationStatus::cases(), 'value'))->default(VerificationStatus::PENDING->value);
            $table->text('notes')->nullable();
            $table->timestamps();

            // Add index for faster status queries
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verification_requests');
    }
}; 