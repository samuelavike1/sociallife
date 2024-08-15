<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = [
        'status', 'amount',
        'transaction_id',
        'mobile_number', 'mobile_network', 'callback_url'
    ];
}
