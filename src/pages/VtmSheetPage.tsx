import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { VtmCharacterSheet } from '@/components/vtm-sheet/VtmCharacterSheet';
import { VtmSheetToolbar } from '@/components/vtm-sheet/VtmSheetToolbar';
import { VtmCharacterProvider } from '@/context/VtmCharacterContext';
import { VTM_DEMO_CHARACTER } from '@/data/vtm/demoCharacter';
import { loadVtmCharacter } from '@/lib/vtmCharacterStorage';

export function VtmSheetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const character = id ? loadVtmCharacter(id) : VTM_DEMO_CHARACTER;

  useEffect(() => {
    if (id && !character) {
      navigate('/vtm/characters', { replace: true });
    }
  }, [id, character, navigate]);

  if (!character) return null;

  return (
    <VtmCharacterProvider character={character} isReadOnly={!id}>
      <VtmSheetToolbar />
      <VtmCharacterSheet />
    </VtmCharacterProvider>
  );
}
