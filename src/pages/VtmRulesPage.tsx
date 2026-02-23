import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllHelpSections } from '@/data/help/helpRegistry';

export function VtmRulesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const sections = getAllHelpSections('vtm');

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            (item.gameplayEffect?.toLowerCase().includes(q) ?? false)
        ),
      }))
      .filter(
        (section) =>
          section.items.length > 0 ||
          section.title.toLowerCase().includes(q) ||
          section.summary.toLowerCase().includes(q)
      );
  }, [sections, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Правила Vampire: The Masquerade V5</h1>
        <p className="text-sm text-muted-foreground">
          Справочник по основным механикам V5.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по правилам..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Sections */}
      <ScrollArea className="max-h-[calc(100vh-280px)]">
        <Accordion type="multiple" className="space-y-2">
          {filteredSections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className="rounded-lg border border-border bg-card px-4">
              <AccordionTrigger className="text-sm font-semibold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{section.summary}</p>

                  {section.items.map((item) => (
                    <div key={item.id} className="rounded-md border border-border p-3 space-y-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      {item.gameplayEffect && (
                        <p className="text-xs text-primary/80">
                          <span className="font-medium">Влияет на: </span>{item.gameplayEffect}
                        </p>
                      )}
                    </div>
                  ))}

                  {section.tips && section.tips.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {section.tips.map((tip, i) => (
                        <p key={i} className="text-xs text-amber-700 dark:text-amber-400">
                          💡 {tip.text}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.connections && section.connections.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {section.connections.map((conn, i) => (
                        <p key={i} className="text-xs text-muted-foreground">
                          {conn.from} → {conn.to} — {conn.relation}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredSections.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Ничего не найдено по запросу "{searchQuery}"
          </div>
        )}
      </ScrollArea>

      {/* V5 Disclaimer */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h3 className="text-sm font-semibold">Полные правила V5</h3>
        <p className="text-xs text-muted-foreground">
          Данный справочник содержит только общедоступную информацию. Полные правила, включая детальное описание дисциплин, ритуалов и лора доступны в книге Vampire: The Masquerade 5th Edition Core Rulebook.
        </p>
        <p className="text-[10px] text-muted-foreground">
          Vampire: The Masquerade and the World of Darkness are trademarks of Paradox Interactive AB.
        </p>
      </div>
    </div>
  );
}
