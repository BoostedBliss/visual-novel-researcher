import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VisualNovel, ScientificLogEntry } from '../types';
import { BookOpen, X, CheckCircle2, AlertTriangle, Lightbulb, ShieldCheck, Award, Zap } from 'lucide-react';

interface LabNotebookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  novel: VisualNovel;
  collectedLogs: ScientificLogEntry[];
  confidenceScore: number;
}

export const LabNotebookDrawer: React.FC<LabNotebookDrawerProps> = ({
  isOpen,
  onClose,
  novel,
  collectedLogs,
  confidenceScore,
}) => {
  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'failed_trial':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'breakthrough_method':
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'control_verification':
        return <ShieldCheck className="w-4 h-4 text-cyan-400" />;
      case 'paradigm_shift':
        return <Award className="w-4 h-4 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
    }
  };

  const getPhaseBadge = (phase: string) => {
    switch (phase) {
      case 'failed_trial':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/60';
      case 'breakthrough_method':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/60';
      case 'control_verification':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60';
      case 'paradigm_shift':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-800/60';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-full max-w-xl h-full bg-slate-950 border-l border-slate-800 p-6 flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="text-base font-bold text-white font-serif">Lab Journal & Evidence Ledger</h2>
                  <p className="text-xs text-slate-400">Experimental Trail & Peer-Review Ledger</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scientific Confidence Bar */}
            <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  EMPIRICAL CERTAINTY SCORE
                </span>
                <span className="text-cyan-400">{Math.min(100, Math.max(10, confidenceScore))}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-cyan-500 to-emerald-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(10, confidenceScore))}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Derived from controls executed, negative hypotheses ruled out, and reproducible assay checkpoints.
              </p>
            </div>

            {/* Core Paper Hypothesis */}
            <div className="mb-6 p-4 rounded-xl bg-blue-950/30 border border-blue-900/50">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">
                Foundational Hypothesis
              </span>
              <p className="text-xs text-blue-100 italic leading-relaxed">
                &ldquo;{novel.experimentalHypothesis}&rdquo;
              </p>
            </div>

            {/* Experimental Journey Steps */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Experimental Trail & Discovery Milestones ({collectedLogs.length} Logged)
              </h3>

              {collectedLogs.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  Advance through the visual novel dialogues and make experimental choices to unlock lab logs.
                </div>
              ) : (
                <div className="space-y-3">
                  {collectedLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getPhaseIcon(log.phase)}
                          <span className="text-xs font-bold text-slate-100">{log.stepTitle}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${getPhaseBadge(log.phase)}`}>
                          {log.phase.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-[11px] space-y-1 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                        <div>
                          <span className="font-semibold text-slate-400 font-mono">ACTION: </span>
                          <span className="text-slate-200">{log.experimentalAction}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-amber-400 font-mono">DATA OBSERVED: </span>
                          <span className="text-slate-300">{log.observedData}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-cyan-400 font-mono">DEDUCTION: </span>
                          <span className="text-slate-200">{log.deduction}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Key Takeaways */}
            <div className="mt-auto p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                Peer-Reviewed Core Takeaways
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {novel.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
