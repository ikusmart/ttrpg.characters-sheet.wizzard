import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useHelp } from './HelpProvider';
import { HelpDrawerContent } from './HelpDrawerContent';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getHelpSection } from '@/data/help/helpRegistry';

export function HelpDrawer() {
  const { isDrawerOpen, closeDrawer, activeSectionId, activeGameSystem } = useHelp();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const section = activeSectionId && activeGameSystem
    ? getHelpSection(activeGameSystem, activeSectionId)
    : null;

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={
          isMobile
            ? 'max-h-[85dvh] rounded-t-xl'
            : 'w-[400px] sm:max-w-[400px]'
        }
      >
        <SheetHeader>
          <SheetTitle>{section?.title ?? 'Справка'}</SheetTitle>
          <SheetDescription>
            {section?.summary ?? 'Подробная информация о секции'}
          </SheetDescription>
        </SheetHeader>
        {activeSectionId && activeGameSystem && (
          <HelpDrawerContent
            sectionId={activeSectionId}
            gameSystem={activeGameSystem}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
