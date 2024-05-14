<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CommentResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'comment'=>$this->comment,
            'created_at'=>(new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at'=>(new Carbon($this->updated_at))->format('Y-m-d'),
            'user'=>new UserResource($this->user),
            'post'=>new PostResource($this->post),
        ];
    }
}
