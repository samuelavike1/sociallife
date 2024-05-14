<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('posts',[\App\Http\Controllers\PostController::class, 'index'])->name('posts.index');
    Route::post('store-post', [\App\Http\Controllers\PostController::class, 'store'])->name('posts.store');
    Route::get('show-post/{post}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');
    Route::delete('delete-post/{post}', [\App\Http\Controllers\PostController::class, 'destroy'])->name('posts.destroy');
    Route::patch('update-post/{post}', [\App\Http\Controllers\PostController::class, 'update'])->name('posts.update');

    Route::post('store-comment', [\App\Http\Controllers\CommentController::class, 'store'])->name('comment.store');


    Route::get('all-posts',[\App\Http\Controllers\AllPostController::class, 'index'])->name('all-posts');


    //Ai Chat
    Route::get('chats',[\App\Http\Controllers\AiChatController::class, 'chats'])->name('chats');
    Route::post('store-chat', [\App\Http\Controllers\AiChatController::class, 'storechat'])->name('store-chat');

});


Route::get('test',[\App\Http\Controllers\TestController::class, 'test'])->name('test');

require __DIR__.'/auth.php';
