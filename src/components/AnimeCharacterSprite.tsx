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
    const baseEyeFill = "url(#eyeGradient)";

    const blinkAnimation: any = {
      scaleY: [1, 1, 1, 0.1, 1, 1, 1, 1, 1, 1],
      transition: { repeat: Infinity, duration: 4, times: [0, 0.45, 0.48, 0.5, 0.52, 0.55, 1, 1, 1, 1], ease: "easeInOut" }
    };

    switch (expression) {
      case 'puzzled':
        return (
          <motion.g animate={blinkAnimation} style={{ transformOrigin: "50% 97px" }}>
            {/* Left eye quizzical */}
            <ellipse cx="78" cy="98" rx="8" ry="11" fill={baseEyeFill} />
            <circle cx="80" cy="95" r="3.5" fill="#ffffff" />
            <circle cx="76" cy="102" r="1.5" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 68 89 Q 78 86 88 89" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 66 92 L 68 89" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 70 82 Q 78 77 86 86" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Right eye squinting */}
            <path d="M 114 97 Q 122 93 130 98" stroke={baseEyeFill} strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Eyelashes */}
            <path d="M 112 89 Q 122 86 132 89" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 134 92 L 132 89" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 113 86 Q 121 82 129 88" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </motion.g>
        );
      case 'eureka':
        return (
          <motion.g animate={blinkAnimation} style={{ transformOrigin: "50% 96px" }}>
            {/* Sparkling star-eyes */}
            <ellipse cx="78" cy="96" rx="9" ry="13" fill={baseEyeFill} />
            <circle cx="78" cy="94" r="5" fill={character.accentColor} />
            <circle cx="76" cy="92" r="3" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 67 86 Q 78 82 89 86" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 68 80 Q 78 74 88 80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <ellipse cx="122" cy="96" rx="9" ry="13" fill={baseEyeFill} />
            <circle cx="122" cy="94" r="5" fill={character.accentColor} />
            <circle cx="120" cy="92" r="3" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 111 86 Q 122 82 133 86" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 112 80 Q 122 74 132 80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </motion.g>
        );
      case 'excited':
        return (
          <motion.g animate={blinkAnimation} style={{ transformOrigin: "50% 96px" }}>
            {/* Wide sparkling anime eyes */}
            <ellipse cx="78" cy="96" rx="9" ry="12" fill={baseEyeFill} />
            <ellipse cx="78" cy="98" rx="7" ry="9" fill={eyeColor} />
            <circle cx="80" cy="93" r="3.5" fill="#ffffff" />
            <circle cx="75" cy="100" r="2" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 67 87 Q 78 83 89 87" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 69 82 Q 78 77 87 81" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            <ellipse cx="122" cy="96" rx="9" ry="12" fill={baseEyeFill} />
            <ellipse cx="122" cy="98" rx="7" ry="9" fill={eyeColor} />
            <circle cx="124" cy="93" r="3.5" fill="#ffffff" />
            <circle cx="119" cy="100" r="2" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 111 87 Q 122 83 133 87" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 113 81 Q 122 77 131 82" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </motion.g>
        );
      case 'serious':
        return (
          <motion.g animate={blinkAnimation} style={{ transformOrigin: "50% 97px" }}>
            {/* Sharp, focused eyes */}
            <path d="M 68 96 L 87 93 L 85 101 L 70 102 Z" fill={baseEyeFill} />
            <circle cx="78" cy="97" r="3" fill={eyeColor} />
            <circle cx="80" cy="95" r="1.5" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 68 96 L 87 93" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <path d="M 66 87 L 88 83" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            <path d="M 113 93 L 132 96 L 130 102 L 115 101 Z" fill={baseEyeFill} />
            <circle cx="122" cy="97" r="3" fill={eyeColor} />
            <circle cx="120" cy="95" r="1.5" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 113 93 L 132 96" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <path d="M 112 83 L 134 87" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        );
      default: // neutral
        return (
          <motion.g animate={blinkAnimation} style={{ transformOrigin: "50% 97px" }}>
            <ellipse cx="78" cy="97" rx="8" ry="11" fill={baseEyeFill} />
            <ellipse cx="78" cy="99" rx="6" ry="8" fill={eyeColor} />
            <circle cx="80" cy="95" r="3" fill="#ffffff" />
            <circle cx="76" cy="101" r="1.5" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 68 89 Q 78 85 88 89" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 66 91 L 68 89" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 70 84 Q 78 81 86 85" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

            <ellipse cx="122" cy="97" rx="8" ry="11" fill={baseEyeFill} />
            <ellipse cx="122" cy="99" rx="6" ry="8" fill={eyeColor} />
            <circle cx="124" cy="95" r="3" fill="#ffffff" />
            <circle cx="120" cy="101" r="1.5" fill="#ffffff" />
            {/* Eyelashes */}
            <path d="M 112 89 Q 122 85 132 89" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 134 91 L 132 89" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 114 85 Q 122 81 130 84" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />
          </motion.g>
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
    const hairSway: any = {
      rotate: [-1, 2, -1],
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
    };

    if (isPlayer && customPlayer) {
      return (
        <g>
          {/* Custom Player Hair */}
          <motion.g animate={hairSway} style={{ transformOrigin: "100px 30px" }}>
            <path d="M 48 95 C 42 45 70 28 100 28 C 130 28 158 45 152 95 C 145 68 132 52 100 52 C 68 52 55 68 48 95 Z" fill="url(#playerHairGradient)" />
            <path d="M 52 82 L 68 88 L 76 72 L 92 90 L 108 72 L 116 88 L 132 82 L 146 76 C 136 48 122 36 100 36 C 78 36 64 48 52 82 Z" fill="url(#playerHairGradient)" filter="brightness(1.2)" />
            {customPlayer.hairStyle === 'twin_tails' && (
              <>
                <motion.path animate={{ rotate: [-2, 3, -2] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} style={{ transformOrigin: "40px 85px" }} d="M 40 85 Q 20 130 35 160 Q 42 130 46 95 Z" fill="url(#playerHairGradient)" />
                <motion.path animate={{ rotate: [2, -3, 2] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} style={{ transformOrigin: "160px 85px" }} d="M 160 85 Q 180 130 165 160 Q 158 130 154 95 Z" fill="url(#playerHairGradient)" />
              </>
            )}
          </motion.g>

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
          <path d="M 85 155 L 100 178 L 115 155 L 100 145 Z" fill="url(#playerClothingGradient)" />
        </g>
      );
    }

    switch (character.avatarVariant) {
      case 'mentor':
        return (
          <g>
            {/* Graying/distinguished stylized hair */}
            <motion.g animate={hairSway} style={{ transformOrigin: "100px 32px" }}>
              <path d="M 52 90 C 48 50 72 32 100 32 C 128 32 152 50 148 90 C 142 80 138 60 100 60 C 62 60 58 80 52 90 Z" fill="url(#mentorHairGradient)" />
              <path d="M 56 65 L 75 75 L 85 62 L 100 78 L 115 62 L 125 75 L 144 65 C 135 45 120 38 100 38 C 80 38 65 45 56 65 Z" fill="url(#mentorHairHighlight)" />
            </motion.g>
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
            <motion.g animate={hairSway} style={{ transformOrigin: "100px 25px" }}>
              <path d="M 50 95 C 40 40 75 25 100 25 C 125 25 160 40 150 95 C 158 75 162 48 145 35 C 130 20 115 20 100 20 C 85 20 70 20 55 35 C 38 48 42 75 50 95 Z" fill="url(#engineerHairGradient)" />
              <path d="M 60 70 L 78 80 L 85 65 L 100 82 L 115 65 L 122 80 L 140 70 Z" fill="url(#engineerHairHighlight)" />
            </motion.g>
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
            <motion.g animate={hairSway} style={{ transformOrigin: "100px 30px" }}>
              <path d="M 55 90 C 50 45 75 30 100 30 C 125 30 150 45 145 90 C 140 65 125 50 100 50 C 75 50 60 65 55 90 Z" fill="url(#companionHairGradient)" />
            </motion.g>
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
            <motion.g animate={hairSway} style={{ transformOrigin: "100px 28px" }}>
              <path d="M 48 95 C 42 45 70 28 100 28 C 130 28 158 45 152 95 C 145 68 132 52 100 52 C 68 52 55 68 48 95 Z" fill="url(#prodigyHairGradient)" />
              <path d="M 52 82 L 68 88 L 76 72 L 92 90 L 108 72 L 116 88 L 132 82 L 146 76 C 136 48 122 36 100 36 C 78 36 64 48 52 82 Z" fill="url(#prodigyHairHighlight)" />
              {/* Soft Side Strands */}
              <motion.path animate={{ rotate: [-2, 3, -2] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }} style={{ transformOrigin: "48px 90px" }} d="M 48 90 Q 44 125 54 135 Q 52 110 56 95 Z" fill="url(#prodigyHairHighlight)" />
              <motion.path animate={{ rotate: [2, -3, 2] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.5 }} style={{ transformOrigin: "152px 90px" }} d="M 152 90 Q 156 125 146 135 Q 148 110 144 95 Z" fill="url(#prodigyHairHighlight)" />
            </motion.g>
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
          y: isSpeaking ? [0, -4, 0] : [0, 2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 0.4 : 3.5,
          ease: 'easeInOut',
        }}
      >
        <defs>
          <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#ffedd5" />
          </radialGradient>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Hair Gradients */}
          {isPlayer && customPlayer && (
            <>
              <linearGradient id="playerHairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={customPlayer.hairColor} />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="playerClothingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </>
          )}
          <linearGradient id="prodigyHairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="prodigyHairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="mentorHairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="mentorHairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="engineerHairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="engineerHairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="companionHairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft Persona Glow Aura */}
        <circle
          cx="100"
          cy="120"
          r="80"
          fill={character.primaryColor}
          fillOpacity="0.15"
          className="blur-xl"
        />

        {/* Neck */}
        <path d="M 90 135 L 90 160 L 110 160 L 110 135 Z" fill="#fed7aa" />

        {/* Face Base */}
        <path
          d="M 58 85 C 58 125 75 145 100 145 C 125 145 142 125 142 85 C 142 55 125 45 100 45 C 75 45 58 55 58 85 Z"
          fill="url(#faceGradient)"
          stroke="#fdba74"
          strokeWidth="1.5"
        />

        {/* Cheeks Blush on all expressions (subtle by default, stronger on excited/eureka) */}
        <g>
          <ellipse cx="68" cy="112" rx="8" ry="5" fill="url(#blushGradient)" fillOpacity={expression === 'excited' || expression === 'eureka' ? "0.9" : "0.3"} />
          <ellipse cx="132" cy="112" rx="8" ry="5" fill="url(#blushGradient)" fillOpacity={expression === 'excited' || expression === 'eureka' ? "0.9" : "0.3"} />
        </g>

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
