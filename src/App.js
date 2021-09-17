import './App.css';
import React, { useState } from 'react';

import Searchbar from 'componts/Searchbar/Searchbar';
import ImageGallery from 'componts/ImageGallery/ImageGallery';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = queryValue => {
    setSearchQuery(queryValue);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchValue={searchQuery} />
    </div>
  );
}
