import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { Character, CharacterFilters } from '../types/character';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar';
import CharacterDetail from './CharacterDetail';
import MobileFilters from './MobileFilters';
import { useCharacter } from '../context/CharacterContext';

export default function CharacterList() {
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { selectedCharacter } = useCharacter();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      filter: {
        name: filters.name,
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
      }
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error.message}</div>;

  const characters = data?.characters?.results || [];
  let filteredCharacters = characters;

  // Apply type filter
  if (filters.type === 'starred') {
    filteredCharacters = filteredCharacters.filter((char: Character) => favorites.has(char.id));
  } else if (filters.type === 'others') {
    filteredCharacters = filteredCharacters.filter((char: Character) => !favorites.has(char.id));
  }

  const starredCharacters = filteredCharacters.filter((char: Character) => favorites.has(char.id));
  const otherCharacters = filteredCharacters.filter((char: Character) => !favorites.has(char.id));

  return (
    <>
      {/* Mobile Filters */}
      {showMobileFilters && (
        <MobileFilters
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setShowMobileFilters(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <div className="w-full lg:w-[400px] lg:min-w-[400px] p-4 lg:border-r border-gray-200">
          <h1 className="text-2xl font-bold mb-6">Rick and Morty list</h1>
          
          <SearchBar 
            onFilterChange={setFilters}
            onOpenMobileFilters={() => setShowMobileFilters(true)}
          />

          <div className="mt-6">
            {starredCharacters.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm text-gray-500 mb-4">
                  STARRED CHARACTERS ({starredCharacters.length})
                </h2>
                <div className="space-y-3">
                  {starredCharacters.map((char: Character) => (
                    <CharacterCard
                      key={char.id}
                      character={char}
                      isFavorite={true}
                      onFavoriteToggle={toggleFavorite}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm text-gray-500 mb-4">
                CHARACTERS ({otherCharacters.length})
              </h2>
              <div className="space-y-3">
                {otherCharacters.map((char: Character) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    isFavorite={false}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1">
          {selectedCharacter ? (
            <CharacterDetail />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a character to view details
            </div>
          )}
        </div>
      </div>
    </>
  );
}