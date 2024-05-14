<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(CommentRequest $request)
    {
        $data = $request->validated();
        $data['post_id'] = $request->input('post_id');
        $data['user_id'] = auth()->id();

        $comment = Comment::query()->create($data);
        if ($comment){
            return to_route('posts.show', $request->post_id)->with('success_message', 'Comment created successfully');
        }else{
            return to_route('posts.show', $request->post_id)->with('error_message', 'Comment not created successfully');
        }


//        try {
//            $data['post_id'] = $request->input('post_id');
//            $data['user_id'] = auth()->id();
//            Comment::query()->create($data);
//            return redirect()->back()->with('success_message', 'Comment created successfully');
//        } catch (\Exception $e) {
//            return back()->with($e->getMessage());
//        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
