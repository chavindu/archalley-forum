<?php

namespace App\Models;

use App\Enums\VerificationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VerificationRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'proof_document_path',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => VerificationStatus::class,
    ];

    /**
     * Get the user that owns the verification request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the URL for the proof document.
     */
    public function getProofDocumentUrlAttribute(): string
    {
        return asset('storage/' . $this->proof_document_path);
    }

    /**
     * Check if the request is pending.
     */
    public function isPending(): bool
    {
        return $this->status === VerificationStatus::PENDING;
    }

    /**
     * Check if the request is approved.
     */
    public function isApproved(): bool
    {
        return $this->status === VerificationStatus::APPROVED;
    }

    /**
     * Check if the request is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === VerificationStatus::REJECTED;
    }
}
