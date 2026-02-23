import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';

interface Props { character: Character; }

export function NotesPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-muted-foreground">Предыстория (Backstory)</span>
      <InlineInput
        type="textarea"
        value={character.backstory}
        onChange={(value) => dispatch({ type: 'SET_BACKSTORY', backstory: value })}
        disabled={isReadOnly}
        className="text-sm leading-relaxed w-full"
      />
      <span className="text-xs font-medium text-muted-foreground mt-4 block">Заметки (Notes)</span>
      <InlineInput
        type="textarea"
        value={character.notes}
        onChange={(value) => dispatch({ type: 'SET_NOTES', notes: value })}
        disabled={isReadOnly}
        className="text-sm w-full"
        placeholder="Заметки..."
      />
    </div>
  );
}
