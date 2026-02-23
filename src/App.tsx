import { HashRouter, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelpProvider } from '@/components/help/HelpProvider';
import { HelpDrawer } from '@/components/help/HelpDrawer';
import { GuidedTour } from '@/components/help/GuidedTour';
import { AppHeader } from '@/components/layout/AppHeader';
import { PageContainer } from '@/components/layout/PageContainer';
import { SheetPage } from '@/pages/SheetPage';
import { LandingPage } from '@/pages/LandingPage';
import { QuizPage } from '@/pages/QuizPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { CharactersPage } from '@/pages/CharactersPage';
import { GameSelectionPage } from '@/pages/GameSelectionPage';
import { VtmSheetPage } from '@/pages/VtmSheetPage';
import { VtmLandingPage } from '@/pages/VtmLandingPage';
import { VtmQuizPage } from '@/pages/VtmQuizPage';
import { VtmResultsPage } from '@/pages/VtmResultsPage';
import { VtmCharactersPage } from '@/pages/VtmCharactersPage';
import { VtmCreatePage } from '@/pages/VtmCreatePage';
import { DndRulesPage } from '@/pages/DndRulesPage';
import { VtmRulesPage } from '@/pages/VtmRulesPage';

export default function App() {
  return (
    <HashRouter>
      <HelpProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            <PageContainer>
              <Routes>
                <Route path="/" element={<GameSelectionPage />} />
                <Route path="/dnd" element={<LandingPage />} />
                <Route path="/dnd/quiz" element={<QuizPage />} />
                <Route path="/dnd/results" element={<ResultsPage />} />
                <Route path="/dnd/sheet" element={<SheetPage />} />
                <Route path="/dnd/sheet/:id" element={<SheetPage />} />
                <Route path="/dnd/characters" element={<CharactersPage />} />
                <Route path="/dnd/rules" element={<DndRulesPage />} />
                <Route path="/vtm/sheet" element={<VtmSheetPage />} />
                <Route path="/vtm" element={<VtmLandingPage />} />
                <Route path="/vtm/quiz" element={<VtmQuizPage />} />
                <Route path="/vtm/results" element={<VtmResultsPage />} />
                <Route path="/vtm/sheet/:id" element={<VtmSheetPage />} />
                <Route path="/vtm/characters" element={<VtmCharactersPage />} />
                <Route path="/vtm/create" element={<VtmCreatePage />} />
                <Route path="/vtm/rules" element={<VtmRulesPage />} />
              </Routes>
            </PageContainer>
            <HelpDrawer />
            <GuidedTour />
          </div>
        </TooltipProvider>
      </HelpProvider>
    </HashRouter>
  );
}
