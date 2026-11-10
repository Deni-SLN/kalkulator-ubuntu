import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Display } from '@/components/calculator/Display';
import { MemoryBar } from '@/components/calculator/MemoryBar';
import { StandardKeypad } from '@/components/calculator/StandardKeypad';
import { ScientificKeypad } from '@/components/calculator/ScientificKeypad';
import { ProgrammerView } from '@/modules/programmer/ProgrammerView';
import { FinancialView } from '@/modules/financial/FinancialView';
import { ConverterView } from '@/modules/converter/ConverterView';
import { HistoryPanel } from '@/components/history/HistoryPanel';
import { SettingsModal } from '@/components/settings/SettingsModal';
import { AboutModal } from '@/components/settings/AboutModal';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useHistoryStore } from '@/stores/historyStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const { mode, setMode, setAngleMode, initMemory } = useCalculatorStore();
  const { loadHistory } = useHistoryStore();
  const { loadSettings, settings, isLoaded } = useSettingsStore();

  // Initialize shortcuts
  useKeyboardShortcuts(() => setIsSettingsOpen(true));

  // Initialize stores on startup
  useEffect(() => {
    loadSettings().then(() => {
      loadHistory();
      initMemory();
    });
  }, [loadSettings, loadHistory, initMemory]);

  // Sync default mode once settings loaded
  useEffect(() => {
    if (isLoaded && settings.defaultMode) {
      setMode(settings.defaultMode);
      setAngleMode(settings.angleMode);
    }
  }, [isLoaded, settings.defaultMode, settings.angleMode, setMode, setAngleMode]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--bg-app)] text-[var(--text-primary)] font-sans antialiased relative transition-colors duration-200">
      {/* Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
        {mode === 'standard' && (
          <>
            <Display />
            <MemoryBar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <StandardKeypad />
            </div>
          </>
        )}

        {mode === 'scientific' && (
          <>
            <Display />
            <MemoryBar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <ScientificKeypad />
            </div>
          </>
        )}

        {mode === 'programmer' && <ProgrammerView />}

        {mode === 'financial' && <FinancialView />}

        {mode === 'converter' && <ConverterView />}
      </main>

      {/* Sidebar Navigation Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Slide-out History Panel */}
      <HistoryPanel />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
