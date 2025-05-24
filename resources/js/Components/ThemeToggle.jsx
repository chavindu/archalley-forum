import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDarkMode } from '@/Providers/DarkModeProvider';

export default function ThemeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="relative p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className="relative w-5 h-5">
                {/* Sun icon */}
                <SunIcon
                    className={`absolute w-5 h-5 transition-all duration-300 transform ${
                        isDarkMode
                            ? 'rotate-90 scale-0 opacity-0'
                            : 'rotate-0 scale-100 opacity-100'
                    }`}
                />
                {/* Moon icon */}
                <MoonIcon
                    className={`absolute w-5 h-5 transition-all duration-300 transform ${
                        isDarkMode
                            ? 'rotate-0 scale-100 opacity-100'
                            : '-rotate-90 scale-0 opacity-0'
                    }`}
                />
            </div>
        </button>
    );
} 