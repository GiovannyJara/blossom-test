// 5to archivo: SearchBar.tsx
import { useState, useEffect } from 'react'; // Importar useEffect
import { Search, SlidersHorizontal } from 'lucide-react';
import { CharacterFilters } from '../types/character';

interface SearchBarProps {
  onFilterChange: (filters: Partial<CharacterFilters>) => void;
  onOpenMobileFilters: () => void;
}

export default function SearchBar({ onFilterChange, onOpenMobileFilters }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(''); // Nuevo estado para el valor "debounced"

  // Efecto para aplicar el debounce al valor de búsqueda
  useEffect(() => {
    // Establecer un temporizador para actualizar el valor debounced después de 500ms (ajustable)
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 2500); // <-- Puedes ajustar este tiempo (en milisegundos)

    // Limpiar el temporizador si searchValue cambia antes de que expire el anterior
    // Esto asegura que la función solo se ejecute una vez que el usuario deja de escribir
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]); // Solo re-ejecutar el efecto si searchValue cambia

  // Efecto para llamar a onFilterChange cuando el valor debounced cambia
  useEffect(() => {
    // Solo llamar a onFilterChange si el valor debounced no es null/undefined
    // y para evitar una llamada inicial si no hay valor de búsqueda.
    // Aunque aquí en tu caso searchValue empieza como '', es buena práctica.
    onFilterChange({ name: debouncedSearchValue });
  }, [debouncedSearchValue, onFilterChange]); // onFilterChange también es una dependencia para seguir buenas prácticas de hooks

  // Esta función solo actualiza el estado local searchValue
  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search or filter results"
        value={searchValue} // El input siempre muestra el valor actual del usuario
        onChange={(e) => handleInputChange(e.target.value)} // Llama a handleInputChange
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