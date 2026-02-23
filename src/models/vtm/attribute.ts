export type AttributeCategory = 'physical' | 'social' | 'mental';

export type AttributeName =
  | 'strength' | 'dexterity' | 'stamina'
  | 'charisma' | 'manipulation' | 'composure'
  | 'intelligence' | 'wits' | 'resolve';

export interface Attribute {
  name: AttributeName;
  category: AttributeCategory;
  value: number; // 1-5 dots
}
