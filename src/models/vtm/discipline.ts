export type DisciplineName =
  | 'animalism' | 'auspex' | 'bloodSorcery' | 'celerity'
  | 'dominate' | 'fortitude' | 'obfuscate' | 'oblivion'
  | 'potence' | 'presence' | 'protean' | 'thinBloodAlchemy';

export interface DisciplinePower {
  id: string;
  name: string;
  nameEn: string;
  level: number;          // 1-5
  discipline: DisciplineName;
  prerequisite?: string;
  rouseCost: string;      // "Free" | "One Rouse Check" | etc.
  dicePool?: string;      // e.g. "Charisma + Intimidation"
  duration: string;
  description: string;
}

export interface DisciplineInfo {
  id: DisciplineName;
  name: string;
  nameEn: string;
  description: string;
}
