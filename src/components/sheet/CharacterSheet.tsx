import { useCharacter } from '@/context/CharacterContext';
import { SheetHeader } from './SheetHeader';
import { AbilityScoresPanel } from './AbilityScoresPanel';
import { SavingThrowsPanel } from './SavingThrowsPanel';
import { SkillsPanel } from './SkillsPanel';
import { CombatStatsPanel } from './CombatStatsPanel';
import { HitPointsTracker } from './HitPointsTracker';
import { DeathSavesTracker } from './DeathSavesTracker';
import { AttacksPanel } from './AttacksPanel';
import { EquipmentPanel } from './EquipmentPanel';
import { FeaturesPanel } from './FeaturesPanel';
import { ProficienciesPanel } from './ProficienciesPanel';
import { PersonalityPanel } from './PersonalityPanel';
import { NotesPanel } from './NotesPanel';
import { Separator } from '@/components/ui/separator';
import { SectionWithHelp } from '@/components/help/SectionWithHelp';

export function CharacterSheet() {
  const { character } = useCharacter();

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div data-tour="sheetHeader">
        <SheetHeader character={character} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Column 1: Abilities, Saves, Skills */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
          <SectionWithHelp sectionId="abilityScores" gameSystem="dnd" title="Характеристики (Ability Scores)">
            <AbilityScoresPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="savingThrows" gameSystem="dnd" title="Спасброски (Saving Throws)">
            <SavingThrowsPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="skills" gameSystem="dnd" title="Навыки (Skills)">
            <SkillsPanel character={character} />
          </SectionWithHelp>
        </div>

        {/* Column 2: Combat, HP, Attacks, Equipment */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
          <SectionWithHelp sectionId="combatStats" gameSystem="dnd" title="Боевые характеристики (Combat Stats)">
            <CombatStatsPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="hitPoints" gameSystem="dnd" title="Хиты (Hit Points)">
            <HitPointsTracker character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="deathSaves" gameSystem="dnd" title="Спасброски от смерти (Death Saves)">
            <DeathSavesTracker character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="attacks" gameSystem="dnd" title="Атаки (Attacks)">
            <AttacksPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="equipment" gameSystem="dnd" title="Снаряжение (Equipment)">
            <EquipmentPanel character={character} />
          </SectionWithHelp>
        </div>

        {/* Column 3: Personality, Features, Proficiencies, Notes */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card md:col-span-2 lg:col-span-1">
          <SectionWithHelp sectionId="personality" gameSystem="dnd" title="Личность (Personality)">
            <PersonalityPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="features" gameSystem="dnd" title="Умения и черты (Features & Traits)">
            <FeaturesPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="proficiencies" gameSystem="dnd" title="Владения (Proficiencies)">
            <ProficienciesPanel character={character} />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="notes" gameSystem="dnd" title="Заметки (Notes)">
            <NotesPanel character={character} />
          </SectionWithHelp>
        </div>
      </div>
    </div>
  );
}
