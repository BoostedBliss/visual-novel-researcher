import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomPlayerCharacter, AnimeStyle } from '../types';
import { User, X, Sparkles, Palette, Wand2, Shield, Glasses, Check } from 'lucide-react';

interface CharacterCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerCharacter: CustomPlayerCharacter;
  onSaveCharacter: (char: CustomPlayerCharacter) => void;
}

const HAIR_STYLES = [
  { id: 'prodigy_flow', label: 'Prodigy Flow' },
  { id: 'spiky_engineer', label: 'Spiky Methodologist' },
  { id: 'classic_scholar', label: 'Classic Scholar' },
  { id: 'twin_tails', label: 'Dynamic Researcher' },
  { id: 'sleek_cyber', label: 'Sleek Cybernetic' },
] as const;

const EYE_SHAPES = [
  { id: 'sparkling', label: 'Sparkling Idealist' },
  { id: 'sharp_analytical', label: 'Sharp Analytical' },
  { id: 'inquisitive_round', label: 'Inquisitive Open' },
  { id: 'calm_focused', label: 'Calm Empirical' },
] as const;

const CLOTHING_STYLES = [
  { id: 'lab_coat', label: 'Standard Cleanroom Lab Coat' },
  { id: 'tech_vest', label: 'Instrumentation Tech Vest' },
  { id: 'formal_blazer', label: 'Academic Keynote Blazer' },
  { id: 'cyber_jumpsuit', label: 'Cyber Neural Jumpsuit' },
  { id: 'naturalist_field', label: 'Naturalist Field Parka' },
] as const;

const ACCESSORIES = [
  { id: 'none', label: 'None' },
  { id: 'glasses', label: 'Analytical Glasses' },
  { id: 'forehead_goggles', label: 'Forehead Safety Goggles' },
  { id: 'cyber_earpiece', label: 'Bio-Comms Earpiece' },
  { id: 'id_badge', label: 'Institute ID Badge' },
] as const;

const COLOR_PALETTES = {
  hair: ['#1e3a8a', '#047857', '#991b1b', '#d97706', '#475569', '#7c3aed', '#ec4899', '#0284c7'],
  eye: ['#38bdf8', '#34d399', '#f59e0b', '#a855f7', '#fb7185', '#64748b'],
  clothing: ['#ffffff', '#0f172a', '#064e3b', '#1e1b4b', '#78350f', '#0284c7'],
};

