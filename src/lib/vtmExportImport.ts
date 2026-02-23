import type { VtmCharacter } from '@/models/vtm/character';

/**
 * Download character as JSON file
 */
export function exportVtmCharacter(character: VtmCharacter): void {
  const json = JSON.stringify(character, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${character.name || 'character'}.vtm.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validate that parsed JSON has required VtmCharacter fields
 */
export function validateVtmCharacterJson(data: unknown): data is VtmCharacter {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;

  // Check required top-level fields
  const requiredStrings = ['name', 'clanId', 'clanName'];
  for (const key of requiredStrings) {
    if (typeof obj[key] !== 'string') return false;
  }

  // Check required objects
  if (!obj.attributes || typeof obj.attributes !== 'object') return false;
  if (!obj.skills || typeof obj.skills !== 'object') return false;

  // Check required trackers
  if (!obj.health || typeof obj.health !== 'object') return false;
  if (!obj.willpower || typeof obj.willpower !== 'object') return false;
  if (typeof obj.hunger !== 'number') return false;
  if (typeof obj.humanity !== 'number') return false;

  return true;
}

/**
 * Read file, parse JSON, validate, assign new ID, return character
 */
export function importVtmCharacterFromFile(file: File): Promise<VtmCharacter> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!validateVtmCharacterJson(data)) {
          reject(new Error('Неверный формат файла персонажа'));
          return;
        }
        // Assign new ID to avoid collisions
        const character: VtmCharacter = { ...data, id: crypto.randomUUID() };
        resolve(character);
      } catch {
        reject(new Error('Ошибка чтения JSON файла'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsText(file);
  });
}
