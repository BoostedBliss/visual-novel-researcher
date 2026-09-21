import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlossaryTerm } from '../types';
import { BookOpen, X, Search, ExternalLink, Filter, HelpCircle, FileText } from 'lucide-react';

interface ScientificCodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: GlossaryTerm[];
  initialTerm?: string | null;
}

export const ScientificCodexModal: React.FC<ScientificCodexModalProps> = ({
  isOpen,
  onClose,
  terms,
  initialTerm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTermName, setActiveTermName] = useState<string>(
    initialTerm || (terms[0]?.term ?? '')
  );

  const filteredTerms = terms.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.narrativeContext.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeTerm =
    terms.find((t) => t.term === activeTermName) ||
    filteredTerms[0] ||
    terms[0];

  const getCategoryBadge = (cat: GlossaryTerm['category']) => {
    switch (cat) {
      case 'biomolecule':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'methodology':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60';
      case 'model_architecture':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      case 'physics_concept':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'instrumentation':
      default:
        return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
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
            className="w-full max-w-4xl h-[85vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/90 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-serif flex items-center gap-2">
                    In-Game Scientific Codex & Narrative Glossary
                  </h2>
                  <p className="text-xs text-slate-400">
                    Accessible scientific concepts, experimental context, and foundational definitions.
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

            {/* Filter & Search Bar */}
            <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search scientific terms or concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'biomolecule', 'methodology', 'model_architecture', 'instrumentation'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Pane Codex Browser */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Column: Term List */}
              <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-800 p-3 overflow-y-auto space-y-1.5 bg-slate-950/50 shrink-0">
                {filteredTerms.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No matching concepts found.</div>
                ) : (
                  filteredTerms.map((item) => (
                    <button
                      key={item.term}
                      onClick={() => setActiveTermName(item.term)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        activeTerm?.term === item.term
                          ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-sm'
                          : 'border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-mono">{item.term}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border uppercase ${getCategoryBadge(item.category)}`}>
                          {item.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {item.shortDefinition}
                      </p>
                    </button>
                  ))
                )}
              </div>

              {/* Right Column: Detailed Term Card */}
              <div className="flex-1 p-6 overflow-y-auto bg-slate-900/40 space-y-5">
                {activeTerm ? (
                  <>
                    <div className="border-b border-slate-800 pb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${getCategoryBadge(activeTerm.category)}`}>
                          {activeTerm.category.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-mono text-slate-500">CODEX ENTRY</span>
                      </div>
                      <h3 className="text-xl font-bold text-white font-serif">{activeTerm.term}</h3>
                      <p className="text-xs text-cyan-300 font-sans mt-1 leading-relaxed">
                        {activeTerm.shortDefinition}
                      </p>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Narrative Context */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-[11px]">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>ROLE IN THE VISUAL NOVEL NARRATIVE</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {activeTerm.narrativeContext}
                        </p>
                      </div>

                      {/* Experimental Significance */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center space-x-2 text-emerald-400 font-mono font-bold text-[11px]">
                          <FileText className="w-3.5 h-3.5" />
                          <span>EXPERIMENTAL & EMPIRICAL SIGNIFICANCE</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {activeTerm.experimentalSignificance}
                        </p>
                      </div>

                      {/* Paper Excerpt & External Resource */}
                      {activeTerm.relatedPaperSnippet && (
                        <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-2">
                          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                            Peer-Reviewed Paper Excerpt
                          </span>
                          <blockquote className="italic text-slate-300 border-l-2 border-blue-500/60 pl-3 py-0.5 text-xs">
                            &ldquo;{activeTerm.relatedPaperSnippet}&rdquo;
                          </blockquote>
                          {activeTerm.referenceUrl && (
                            <a
                              href={activeTerm.referenceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 mt-2 font-mono underline"
                            >
                              <span>Explore further research context</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500">Select a term to view definition.</div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
