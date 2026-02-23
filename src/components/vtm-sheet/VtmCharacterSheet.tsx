import { Separator } from '@/components/ui/separator';
import { SectionWithHelp } from '@/components/help/SectionWithHelp';
import { VtmSheetHeader } from './VtmSheetHeader';
import { AttributesPanel } from './AttributesPanel';
import { SkillsPanel } from './SkillsPanel';
import { HealthWillpowerPanel } from './HealthWillpowerPanel';
import { HungerTracker } from './HungerTracker';
import { HumanityTracker } from './HumanityTracker';
import { DisciplinesPanel } from './DisciplinesPanel';
import { ClanPanel } from './ClanPanel';
import { BackgroundsPanel } from './BackgroundsPanel';
import { MeritsFlawsPanel } from './MeritsFlawsPanel';
import { PersonalityPanel } from './PersonalityPanel';
import { NotesPanel } from './NotesPanel';

export function VtmCharacterSheet() {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div data-tour="vtmSheetHeader">
        <VtmSheetHeader />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Колонка 1: Атрибуты, Навыки */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
          <SectionWithHelp sectionId="attributes" gameSystem="vtm" title="Атрибуты (Attributes)">
            <AttributesPanel />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="skills" gameSystem="vtm" title="Навыки (Skills)">
            <SkillsPanel />
          </SectionWithHelp>
        </div>

        {/* Колонка 2: Здоровье/Воля, Голод, Гуманность, Дисциплины */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
          <SectionWithHelp sectionId="healthWillpower" gameSystem="vtm" title="Состояние (Status)">
            <HealthWillpowerPanel />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="hunger" gameSystem="vtm" title="Голод (Hunger)">
            <HungerTracker />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="humanity" gameSystem="vtm" title="Человечность (Humanity)">
            <HumanityTracker />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="disciplines" gameSystem="vtm" title="Дисциплины (Disciplines)">
            <DisciplinesPanel />
          </SectionWithHelp>
        </div>

        {/* Колонка 3: Клан, Предпосылки, Достоинства/Недостатки, Личность, Заметки */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card md:col-span-2 lg:col-span-1">
          <SectionWithHelp sectionId="clan" gameSystem="vtm" title="Клан (Clan)">
            <ClanPanel />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="backgrounds" gameSystem="vtm" title="Предыстории (Backgrounds)">
            <BackgroundsPanel />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="meritsFlaws" gameSystem="vtm" title="Достоинства и Недостатки (Merits & Flaws)">
            <MeritsFlawsPanel />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="personality" gameSystem="vtm" title="Личность (Personality)">
            <PersonalityPanel />
          </SectionWithHelp>
          <Separator />
          <SectionWithHelp sectionId="notes" gameSystem="vtm" title="Заметки (Notes)">
            <NotesPanel />
          </SectionWithHelp>
        </div>
      </div>
    </div>
  );
}
