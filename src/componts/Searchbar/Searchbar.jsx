import React, { useState } from 'react';
import './Searchbar.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      alert('Write your search query');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <input
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          value={searchQuery}
          name="value"
          // autocomplete="off"
          // autofocus
          onChange={handleInputChange}
        />

        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
    </header>
  );
}

export default Searchbar;
