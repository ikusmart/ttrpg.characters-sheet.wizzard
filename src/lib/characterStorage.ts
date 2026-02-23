import type { Character } from '@/models/character';

const CHARACTERS_KEY = 'dnd-characters';

/** Returns all saved characters. Never throws; returns [] on parse failure. */
export function listCharacters(): Character[] {
  try {
    const data = localStorage.getItem(CHARACTERS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Character[];
  } catch {
    return [];
  }
}

/** Returns a single character by ID, or null if not found. */
export function loadCharacter(id: string): Character | null {
  const characters = listCharacters();
  return characters.find(c => c.id === id) ?? null;
}

/** Saves a character (upserts by id). Returns the saved character. */
export function saveCharacter(character: Character): Character {
  const characters = listCharacters();
  const existingIndex = characters.findIndex(c => c.id === character.id);
  if (existingIndex >= 0) {
    characters[existingIndex] = character;
  } else {
    characters.push(character);
  }
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters));
  return character;
}

/** Deletes a character by ID. Returns true if found and deleted. */
export function deleteCharacter(id: string): boolean {
  const characters = listCharacters();
  const filtered = characters.filter(c => c.id !== id);
  if (filtered.length === characters.length) return false;
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(filtered));
  return true;
}
