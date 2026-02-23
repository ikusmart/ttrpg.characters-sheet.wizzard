export type ClassId =
  | 'barbarian' | 'bard' | 'cleric' | 'druid'
  | 'fighter' | 'monk' | 'paladin' | 'ranger'
  | 'rogue' | 'sorcerer' | 'warlock' | 'wizard';

export type SpeciesId =
  | 'human' | 'elf' | 'dwarf' | 'halfling' | 'gnome'
  | 'orc' | 'tiefling' | 'dragonborn' | 'aasimar' | 'goliath';

export interface QuizAnswerWeight {
  classId: ClassId;
  weight: number; // 1-3
}

export interface QuizAnswer {
  id: string;
  text: string; // Russian
  icon: string; // emoji
  weights: QuizAnswerWeight[];
}

export interface QuizQuestion {
  id: string;
  title: string; // short title for progress
  text: string;  // full question Russian
  answers: QuizAnswer[];
}

export interface QuizClassInfo {
  id: ClassId;
  name: string;    // Russian
  nameEn: string;
  description: string; // 1-2 sentences Russian
  icon: string;    // emoji
  complexity: 1 | 2 | 3 | 4 | 5;
  primaryAbility: string; // Russian
  hitDice: string;
  flavor: string; // short flavor text
}

export interface QuizSpeciesInfo {
  id: SpeciesId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  alignedClasses: ClassId[];
}

export interface ClassScore {
  classId: ClassId;
  score: number;
  maxPossible: number;
  percentage: number; // 0-100
}

export interface QuizResult {
  primary: ClassScore;
  alternatives: [ClassScore, ClassScore];
  suggestedSpecies: QuizSpeciesInfo;
  answers: Record<string, string>;
}
