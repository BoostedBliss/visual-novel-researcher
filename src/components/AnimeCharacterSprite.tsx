import React from 'react';
import { motion } from 'motion/react';
import { Character, CharacterExpression, CustomPlayerCharacter } from '../types';

interface CharacterSpriteProps {
  character: Character;
  expression: CharacterExpression;
  isSpeaking: boolean;
  customPlayer?: CustomPlayerCharacter;
}

export const AnimeCharacterSprite: React.FC<CharacterSpriteProps> = ({
  character,
  expression,
  isSpeaking,
  customPlayer,
}) => {
  const isPlayer = character.id === 'player';

  // Eye shapes based on expression or custom player setting
  const renderEyes = () => {
    const eyeColor = isPlayer && customPlayer ? customPlayer.eyeColor : character.primaryColor;

    switch (expression) {
      case 'puzzled':
        return (
          <g>
            {/* Left eye quizzical */}
            <ellipse cx="78" cy="98" rx="8" ry="11" fill="#1e293b" />
            <circle cx="80" cy="95" r="3.5" fill="#ffffff" />
            <circle cx="76" cy="102" r="1.5" fill="#ffffff" />
            <path d="M 70 82 Q 78 77 86 86" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Right eye squinting */}
            <path d="M 114 97 Q 122 93 130 98" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 113 86 Q 121 82 129 88" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );
      case 'eureka':
        return (
          <g>
            {/* Sparkling star-eyes */}
            <ellipse cx="78" cy="96" rx="9" ry="13" fill="#1e293b" />
            <circle cx="78" cy="94" r="5" fill={character.accentColor} />
            <circle cx="76" cy="92" r="3" fill="#ffffff" />
            <path d="M 68 80 Q 78 74 88 80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <ellipse cx="122" cy="96" rx="9" ry="13" fill="#1e293b" />
            <circle cx="122" cy="94" r="5" fill={character.accentColor} />
            <circle cx="120" cy="92" r="3" fill="#ffffff" />
            <path d="M 112 80 Q 122 74 132 80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );
      case 'excited':
        return (
          <g>
            {/* Wide sparkling anime eyes */}
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
        );
      case 'serious':
        return (
          <g>
            {/* Sharp, focused eyes */}
            <path d="M 68 96 L 87 93 L 85 101 L 70 102 Z" fill="#1e293b" />
            <circle cx="78" cy="97" r="3" fill={eyeColor} />
            <circle cx="80" cy="95" r="1.5" fill="#ffffff" />
            <path d="M 66 87 L 88 83" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            <path d="M 113 93 L 132 96 L 130 102 L 115 101 Z" fill="#1e293b" />
            <circle cx="122" cy="97" r="3" fill={eyeColor} />
            <circle cx="120" cy="95" r="1.5" fill="#ffffff" />
            <path d="M 112 83 L 134 87" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      default: // neutral
        return (
          <g>
            <ellipse cx="78" cy="97" rx="8" ry="11" fill="#1e293b" />
            <ellipse cx="78" cy="99" rx="6" ry="8" fill={eyeColor} />
            <circle cx="80" cy="95" r="3" fill="#ffffff" />
            <circle cx="76" cy="101" r="1.5" fill="#ffffff" />
            <path d="M 70 84 Q 78 81 86 85" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

            <ellipse cx="122" cy="97" rx="8" ry="11" fill="#1e293b" />
            <ellipse cx="122" cy="99" rx="6" ry="8" fill={eyeColor} />
            <circle cx="124" cy="95" r="3" fill="#ffffff" />
            <circle cx="120" cy="101" r="1.5" fill="#ffffff" />
            <path d="M 114 85 Q 122 81 130 84" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );
    }
  };

  // Mouth rendering with speaking animation
  const renderMouth = () => {
    if (isSpeaking) {
      return (
        <motion.path
          animate={{
            d: [
              'M 94 122 Q 100 128 106 122 Z',
              'M 92 121 Q 100 133 108 121 Z',
              'M 95 123 Q 100 125 105 123 Z',
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.28 }}
          fill="#be123c"
          stroke="#881337"
          strokeWidth="1.5"
        />
      );
    }

    switch (expression) {
      case 'excited':
      case 'eureka':
        return <path d="M 93 121 Q 100 132 107 121 Z" fill="#e11d48" stroke="#881337" strokeWidth="1.5" />;
      case 'puzzled':
        return <path d="M 94 124 Q 100 121 106 123" stroke="#881337" strokeWidth="2" strokeLinecap="round" fill="none" />;
      case 'serious':
        return <path d="M 94 124 L 106 124" stroke="#881337" strokeWidth="2" strokeLinecap="round" />;
      default:
        return <path d="M 95 122 Q 100 126 105 122" stroke="#881337" strokeWidth="2" strokeLinecap="round" fill="none" />;
    }
  };

  // Hair style based on avatarVariant or custom player
  const renderHairAndOutfit = () => {
    if (isPlayer && customPlayer) {
      return (
        <g>
          {/* Custom Player Hair */}
          <path d="M 48 95 C 42 45 70 28 100 28 C 130 28 158 45 152 95 C 145 68 132 52 100 52 C 68 52 55 68 48 95 Z" fill={customPlayer.hairColor} />
          <path d="M 52 82 L 68 88 L 76 72 L 92 90 L 108 72 L 116 88 L 132 82 L 146 76 C 136 48 122 36 100 36 C 78 36 64 48 52 82 Z" fill={customPlayer.hairColor} filter="brightness(1.2)" />
          {customPlayer.hairStyle === 'twin_tails' && (
            <>
              <path d="M 40 85 Q 20 130 35 160 Q 42 130 46 95 Z" fill={customPlayer.hairColor} />
              <path d="M 160 85 Q 180 130 165 160 Q 158 130 154 95 Z" fill={customPlayer.hairColor} />
            </>
          )}

          {/* Accessories */}
          {customPlayer.accessory === 'glasses' && (
            <g>
              <rect x="67" y="88" width="22" height="17" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
              <rect x="111" y="88" width="22" height="17" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
              <line x1="89" y1="96" x2="111" y2="96" stroke="#cbd5e1" strokeWidth="2.5" />
            </g>
          )}
          {customPlayer.accessory === 'forehead_goggles' && (
            <g>
              <rect x="65" y="48" width="70" height="14" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="2" />
              <circle cx="80" cy="55" r="4" fill="#34d399" />
              <circle cx="120" cy="55" r="4" fill="#34d399" />
            </g>
          )}
          {customPlayer.accessory === 'cyber_earpiece' && (
            <circle cx="48" cy="100" r="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
          )}

          {/* Custom Clothing */}
          <path d="M 60 155 L 100 175 L 140 155 L 158 240 L 42 240 Z" fill={customPlayer.clothingColor} stroke="#64748b" strokeWidth="1.5" />
          <path d="M 85 155 L 100 178 L 115 155 L 100 145 Z" fill="#38bdf8" />
        </g>
      );
    }

    switch (character.avatarVariant) {
      case 'mentor':
        return (
          <g>
            {/* Graying/distinguished stylized hair */}
            <path d="M 52 90 C 48 50 72 32 100 32 C 128 32 152 50 148 90 C 142 80 138 60 100 60 C 62 60 58 80 52 90 Z" fill="#475569" />
            <path d="M 56 65 L 75 75 L 85 62 L 100 78 L 115 62 L 125 75 L 144 65 C 135 45 120 38 100 38 C 80 38 65 45 56 65 Z" fill="#64748b" />
            {/* Glasses */}
            <rect x="67" y="88" width="22" height="17" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
            <rect x="111" y="88" width="22" height="17" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
            <line x1="89" y1="96" x2="111" y2="96" stroke="#cbd5e1" strokeWidth="2.5" />
            {/* Lab Coat / Formal Collar */}
            <path d="M 65 155 L 100 178 L 135 155 L 155 240 L 45 240 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 88 165 L 100 185 L 112 165 L 100 152 Z" fill={character.primaryColor} />
          </g>
        );
      case 'engineer':
        return (
          <g>
            {/* Spiky energetic hair */}
            <path d="M 50 95 C 40 40 75 25 100 25 C 125 25 160 40 150 95 C 158 75 162 48 145 35 C 130 20 115 20 100 20 C 85 20 70 20 55 35 C 38 48 42 75 50 95 Z" fill="#047857" />
            <path d="M 60 70 L 78 80 L 85 65 L 100 82 L 115 65 L 122 80 L 140 70 Z" fill="#10b981" />
            {/* Tech Visor / Goggles on forehead */}
            <rect x="65" y="48" width="70" height="14" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="2" />
            <circle cx="80" cy="55" r="4" fill="#34d399" />
            <circle cx="120" cy="55" r="4" fill="#34d399" />
            {/* Engineer Lab Vest */}
            <path d="M 60 155 L 100 175 L 140 155 L 160 240 L 40 240 Z" fill="#064e3b" />
            <path d="M 80 155 L 100 180 L 120 155 L 100 190 Z" fill="#fbbf24" />
          </g>
        );
      case 'companion':
        return (
          <g>
            {/* Hologram / AI Android aesthetic */}
            <path d="M 55 90 C 50 45 75 30 100 30 C 125 30 150 45 145 90 C 140 65 125 50 100 50 C 75 50 60 65 55 90 Z" fill="#b45309" />
            {/* Halo / Audio Interface Earphones */}
            <circle cx="50" cy="102" r="10" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
            <circle cx="150" cy="102" r="10" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
            {/* Cyber Neckband */}
            <rect x="80" y="142" width="40" height="10" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Cyber Robe */}
            <path d="M 60 155 L 100 175 L 140 155 L 155 240 L 45 240 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
          </g>
        );
      default: // prodigy / lead
        return (
          <g>
            {/* Flowing anime prodigy hair */}
            <path d="M 48 95 C 42 45 70 28 100 28 C 130 28 158 45 152 95 C 145 68 132 52 100 52 C 68 52 55 68 48 95 Z" fill="#1e3a8a" />
            <path d="M 52 82 L 68 88 L 76 72 L 92 90 L 108 72 L 116 88 L 132 82 L 146 76 C 136 48 122 36 100 36 C 78 36 64 48 52 82 Z" fill="#3b82f6" />
            {/* Soft Side Strands */}
            <path d="M 48 90 Q 44 125 54 135 Q 52 110 56 95 Z" fill="#2563eb" />
            <path d="M 152 90 Q 156 125 146 135 Q 148 110 144 95 Z" fill="#2563eb" />
            {/* Clean Modern Lab Coat */}
            <path d="M 60 155 L 100 175 L 140 155 L 158 240 L 42 240 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 85 155 L 100 178 L 115 155 L 100 145 Z" fill="#0284c7" />
          </g>
        );
    }
  };

  return (
    <div className="relative w-72 md:w-96 h-80 md:h-96 flex items-end justify-center select-none pointer-events-none">
      {/* Anime Expression Indicators (Floating sparks / sweatdrop / bulb) */}
      {expression === 'eureka' && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 10 }}
          animate={{ scale: [1, 1.2, 1], opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute -top-4 right-12 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/90 text-amber-950 font-black shadow-lg shadow-amber-400/50 border-2 border-white text-lg"
        >
          💡
        </motion.div>
      )}

      {expression === 'puzzled' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute -top-2 right-14 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/90 text-white font-black shadow-md border-2 border-white text-lg"
        >
          ❓
        </motion.div>
      )}

      {expression === 'excited' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="absolute -top-3 right-10 z-20 text-2xl"
        >
          ✨
        </motion.div>
      )}

      {expression === 'serious' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex space-x-1"
        >
          <div className="w-0.5 h-6 bg-slate-900/60 rotate-12" />
          <div className="w-0.5 h-6 bg-slate-900/60 rotate-12" />
          <div className="w-0.5 h-6 bg-slate-900/60 rotate-12" />
        </motion.div>
      )}

      {/* SVG Anime Character Canvas */}
      <motion.svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        animate={{
          y: isSpeaking ? [0, -3, 0] : [0, 1.5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 0.35 : 3.2,
          ease: 'easeInOut',
        }}
      >
        {/* Soft Persona Glow Aura */}
        <circle
          cx="100"
          cy="120"
          r="80"
          fill={character.primaryColor}
          fillOpacity="0.12"
          className="blur-xl"
        />

        {/* Neck */}
        <path d="M 90 135 L 90 160 L 110 160 L 110 135 Z" fill="#ffedd5" />

        {/* Face Base */}
        <path
          d="M 58 85 C 58 125 75 145 100 145 C 125 145 142 125 142 85 C 142 55 125 45 100 45 C 75 45 58 55 58 85 Z"
          fill="#fff7ed"
          stroke="#fed7aa"
          strokeWidth="1.5"
        />

        {/* Cheeks Blush on excitement or eureka */}
        {(expression === 'excited' || expression === 'eureka') && (
          <g>
            <ellipse cx="68" cy="112" rx="7" ry="4" fill="#fda4af" fillOpacity="0.6" />
            <ellipse cx="132" cy="112" rx="7" ry="4" fill="#fda4af" fillOpacity="0.6" />
          </g>
        )}

        {/* Eyes */}
        {renderEyes()}

        {/* Nose */}
        <circle cx="100" cy="110" r="1.5" fill="#f97316" fillOpacity="0.6" />

        {/* Mouth */}
        {renderMouth()}

        {/* Hair and Attire */}
        {renderHairAndOutfit()}
      </motion.svg>
    </div>
  );
};
