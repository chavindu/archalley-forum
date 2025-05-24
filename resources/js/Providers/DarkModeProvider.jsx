import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => {},
});

export function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Then check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Update localStorage and document class when theme changes
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            // Only update if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}; 