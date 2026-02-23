import type { Character } from "@/models/character";
import { ABILITY_NAMES } from "@/models/ability";
import { abilityTerms, abilityTermsShort } from "@/i18n/terms";
import { useCharacter } from "@/context/CharacterContext";
import {
  getAbilityModifier,
  formatModifier,
} from "@/lib/characterCalculations";
import { InlineInput } from "@/components/sheet/InlineInput";

interface Props {
  character: Character;
}

export function AbilityScoresPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="flex flex-row md:flex-col gap-2">
      {ABILITY_NAMES.map((ability) => {
          const score = character.abilityScores[ability];
          const mod = getAbilityModifier(score);
          const total = score.baseValue + score.bonusFromBackground;
          return (
            <div
              key={ability}
              className="flex flex-col items-center p-2 rounded-lg border border-border bg-card min-w-[64px]"
            >
              <span className="text-[10px] font-bold uppercase text-muted-foreground">
                {abilityTermsShort[ability].ru}
              </span>
              <span className="text-xl font-bold">{formatModifier(mod)}</span>
              <span className="text-xs text-muted-foreground">{total}</span>
              <InlineInput
                type="number"
                value={score.baseValue}
                onChange={(v) =>
                  dispatch({
                    type: "SET_ABILITY_BASE_VALUE",
                    ability,
                    value: parseInt(v, 10) || 0,
                  })
                }
                disabled={isReadOnly}
                min={1}
                max={30}
                className="text-xs text-muted-foreground w-10 text-center"
              />
              <span className="text-[9px] text-muted-foreground/60">
                {abilityTerms[ability].en}
              </span>
            </div>
          );
        })}
    </div>
  );
}
