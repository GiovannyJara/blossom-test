export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  occupation?: string;
  isFavorite?: boolean;
  isDeleted?: boolean;
  comments?: string[];
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  type?: 'all' | 'starred' | 'others';
  sortDirection?: 'asc' | 'desc';
}