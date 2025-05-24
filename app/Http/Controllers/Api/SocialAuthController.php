<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    /**
     * Redirect the user to the provider's authentication page.
     */
    public function redirect($provider)
    {
        if (!in_array($provider, ['facebook', 'google', 'microsoft'])) {
            return response()->json(['error' => 'Invalid provider'], 400);
        }

        return Socialite::driver($provider)
            ->stateless()
            ->redirect();
    }

    /**
     * Handle the callback from the provider.
     */
    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();

            // Check if user exists
            $user = User::where('provider', $provider)
                ->where('provider_id', $socialUser->getId())
                ->first();

            if (!$user) {
                // Check if user with same email exists
                $user = User::where('email', $socialUser->getEmail())->first();

                if ($user) {
                    // Link existing account with social provider
                    $user->update([
                        'provider' => $provider,
                        'provider_id' => $socialUser->getId(),
                        'provider_token' => $socialUser->token,
                        'provider_refresh_token' => $socialUser->refreshToken,
                        'provider_token_expires_at' => $socialUser->expiresIn ? now()->addSeconds($socialUser->expiresIn) : null,
                        'avatar_url' => $socialUser->getAvatar(),
                    ]);
                } else {
                    // Create new user
                    $user = User::create([
                        'name' => $socialUser->getName(),
                        'email' => $socialUser->getEmail(),
                        'password' => Hash::make(Str::random(24)),
                        'provider' => $provider,
                        'provider_id' => $socialUser->getId(),
                        'provider_token' => $socialUser->token,
                        'provider_refresh_token' => $socialUser->refreshToken,
                        'provider_token_expires_at' => $socialUser->expiresIn ? now()->addSeconds($socialUser->expiresIn) : null,
                        'avatar_url' => $socialUser->getAvatar(),
                        'email_verified_at' => now(), // Social login emails are pre-verified
                        'is_verified' => true,
                    ]);
                }
            } else {
                // Update tokens for existing social user
                $user->update([
                    'provider_token' => $socialUser->token,
                    'provider_refresh_token' => $socialUser->refreshToken,
                    'provider_token_expires_at' => $socialUser->expiresIn ? now()->addSeconds($socialUser->expiresIn) : null,
                    'avatar_url' => $socialUser->getAvatar(),
                ]);
            }

            // Create API token
            $token = $user->createToken('social-auth')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user,
                'redirect_url' => '/dashboard' // Or wherever you want to redirect after login
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Authentication failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 