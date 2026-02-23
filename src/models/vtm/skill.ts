export type SkillCategory = 'physical' | 'social' | 'mental';

export type SkillName =
  // Physical
  | 'athletics' | 'brawl' | 'craft' | 'drive' | 'firearms'
  | 'larceny' | 'melee' | 'performance' | 'stealth' | 'survival'
  // Social
  | 'animalKen' | 'etiquette' | 'insight' | 'intimidation'
  | 'leadership' | 'persuasion' | 'streetwise' | 'subterfuge'
  // Mental
  | 'academics' | 'awareness' | 'finance' | 'investigation'
  | 'medicine' | 'occult' | 'politics' | 'science' | 'technology';

export interface VtmSkillDefinition {
  id: SkillName;
  name: string;      // Russian
  nameEn: string;    // English
  category: SkillCategory;
  specialties?: string[];
}
