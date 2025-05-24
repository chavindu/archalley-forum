<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'content' => $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
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
            // Add other fields as needed
        ];
    }
}
