<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DiscussionsController extends Controller
{
    public function index()
    {
        return Inertia::render('DiscussionsPage');
    }
} 