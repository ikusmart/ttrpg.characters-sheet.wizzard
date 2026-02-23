import type { DisciplineName } from './discipline';

export type ClanId =
  | 'brujah' | 'gangrel' | 'malkavian' | 'nosferatu'
  | 'toreador' | 'tremere' | 'ventrue' | 'lasombra'
  | 'tzimisce' | 'hecata' | 'ravnos' | 'salubri'
  | 'ministry' | 'caitiff' | 'thinBlood';

export interface ClanDefinition {
  id: ClanId;
  name: string;
  nameEn: string;
  nickname: string;
  nicknameEn: string;
  disciplines: DisciplineName[];
  bane: string;
  baneEn: string;
  compulsion: string;
  compulsionEn: string;
  description: string;
  complexity: 'simple' | 'moderate' | 'complex';
}
