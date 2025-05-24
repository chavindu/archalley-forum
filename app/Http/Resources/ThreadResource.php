<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'category' => $this->whenLoaded('category'),
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'profile_picture_url' => $this->user->profile_picture_url,
                    'is_verified' => $this->user->is_verified,
                    'ranking_badge' => $this->user->ranking_badge ? [
                        'name' => $this->user->ranking_badge->name,
                        'icon_svg' => $this->user->ranking_badge->icon_svg,
                    ] : null,
                ];
            }),
            'upvotes_count' => $this->upvotes_count,
            'downvotes_count' => $this->downvotes_count,
            // Add other fields as needed
        ];
    }
}
