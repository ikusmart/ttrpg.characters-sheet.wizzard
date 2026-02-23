import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';
import { Badge } from '@/components/ui/badge';

interface Props { character: Character; }

export function FeaturesPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  const handleUpdateFeature = (index: number, field: string, value: string) => {
    const updated = { ...character.features[index], [field]: value };
    dispatch({ type: 'UPDATE_FEATURE', index, feature: updated });
  };

  const handleAddFeature = () => {
    dispatch({
      type: 'ADD_FEATURE',
      feature: {
        name: 'Новое умение',
        nameEn: 'New Feature',
        source: 'Пользовательское',
        description: '',
      },
    });
  };

  const handleRemoveFeature = (index: number) => {
    dispatch({ type: 'REMOVE_FEATURE', index });
  };

  return (
    <div className="space-y-2">
      <div className="space-y-3">
        {character.features.map((feature, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <InlineInput
                value={feature.name}
                onChange={(value) => handleUpdateFeature(i, 'name', value)}
                disabled={isReadOnly}
                className="font-medium text-sm"
              />
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                {feature.source}
              </Badge>
              {!isReadOnly && (
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(i)}
                  className="text-muted-foreground hover:text-destructive text-xs ml-auto shrink-0"
                  title="Удалить"
                >
                  ✕
                </button>
              )}
            </div>
            <InlineInput
              type="textarea"
              value={feature.description}
              onChange={(value) => handleUpdateFeature(i, 'description', value)}
              disabled={isReadOnly}
              className="text-xs text-muted-foreground w-full"
            />
          </div>
        ))}
      </div>
      {!isReadOnly && (
        <button
          type="button"
          onClick={handleAddFeature}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          + Добавить умение
        </button>
      )}
    </div>
  );
}
