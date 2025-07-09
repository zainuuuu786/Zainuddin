import React, { useState } from "react";
import "./index.css";

const quotes = [
  "Believe you can and you're halfway there.",
  "Do something today that your future self will thank you for.",
  "Your only limit is your mind.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Small steps every day lead to big results.",
  "Your potential is endless.",
  "Make it happen. Shock everyone.",
  "Success doesn't come to you. You go to it."
];

function App() {
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [darkMode, setDarkMode] = useState(false);

  const quote = quotes[index];

  const nextQuote = () => {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: quote });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  const saveFavorite = () => {
    if (!favorites.includes(quote)) {
      const newFavorites = [...favorites, quote];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex items-center justify-center`}>
      <div className="w-full max-w-2xl border-2 border-gray-400 dark:border-gray-600 rounded-lg p-8 bg-white dark:bg-gray-800 shadow-lg">

        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Quote Section */}
        <h1 className="text-3xl font-bold mb-4 text-center">🌟 Inspirational Quote 🌟</h1>
        <p className="text-xl italic mb-6 text-center">“{quote}”</p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={nextQuote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            ➡ Next
          </button>
          <button
            onClick={handleShare}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            📤 Share
          </button>
          <button
            onClick={saveFavorite}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
          >
            💾 Favorites
          </button>
        </div>

        {/* Favorites */}
        <div>
          <h2 className="text-xl font-semibold mb-3">💖 Favorite Quotes</h2>
          {favorites.length > 0 ? (
            <ul className="space-y-2">
  {favorites.map((fav, idx) => (
    <li key={idx} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
      <span className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">{fav}</span>
      <button
        onClick={() => {
          const updatedFavorites = favorites.filter((q) => q !== fav);
          setFavorites(updatedFavorites);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }}
        className="text-red-500 hover:text-red-700 text-sm font-semibold ml-3"
      >
        ✖ Remove
      </button>
    </li>
  ))}
</ul>

          ) : (
            <p className="text-gray-500 dark:text-gray-400">No favorites saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
