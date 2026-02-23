import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';
import { vtmGameTerms } from '@/i18n/vtmTerms';

export function NotesPanel() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();

  return (
    <div className="space-y-3">
      <div>
        <InlineInput
          value={character.backstory}
          onChange={(v) => dispatch({ type: 'SET_BACKSTORY', backstory: v })}
          type="textarea"
          disabled={isReadOnly}
          placeholder="—"
        />
      </div>

      <div>
        <span className="text-xs font-medium text-muted-foreground">
          {vtmGameTerms.notes.ru} ({vtmGameTerms.notes.en})
        </span>
        <InlineInput
          value={character.notes}
          onChange={(v) => dispatch({ type: 'SET_NOTES', notes: v })}
          type="textarea"
          disabled={isReadOnly}
          placeholder="—"
        />
      </div>
    </div>
  );
}