export const CharacterCreatorModal: React.FC<CharacterCreatorModalProps> = ({
  isOpen,
  onClose,
  playerCharacter,
  onSaveCharacter,
}) => {
  const [name, setName] = useState(playerCharacter.name);
  const [title, setTitle] = useState(playerCharacter.title);
  const [artStyle, setArtStyle] = useState<AnimeStyle>(playerCharacter.artStyle);
  const [hairStyle, setHairStyle] = useState(playerCharacter.hairStyle);
  const [hairColor, setHairColor] = useState(playerCharacter.hairColor);
  const [eyeShape, setEyeShape] = useState(playerCharacter.eyeShape);
  const [eyeColor, setEyeColor] = useState(playerCharacter.eyeColor);
  const [clothingStyle, setClothingStyle] = useState(playerCharacter.clothingStyle);
  const [clothingColor, setClothingColor] = useState(playerCharacter.clothingColor);
  const [accessory, setAccessory] = useState(playerCharacter.accessory);
  const [specialtyBackstory, setSpecialtyBackstory] = useState(playerCharacter.specialtyBackstory);
  const [backstoryText, setBackstoryText] = useState(playerCharacter.backstoryText);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCharacter({
      name: name.trim() || 'Scientist',
      title: title.trim() || 'Principal Investigator',
      artStyle,
      hairStyle,
      hairColor,
      eyeShape,
      eyeColor,
      clothingStyle,
      clothingColor,
      accessory,
      specialtyBackstory,
      backstoryText,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl h-[90vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/90 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-serif flex items-center gap-2">
                    Anime Researcher Avatar & Persona Studio
                  </h2>
                  <p className="text-xs text-slate-400">
                    Customize your anime protagonist appearance, aesthetic art style, and scientific backstory.
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

            {/* Studio Body: Split Preview & Options */}
            <form onSubmit={handleSave} className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Column: Live Anime Sprite Preview & Identity */}
              <div className="w-full md:w-80 p-6 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/80 flex flex-col items-center justify-between shrink-0 overflow-y-auto">
                <div className="w-full text-center space-y-2">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    PROTAGONIST AVATAR PREVIEW
                  </span>

                  {/* Dynamic SVG Preview */}
                  <div className="w-48 h-56 mx-auto relative bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
                    <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                      {/* Aura glow */}
                      <circle cx="100" cy="120" r="70" fill={clothingColor} fillOpacity="0.15" />
                      
                      {/* Neck */}
                      <path d="M 90 135 L 90 160 L 110 160 L 110 135 Z" fill="#ffedd5" />
                      
                      {/* Face */}
                      <path
                        d="M 58 85 C 58 125 75 145 100 145 C 125 145 142 125 142 85 C 142 55 125 45 100 45 C 75 45 58 55 58 85 Z"
                        fill="#fff7ed"
                        stroke="#fed7aa"
                        strokeWidth="1.5"
                      />

                      {/* Eyes according to eyeShape and eyeColor */}
                      {eyeShape === 'sharp_analytical' ? (
                        <g>
                          <path d="M 68 96 L 87 93 L 85 101 L 70 102 Z" fill="#1e293b" />
                          <circle cx="78" cy="97" r="3" fill={eyeColor} />
                          <path d="M 66 87 L 88 83" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

                          <path d="M 113 93 L 132 96 L 130 102 L 115 101 Z" fill="#1e293b" />
                          <circle cx="122" cy="97" r="3" fill={eyeColor} />
                          <path d="M 112 83 L 134 87" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                        </g>
                      ) : eyeShape === 'inquisitive_round' ? (
                        <g>
                          <circle cx="78" cy="96" r="9" fill="#1e293b" />
                          <circle cx="78" cy="96" r="5" fill={eyeColor} />
                          <circle cx="76" cy="93" r="2.5" fill="#ffffff" />
                          <path d="M 68 82 Q 78 77 88 82" stroke="#0f172a" strokeWidth="2" fill="none" />

                          <circle cx="122" cy="96" r="9" fill="#1e293b" />
                          <circle cx="122" cy="96" r="5" fill={eyeColor} />
                          <circle cx="120" cy="93" r="2.5" fill="#ffffff" />
                          <path d="M 112 82 Q 122 77 132 82" stroke="#0f172a" strokeWidth="2" fill="none" />
                        </g>
                      ) : (
                        <g>
                          <ellipse cx="78" cy="96" rx="9" ry="12" fill="#1e293b" />
                          <ellipse cx="78" cy="98" rx="7" ry="9" fill={eyeColor} />
                          <circle cx="80" cy="93" r="3.5" fill="#ffffff" />
                          <circle cx="75" cy="100" r="2" fill="#ffffff" />
                          <path d="M 69 82 Q 78 77 87 81" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                          <ellipse cx="122" cy="96" rx="9" ry="12" fill="#1e293b" />
                          <ellipse cx="122" cy="98" rx="7" ry="9" fill={eyeColor} />
                          <circle cx="124" cy="93" r="3.5" fill="#ffffff" />
                          <circle cx="119" cy="100" r="2" fill="#ffffff" />
                          <path d="M 113 81 Q 122 77 131 82" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </g>
                      )}

                      {/* Mouth */}
                      <path d="M 94 122 Q 100 128 106 122" stroke="#881337" strokeWidth="2" strokeLinecap="round" fill="none" />

                      {/* Hair Shape & Hair Color */}
                      <g>
                        <path d="M 48 95 C 42 45 70 28 100 28 C 130 28 158 45 152 95 C 145 68 132 52 100 52 C 68 52 55 68 48 95 Z" fill={hairColor} />
                        <path d="M 52 82 L 68 88 L 76 72 L 92 90 L 108 72 L 116 88 L 132 82 L 146 76 C 136 48 122 36 100 36 C 78 36 64 48 52 82 Z" fill={hairColor} filter="brightness(1.2)" />
                        {hairStyle === 'twin_tails' && (
                          <>
                            <path d="M 40 85 Q 20 130 35 160 Q 42 130 46 95 Z" fill={hairColor} />
                            <path d="M 160 85 Q 180 130 165 160 Q 158 130 154 95 Z" fill={hairColor} />
                          </>
                        )}
                      </g>

                      {/* Accessories */}
                      {accessory === 'glasses' && (
                        <g>
                          <rect x="67" y="88" width="22" height="17" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
                          <rect x="111" y="88" width="22" height="17" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
                          <line x1="89" y1="96" x2="111" y2="96" stroke="#cbd5e1" strokeWidth="2.5" />
                        </g>
                      )}
                      {accessory === 'forehead_goggles' && (
                        <g>
                          <rect x="65" y="48" width="70" height="14" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                          <circle cx="80" cy="55" r="4" fill="#34d399" />
                          <circle cx="120" cy="55" r="4" fill="#34d399" />
                        </g>
                      )}

                      {/* Clothing / Torso */}
                      <path d="M 60 155 L 100 175 L 140 155 L 158 240 L 42 240 Z" fill={clothingColor} stroke="#64748b" strokeWidth="1.5" />
                      <path d="M 85 155 L 100 178 L 115 155 L 100 145 Z" fill="#38bdf8" />
                    </svg>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-white font-serif">{name || 'Unnamed Researcher'}</h4>
                    <p className="text-[11px] text-cyan-400 font-mono">{title || 'Specialist'}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      TRAIT: {specialtyBackstory.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="w-full pt-4">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>SAVE & EMBED CHARACTER</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Customization Controls */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {/* Identity Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      CHARACTER NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Sora Takahashi"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      INSTITUTE LAB TITLE
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Senior Assay Fellow"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Anime Art Style */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    ANIME ART STYLE UNIVERSE
                  </label>
                  <select
                    value={artStyle}
                    onChange={(e) => setArtStyle(e.target.value as AnimeStyle)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none font-mono"
                  >
                    <option value="steins_academia">Steins;Gate Academia Mystery</option>
                    <option value="cyberpunk_lab">Cyberpunk Neural Tensor Lab</option>
                    <option value="naturalist_ghibli">Ghibli Naturalist Field Station</option>
                    <option value="shonen_experiment">Shonen Experimental Duel</option>
                    <option value="kyoto_clean">Kyoto Animation Clean Laboratory</option>
                  </select>
                </div>

                {/* Hair & Eyes Style & Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hair Style */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300">
                      HAIR STYLE & COLOR
                    </label>
                    <select
                      value={hairStyle}
                      onChange={(e) => setHairStyle(e.target.value as typeof hairStyle)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none"
                    >
                      {HAIR_STYLES.map((h) => (
                        <option key={h.id} value={h.id}>{h.label}</option>
                      ))}
                    </select>

                    <div className="flex items-center space-x-1.5 pt-1">
                      {COLOR_PALETTES.hair.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setHairColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            hairColor === c ? 'border-white scale-110 shadow-md' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Eye Shape */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300">
                      EYE EXPRESSION & IRIS COLOR
                    </label>
                    <select
                      value={eyeShape}
                      onChange={(e) => setEyeShape(e.target.value as typeof eyeShape)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none"
                    >
                      {EYE_SHAPES.map((e) => (
                        <option key={e.id} value={e.id}>{e.label}</option>
                      ))}
                    </select>

                    <div className="flex items-center space-x-1.5 pt-1">
                      {COLOR_PALETTES.eye.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEyeColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            eyeColor === c ? 'border-white scale-110 shadow-md' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clothing & Accessories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300">
                      LAB ATTIRE
                    </label>
                    <select
                      value={clothingStyle}
                      onChange={(e) => setClothingStyle(e.target.value as typeof clothingStyle)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none"
                    >
                      {CLOTHING_STYLES.map((cl) => (
                        <option key={cl.id} value={cl.id}>{cl.label}</option>
                      ))}
                    </select>

                    <div className="flex items-center space-x-1.5 pt-1">
                      {COLOR_PALETTES.clothing.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setClothingColor(c)}
                          style={{ backgroundColor: c }}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            clothingColor === c ? 'border-white scale-110 shadow-md' : 'border-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300">
                      SCIENTIFIC ACCESSORY
                    </label>
                    <select
                      value={accessory}
                      onChange={(e) => setAccessory(e.target.value as typeof accessory)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none"
                    >
                      {ACCESSORIES.map((a) => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Backstory & Narrative Bias */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      RESEARCH SPECIALTY & IN-GAME DIALOGUE PERSPECTIVE
                    </label>
                    <select
                      value={specialtyBackstory}
                      onChange={(e) => setSpecialtyBackstory(e.target.value as typeof specialtyBackstory)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none font-mono"
                    >
                      <option value="structural_biology">Structural Biology (Focus on steric clashes & folding)</option>
                      <option value="computational_tensors">Computational Tensors (Focus on asymptotic scaling & matrices)</option>
                      <option value="quantum_optics">Quantum Optics (Focus on noise floor & interference)</option>
                      <option value="experimental_controls">Experimental Controls (Obsessive skeptic checking negative controls)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      SHORT SCIENTIST BACKSTORY (Influences protagonist's in-game remarks)
                    </label>
                    <textarea
                      rows={3}
                      value={backstoryText}
                      onChange={(e) => setBackstoryText(e.target.value)}
                      placeholder="Write your researcher's motivation, past failed experiments, or scientific philosophy..."
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-purple-400 focus:outline-none leading-relaxed font-sans placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
