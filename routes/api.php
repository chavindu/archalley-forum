<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ThreadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\VerificationRequestController;
use App\Http\Controllers\Api\UserDirectoryController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UserSearchController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Thread routes
    Route::apiResource('threads', ThreadController::class);

    // Comment routes nested under threads
    Route::prefix('threads/{threadId}/comments')->group(function () {
        Route::post('/', [CommentController::class, 'store']);
        Route::put('/{commentId}', [CommentController::class, 'update']);
        Route::delete('/{commentId}', [CommentController::class, 'destroy']);
    });

    Route::middleware('auth:sanctum')->post('threads/{thread}/comments/{comment}/mark-best', [\App\Http\Controllers\Api\MarkAsBestAnswerController::class, 'store']);

    // User Profile Routes
    Route::get('/me', [UserProfileController::class, 'me']);
    Route::put('/profile', [UserProfileController::class, 'update']);
    Route::post('/profile/avatar', [UserProfileController::class, 'uploadAvatar']);
    
    // Verification Request Routes
    Route::post('/profile/request-verification', [VerificationRequestController::class, 'store']);
    Route::get('/profile/verification-status', [VerificationRequestController::class, 'status']);

    // Notification routes
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/mark-read', [NotificationController::class, 'markAsRead']);

    // Flag routes
    Route::post('/flags', [App\Http\Controllers\Api\FlagController::class, 'store']);

    // Thread moderation routes
    Route::post('/threads/{thread}/pin', [ThreadController::class, 'pin'])
        ->name('threads.pin');
    Route::post('/threads/{thread}/unpin', [ThreadController::class, 'unpin'])
        ->name('threads.unpin');
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);

Route::post('votes', [\App\Http\Controllers\Api\VoteController::class, 'store']);

// Social Authentication Routes
Route::get('auth/{provider}/redirect', [App\Http\Controllers\Api\SocialAuthController::class, 'redirect'])
    ->where('provider', 'facebook|google|microsoft')
    ->name('social.redirect');

Route::get('auth/{provider}/callback', [App\Http\Controllers\Api\SocialAuthController::class, 'callback'])
    ->where('provider', 'facebook|google|microsoft')
    ->name('social.callback');

// User Profile Routes
Route::get('/users/{identifier}', [UserProfileController::class, 'show']);

// User Directory Routes
Route::get('/directory/users', [UserDirectoryController::class, 'index']);

// User search for mentions
Route::get('/users/search', [UserSearchController::class, 'search']);
