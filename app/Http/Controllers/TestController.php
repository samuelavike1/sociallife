<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TestController extends Controller
{
    public function test()
    {
//        $response = Http::withHeaders([
//            'accept' => 'application/json',
//            'content-type' => 'application/json',
//            'Authorization' => env('COHERE_API_KEY'),
//        ])->post('https://api.cohere.ai/v1/generate',[
//            'prompt' => 'generate a python function that takes a list of numbers and returns the sum of the list',
//        ])['generations'][0]['text'];
//
//        dd($response);
        return inertia('Test');

    }
}
