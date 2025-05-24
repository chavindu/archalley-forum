<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use App\Models\Thread;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Settings extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Settings';
    protected static ?string $title = 'Site Settings';
    protected static ?int $navigationSort = -1;

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'site_name' => Setting::get('site_name', config('app.name')),
            'site_description' => Setting::get('site_description'),
            'logo' => Setting::get('logo'),
            'favicon' => Setting::get('favicon'),
            'meta_title' => Setting::get('meta_title'),
            'meta_description' => Setting::get('meta_description'),
            'meta_keywords' => Setting::get('meta_keywords'),
            'mail_host' => config('mail.mailers.smtp.host'),
            'mail_port' => config('mail.mailers.smtp.port'),
            'mail_encryption' => config('mail.mailers.smtp.encryption'),
            'mail_from_address' => config('mail.from.address'),
            'mail_from_name' => config('mail.from.name'),
            'openai_api_key' => Setting::get('openai_api_key'),
            'gemini_api_key' => Setting::get('gemini_api_key'),
            'featured_threads' => Setting::get('featured_threads', [], 'array'),
            'require_approval' => Setting::get('require_approval', false, 'boolean'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Settings')
                    ->tabs([
                        Tab::make('General')
                            ->schema([
                                Section::make('Site Information')
                                    ->schema([
                                        TextInput::make('site_name')
                                            ->required()
                                            ->maxLength(255),
                                        Textarea::make('site_description')
                                            ->maxLength(1000)
                                            ->rows(3),
                                    ]),

                                Section::make('Branding')
                                    ->schema([
                                        FileUpload::make('logo')
                                            ->image()
                                            ->directory('branding')
                                            ->visibility('public')
                                            ->imageResizeMode('contain')
                                            ->imageResizeTargetWidth('200')
                                            ->imageResizeTargetHeight('200'),
                                        FileUpload::make('favicon')
                                            ->image()
                                            ->directory('branding')
                                            ->visibility('public')
                                            ->imageResizeMode('contain')
                                            ->imageResizeTargetWidth('32')
                                            ->imageResizeTargetHeight('32'),
                                    ]),
                            ]),

                        Tab::make('SEO')
                            ->schema([
                                Section::make('Meta Information')
                                    ->schema([
                                        TextInput::make('meta_title')
                                            ->maxLength(60)
                                            ->helperText('Recommended: 50-60 characters'),
                                        Textarea::make('meta_description')
                                            ->maxLength(160)
                                            ->rows(3)
                                            ->helperText('Recommended: 150-160 characters'),
                                        TextInput::make('meta_keywords')
                                            ->maxLength(255)
                                            ->helperText('Comma-separated keywords'),
                                    ]),
                            ]),

                        Tab::make('Mail')
                            ->schema([
                                Section::make('SMTP Configuration')
                                    ->description('Mail configuration is managed through environment variables. This is a read-only view.')
                                    ->schema([
                                        TextInput::make('mail_host')
                                            ->disabled()
                                            ->dehydrated(false),
                                        TextInput::make('mail_port')
                                            ->disabled()
                                            ->dehydrated(false),
                                        TextInput::make('mail_encryption')
                                            ->disabled()
                                            ->dehydrated(false),
                                        TextInput::make('mail_from_address')
                                            ->disabled()
                                            ->dehydrated(false),
                                        TextInput::make('mail_from_name')
                                            ->disabled()
                                            ->dehydrated(false),
                                    ]),
                            ]),

                        Tab::make('API Keys')
                            ->schema([
                                Section::make('API Configuration')
                                    ->schema([
                                        TextInput::make('openai_api_key')
                                            ->password()
                                            ->dehydrateStateUsing(fn ($state) => $state ? encrypt($state) : null)
                                            ->dehydrated(fn ($state) => filled($state))
                                            ->helperText('Your OpenAI API key is encrypted before storage'),
                                        TextInput::make('gemini_api_key')
                                            ->password()
                                            ->dehydrateStateUsing(fn ($state) => $state ? encrypt($state) : null)
                                            ->dehydrated(fn ($state) => filled($state))
                                            ->helperText('Your Gemini API key is encrypted before storage'),
                                    ]),
                            ]),

                        Tab::make('Homepage')
                            ->schema([
                                Section::make('Featured Content')
                                    ->schema([
                                        Select::make('featured_threads')
                                            ->multiple()
                                            ->relationship('featuredThreads', 'title')
                                            ->preload()
                                            ->searchable()
                                            ->createOptionForm([
                                                TextInput::make('title')
                                                    ->required()
                                                    ->maxLength(255),
                                                Textarea::make('content')
                                                    ->required(),
                                            ]),
                                    ]),
                            ]),

                        Tab::make('Moderation')
                            ->schema([
                                Section::make('Content Moderation')
                                    ->schema([
                                        Toggle::make('require_approval')
                                            ->label('Require Approval for New Content')
                                            ->helperText('When enabled, new threads and comments will require moderator approval before being published')
                                            ->live(),
                                    ]),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            if (in_array($key, ['mail_host', 'mail_port', 'mail_encryption', 'mail_from_address', 'mail_from_name'])) {
                continue; // Skip mail settings as they're managed through env
            }

            $type = match ($key) {
                'featured_threads' => 'array',
                'require_approval' => 'boolean',
                default => 'string',
            };

            Setting::set($key, $value, $type);
        }

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Settings')
                ->submit('save')
                ->keyBindings(['mod+s']),
        ];
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Settings')
                ->submit('save')
                ->keyBindings(['mod+s']),
        ];
    }
} 