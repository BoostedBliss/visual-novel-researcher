import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, BranchChoice, BranchOption, GlossaryTerm } from '../types';
import { soundManager } from '../utils/audio';
import { ChevronRight, Play, Pause, Sparkles, HelpCircle, FastForward, BookOpen } from 'lucide-react';

interface DialogueBoxProps {
  speaker?: Character;
  isNarrator: boolean;
  dialogue: string;
  innerMonologue?: string;
  branchChoice?: BranchChoice;
  glossary?: GlossaryTerm[];
  onOpenCodexTerm?: (term: string) => void;
  onNext: () => void;
  onSelectOption: (option: BranchOption) => void;
  onSpeakingChange: (isSpeaking: boolean) => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  isNarrator,
  dialogue,
  innerMonologue,
  branchChoice,
  glossary = [],
  onOpenCodexTerm,
  onNext,
  onSelectOption,
  onSpeakingChange,
  autoPlay,
  onToggleAutoPlay,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<GlossaryTerm | null>(null);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    setSelectedOptionId(null);
    onSpeakingChange(true);

    let currentIndex = 0;
    const fullLength = dialogue.length;
    let timer: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < fullLength) {
        currentIndex++;
        setDisplayedText(dialogue.slice(0, currentIndex));

        // Play voice blip every 3 characters
        if (currentIndex % 3 === 0 && !isNarrator && speaker) {
          soundManager.playSpeechBlip(speaker.signatureVoicePitch);
        }

        const char = dialogue[currentIndex - 1];
        const delay = char === '.' || char === '!' || char === '?' ? 120 : char === ',' ? 60 : 22;
        timer = setTimeout(typeNextChar, delay);
      } else {
        setIsComplete(true);
        onSpeakingChange(false);
      }
    };

    timer = setTimeout(typeNextChar, 50);

    return () => {
      clearTimeout(timer);
      onSpeakingChange(false);
    };
  }, [dialogue, isNarrator, speaker, onSpeakingChange]);

  // Highlight scientific terms in completed text
  const renderedDialogue = useMemo(() => {
    if (!isComplete || glossary.length === 0) {
      return (
        <span>
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
          )}
        </span>
      );
    }

    // Sort glossary terms by length descending to match multi-word terms first
    const sortedTerms = [...glossary].sort((a, b) => b.term.length - a.term.length);
    const pattern = new RegExp(`\\b(${sortedTerms.map((t) => t.term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi');

    const parts = dialogue.split(pattern);

    return parts.map((part, index) => {
      const matched = sortedTerms.find((t) => t.term.toLowerCase() === part.toLowerCase());
      if (matched) {
        return (
          <span
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onOpenCodexTerm?.(matched.term);
            }}
            onMouseEnter={() => setHoveredTerm(matched)}
            onMouseLeave={() => setHoveredTerm(null)}
            className="text-amber-300 font-semibold underline decoration-amber-400/60 decoration-dotted underline-offset-4 cursor-pointer hover:text-amber-200 hover:bg-amber-500/10 px-0.5 rounded transition-colors"
            title={`Click to open Codex: ${matched.term}`}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [isComplete, glossary, displayedText, dialogue, onOpenCodexTerm]);

  // Handle skip to complete
  const handleSkipOrNext = useCallback(() => {
    if (!isComplete) {
      setDisplayedText(dialogue);
      setIsComplete(true);
      onSpeakingChange(false);
    } else if (!branchChoice) {
      soundManager.playSelect();
      onNext();
    }
  }, [isComplete, dialogue, branchChoice, onNext, onSpeakingChange]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleSkipOrNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkipOrNext]);

  // AutoPlay effect
  useEffect(() => {
    if (autoPlay && isComplete && !branchChoice) {
      const timer = setTimeout(() => {
        onNext();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, isComplete, branchChoice, onNext]);

  return (
    <div className="relative w-full max-w-4xl mx-auto z-30">
      {/* Branching Choice Modal Overlay when present */}
      <AnimatePresence>
        {branchChoice && isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 bg-slate-950/95 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Experimental Branching Point // Scientist Decision</span>
            </div>
            <h3 className="text-white font-semibold text-base mb-1">{branchChoice.prompt}</h3>
            <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="italic">{branchChoice.scientificDilemma}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {branchChoice.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedOptionId(option.id);
                    if (option.soundEffect === 'eureka') {
                      soundManager.playEureka();
                    } else {
                      soundManager.playPuzzle();
                    }
                    onSelectOption(option);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                    selectedOptionId === option.id
                      ? 'border-amber-400 bg-amber-500/20 text-white'
                      : 'border-slate-700/80 bg-slate-900/80 hover:border-amber-400/70 hover:bg-slate-800/90 text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300 font-mono">OPTION</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/40">
                      +{option.confidenceReward}% Confidence
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug mb-2 group-hover:text-amber-200 transition-colors">
                    {option.text}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {option.experimentalRationale}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dialogue Frame */}
      <div
        onClick={handleSkipOrNext}
        className="relative bg-slate-950/90 border border-slate-700/80 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-xl cursor-pointer hover:border-slate-600 transition-colors"
      >
        {/* Speaker Nameplate */}
        <div className="absolute -top-4 left-6 flex items-center space-x-2">
          {isNarrator ? (
            <div className="px-4 py-1 rounded-full bg-slate-800 border border-slate-600 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider shadow-lg">
              LAB CHRONICLE
            </div>
          ) : speaker ? (
            <div
              className="px-4 py-1 rounded-full border text-xs font-semibold tracking-wide shadow-lg flex items-center space-x-2 text-white"
              style={{
                backgroundColor: `${speaker.primaryColor}33`,
                borderColor: speaker.accentColor,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: speaker.accentColor }}
              />
              <span className="font-bold">{speaker.name}</span>
              <span className="text-[10px] opacity-75 font-normal">| {speaker.title}</span>
            </div>
          ) : null}
        </div>

        {/* Top Control Bar */}
        <div className="flex justify-end items-center space-x-2 mb-2 select-none" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onToggleAutoPlay}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center space-x-1 border transition-colors ${
              autoPlay
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {autoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>AUTO</span>
          </button>

          {!isComplete && (
            <button
              onClick={() => {
                setDisplayedText(dialogue);
                setIsComplete(true);
                onSpeakingChange(false);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center space-x-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            >
              <FastForward className="w-3 h-3" />
              <span>SKIP</span>
            </button>
          )}
        </div>

        {/* Inner Monologue Quote */}
        {innerMonologue && (
          <div className="mb-2 text-xs italic text-cyan-300/80 bg-cyan-950/20 border-l-2 border-cyan-400/50 pl-2.5 py-1 rounded-r">
            &ldquo;{innerMonologue}&rdquo;
          </div>
        )}

        {/* Hovered Term Mini Popover */}
        <AnimatePresence>
          {hoveredTerm && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="mb-2 p-2.5 rounded-xl bg-slate-900 border border-amber-400/60 shadow-xl text-xs flex items-center justify-between gap-3 pointer-events-none"
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-300 font-mono">{hoveredTerm.term}:</span>
                <span className="text-slate-300">{hoveredTerm.shortDefinition}</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono shrink-0">Click term to open Codex ↗</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typed Dialogue Text */}
        <div className="min-h-[4rem] text-slate-100 text-sm md:text-base leading-relaxed font-sans">
          {renderedDialogue}
        </div>

        {/* Next Prompt Indicator */}
        {isComplete && !branchChoice && (
          <div className="mt-2 flex justify-end">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="flex items-center space-x-1 text-xs font-mono text-cyan-400 font-semibold"
            >
              <span>CLICK OR PRESS SPACE TO ADVANCE</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
