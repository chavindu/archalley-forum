<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\UserRankingService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class EvaluateUserRankings extends Command
{
    protected $signature = 'users:evaluate-rankings';
    protected $description = 'Evaluate user activity and update ranking badges';

    public function __construct(
        private UserRankingService $rankingService
    ) {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Starting user ranking evaluation...');
        
        try {
            $stats = $this->rankingService->evaluateAllUsers();
            
            $this->info('User ranking evaluation completed successfully!');
            $this->table(
                ['Metric', 'Count'],
                collect($stats)->map(fn($count, $metric) => [$metric, $count])->toArray()
            );
            
            Log::info('User rankings evaluated successfully', $stats);
        } catch (\Exception $e) {
            $this->error('Error evaluating user rankings: ' . $e->getMessage());
            Log::error('Failed to evaluate user rankings', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return 1;
        }

        return 0;
    }
} 