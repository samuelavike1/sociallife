<?php

namespace App\Http\Controllers;

use App\Models\AiChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiChatController extends Controller
{
    public function chats()
    {
        $chats = AiChat::query()->where('user_id', auth()->id())->with('user')->get();
        return inertia('Aichat/AiChat', [
            'chats' => $chats
        ]);
    }

    public function storechat(Request $request)
    {
        $data = $request->validate([
            'prompt' => 'required'
        ]);

        $data['user_id'] = auth()->id();

        $response = Http::withHeaders([
            'accept' => 'application/json',
            'content-type' => 'application/json',
            'Authorization' => env('COHERE_API_KEY'),
        ])->post('https://api.cohere.ai/v1/generate',[
            'prompt' => $request->input('prompt'),
        ])['generations'][0]['text'];

        $data['response'] = $response;

        AiChat::query()->create($data);


    }
}
