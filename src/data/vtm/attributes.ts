import type { Attribute, AttributeCategory, AttributeName } from '@/models/vtm/attribute';

export const VTM_ATTRIBUTES: Attribute[] = [
  // Physical
  { name: 'strength',     category: 'physical', value: 1 },
  { name: 'dexterity',   category: 'physical', value: 1 },
  { name: 'stamina',     category: 'physical', value: 1 },
  // Social
  { name: 'charisma',    category: 'social',   value: 1 },
  { name: 'manipulation',category: 'social',   value: 1 },
  { name: 'composure',   category: 'social',   value: 1 },
  // Mental
  { name: 'intelligence',category: 'mental',   value: 1 },
  { name: 'wits',        category: 'mental',   value: 1 },
  { name: 'resolve',     category: 'mental',   value: 1 },
];

export const VTM_ATTRIBUTES_BY_CATEGORY: Record<AttributeCategory, AttributeName[]> = {
  physical: ['strength', 'dexterity', 'stamina'],
  social:   ['charisma', 'manipulation', 'composure'],
  mental:   ['intelligence', 'wits', 'resolve'],
};
