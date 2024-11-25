import { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '../types/character';

interface CharacterContextType {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <CharacterContext.Provider value={{ selectedCharacter, setSelectedCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}