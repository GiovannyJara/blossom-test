import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CharacterFilters } from '../types/character';

interface SearchBarProps {
  onFilterChange: (filters: CharacterFilters) => void;
  onOpenMobileFilters: () => void;
}

export default function SearchBar({ onFilterChange, onOpenMobileFilters }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFilterChange({ name: value });
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search or filter results"
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full p-3 pl-10 pr-12 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <button
        onClick={onOpenMobileFilters}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
      >
        <SlidersHorizontal className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
}