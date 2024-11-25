import { ArrowLeft } from 'lucide-react';
import { CharacterFilters } from '../types/character';

interface MobileFiltersProps {
  filters: CharacterFilters;
  onFilterChange: (filters: CharacterFilters) => void;
  onClose: () => void;
}

export default function MobileFilters({ filters, onFilterChange, onClose }: MobileFiltersProps) {
  const handleFilterChange = (key: keyof CharacterFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onClose} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm text-gray-500 mb-3">Characters</h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange('type', 'all')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filters.type === 'all' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('type', 'starred')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filters.type === 'starred' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'
              }`}
            >
              Starred
            </button>
            <button
              onClick={() => handleFilterChange('type', 'others')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filters.type === 'others' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'
              }`}
            >
              Others
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-500 mb-3">Specie</h3>
          <div className="flex gap-2">
            <button
              onClick={() => handleFilterChange('species', '')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filters.species === '' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('species', 'Human')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filters.species === 'Human' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'
              }`}
            >
              Human
            </button>
            <button
              onClick={() => handleFilterChange('species', 'Alien')}
              className={`px-4 py-2 rounded-lg text-sm ${
                filters.species === 'Alien' ? 'bg-purple-100 text-purple-700' : 'bg-gray-50'
              }`}
            >
              Alien
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="fixed bottom-4 left-4 right-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Filter
        </button>
      </div>
    </div>
  );
}