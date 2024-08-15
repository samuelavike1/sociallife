<?php

namespace App\Http\Controllers;

use App\Http\Requests\CollectionRequest;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use function Pest\Laravel\json;

class CollectionController extends Controller
{
    public function collect(CollectionRequest $request)
    {
        $data = $request->validated();
        $new_collection = Collection::create([
            'amount' => $data['amount'],
            'transaction_id' => $data['transaction_id'],
            'mobile_number' => $data['mobile_number'],
            'mobile_network' => $data['mobile_number'],
            'callback_url' => $data['callback_url'],
            'success' => 'SUCCESS'
        ]);

        // Prepare the data to send to the callback URL
        $callbackData = [
            'success' => true,
            'transaction_id' => $new_collection->transaction_id,
            'message' => 'Transaction Successful',
        ];

        // Send the data to the callback URL
        try {
            $response = Http::get($new_collection->callback_url, $callbackData);

            // Optionally log the response
            Log::info('Callback Response:', ['response' => $response->body()]);
        } catch (\Exception $e) {
            // Handle the exception if the request fails
            Log::error('Callback Request Failed:', ['error' => $e->getMessage()]);
        }

        return response()->json([
            'message' => 'Collection created successfully!',
            'data' => $new_collection,
        ]);
    }

    public function callback(Request $request)
    {
        Log::info('callback payload: '. json_encode($request->all()));
    }
}
