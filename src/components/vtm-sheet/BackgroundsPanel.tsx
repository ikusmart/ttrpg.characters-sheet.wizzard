import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { DotRating } from './DotRating';

export function BackgroundsPanel() {
  const { character } = useVtmCharacter();
  return (
    <div>
      {character.backgrounds.length === 0 ? (
        <p className="text-sm text-muted-foreground">—</p>
      ) : (
        <div className="space-y-2">
          {character.backgrounds.map((bg, i) => (
            <div key={i} className="bg-muted/30 rounded p-2">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-sm font-medium">
                  {bg.name}
                  <span className="text-muted-foreground font-normal"> ({bg.nameEn})</span>
                </p>
                <DotRating current={bg.dots} max={5} size="sm" />
              </div>
              {bg.description && (
                <p className="text-xs text-muted-foreground">{bg.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
