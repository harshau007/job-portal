'use client'
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Jobs from './components/Jobs';

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container mx-auto">
        <SearchBar onSearch={handleSearch} />
        <Jobs searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Page;
