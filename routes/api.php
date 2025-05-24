<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ThreadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);
