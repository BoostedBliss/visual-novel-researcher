import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimeStyle, VisualNovel } from '../types';
import { X, Sparkles, Wand2, FileText, Palette, FlaskConical, Loader2, BookCheck } from 'lucide-react';

interface NovelGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNovelGenerated: (novel: VisualNovel) => void;
}

const PRESET_PAPERS = [
  {
    title: 'Highly accurate protein structure prediction with AlphaFold',
    domain: 'Computational Biology & Structural Bioinformatics',
    style: 'cyberpunk_lab' as AnimeStyle,
    text: `Proteins are essential to life, yet predicting their 3D structures from 1D amino acid sequences has been a 50-year grand challenge. Traditional homology modeling struggled on de novo folds.
AlphaFold 2 introduces Evoformer and Structure Modules.
Experimental grit: Prior neural networks predicted contact distance maps separately from 3D coordinates, accumulating structural strain and clashes during relaxation.
Breakthrough: An end-to-end differentiable neural architecture that directly refines 3D backbone coordinates using invariant point attention (IPA) while iteratively refining multiple sequence alignments (MSAs) and pair representations simultaneously.
Result: Sub-angstrom accuracy at CASP14, predicting over 200 million protein structures.`
  },
  {
    title: 'Observation of Gravitational Waves from a Binary Black Hole Merger',
    domain: 'Astrophysics & General Relativity',
    style: 'steins_academia' as AnimeStyle,
    text: `On September 14, 2015, the two Advanced LIGO interferometers in Hanford and Livingston detected a transient gravitational-wave signal GW150914.
Theoretical dilemma: Einstein's 1915 equations predicted metric tensor ripples with strain h ~ 10^-21, but experimentalists spent 40 years fighting seismic vibration, thermal mirror noise, and quantum shot noise.
Experimental Path:
1. False-alarm testing: Blind injection drills tested whether team members would mistake injected hardware waveforms for real astrophysical signals.
2. Signal Verification: Time delay between detectors was exactly 6.9 milliseconds, consistent with light speed travel.
3. Waveform matching: Matched-filtering matched numerical relativity templates of two merging black holes (36 and 29 solar masses) merging into a 62 solar mass spinning black hole.
Core Finding: First direct physical confirmation of gravitational radiation and binary black hole event horizons.`
  }
];

export const NovelGeneratorModal: React.FC<NovelGeneratorModalProps> = ({
  isOpen,
  onClose,
  onNovelGenerated,
}) => {
  const [paperTitle, setPaperTitle] = useState('');
  const [paperDomain, setPaperDomain] = useState('Biochemistry & Molecular Genetics');
  const [paperText, setPaperText] = useState('');
  const [animeStyle, setAnimeStyle] = useState<AnimeStyle>('steins_academia');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadingMessages = [
    'Extracting hypothesis and control anomalies from paper...',
    'Synthesizing character archetypes (Lead Researcher, Senior PI Skeptic, Lab Engineer)...',
    'Drafting Chapter 1: The Failed Trial & Control Discrepancy...',
    'Mapping branching decision tree & scientific dilemma choices...',
    'Rendering anime storyboard cuts & experimental evidence ledger...'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim() || !paperText.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const response = await fetch('/api/generate-storyboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperTitle,
          paperText,
          animeStyle,
          researchDomain: paperDomain,
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.novel) {
        onNovelGenerated(data.novel);
        onClose();
      } else {
        setErrorMsg('Failed to generate visual novel. Please try again.');
      }
    } catch (err: unknown) {
      clearInterval(stepInterval);
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPreset = (preset: typeof PRESET_PAPERS[0]) => {
    setPaperTitle(preset.title);
    setPaperDomain(preset.domain);
    setAnimeStyle(preset.style);
    setPaperText(preset.text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Wand2 className="w-4 h-4" />
                <span>NOTEBOOKLM & RESEARCH PAPER TO ANIME VISUAL NOVEL CONVERTER</span>
              </div>
              <h2 className="text-xl font-bold text-white font-serif">
                Generate Interactive Scientific Storyboard
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Transforms research abstracts, full papers, or NotebookLM audio overviews into character-driven anime visual novels detailing the experimental journey.
              </p>
            </div>

            {/* Presets Row */}
            <div className="mb-4">
              <span className="text-[11px] font-mono text-slate-400 font-semibold block mb-2 flex items-center gap-1.5">
                <BookCheck className="w-3.5 h-3.5 text-cyan-400" />
                QUICK-LOAD BREAKTHROUGH SAMPLES:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_PAPERS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => loadPreset(preset)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-amber-400 hover:text-amber-200 transition-colors"
                  >
                    ⚡ {preset.title.slice(0, 36)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  PAPER TITLE OR STUDY CITATION
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Discovery of CRISPR-Cas9 or Attention Is All You Need"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-amber-400 focus:outline-none placeholder:text-slate-600 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                    SCIENTIFIC DOMAIN
                  </label>
                  <input
                    type="text"
                    value={paperDomain}
                    onChange={(e) => setPaperDomain(e.target.value)}
                    placeholder="e.g. Deep Learning, Particle Physics"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    ANIME AESTHETIC STYLE
                  </label>
                  <select
                    value={animeStyle}
                    onChange={(e) => setAnimeStyle(e.target.value as AnimeStyle)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none"
                  >
                    <option value="steins_academia">Steins;Gate Academia Mystery (Gritty Lab)</option>
                    <option value="cyberpunk_lab">Cyberpunk Neural Lab (Neon Tensor Cluster)</option>
                    <option value="naturalist_ghibli">Ghibli Naturalist Field Research</option>
                    <option value="shonen_experiment">Shonen Experimental Duel</option>
                    <option value="kyoto_clean">Clean Kyoto Animation Institute</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  RESEARCH PAPER TEXT / NOTEBOOKLM AUDIO OVERVIEW TRANSCRIPT
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Paste research paper abstract, methodology notes, experimental results, or NotebookLM study guide content here..."
                  value={paperText}
                  onChange={(e) => setPaperText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-amber-400 focus:outline-none placeholder:text-slate-600 leading-relaxed font-mono"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Loading State or Submit Button */}
              {isLoading ? (
                <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
                  <div className="flex items-center space-x-3 text-amber-400 text-xs font-mono font-semibold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI DIRECTOR SYNTHESIS IN PROGRESS...</span>
                  </div>
                  <p className="text-xs text-slate-300 animate-pulse font-mono">
                    &gt; {loadingMessages[loadingStep]}
                  </p>
                </div>
              ) : (
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-400/20 flex items-center space-x-2 transition-transform active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>SYNTHESIZE VISUAL NOVEL</span>
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
