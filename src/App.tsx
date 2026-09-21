import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SAMPLE_NOVELS } from './data/sampleNovels';
import { VisualNovel, BranchOption, ScientificLogEntry, CustomPlayerCharacter } from './types';
import { AnimeCharacterSprite } from './components/AnimeCharacterSprite';
import { SceneBackground } from './components/SceneBackground';
import { DialogueBox } from './components/DialogueBox';
import { LabNotebookDrawer } from './components/LabNotebookDrawer';
import { StoryboardView } from './components/StoryboardView';
import { NovelGeneratorModal } from './components/NovelGeneratorModal';
import { ResearchPathFlowchart } from './components/ResearchPathFlowchart';
import { ScientificCodexModal } from './components/ScientificCodexModal';
import { CharacterCreatorModal } from './components/CharacterCreatorModal';
import { soundManager } from './utils/audio';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  LayoutGrid,
  Play,
  RotateCcw,
  Zap,
  ChevronDown,
  GitFork,
  User,
  Library
} from 'lucide-react';

const DEFAULT_PLAYER_CHARACTER: CustomPlayerCharacter = {
  name: 'Dr. Akira',
  title: 'Principal Investigator',
  artStyle: 'steins_academia',
  hairStyle: 'prodigy_flow',
  hairColor: '#1e3a8a',
  eyeShape: 'sparkling',
  eyeColor: '#38bdf8',
  clothingStyle: 'lab_coat',
  clothingColor: '#ffffff',
  accessory: 'glasses',
  specialtyBackstory: 'structural_biology',
  backstoryText: 'A relentless molecular biophysicist dedicated to understanding the structural mechanisms of ribonucleoprotein complexes and atomic-level macromolecular mechanics.'
};

