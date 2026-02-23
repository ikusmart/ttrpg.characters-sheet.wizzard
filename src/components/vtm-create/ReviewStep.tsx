import type { WizardState } from '@/models/vtm/wizardState';
import type { AttributeName } from '@/models/vtm/attribute';
import type { SkillName } from '@/models/vtm/skill';
import type { DisciplineName } from '@/models/vtm/discipline';
import { CLAN_DEFINITIONS } from '@/data/vtm/clanDefinitions';
import { PREDATOR_TYPES } from '@/data/vtm/predatorTypes';
import { VTM_ATTRIBUTES_BY_CATEGORY } from '@/data/vtm/attributes';
import { vtmAttributeTerms, vtmSkillTerms, vtmDisciplineTerms, vtmCategoryTerms } from '@/i18n/vtmTerms';
import { vtmDisciplineTooltips } from '@/i18n/vtmTooltips';
import { DotRating } from '@/components/vtm-sheet/DotRating';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface ReviewStepProps {
  state: WizardState;
}

export function ReviewStep({ state }: ReviewStepProps) {
  const clan = state.clanId ? CLAN_DEFINITIONS.find((c) => c.id === state.clanId) : null;
  const predator = state.predatorTypeId
    ? PREDATOR_TYPES.find((p) => p.id === state.predatorTypeId)
    : null;

  const stamina = state.attributes['stamina'] ?? 1;
  const composure = state.attributes['composure'] ?? 1;
  const resolve = state.attributes['resolve'] ?? 1;
  const healthMax = stamina + 3;
  const willpowerMax = composure + resolve;

  const nonZeroSkills = Object.entries(state.skills).filter(([, v]) => (v ?? 0) > 0) as [SkillName, number][];
  const disciplineEntries = Object.entries(state.disciplines).filter(([, v]) => (v ?? 0) > 0) as [DisciplineName, number][];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Обзор (Review)</h2>
        <p className="text-sm text-muted-foreground">
          Проверьте все настройки перед созданием персонажа.
        </p>
      </div>

      {/* Clan & Predator */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Клан (Clan)</p>
          {clan ? (
            <p className="text-sm font-medium">
              {clan.name}
              <span className="text-muted-foreground font-normal"> ({clan.nameEn})</span>
            </p>
          ) : (
            <p className="text-sm text-destructive">Не выбран</p>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Тип охотника (Predator Type)
          </p>
          {predator ? (
            <p className="text-sm font-medium">
              {predator.name}
              <span className="text-muted-foreground font-normal"> ({predator.nameEn})</span>
            </p>
          ) : (
            <p className="text-sm text-destructive">Не выбран</p>
          )}
        </div>
      </div>

      {/* Identity */}
      {(state.name || state.concept || state.ambition || state.desire) && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Личность (Identity)
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {state.name && (
              <p><span className="text-muted-foreground">Имя:</span> {state.name}</p>
            )}
            {state.concept && (
              <p><span className="text-muted-foreground">Концепция:</span> {state.concept}</p>
            )}
            {state.ambition && (
              <p><span className="text-muted-foreground">Амбиция:</span> {state.ambition}</p>
            )}
            {state.desire && (
              <p><span className="text-muted-foreground">Желание:</span> {state.desire}</p>
            )}
            {state.sire && (
              <p><span className="text-muted-foreground">Сир:</span> {state.sire}</p>
            )}
          </div>
        </div>
      )}

      {/* Attributes */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Атрибуты (Attributes)
        </p>
        <div className="grid grid-cols-3 gap-4">
          {(['physical', 'social', 'mental'] as const).map((cat) => (
            <div key={cat} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{vtmCategoryTerms[cat].ru}</p>
              {VTM_ATTRIBUTES_BY_CATEGORY[cat].map((attrName) => {
                const value = state.attributes[attrName as AttributeName] ?? 1;
                const term = vtmAttributeTerms[attrName as AttributeName];
                return (
                  <div key={attrName} className="flex items-center justify-between gap-2">
                    <span className="text-xs">{term.ru}</span>
                    <DotRating current={value} max={5} size="sm" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Derived Stats */}
      <div className="flex gap-6 text-sm">
        <p>
          <span className="text-muted-foreground">Здоровье (Health):</span>{' '}
          <span className="font-medium">{healthMax}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Сила воли (Willpower):</span>{' '}
          <span className="font-medium">{willpowerMax}</span>
        </p>
      </div>

      {/* Skills */}
      {nonZeroSkills.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Навыки (Skills)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {nonZeroSkills.map(([skillName, value]) => {
              const term = vtmSkillTerms[skillName];
              return (
                <div key={skillName} className="flex items-center justify-between gap-2">
                  <span className="text-xs">{term.ru}</span>
                  <DotRating current={value} max={5} size="sm" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disciplines */}
      {disciplineEntries.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Дисциплины (Disciplines)
          </p>
          <div className="space-y-1">
            {disciplineEntries.map(([disc, value]) => {
              const term = vtmDisciplineTerms[disc];
              return (
                <div key={disc} className="flex items-center justify-between gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-sm cursor-help border-b border-dashed border-muted-foreground/30">
                        {term.ru}
                        <span className="text-muted-foreground"> ({term.en})</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs">
                      {vtmDisciplineTooltips[disc]}
                    </TooltipContent>
                  </Tooltip>
                  <DotRating current={value} max={5} size="sm" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Merits */}
      {state.merits.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Достоинства (Merits)
          </p>
          <div className="space-y-1">
            {state.merits.map((m, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="text-sm">{m.name || '(без названия)'}</span>
                <DotRating current={m.dots} max={5} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flaws */}
      {state.flaws.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Недостатки (Flaws)
          </p>
          <div className="space-y-1">
            {state.flaws.map((f, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="text-sm">{f.name || '(без названия)'}</span>
                <DotRating current={f.dots} max={5} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backgrounds */}
      {state.backgrounds.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Предпосылки (Backgrounds)
          </p>
          <div className="space-y-1">
            {state.backgrounds.map((b, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <span className="text-sm">{b.name || '(без названия)'}</span>
                <DotRating current={b.dots} max={5} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Convictions & Touchstones */}
      {state.convictions.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Убеждения (Convictions)
          </p>
          <ul className="text-sm space-y-0.5 list-disc list-inside">
            {state.convictions.filter(Boolean).map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {state.touchstones.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Якоря (Touchstones)
          </p>
          <ul className="text-sm space-y-0.5 list-disc list-inside">
            {state.touchstones.filter(Boolean).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
