<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Enums\UserRole;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user()) {
            abort(401, 'Unauthenticated.');
        }

        $userRole = $request->user()->role;

        switch ($role) {
            case 'admin':
                if (!$userRole->isAdmin()) {
                    abort(403, 'Unauthorized. Admin access required.');
                }
                break;
            case 'moderator':
                if (!$userRole->isAdminOrModerator()) {
                    abort(403, 'Unauthorized. Moderator access required.');
                }
                break;
            case 'member':
                // Any authenticated user is a member
                break;
            default:
                abort(500, 'Invalid role specified in middleware.');
        }

        return $next($request);
    }
} 