<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/discussions', [App\Http\Controllers\DiscussionsController::class, 'index'])->name('discussions');
Route::get('/discussions/{threadId}', [App\Http\Controllers\DiscussionsController::class, 'show'])->name('discussions.show');
Route::get('/discussions/create', [App\Http\Controllers\DiscussionsController::class, 'create'])->name('discussions.create');

// Profile Routes
Route::get('/profile/{identifier}', function ($identifier) {
    return Inertia::render('ProfilePage', ['identifier' => $identifier]);
})->name('profile.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile/edit', function () {
        return Inertia::render('EditProfilePage');
    })->name('profile.edit');
});

// User Directory
Route::get('/directory', function () {
    return Inertia::render('UserDirectoryPage');
})->name('directory.index');

require __DIR__.'/auth.php';
