<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Thread;

class DiscussionsController extends Controller
{
    public function index()
    {
        return Inertia::render('Discussions/DiscussionsPage');
    }

    public function show($threadId)
    {
        return Inertia::render('Threads/SingleThreadPage', [
            'threadId' => $threadId
        ]);
    }

    public function create()
    {
        return Inertia::render('Discussions/CreateThreadPage');
    }
} 