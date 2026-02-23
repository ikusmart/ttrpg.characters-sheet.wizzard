import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { CharacterSheet } from '@/components/sheet/CharacterSheet';
import { CharacterProvider } from '@/context/CharacterContext';
import { DEMO_CHARACTER } from '@/data/demoCharacter';
import { loadCharacter } from '@/lib/characterStorage';

export function SheetPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isReadOnly = !id;

  const character = useMemo(() => {
    if (!id) return DEMO_CHARACTER;
    return loadCharacter(id);
  }, [id]);

  useEffect(() => {
    if (id && !character) {
      navigate('/dnd/characters', { replace: true });
    }
  }, [id, character, navigate]);

  if (!character) return null;

  return (
    <CharacterProvider character={character} isReadOnly={isReadOnly}>
      <CharacterSheet />
    </CharacterProvider>
  );
}
