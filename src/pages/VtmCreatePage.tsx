import { useReducer, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { WizardAction } from '@/models/vtm/wizardState';
import { INITIAL_WIZARD_STATE } from '@/models/vtm/wizardState';
import type { ClanId } from '@/models/vtm/clan';
import type { PredatorTypeId } from '@/models/vtm/predatorType';
import type { AttributeCategory } from '@/models/vtm/attribute';
import type { PlaystyleId } from '@/models/vtm/playstyle';
import { VTM_ATTRIBUTES_BY_CATEGORY } from '@/data/vtm/attributes';
import { CLAN_PLAYSTYLES, PREDATOR_PLAYSTYLES } from '@/data/vtm/playstyles';
import { CLAN_DEFINITIONS } from '@/data/vtm/clanDefinitions';
import { PREDATOR_TYPES } from '@/data/vtm/predatorTypes';
import { wizardReducer } from '@/lib/wizardReducer';
import { buildVtmCharacterFromWizard } from '@/lib/vtmCharacterBuilder';
import { saveVtmCharacter } from '@/lib/vtmCharacterStorage';
import { WizardProgress } from '@/components/vtm-create/WizardProgress';
import { WizardNavigation } from '@/components/vtm-create/WizardNavigation';
import { PlaystyleFilterBar } from '@/components/vtm-create/PlaystyleFilterBar';
import { ClanSelectionStep } from '@/components/vtm-create/ClanSelectionStep';
import { PredatorTypeStep } from '@/components/vtm-create/PredatorTypeStep';
import { AttributesStep } from '@/components/vtm-create/AttributesStep';
import { SkillsStep } from '@/components/vtm-create/SkillsStep';
import { DisciplinesStep } from '@/components/vtm-create/DisciplinesStep';
import { AdvantagesStep } from '@/components/vtm-create/AdvantagesStep';
import { IdentityStep } from '@/components/vtm-create/IdentityStep';
import { ReviewStep } from '@/components/vtm-create/ReviewStep';

const TOTAL_STEPS = 8;
const PRIORITY_BUDGETS: [number, number, number] = [9, 7, 5];
const SKILL_BUDGET = 20;
const DISCIPLINE_BUDGET = 2;

function getAttributeBudget(priority: [AttributeCategory, AttributeCategory, AttributeCategory] | null, category: AttributeCategory): number {
  if (!priority) return 0;
  const idx = priority.indexOf(category);
  if (idx === -1) return 0;
  return PRIORITY_BUDGETS[idx];
}

function getAttributeSpent(attributes: Record<string, number>, category: AttributeCategory): number {
  return VTM_ATTRIBUTES_BY_CATEGORY[category].reduce((sum, attr) => {
    return sum + (attributes[attr] ?? 1);
  }, 0);
}

function canProceed(step: number, state: typeof INITIAL_WIZARD_STATE): boolean {
  switch (step) {
    case 0:
      return state.clanId !== null;
    case 1:
      return state.predatorTypeId !== null;
    case 2: {
      if (!state.attributePriority) return false;
      const cats: AttributeCategory[] = ['physical', 'social', 'mental'];
      const uniquePriorities = new Set(state.attributePriority);
      if (uniquePriorities.size !== 3) return false;
      return cats.every((cat) => {
        const budget = getAttributeBudget(state.attributePriority, cat);
        const spent = getAttributeSpent(state.attributes as Record<string, number>, cat);
        return spent === budget;
      });
    }
    case 3: {
      const total = Object.values(state.skills).reduce((s, v) => s + (v ?? 0), 0);
      return total === SKILL_BUDGET;
    }
    case 4: {
      const total = Object.values(state.disciplines).reduce((s, v) => s + (v ?? 0), 0);
      return total === DISCIPLINE_BUDGET;
    }
    case 5:
      return true;
    case 6:
      return state.name.trim().length > 0;
    case 7:
      return state.clanId !== null && state.predatorTypeId !== null && state.name.trim().length > 0;
    default:
      return true;
  }
}

function matchesPlaystyles(entityPlaystyles: PlaystyleId[], active: Set<PlaystyleId>): boolean {
  if (active.size === 0) return true;
  if (entityPlaystyles.length === 0) return true; // Caitiff/Thin-Blood — always match
  return entityPlaystyles.some((ps) => active.has(ps));
}

export function VtmCreatePage() {
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_WIZARD_STATE);
  const navigate = useNavigate();
  const [activePlaystyles, setActivePlaystyles] = useState<Set<PlaystyleId>>(new Set());

  const togglePlaystyle = useCallback((id: PlaystyleId) => {
    setActivePlaystyles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filterCounts = useMemo(() => {
    if (state.step === 0) {
      const matching = CLAN_DEFINITIONS.filter((c) => matchesPlaystyles(CLAN_PLAYSTYLES[c.id], activePlaystyles)).length;
      return { match: matching, total: CLAN_DEFINITIONS.length };
    }
    if (state.step === 1) {
      const matching = PREDATOR_TYPES.filter((pt) => matchesPlaystyles(PREDATOR_PLAYSTYLES[pt.id], activePlaystyles)).length;
      return { match: matching, total: PREDATOR_TYPES.length };
    }
    return undefined;
  }, [state.step, activePlaystyles]);

  function handleBack() {
    dispatch({ type: 'PREV_STEP' });
  }

  function handleNext() {
    dispatch({ type: 'NEXT_STEP' });
  }

  function handleCreate() {
    if (!state.clanId || !state.predatorTypeId) return;
    const character = buildVtmCharacterFromWizard(state);
    saveVtmCharacter(character);
    navigate(`/vtm/sheet/${character.id}`);
  }

  const canNext = canProceed(state.step, state);

  function renderStep() {
    const stepDispatch = dispatch as React.Dispatch<WizardAction>;
    switch (state.step) {
      case 0:
        return (
          <ClanSelectionStep
            clanId={state.clanId}
            onSelect={(id: ClanId) => dispatch({ type: 'SET_CLAN', clanId: id })}
            activePlaystyles={activePlaystyles}
          />
        );
      case 1:
        return (
          <PredatorTypeStep
            predatorTypeId={state.predatorTypeId}
            onSelect={(id: PredatorTypeId) => dispatch({ type: 'SET_PREDATOR_TYPE', predatorTypeId: id })}
            activePlaystyles={activePlaystyles}
          />
        );
      case 2:
        return <AttributesStep state={state} dispatch={stepDispatch} activePlaystyles={activePlaystyles} />;
      case 3:
        return <SkillsStep state={state} dispatch={stepDispatch} activePlaystyles={activePlaystyles} />;
      case 4:
        return <DisciplinesStep state={state} dispatch={stepDispatch} />;
      case 5:
        return <AdvantagesStep state={state} dispatch={stepDispatch} />;
      case 6:
        return <IdentityStep state={state} dispatch={stepDispatch} />;
      case 7:
        return <ReviewStep state={state} />;
      default:
        return null;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Создание персонажа (Character Creation)
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vampire: The Masquerade 5th Edition
        </p>
      </div>

      <WizardProgress step={state.step} totalSteps={TOTAL_STEPS} />

      {state.step <= 3 && (
        <PlaystyleFilterBar
          activeFilters={activePlaystyles}
          onToggle={togglePlaystyle}
          matchCount={filterCounts?.match}
          totalCount={filterCounts?.total}
        />
      )}

      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      <WizardNavigation
        step={state.step}
        canNext={canNext}
        onBack={handleBack}
        onNext={handleNext}
        onCreate={handleCreate}
      />
    </div>
  );
}
