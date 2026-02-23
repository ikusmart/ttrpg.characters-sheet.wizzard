import type { Character } from "@/models/character";
import { ABILITY_NAMES } from "@/models/ability";
import { abilityTermsShort } from "@/i18n/terms";
import { useCharacter } from "@/context/CharacterContext";
import {
  getAbilityModifier,
  formatModifier,
} from "@/lib/characterCalculations";

interface Props {
  character: Character;
}

export function SavingThrowsPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="space-y-1">
        {ABILITY_NAMES.map((ability) => {
          const score = character.abilityScores[ability];
          const mod = getAbilityModifier(score);
          const proficient =
            character.savingThrowProficiencies.includes(ability);
          const bonus = mod + (proficient ? character.proficiencyBonus : 0);
          return (
            <div key={ability} className="flex items-center gap-2 text-sm">
              <span
                className={`w-3 h-3 rounded-full border ${proficient ? "bg-primary border-primary" : "border-muted-foreground"} ${!isReadOnly ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (!isReadOnly) {
                    dispatch({ type: "TOGGLE_SAVING_THROW_PROF", ability });
                  }
                }}
              />
              <span className="w-8 font-mono">{formatModifier(bonus)}</span>
              <span
                className={proficient ? "font-medium" : "text-muted-foreground"}
              >
                {abilityTermsShort[ability].ru} ({abilityTermsShort[ability].en}
                )
              </span>
            </div>
          );
        })}
    </div>
  );
}
