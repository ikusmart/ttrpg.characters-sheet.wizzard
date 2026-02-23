export type SpellSchool = 'abjuration' | 'conjuration' | 'divination' | 'enchantment' | 'evocation' | 'illusion' | 'necromancy' | 'transmutation';

export interface Spell {
  id: string;
  name: string;
  nameEn: string;
  level: number;
  school: SpellSchool;
  castingTime: string;
  range: string;
  duration: string;
  concentration: boolean;
  description: string;
}
