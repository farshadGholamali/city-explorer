import React, { useState, KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName);
      setError('');
    } else {
      setError('Please enter a city name');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    if (e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={cityName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300 ease-in-out"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default SearchBar;