export default function App() {
  const [novels, setNovels] = useState<VisualNovel[]>(SAMPLE_NOVELS);
  const [activeNovelId, setActiveNovelId] = useState<string>(SAMPLE_NOVELS[0].id);
  const [currentSceneId, setCurrentSceneId] = useState<string>(SAMPLE_NOVELS[0].initialSceneId);
  const [sceneHistory, setSceneHistory] = useState<string[]>([]);
  const [collectedLogs, setCollectedLogs] = useState<ScientificLogEntry[]>([]);
  const [confidenceScore, setConfidenceScore] = useState<number>(35);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [isFlowchartOpen, setIsFlowchartOpen] = useState<boolean>(false);
  const [isCodexOpen, setIsCodexOpen] = useState<boolean>(false);
  const [codexInitialTerm, setCodexInitialTerm] = useState<string | null>(null);
  const [isCharacterCreatorOpen, setIsCharacterCreatorOpen] = useState<boolean>(false);
  const [playerCharacter, setPlayerCharacter] = useState<CustomPlayerCharacter>(DEFAULT_PLAYER_CHARACTER);
  const [viewMode, setViewMode] = useState<'novel' | 'storyboard'>('novel');

  // Current active novel
  const activeNovel = useMemo(() => {
    return novels.find((n) => n.id === activeNovelId) || novels[0];
  }, [novels, activeNovelId]);

  // Current scene
  const currentScene = useMemo(() => {
    return (
      activeNovel.scenes.find((s) => s.id === currentSceneId) ||
      activeNovel.scenes[0]
    );
  }, [activeNovel, currentSceneId]);

  // Current chapter
  const currentChapter = useMemo(() => {
    return (
      activeNovel.chapters.find((c) => c.id === currentScene.chapterId) ||
      activeNovel.chapters[0]
    );
  }, [activeNovel, currentScene.chapterId]);

  // Current character speaker
  const currentSpeaker = useMemo(() => {
    return activeNovel.characters.find((c) => c.id === currentScene.speakerId);
  }, [activeNovel, currentScene.speakerId]);

  // When changing novels, reset progress
  const handleSelectNovel = (novelId: string) => {
    const novel = novels.find((n) => n.id === novelId);
    if (!novel) return;
    setActiveNovelId(novel.id);
    setCurrentSceneId(novel.initialSceneId);
    setSceneHistory([]);
    setCollectedLogs([]);
    setConfidenceScore(35);
  };

  // Collect scientific log when entering a scene with a log
  useEffect(() => {
    if (currentScene.scientificLog) {
      setCollectedLogs((prev) => {
        const alreadyExists = prev.some(
          (l) => l.stepTitle === currentScene.scientificLog?.stepTitle
        );
        if (alreadyExists) return prev;
        return [...prev, currentScene.scientificLog!];
      });

      if (currentScene.scientificLog.confidenceDelta) {
        setConfidenceScore((prev) =>
          Math.min(100, Math.max(10, prev + currentScene.scientificLog!.confidenceDelta))
        );
      }
    }
  }, [currentScene]);

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
  };

  // Advance to next scene
  const handleNext = useCallback(() => {
    if (currentScene.nextSceneId) {
      setSceneHistory((prev) => [...prev, currentSceneId]);
      setCurrentSceneId(currentScene.nextSceneId);
    }
  }, [currentScene, currentSceneId]);

  // Handle branching option choice
  const handleSelectOption = (option: BranchOption) => {
    setSceneHistory((prev) => [...prev, currentSceneId]);
    setConfidenceScore((prev) => Math.min(100, prev + option.confidenceReward));
    setCurrentSceneId(option.nextSceneId);
  };

  // Restart novel
  const handleRestart = () => {
    setCurrentSceneId(activeNovel.initialSceneId);
    setSceneHistory([]);
    setCollectedLogs([]);
    setConfidenceScore(35);
  };

  // Add generated novel
  const handleNovelGenerated = (newNovel: VisualNovel) => {
    setNovels((prev) => [newNovel, ...prev]);
    setActiveNovelId(newNovel.id);
    setCurrentSceneId(newNovel.initialSceneId);
    setSceneHistory([]);
    setCollectedLogs([]);
    setConfidenceScore(35);
    setViewMode('novel');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* Top Studio Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 md:px-8 flex items-center justify-between z-40 shrink-0">
        {/* Brand & Active Paper Selector */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center font-serif font-black text-amber-400 text-sm">
                理
              </div>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-serif">
                <span>RESEARCH VISUAL NOVEL STUDIO</span>
              </h1>
              <span className="text-[10px] font-mono text-cyan-400 block -mt-0.5">
                EXPERIMENTAL PROOF CHRONICLES
              </span>
            </div>
          </div>

          {/* Paper Select Dropdown */}
          <div className="relative group hidden sm:block">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer hover:border-amber-400/60">
              <span className="max-w-[160px] md:max-w-[220px] truncate font-medium">
                {activeNovel.title}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="absolute left-0 mt-1 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50">
              <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase font-bold">
                SELECT RESEARCH PAPER:
              </div>
              {novels.map((novel) => (
                <button
                  key={novel.id}
                  onClick={() => handleSelectNovel(novel.id)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                    novel.id === activeNovelId
                      ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="truncate font-semibold">{novel.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">{novel.paperCitation}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* View Mode Toggle */}
          <div className="flex p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('novel')}
              className={`px-3 py-1 rounded-md font-mono flex items-center space-x-1.5 transition-colors ${
                viewMode === 'novel'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3 h-3" />
              <span className="hidden md:inline">VISUAL NOVEL</span>
            </button>
            <button
              onClick={() => setViewMode('storyboard')}
              className={`px-3 py-1 rounded-md font-mono flex items-center space-x-1.5 transition-colors ${
                viewMode === 'storyboard'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span className="hidden md:inline">STORYBOARD</span>
            </button>
          </div>

          {/* Research Path Flowchart Button */}
          <button
            onClick={() => setIsFlowchartOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/60 text-xs font-mono font-medium text-slate-200 flex items-center space-x-1.5 transition-colors"
            title="Open Interactive Scientific Method & Experiment Flowchart"
          >
            <GitFork className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">RESEARCH PATH</span>
          </button>

          {/* Scientific Codex / Glossary Button */}
          <button
            onClick={() => {
              setCodexInitialTerm(null);
              setIsCodexOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/60 text-xs font-mono font-medium text-slate-200 flex items-center space-x-1.5 transition-colors"
            title="Open Scientific Terminology Codex & Glossary"
          >
            <Library className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">CODEX</span>
          </button>

          {/* Character Creator Avatar Studio Button */}
          <button
            onClick={() => setIsCharacterCreatorOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-400/60 text-xs font-mono font-medium text-slate-200 flex items-center space-x-1.5 transition-colors"
            title="Customize Anime Scientist Avatar & Persona"
          >
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">AVATAR</span>
          </button>

          {/* Lab Notebook Button */}
          <button
            onClick={() => setIsNotebookOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/60 text-xs font-mono font-medium text-slate-200 flex items-center space-x-2 transition-colors relative"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">LAB JOURNAL</span>
            {collectedLogs.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold">
                {collectedLogs.length}
              </span>
            )}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Audio SFX' : 'Enable Audio SFX'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Convert Paper / NotebookLM button */}
          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-md shadow-amber-400/10 hover:shadow-amber-400/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">CONVERT PAPER</span>
            <span className="sm:hidden">NEW</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {viewMode === 'storyboard' ? (
          <div className="flex-1 overflow-y-auto">
            <StoryboardView
              novel={activeNovel}
              currentSceneId={currentSceneId}
              onSelectScene={(sceneId) => {
                setCurrentSceneId(sceneId);
                setViewMode('novel');
              }}
            />
          </div>
        ) : (
          <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-4 md:p-8">
            {/* Background Backdrop */}
            <SceneBackground type={currentScene.backgroundType} animeStyle={activeNovel.animeStyle} />

            {/* Top Scene HUD Metadata */}
            <div className="relative z-20 flex items-start justify-between">
              {/* Chapter & Experimental Phase */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 backdrop-blur-md max-w-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 uppercase">
                    {currentChapter.title}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    STAGE: {currentScene.backgroundType.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {currentChapter.subtitle}
                </div>
              </div>

              {/* Scientific Certainty Score Tracker */}
              <div
                onClick={() => setIsNotebookOpen(true)}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/60 rounded-xl p-2.5 backdrop-blur-md flex items-center space-x-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    Empirical Proof Certainty
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    {confidenceScore}% Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Character Sprite Stage */}
            <div className="relative z-20 flex-1 flex items-end justify-center pointer-events-none pb-2">
              {currentSpeaker ? (
                <AnimeCharacterSprite
                  character={currentSpeaker}
                  expression={currentScene.expression}
                  isSpeaking={isSpeaking}
                  customPlayer={playerCharacter}
                />
              ) : null}
            </div>

            {/* Bottom Interactive Dialogue Box */}
            <div className="relative z-30 pb-2">
              <DialogueBox
                speaker={currentSpeaker}
                isNarrator={currentScene.speakerId === 'NARRATOR'}
                dialogue={currentScene.dialogue}
                innerMonologue={currentScene.innerMonologue}
                branchChoice={currentScene.branchChoice}
                glossary={activeNovel.glossary}
                onOpenCodexTerm={(term) => {
                  setCodexInitialTerm(term);
                  setIsCodexOpen(true);
                }}
                onNext={handleNext}
                onSelectOption={handleSelectOption}
                onSpeakingChange={setIsSpeaking}
                autoPlay={autoPlay}
                onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
              />
            </div>

            {/* Ending Scene Celebration Modal */}
            {currentScene.isEnding && (
              <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
                <div className="max-w-xl bg-slate-900 border-2 border-emerald-500/60 rounded-2xl p-6 md:p-8 shadow-2xl text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto text-3xl font-serif">
                    証
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                      HYPOTHESIS EMPIRICALLY CONFIRMED // PARADIGM SHIFT
                    </span>
                    <h2 className="text-2xl font-bold text-white font-serif">{activeNovel.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{activeNovel.paperCitation}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs text-slate-300 space-y-2 leading-relaxed">
                    <span className="font-bold text-emerald-400 font-mono block">FINAL EMPIRICAL PROOF:</span>
                    <p>{activeNovel.coreDiscovery}</p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      onClick={() => setIsNotebookOpen(true)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 flex items-center space-x-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>REVIEW LAB JOURNAL</span>
                    </button>
                    <button
                      onClick={() => setViewMode('storyboard')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-slate-700 flex items-center space-x-2"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span>OPEN STORYBOARD</span>
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>REPLAY DISCOVERY</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Lab Notebook Evidence Drawer */}
      <LabNotebookDrawer
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        novel={activeNovel}
        collectedLogs={collectedLogs}
        confidenceScore={confidenceScore}
      />

      {/* Novel Generator Modal */}
      <NovelGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onNovelGenerated={handleNovelGenerated}
      />

      {/* Research Path & Scientific Method Flowchart Modal */}
      <ResearchPathFlowchart
        isOpen={isFlowchartOpen}
        onClose={() => setIsFlowchartOpen(false)}
        novel={activeNovel}
        currentSceneId={currentSceneId}
        onJumpToScene={(sceneId) => {
          setCurrentSceneId(sceneId);
          setViewMode('novel');
        }}
      />

      {/* Scientific Codex & Glossary Modal */}
      <ScientificCodexModal
        isOpen={isCodexOpen}
        onClose={() => {
          setIsCodexOpen(false);
          setCodexInitialTerm(null);
        }}
        terms={activeNovel.glossary || []}
        initialTerm={codexInitialTerm}
      />

      {/* Character Creator Avatar Studio Modal */}
      <CharacterCreatorModal
        isOpen={isCharacterCreatorOpen}
        onClose={() => setIsCharacterCreatorOpen(false)}
        playerCharacter={playerCharacter}
        onSaveCharacter={(updated) => setPlayerCharacter(updated)}
      />
    </div>
  );
}
