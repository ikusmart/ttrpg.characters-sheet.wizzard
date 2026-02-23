import type { AttributeName, Attribute } from './attribute';
import type { SkillName } from './skill';
import type { ClanId } from './clan';
import type { PredatorTypeId } from './predatorType';
import type { DisciplineName, DisciplinePower } from './discipline';

export interface DamageTrack {
  max: number;
  superficial: number;
  aggravated: number;
}

export interface VtmCharacter {
  id: string;
  name: string;
  playerName: string;
  concept: string;
  chronicle: string;
  sire: string;
  ambition: string;
  desire: string;
  generation: number;

  clanId: ClanId;
  clanName: string;
  clanNameEn: string;

  predatorTypeId: PredatorTypeId;
  predatorTypeName: string;
  predatorTypeNameEn: string;

  attributes: Record<AttributeName, Attribute>;

  skills: Record<SkillName, number>;
  skillSpecialties: Partial<Record<SkillName, string[]>>;

  disciplines: Partial<Record<DisciplineName, number>>;
  knownPowers: DisciplinePower[];

  health: DamageTrack;
  willpower: DamageTrack;
  hunger: number;
  humanity: number;

  convictions: string[];
  touchstones: string[];

  bloodPotency: number;

  merits: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  flaws: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  backgrounds: Array<{ name: string; nameEn: string; dots: number; description: string }>;

  bane: string;
  compulsion: string;

  totalExperience: number;
  spentExperience: number;

  appearance: string;
  personalityTraits: string;
  backstory: string;
  notes: string;
}
