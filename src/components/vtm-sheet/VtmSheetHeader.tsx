import { Badge } from '@/components/ui/badge';
import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';
import { BLOOD_POTENCY_TABLE } from '@/data/vtm/bloodPotencyTable';
import { vtmGameTerms } from '@/i18n/vtmTerms';
import { vtmTrackerTooltips } from '@/i18n/vtmTooltips';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export function VtmSheetHeader() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();
  const bpEntry = BLOOD_POTENCY_TABLE[character.bloodPotency] ?? BLOOD_POTENCY_TABLE[0];

  return (
    <div className="p-4 rounded-lg border border-border bg-card space-y-3">
      <InlineInput
        value={character.name}
        onChange={(v) => dispatch({ type: 'SET_NAME', name: v })}
        disabled={isReadOnly}
        className="text-2xl font-bold"
      />

      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="default">
          {character.clanName} ({character.clanNameEn})
        </Badge>
        <Badge variant="secondary">
          {vtmGameTerms.generation.ru} {character.generation}
        </Badge>
        <Badge variant="secondary">
          {character.predatorTypeName} ({character.predatorTypeNameEn})
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <InfoItem
          label={vtmGameTerms.concept.ru}
          labelEn={vtmGameTerms.concept.en}
          value={character.concept}
          onChange={(v) => dispatch({ type: 'SET_CONCEPT', concept: v })}
          disabled={isReadOnly}
        />
        <InfoItem
          label={vtmGameTerms.chronicle.ru}
          labelEn={vtmGameTerms.chronicle.en}
          value={character.chronicle}
          onChange={(v) => dispatch({ type: 'SET_CHRONICLE', chronicle: v })}
          disabled={isReadOnly}
        />
        <InfoItem
          label={vtmGameTerms.sire.ru}
          labelEn={vtmGameTerms.sire.en}
          value={character.sire}
          onChange={(v) => dispatch({ type: 'SET_SIRE', sire: v })}
          disabled={isReadOnly}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <InfoItem
                label={vtmGameTerms.bloodPotency.ru}
                labelEn={vtmGameTerms.bloodPotency.en}
                value={String(character.bloodPotency)}
                onChange={(v) => dispatch({ type: 'SET_BLOOD_POTENCY', bloodPotency: parseInt(v, 10) })}
                disabled={isReadOnly}
                type="number"
                min={0}
                max={10}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs">
            {vtmTrackerTooltips.bloodPotency}
          </TooltipContent>
        </Tooltip>
        <InfoItem
          label={vtmGameTerms.ambition.ru}
          labelEn={vtmGameTerms.ambition.en}
          value={character.ambition}
          onChange={(v) => dispatch({ type: 'SET_AMBITION', ambition: v })}
          disabled={isReadOnly}
        />
        <InfoItem
          label={vtmGameTerms.desire.ru}
          labelEn={vtmGameTerms.desire.en}
          value={character.desire}
          onChange={(v) => dispatch({ type: 'SET_DESIRE', desire: v })}
          disabled={isReadOnly}
        />
        <InfoItem
          label={vtmGameTerms.totalExperience.ru}
          labelEn={vtmGameTerms.totalExperience.en}
          value={String(character.totalExperience)}
          onChange={(v) => dispatch({ type: 'SET_TOTAL_EXPERIENCE', totalExperience: parseInt(v, 10) })}
          disabled={isReadOnly}
          type="number"
          min={0}
        />
        <InfoItem
          label={vtmGameTerms.spentExperience.ru}
          labelEn={vtmGameTerms.spentExperience.en}
          value={String(character.spentExperience)}
          onChange={(v) => dispatch({ type: 'SET_SPENT_EXPERIENCE', spentExperience: parseInt(v, 10) })}
          disabled={isReadOnly}
          type="number"
          min={0}
        />
        <InfoItem
          label={vtmGameTerms.generation.ru}
          labelEn={vtmGameTerms.generation.en}
          value={String(character.generation)}
          onChange={(v) => dispatch({ type: 'SET_GENERATION', generation: parseInt(v, 10) })}
          disabled={isReadOnly}
          type="number"
          min={1}
          max={16}
        />
        <InfoItem
          label="Всплеск крови"
          labelEn="Blood Surge"
          value={`+${bpEntry.bloodSurge}`}
          onChange={() => {}}
          disabled={true}
        />
        <InfoItem
          label="Бонус силы"
          labelEn="Power Bonus"
          value={`+${bpEntry.powerBonus}`}
          onChange={() => {}}
          disabled={true}
        />
      </div>
    </div>
  );
}

function InfoItem({
  label,
  labelEn,
  value,
  onChange,
  disabled,
  type,
  min,
  max,
}: {
  label: string;
  labelEn: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  type?: 'text' | 'number';
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label} ({labelEn})</p>
      <InlineInput
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        min={min}
        max={max}
        className="text-sm font-medium"
      />
    </div>
  );
}
