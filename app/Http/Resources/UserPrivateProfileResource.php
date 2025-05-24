<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPrivateProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // Public data
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

            // Private data
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'business_email' => $this->business_email,
            'phone_number' => $this->phone_number,
            'directory_visible' => $this->directory_visible,
            'role' => $this->role->value,
            'role_label' => $this->role->label(),
            'updated_at' => $this->updated_at,
        ];
    }
}
