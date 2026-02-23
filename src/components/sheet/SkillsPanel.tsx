import type { Character } from "@/models/character";
import { SKILLS } from "@/data/skills";
import { skillTerms, abilityTermsShort } from "@/i18n/terms";
import { useCharacter } from "@/context/CharacterContext";
import {
  getAbilityModifier,
  formatModifier,
} from "@/lib/characterCalculations";

interface Props {
  character: Character;
}

export function SkillsPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="space-y-1">
        {SKILLS.map((skill) => {
          const abilityScore = character.abilityScores[skill.ability];
          const abilityMod = getAbilityModifier(abilityScore);
          const proficient = character.skillProficiencies.includes(skill.id);
          const expertise = character.skillExpertise.includes(skill.id);
          let bonus = abilityMod;
          if (proficient) bonus += character.proficiencyBonus;
          if (expertise) bonus += character.proficiencyBonus;

          return (
            <div key={skill.id} className="flex items-center gap-2 text-sm">
              <span
                className={`w-3 h-3 rounded-full border ${
                  expertise
                    ? "bg-primary border-primary ring-2 ring-primary/30"
                    : proficient
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                } ${!isReadOnly ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (!isReadOnly) {
                    dispatch({
                      type: "CYCLE_SKILL_PROFICIENCY",
                      skill: skill.id,
                    });
                  }
                }}
              />
              <span className="w-8 font-mono">{formatModifier(bonus)}</span>
              <span
                className={proficient ? "font-medium" : "text-muted-foreground"}
              >
                {skillTerms[skill.id].ru}
              </span>
              <span className="text-[10px] text-muted-foreground/60 ml-auto">
                {abilityTermsShort[skill.ability].en}
              </span>
            </div>
          );
        })}
    </div>
  );
}
