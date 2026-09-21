import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VisualNovel, ResearchNode } from '../types';
import {
  GitFork,
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Play,
  RotateCcw
} from 'lucide-react';

interface ResearchPathFlowchartProps {
  isOpen: boolean;
  onClose: () => void;
  novel: VisualNovel;
  currentSceneId: string;
  onJumpToScene: (sceneId: string) => void;
}

export const ResearchPathFlowchart: React.FC<ResearchPathFlowchartProps> = ({
  isOpen,
  onClose,
  novel,
  currentSceneId,
  onJumpToScene,
}) => {
  const nodes = novel.researchPath || [];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    nodes[0]?.id || ''
  );

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getNodeColor = (type: ResearchNode['type']) => {
    switch (type) {
      case 'hypothesis':
        return {
          bg: 'bg-blue-950/80',
          border: 'border-blue-700/80',
          text: 'text-blue-300',
          badge: 'bg-blue-900/60 text-blue-200 border-blue-600/50',
          icon: <Lightbulb className="w-4 h-4 text-blue-400" />
        };
      case 'failed_assay':
        return {
          bg: 'bg-rose-950/80',
          border: 'border-rose-700/80',
          text: 'text-rose-300',
          badge: 'bg-rose-900/60 text-rose-200 border-rose-600/50',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />
        };
      case 'control_pivot':
        return {
          bg: 'bg-amber-950/80',
          border: 'border-amber-700/80',
          text: 'text-amber-300',
          badge: 'bg-amber-900/60 text-amber-200 border-amber-600/50',
          icon: <GitFork className="w-4 h-4 text-amber-400" />
        };
      case 'synthesis':
        return {
          bg: 'bg-cyan-950/80',
          border: 'border-cyan-700/80',
          text: 'text-cyan-300',
          badge: 'bg-cyan-900/60 text-cyan-200 border-cyan-600/50',
          icon: <Sparkles className="w-4 h-4 text-cyan-400" />
        };
      case 'breakthrough':
      default:
        return {
          bg: 'bg-emerald-950/80',
          border: 'border-emerald-700/80',
          text: 'text-emerald-300',
          badge: 'bg-emerald-900/60 text-emerald-200 border-emerald-600/50',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-5xl h-[88vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/90 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                  <GitFork className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-serif flex items-center gap-2">
                    Research Path & Scientific Method Flowchart
                  </h2>
                  <p className="text-xs text-slate-400">
                    Interactive decision tree mapping hypotheses, failed controls, pivotal insights, and empirical proof.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Flowchart Canvas & Inspector */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left / Top: Interactive Directed Graph Nodes */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>DISCOVERY TIMELINE FLOW ({nodes.length} CRITICAL NODES)</span>
                  <span className="text-[11px] text-amber-400">Select any node to inspect assay details</span>
                </div>

                {nodes.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                    No flowchart nodes defined for this paper yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {nodes.map((node, index) => {
                      const color = getNodeColor(node.type);
                      const isSelected = selectedNode?.id === node.id;
                      const isCurrent = node.sceneId === currentSceneId;

                      return (
                        <div key={node.id} className="relative">
                          {/* Connection line to next node */}
                          {index < nodes.length - 1 && (
                            <div className="absolute left-6 top-16 bottom--4 w-0.5 h-6 bg-gradient-to-b from-slate-700 to-slate-800 z-0" />
                          )}

                          <div
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer relative z-10 flex items-start gap-4 ${
                              isSelected
                                ? 'border-amber-400 bg-slate-900/90 shadow-lg shadow-amber-400/10'
                                : `${color.bg} ${color.border} hover:border-slate-600`
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center shrink-0 mt-0.5">
                              {color.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${color.badge}`}>
                                  {node.type.replace('_', ' ')}
                                </span>
                                {isCurrent && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold">
                                    CURRENT STORY SCENE
                                  </span>
                                )}
                              </div>
                              <h3 className="text-sm font-bold text-white mb-1 truncate">
                                {node.title}
                              </h3>
                              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                                {node.shortSummary}
                              </p>
                            </div>

                            <div className="shrink-0 pt-2 text-slate-500">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right / Bottom: Deep Node Inspector & Jump-To Action */}
              <div className="w-full lg:w-96 p-6 bg-slate-900/60 overflow-y-auto flex flex-col justify-between space-y-6">
                {selectedNode ? (
                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold block mb-1">
                        NODE INSPECTOR // ASSAY DEEP-DIVE
                      </span>
                      <h3 className="text-lg font-bold text-white font-serif">
                        {selectedNode.title}
                      </h3>
                      <span className="text-xs text-slate-400">Phase: {selectedNode.type.toUpperCase()}</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                      <div>
                        <span className="font-mono text-slate-400 font-bold block mb-1">SCIENTIFIC RATIONALE</span>
                        <p className="text-slate-200 leading-relaxed">{selectedNode.shortSummary}</p>
                      </div>

                      <div className="border-t border-slate-800/80 pt-3">
                        <span className="font-mono text-cyan-400 font-bold block mb-1">EMPIRICAL DATA / OBSERVATION</span>
                        <p className="text-slate-300 leading-relaxed font-sans">{selectedNode.empiricalEvidence}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200 space-y-1">
                      <div className="font-mono font-bold text-blue-400 text-[10px] uppercase">Scientific Method Link</div>
                      <p className="leading-relaxed">
                        Notice how this step ruled out alternative confounding explanations, advancing the empirical certainty of the final discovery.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">Select a node from the flowchart to inspect.</div>
                )}

                {/* Jump to this scene in Visual Novel */}
                {selectedNode && (
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={() => {
                        onJumpToScene(selectedNode.sceneId);
                        onClose();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-mono text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-amber-400/10 active:scale-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>JUMP TO SCENE IN STORY</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
