<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CollectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'amount' => 'required|numeric', // Amount should be a number
            'transaction_id' => [
                'required',
                Rule::unique('collections', 'transaction_id'), // transaction_id should be unique in the collections table
            ],
            'mobile_number' => [
                'required',
                'regex:/^0[0-9]{9}$/', // mobile number should start with 0 and be 10 digits long
            ],
            'mobile_network' => 'required|in:MTN,VOD,AIR',
            'callback_url' => 'required|url'
        ];
    }
}
