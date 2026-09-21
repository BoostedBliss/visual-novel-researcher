import React from 'react';
import { motion } from 'motion/react';

interface SceneBackgroundProps {
  type: 'cryo_em_chamber' | 'server_cluster' | 'cleanroom_bench' | 'academic_lecture_hall' | 'particle_accelerator' | 'greenhouse_field';
  animeStyle?: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ type }) => {
  switch (type) {
    case 'cleanroom_bench':
      return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950">
          {/* Bench grid perspective */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

          {/* Gel Electrophoresis Transilluminator Box with UV blue/cyan glow */}
          <div className="absolute bottom-16 left-8 md:left-24 w-48 md:w-64 h-32 rounded-xl bg-slate-900/90 border-2 border-cyan-500/40 p-3 shadow-2xl shadow-cyan-500/20">
            <div className="text-[10px] uppercase font-mono text-cyan-400 font-semibold mb-1 flex items-center justify-between">
              <span>AGAROSE GEL ASSAY // 120V</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            {/* Gel lanes */}
            <div className="w-full h-20 bg-cyan-950/80 rounded border border-cyan-500/30 flex justify-around items-center px-2">
              {[0, 1, 2, 3, 4].map((lane) => (
                <div key={lane} className="w-4 h-full flex flex-col justify-end space-y-2 pb-2">
                  <div className="w-full h-1 bg-cyan-300 rounded-sm shadow-sm shadow-cyan-300" />
                  {lane !== 1 && <div className="w-full h-1.5 bg-cyan-400 rounded-sm shadow-sm shadow-cyan-400" />}
                  {lane >= 3 && <div className="w-full h-2 bg-cyan-200 rounded-sm shadow-md shadow-cyan-200" />}
                </div>
              ))}
            </div>
          </div>

          {/* Lab equipment silhouette & rack */}
          <div className="absolute bottom-20 right-8 md:right-28 flex items-end space-x-3 opacity-60">
            <div className="w-8 h-28 bg-slate-800 rounded-t-lg border-t-2 border-blue-400 flex flex-col justify-around py-2 items-center">
              <div className="w-4 h-1 bg-blue-300" />
              <div className="w-4 h-1 bg-blue-300" />
              <div className="w-4 h-1 bg-blue-300" />
            </div>
            <div className="w-14 h-20 bg-slate-800/80 rounded-t-xl border border-blue-400/40" />
            <div className="w-24 h-12 bg-slate-900 rounded border border-blue-500/30 p-1 flex items-center justify-center font-mono text-xs text-blue-300">
              37.0 °C
            </div>
          </div>

          {/* Floating RNA/DNA particle sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/50"
                style={{
                  top: `${(i * 19) % 85}%`,
                  left: `${(i * 27) % 95}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>
      );

    case 'server_cluster':
      return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900">
          {/* Cyberpunk server racks */}
          <div className="absolute inset-0 flex justify-between px-6 opacity-30">
            {[0, 1, 2, 3].map((rack) => (
              <div key={rack} className="w-24 md:w-44 h-full border-x border-cyan-500/30 flex flex-col justify-between py-6">
                {[...Array(10)].map((_, u) => (
                  <div key={u} className="h-4 border-b border-cyan-500/20 flex items-center justify-between px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-8 h-1 bg-cyan-500/40 rounded" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Holographic Neural Tensor Matrix */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-80 md:w-96 h-48 border border-purple-500/30 rounded-2xl bg-purple-900/10 backdrop-blur-sm p-4 flex flex-col justify-center items-center shadow-2xl shadow-purple-500/20">
            <div className="text-[11px] font-mono text-purple-300 font-bold tracking-widest uppercase mb-2">
              TPU POD // ATTENTION MATRIX (Q · K^T / √d_k)
            </div>
            <div className="grid grid-cols-6 gap-1.5 w-full max-w-xs">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-4 rounded-sm"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#38bdf8' : i % 2 === 0 ? '#c084fc' : '#475569',
                  }}
                  animate={{
                    opacity: [0.3, 0.9, 0.3],
                  }}
                  transition={{
                    duration: 1.5 + (i % 5) * 0.4,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case 'academic_lecture_hall':
      return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-stone-900 via-amber-950/40 to-stone-950">
          {/* Classic Steins;Gate lecture blackboard */}
          <div className="absolute top-12 left-6 right-6 md:left-24 md:right-24 h-64 bg-emerald-950/80 border-8 border-stone-800 rounded-lg shadow-2xl p-6 font-mono text-emerald-100/70 select-none overflow-hidden">
            <div className="flex justify-between border-b border-emerald-700/50 pb-2 text-xs text-amber-200">
              <span>SEMINAR // EXPERIMENTAL VERIFICATION</span>
              <span>DATE: 2012.06.28</span>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <p className="text-amber-100 font-serif italic">H_0: Cleavage = f(Cas9, crRNA alone) → REJECTED [p &lt; 0.001]</p>
                <p>tracrRNA + crRNA ⇋ Duplex Guide Complex</p>
                <p className="text-cyan-300 font-bold">sgRNA = 5&apos;-[Target 20nt] - [Tetraloop GAAA] - [tracr] - 3&apos;</p>
              </div>
              <div className="hidden md:block border-l border-emerald-700/40 pl-4 space-y-1 text-emerald-200/80">
                <p>PAM Requirement: 5&apos;-NGG-3&apos;</p>
                <p>HNH Domain: Cleaves target complementary strand</p>
                <p>RuvC Domain: Cleaves non-complementary strand</p>
                <p className="text-amber-300">Blunt Double Strand Break @ -3bp from PAM</p>
              </div>
            </div>
          </div>

          {/* Wooden lecture podium */}
          <div className="absolute bottom-0 left-12 w-44 h-28 bg-stone-800 rounded-t-xl border-t-4 border-amber-800 shadow-2xl" />
        </div>
      );

    default: // cryo_em_chamber or others
      return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_70%)]" />
          {/* Cryo instrument silhouette */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 md:w-96 h-96 rounded-full border-4 border-indigo-500/20 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
          {/* Nitrogen vapor fog */}
          <motion.div
            className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none blur-xl"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      );
  }
};
