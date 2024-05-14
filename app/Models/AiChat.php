<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiChat extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'prompt', 'response'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
