import type { Character } from "@/models/character";
import { Badge } from "@/components/ui/badge";
import { useCharacter } from "@/context/CharacterContext";
import { InlineInput } from "@/components/sheet/InlineInput";

interface SheetHeaderProps {
  character: Character;
}

export function SheetHeader({ character }: SheetHeaderProps) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="flex flex-col gap-2 p-4 bg-card rounded-lg border border-border">
      <div className="flex flex-wrap items-baseline gap-3">
        <InlineInput
          value={character.name}
          onChange={(v) => dispatch({ type: "SET_NAME", name: v })}
          disabled={isReadOnly}
          className="text-2xl font-bold w-48"
        />
        <span className="text-sm text-muted-foreground">
          Игрок:{" "}
          <InlineInput
            value={character.playerName}
            onChange={(v) =>
              dispatch({ type: "SET_PLAYER_NAME", playerName: v })
            }
            disabled={isReadOnly}
            className="text-sm w-32"
          />
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">
          {character.className} ({character.classNameEn}) {character.level}
        </Badge>
        <Badge variant="secondary">
          {character.speciesName} ({character.speciesNameEn})
        </Badge>
        <Badge variant="outline">
          {character.backgroundName} ({character.backgroundNameEn})
        </Badge>
        {character.subclassName && (
          <Badge variant="secondary">
            {character.subclassName} ({character.subclassNameEn})
          </Badge>
        )}
      </div>
      <div className="flex gap-4 text-sm text-muted-foreground items-center">
        <span className="flex items-center gap-1">
          Опыт (XP):{" "}
          <InlineInput
            type="number"
            value={character.experiencePoints}
            onChange={(v) =>
              dispatch({
                type: "SET_EXPERIENCE",
                experiencePoints: parseInt(v, 10) || 0,
              })
            }
            disabled={isReadOnly}
            min={0}
            className="text-sm w-20"
          />
        </span>
        <span className="flex items-center gap-1">
          Уровень:{" "}
          <InlineInput
            type="number"
            value={character.level}
            onChange={(v) =>
              dispatch({ type: "SET_LEVEL", level: parseInt(v, 10) || 1 })
            }
            disabled={isReadOnly}
            min={1}
            max={20}
            className="text-sm w-10 text-center"
          />
        </span>
        <span>Бонус мастерства: +{character.proficiencyBonus}</span>
      </div>
    </div>
  );
}
