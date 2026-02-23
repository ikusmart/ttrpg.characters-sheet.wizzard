import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { exportVtmCharacter, importVtmCharacterFromFile } from '@/lib/vtmExportImport';
import { saveVtmCharacter } from '@/lib/vtmCharacterStorage';
import { DiceRollerDialog } from '@/components/vtm-sheet/DiceRollerDialog';

export function VtmSheetToolbar() {
  const { character, isReadOnly } = useVtmCharacter();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [diceOpen, setDiceOpen] = useState(false);

  const handleExport = () => {
    exportVtmCharacter(character);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImportError(null);
      const imported = await importVtmCharacterFromFile(file);
      saveVtmCharacter(imported);
      navigate(`/vtm/sheet/${imported.id}`);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Ошибка импорта');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2 mb-4 no-print">
      <Button variant="outline" size="sm" onClick={handleExport}>
        Экспорт JSON
      </Button>
      {!isReadOnly && (
        <>
          <Button variant="outline" size="sm" onClick={handleImportClick}>
            Импорт JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
      <Button variant="outline" size="sm" onClick={handlePrint}>
        Печать
      </Button>
      <Button variant="outline" size="sm" onClick={() => setDiceOpen(true)}>
        Дайсы (Dice)
      </Button>
      {importError && (
        <p className="text-sm text-destructive">{importError}</p>
      )}
      <DiceRollerDialog open={diceOpen} onOpenChange={setDiceOpen} />
    </div>
  );
}
