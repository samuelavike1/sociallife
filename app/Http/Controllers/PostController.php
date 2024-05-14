<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostResquest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use function Termwind\render;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user:id,name')->latest()->get();
        return inertia('Posts/Index', [
            'posts'=> PostResource::collection($posts),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostResquest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['user_id'] = auth()->id();
        if ($image){
            $data['image']=$image -> store('post/'.Str::random(),'public');

        }

        Post::query()->create($data);

        return to_route('posts.index')->with('success_message', 'Post created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {

       $post = Post::with('user:id,name')->find($post->id);
       $comments = $post->comments()->where('post_id',$post->id)->latest()->get();

//        dd($comments);
        return inertia('Posts/Show', [
//            'posts'=> $post,
            'posts'=> new PostResource($post),
            'comments'=> CommentResource::collection($comments),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        dd($request->all(),$post);
        $data = $request->validate([
            'content' => 'required',
            'image' => 'nullable|image',
        ]);

        $image = $data['image'] ?? null;
        $data['user_id'] = auth()->id();
        if ($image){
            $data['image']=$image -> store('post/'.Str::random(),'public');
        }

        $post->update($data);

        return to_route('posts.index')->with('success_message', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
//        dd('hit');
        if ($post->image) {
            Storage::disk('public')->deleteDirectory(dirname($post->image));
        }
        $deleted = $post->delete();
        if ($deleted){
            return to_route('posts.index')->with('success_message', 'Post deleted successfully');
        }else{
            return to_route('posts.index')->with('error_message', 'Post not deleted successfully');
        }

    }
}
