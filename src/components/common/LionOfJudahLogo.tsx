import React from 'react';

interface LionOfJudahLogoProps {
  className?: string;
  idPrefix?: string;
  glow?: boolean;
}

export const LionOfJudahLogo: React.FC<LionOfJudahLogoProps> = ({
  className = 'w-full h-full',
  idPrefix = 'lion-',
  glow = true,
}) => {
  const lionGoldId = `${idPrefix}gold`;
  const maneFireId = `${idPrefix}mane`;

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${glow ? 'drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]' : ''} filter transition-transform select-none`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lion of Judah Emblem"
    >
      <defs>
        <linearGradient id={lionGoldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id={maneFireId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      {/* Radiant Sunburst Crown & Fiery Mane */}
      <path
        d="M 22 28 L 32 38 L 50 20 L 68 38 L 78 28 L 68 46 L 78 58 L 60 56 L 50 78 L 40 56 L 22 58 L 32 46 Z"
        fill={`url(#${maneFireId})`}
        opacity="0.95"
      />

      {/* Crown Jewels of the King */}
      <circle cx="50" cy="18" r="4" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
      <circle cx="30" cy="24" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />
      <circle cx="70" cy="24" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />

      {/* Lion Face Contours */}
      <path
        d="M 34 42 C 34 34 42 30 50 30 C 58 30 66 34 66 42 C 68 54 62 66 50 70 C 38 66 32 54 34 42 Z"
        fill={`url(#${lionGoldId})`}
      />

      {/* Glowing Eyes of Divine Fire */}
      <polygon points="41,43 45,45 42,47" fill="#ffffff" filter="drop-shadow(0 0 3px #fbbf24)" />
      <polygon points="59,43 55,45 58,47" fill="#ffffff" filter="drop-shadow(0 0 3px #fbbf24)" />

      {/* Fierce Roaring Snout & Muzzle */}
      <path d="M 46 51 Q 50 49 54 51 L 52 56 Q 50 58 48 56 Z" fill="#451a03" />

      {/* Powerful Roaring Open Jaw */}
      <path
        d="M 43 58 Q 50 56 57 58 Q 56 68 50 70 Q 44 68 43 58 Z"
        fill="#1f1105"
        stroke="#b45309"
        strokeWidth="1.5"
      />

      {/* Roaring Fangs */}
      <polygon points="45,58 47,58 46,62" fill="#ffffff" />
      <polygon points="53,58 55,58 54,62" fill="#ffffff" />
      <polygon points="48,67 50,65 52,67" fill="#ffffff" />
    </svg>
  );
};
