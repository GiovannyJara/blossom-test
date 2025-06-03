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
  const { selectedCharacter, setSelectedCharacter } = useCharacter();

  // Función para manejar los cambios de filtro desde SearchBar y MobileFilters
  // Esta función fusiona los nuevos filtros con los existentes,
  // asegurando que no se sobrescriban los filtros previos.
  const handleAllFiltersChange = (newFilterPart: Partial<CharacterFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilterPart,
    }));
  };

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

  // Aplica el filtro por 'type' (starred, others, all) después de la consulta GraphQL.
  // Los filtros de 'name', 'status', 'species', 'gender' se manejan directamente en la consulta.
  if (filters.type === 'starred') {
    filteredCharacters = filteredCharacters.filter((char: Character) => favorites.has(char.id));
  } else if (filters.type === 'others') {
    filteredCharacters = filteredCharacters.filter((char: Character) => !favorites.has(char.id));
  }

  const starredCharacters = filteredCharacters.filter((char: Character) => favorites.has(char.id));
  const otherCharacters = filteredCharacters.filter((char: Character) => !favorites.has(char.id));

  return (
    <>
      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <MobileFilters
          filters={filters}
          onFilterChange={handleAllFiltersChange} // Usa la nueva función para fusionar filtros
          onClose={() => setShowMobileFilters(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Left Panel: Character List and Search/Filters */}
        <div className="w-full lg:w-[400px] lg:min-w-[400px] p-4 lg:border-r border-gray-200">
          <h1 className="text-2xl font-bold mb-6">Rick and Morty list</h1>
          
          <SearchBar 
            onFilterChange={handleAllFiltersChange} // Usa la nueva función para fusionar filtros
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
                      // onDelete={deleteCharacter} // Si usas onDelete, actívala aquí
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
                    // onDelete={deleteCharacter} // Si usas onDelete, actívala aquí
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Character Details (visible on large screens or as an overlay on small screens) */}
        {selectedCharacter && (
          <div className="lg:block flex-1">
            <CharacterDetail />
          </div>
        )}
        {/* Placeholder message for desktop when no character is selected */}
        {!selectedCharacter && (
          <div className="hidden lg:flex flex-1 items-center justify-center text-gray-500">
            Select a character to view details
          </div>
        )}
      </div>
    </>
  );
}