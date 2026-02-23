import type { DisciplineName } from './discipline';

export type PredatorTypeId =
  | 'alleycat' | 'bagger' | 'cleaver' | 'consensualist'
  | 'farmer' | 'osiris' | 'sandman' | 'sceneQueen' | 'siren';

export interface PredatorType {
  id: PredatorTypeId;
  name: string;
  nameEn: string;
  description: string;
  disciplineOptions: DisciplineName[];
  specialtySkill: string;
  merit: string;
  flaw: string;
}
