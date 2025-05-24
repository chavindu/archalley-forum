<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VerificationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class VerificationRequestController extends Controller
{
    /**
     * Submit a new verification request.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Check if user already has a pending request
        if ($user->hasPendingVerificationRequest()) {
            throw ValidationException::withMessages([
                'verification' => 'You already have a pending verification request.',
            ]);
        }

        // Validate the request
        $validated = $request->validate([
            'proof_document' => ['required', 'file', 'max:5120', 'mimes:pdf,jpg,jpeg,png'], // 5MB max
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        // Store the proof document
        $file = $request->file('proof_document');
        $path = $file->store('verification-documents/' . $user->id, 'public');

        // Create the verification request
        $verificationRequest = $user->verificationRequests()->create([
            'proof_document_path' => $path,
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'message' => 'Verification request submitted successfully.',
            'data' => [
                'id' => $verificationRequest->id,
                'status' => $verificationRequest->status->value,
                'submitted_at' => $verificationRequest->created_at,
            ],
        ], 201);
    }

    /**
     * Get the user's verification request status.
     */
    public function status(Request $request)
    {
        $user = $request->user();
        $latestRequest = $user->latestVerificationRequest();

        if (!$latestRequest) {
            return response()->json([
                'data' => null,
            ]);
        }

        return response()->json([
            'data' => [
                'id' => $latestRequest->id,
                'status' => $latestRequest->status->value,
                'status_label' => $latestRequest->status->label(),
                'notes' => $latestRequest->notes,
                'submitted_at' => $latestRequest->created_at,
                'updated_at' => $latestRequest->updated_at,
            ],
        ]);
    }
} 