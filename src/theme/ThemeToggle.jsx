import React from 'react';
import { useTheme } from './ThemeProvider';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-700 text-sm px-4 py-2 rounded"
    >
      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}

export default ThemeToggle;
