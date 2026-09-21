import React from 'react';
import { VisualNovel } from '../types';
import { LayoutGrid, Sparkles, BookOpen } from 'lucide-react';

interface StoryboardViewProps {
  novel: VisualNovel;
  onSelectScene: (sceneId: string) => void;
  currentSceneId: string;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({
  novel,
  onSelectScene,
  currentSceneId,
}) => {
  const getCharacter = (speakerId: string) => {
    return novel.characters.find((c) => c.id === speakerId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Storyboard Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <LayoutGrid className="w-4 h-4" />
            <span>ANIME PRODUCTION STORYBOARD & SCIENTIFIC TIMELINE</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white font-serif">{novel.title}</h2>
          <p className="text-xs text-slate-400 mt-1">Citation: {novel.paperCitation}</p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-amber-400 font-bold">{novel.chapters.length}</span> Chapters
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-cyan-400 font-bold">{novel.scenes.length}</span> Storyboard Panels
          </div>
        </div>
      </div>

      {/* Chapters & Panels */}
      {novel.chapters.map((chapter, chapterIdx) => {
        const chapterScenes = novel.scenes.filter((s) => s.chapterId === chapter.id);

        return (
          <div key={chapter.id} className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">
                ACT 0{chapterIdx + 1}
              </span>
              <h3 className="text-base font-bold text-slate-100">{chapter.title}</h3>
              <span className="text-xs text-slate-500">| {chapter.subtitle}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapterScenes.map((scene, idx) => {
                const char = getCharacter(scene.speakerId);
                const isCurrent = scene.id === currentSceneId;

                return (
                  <div
                    key={scene.id}
                    onClick={() => onSelectScene(scene.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isCurrent
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-[9px] font-bold">
                        NOW PLAYING
                      </div>
                    )}

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-[10px] font-mono text-slate-500 font-semibold">
                          CUT #{idx + 1}
                        </span>
                        {char ? (
                          <span
                            className="text-[11px] font-bold px-2 py-0.5 rounded-full border"
                            style={{
                              color: char.accentColor,
                              backgroundColor: `${char.primaryColor}22`,
                              borderColor: `${char.accentColor}44`,
                            }}
                          >
                            {char.name} ({scene.expression})
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">Narrator</span>
                        )}
                      </div>

                      <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed mb-3">
                        {scene.dialogue}
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="uppercase">STAGE: {scene.backgroundType.replace('_', ' ')}</span>
                        {scene.branchChoice && (
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> CHOICE POINT
                          </span>
                        )}
                      </div>

                      {scene.scientificLog && (
                        <div className="text-[10px] bg-slate-950/80 p-2 rounded border border-slate-800 text-cyan-300">
                          <span className="font-bold text-slate-400 font-mono">LOG: </span>
                          {scene.scientificLog.stepTitle}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Core Scientific Synthesis Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-800/40">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Core Scientific Conclusion & Paradigm Shift</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-serif">
          {novel.coreDiscovery}
        </p>
      </div>
    </div>
  );
};
