<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class AllPostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user:id,name')->latest()->get();
        return inertia('Posts/AllPosts', [
            'posts'=> PostResource::collection($posts),
        ]);
    }
}
