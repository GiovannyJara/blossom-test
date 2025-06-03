import { Heart } from 'lucide-react';
import { Character } from '../types/character';
import { useCharacter } from '../context/CharacterContext';

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CharacterCard({ character, isFavorite, onFavoriteToggle }: CharacterCardProps) {
  const { setSelectedCharacter } = useCharacter();

  return (
    <div 
      className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
      onClick={() => setSelectedCharacter(character)}
    >
      <div className="flex items-center flex-1">
        <img
          src={character.image}
          alt={character.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="font-medium">{character.name}888</h3>
          <p className="text-sm text-gray-500">{character.species}</p>
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(character.id);
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? 'text-purple-500 fill-current' : 'text-gray-400'}`}
        />
      </button>
    </div>
  );
}