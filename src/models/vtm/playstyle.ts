import type { AttributeCategory } from './attribute';
import type { SkillName } from './skill';

export type PlaystyleId = 'warrior' | 'manipulator' | 'shadow' | 'mystic' | 'predator';

export interface PlaystyleDefinition {
  id: PlaystyleId;
  label: string;
  description: string;
  attributePriority: [AttributeCategory, AttributeCategory, AttributeCategory];
  recommendedSkills: SkillName[];
}
