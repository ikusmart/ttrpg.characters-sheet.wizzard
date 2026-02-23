import { useState, useCallback } from 'react';
import { listCharacters, deleteCharacter } from '@/lib/characterStorage';
import { DEMO_CHARACTER } from '@/data/demoCharacter';
import { CharacterCard } from '@/components/characters/CharacterCard';
import { EmptyCharacterList } from '@/components/characters/EmptyCharacterList';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function CharactersPage() {
  const [characters, setCharacters] = useState(() => listCharacters());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteId) {
      deleteCharacter(deleteId);
      setCharacters(listCharacters());
      setDeleteId(null);
    }
  }, [deleteId]);

  const charToDelete = deleteId ? characters.find(c => c.id === deleteId) : null;

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои персонажи</h1>
        {characters.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {characters.length} сохр.
          </span>
        )}
      </div>

      <div className="space-y-3">
        <CharacterCard character={DEMO_CHARACTER} isDemo />

        {characters.length > 0 && <Separator />}

        {characters.length > 0 ? (
          characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <EmptyCharacterList />
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить персонажа?</AlertDialogTitle>
            <AlertDialogDescription>
              Персонаж «{charToDelete?.name}» будет удалён навсегда. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
