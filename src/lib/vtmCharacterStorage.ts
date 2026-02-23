import type { VtmCharacter } from '@/models/vtm/character';

const CHARACTERS_KEY = 'vtm-characters';

/** Returns all saved VtM characters. Never throws; returns [] on parse failure. */
export function listVtmCharacters(): VtmCharacter[] {
  try {
    const data = localStorage.getItem(CHARACTERS_KEY);
    if (!data) return [];
    return JSON.parse(data) as VtmCharacter[];
  } catch {
    return [];
  }
}

/** Returns a single VtM character by ID, or null if not found. */
export function loadVtmCharacter(id: string): VtmCharacter | null {
  return listVtmCharacters().find(c => c.id === id) ?? null;
}

/** Saves a VtM character (upserts by id). Returns the saved character. */
export function saveVtmCharacter(character: VtmCharacter): VtmCharacter {
  const characters = listVtmCharacters();
  const idx = characters.findIndex(c => c.id === character.id);
  if (idx >= 0) characters[idx] = character;
  else characters.push(character);
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters));
  return character;
}

/** Deletes a VtM character by ID. Returns true if found and deleted. */
export function deleteVtmCharacter(id: string): boolean {
  const characters = listVtmCharacters();
  const filtered = characters.filter(c => c.id !== id);
  if (filtered.length === characters.length) return false;
  localStorage.setItem(CHARACTERS_KEY, JSON.stringify(filtered));
  return true;
}
