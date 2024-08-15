<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('collect', [\App\Http\Controllers\CollectionController::class, 'collect']);

Route::get('callback-url', [\App\Http\Controllers\CollectionController::class, 'callback']);
