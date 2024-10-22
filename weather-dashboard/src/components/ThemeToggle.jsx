import React from 'react';

function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={`absolute top-4 right-4 p-3 rounded-full ${
        darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
      } transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-shadow`}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;