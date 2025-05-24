<?php

use Illuminate\Support\Facades\Route;

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

require __DIR__.'/auth.php';
