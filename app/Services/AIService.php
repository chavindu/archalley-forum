<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class AIService
{
    /**
     * Categorize a thread using AI (Google Gemini).
     *
     * @param string $title
     * @param string $content
     * @return string|null
     */
    public function categorizeThread(string $title, string $content): ?string
    {
        $prompt = "Given the following forum thread title and content, classify it into ONE of these categories: Business, Design, Career, Construction, Academic, Informative, Other. Return ONLY the category name, with no explanation or extra text.\n\nTitle: {$title}\nContent: {$content}";
        try {
            // TODO: Replace this with actual Gemini API call
            // $response = $this->callGeminiApi($prompt);
            // $category = trim($response);
            // Simulate a response for now:
            $category = 'Other';
            $validCategories = ['Business', 'Design', 'Career', 'Construction', 'Academic', 'Informative', 'Other'];
            if (in_array($category, $validCategories, true)) {
                return $category;
            }
        } catch (\Exception $e) {
            Log::error('AI categorizeThread error: ' . $e->getMessage());
        }
        return null;
    }

    /**
     * Generate 3-5 SEO-friendly tags for a thread using AI (Google Gemini).
     *
     * @param string $title
     * @param string $content
     * @return array
     */
    public function generateTags(string $title, string $content): array
    {
        $prompt = "Below is a forum thread. Please generate 3–5 SEO-friendly tags (one per line) for it.\n\nTitle: {$title}\n\nContent:\n{$content}\n\nReply with one tag per line (e.g. tag1\ntag2\ntag3).";
        try {
            // TODO: Replace this with actual Gemini API call
            // $response = $this->callGeminiApi($prompt);
            // $tags = preg_split('/\r?\n/', trim($response));
            // Simulate a response for now:
            $tags = ['forum', 'discussion', 'example'];
            return $tags;
        } catch (\Exception $e) {
            Log::error('AI generateTags error: ' . $e->getMessage());
        }
        return [];
    }

    // private function callGeminiApi($prompt) { /* ... */ }
} 