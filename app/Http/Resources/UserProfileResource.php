<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
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
            'name' => $this->name,
            'profile_picture_url' => $this->profile_picture_url,
            'is_verified' => $this->is_verified,
            'company' => $this->company,
            'profession' => $this->profession,
            'bio' => $this->bio,
            'website_link' => $this->website_link,
            'social_media_links' => $this->social_media_links,
            'ranking_badge' => $this->whenLoaded('ranking_badge', function () {
                return [
                    'name' => $this->ranking_badge->name,
                    'icon_svg' => $this->ranking_badge->icon_svg,
                ];
            }),
            'created_at' => $this->created_at,
            'threads_count' => $this->whenCounted('threads'),
            'comments_count' => $this->whenCounted('comments'),
        ];
    }
}
