import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { vtmGameTerms } from '@/i18n/vtmTerms';
import { DotRating } from './DotRating';

export function MeritsFlawsPanel() {
  const { character } = useVtmCharacter();
  return (
    <div className="space-y-4">
      <div>
        {character.merits.length === 0 ? (
          <p className="text-sm text-muted-foreground">—</p>
        ) : (
          <div className="space-y-2">
            {character.merits.map((merit, i) => (
              <div key={i} className="bg-muted/30 rounded p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium">
                    {merit.name}
                    <span className="text-muted-foreground font-normal"> ({merit.nameEn})</span>
                  </p>
                  <DotRating current={merit.dots} max={5} size="sm" />
                </div>
                {merit.description && (
                  <p className="text-xs text-muted-foreground">{merit.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <span className="text-xs font-medium text-muted-foreground">
          {vtmGameTerms.flaws.ru} ({vtmGameTerms.flaws.en})
        </span>
        {character.flaws.length === 0 ? (
          <p className="text-sm text-muted-foreground">—</p>
        ) : (
          <div className="space-y-2">
            {character.flaws.map((flaw, i) => (
              <div key={i} className="bg-muted/30 rounded p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium">
                    {flaw.name}
                    <span className="text-muted-foreground font-normal"> ({flaw.nameEn})</span>
                  </p>
                  <DotRating current={flaw.dots} max={5} size="sm" />
                </div>
                {flaw.description && (
                  <p className="text-xs text-muted-foreground">{flaw.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
