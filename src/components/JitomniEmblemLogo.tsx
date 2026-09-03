import React, { useState } from 'react';
import emblemImage from '../assets/images/jitomni_emblem_logo_1788255514109.jpg';

interface JitomniEmblemLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showGlow?: boolean;
  className?: string;
  animate?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const JitomniEmblemLogo: React.FC<JitomniEmblemLogoProps> = ({
  size = 'md',
  showGlow = true,
  className = '',
  animate = true,
  interactive = false,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    '2xl': 'w-40 h-40',
    hero: 'w-52 h-52 sm:w-64 sm:h-64',
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses[size]} ${
        interactive ? 'cursor-pointer hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
    >
      {/* Outer Golden Glow Pulse Halo */}
      {showGlow && (
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] opacity-40 blur-lg pointer-events-none ${
            animate ? 'animate-pulse' : ''
          }`}
          style={{ animationDuration: '3.5s' }}
        />
      )}

      {/* SpaceX Mission Patch Outer Gold Border Ring */}
      <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-[#FFD700] via-[#00D4FF] to-[#FFD700] shadow-2xl shadow-black/80 flex items-center justify-center overflow-hidden">
        {/* Pitch Black Sovereign Background */}
        <div className="w-full h-full rounded-full bg-[#000000] relative overflow-hidden flex items-center justify-center">
          {!imageError ? (
            <img
              src={emblemImage}
              alt="Jitomni 360° Careerverse Sovereign Emblem - Golden Eagle & Neon Circuit India"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            /* High-Fidelity SVG Vector Fallback */
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full rounded-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Radial deep background */}
              <circle cx="100" cy="100" r="98" fill="#000000" />
              <circle cx="100" cy="100" r="92" stroke="#FFD700" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
              
              {/* Neon Blue Tech Grid/Circuits */}
              <path d="M 40 100 H 160 M 100 40 V 160 M 60 60 L 140 140 M 140 60 L 60 140" stroke="#00D4FF" strokeWidth="0.8" opacity="0.25" />
              <circle cx="100" cy="100" r="45" stroke="#00D4FF" strokeWidth="1" opacity="0.4" />
              
              {/* Circuit India Outline stylized */}
              <path
                d="M95 55 L108 55 L115 65 L110 75 L125 80 L130 95 L120 105 L118 120 L108 140 L100 155 L92 140 L82 120 L80 105 L70 95 L75 80 L90 75 L85 65 Z"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_8px_#00D4FF]"
              />
              <circle cx="100" cy="105" r="3" fill="#00D4FF" className="animate-ping" />

              {/* Majestic Golden Sovereign Eagle */}
              <g className="drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">
                {/* Wings Left */}
                <path
                  d="M100 90 C70 65 35 70 20 85 C35 95 65 95 90 98 Z"
                  fill="url(#goldGradient)"
                  stroke="#FFF275"
                  strokeWidth="1"
                />
                <path
                  d="M95 98 C75 85 45 92 30 105 C50 110 75 105 92 104 Z"
                  fill="url(#goldGradient)"
                  stroke="#FFD700"
                  strokeWidth="0.8"
                />

                {/* Wings Right */}
                <path
                  d="M100 90 C130 65 165 70 180 85 C165 95 135 95 110 98 Z"
                  fill="url(#goldGradient)"
                  stroke="#FFF275"
                  strokeWidth="1"
                />
                <path
                  d="M105 98 C125 85 155 92 170 105 C150 110 125 105 108 104 Z"
                  fill="url(#goldGradient)"
                  stroke="#FFD700"
                  strokeWidth="0.8"
                />

                {/* Eagle Head & Crown */}
                <path
                  d="M96 68 L100 60 L104 68 L108 65 L106 74 L100 78 L94 74 L92 65 Z"
                  fill="#FFD700"
                />
                <polygon points="100,74 96,78 104,78" fill="#FFFFFF" />
                <polygon points="100,78 97,84 103,84" fill="#FFA500" />
              </g>

              {/* Mission Patch Outer Ring Text Arch */}
              <path id="textPathTop" d="M 25,100 A 75,75 0 1,1 175,100" fill="none" />
              <path id="textPathBottom" d="M 175,100 A 75,75 0 0,1 25,100" fill="none" />

              <text fill="#FFD700" fontSize="8.5" fontWeight="900" letterSpacing="2" className="tracking-widest">
                <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
                  ★ JITOMNI 360° CAREERVERSE ★
                </textPath>
              </text>
              <text fill="#00D4FF" fontSize="7.5" fontWeight="800" letterSpacing="1.5">
                <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
                  • BUILDINDIA • SOVEREIGN IDENTITY •
                </textPath>
              </text>

              {/* Gradients */}
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#C59B27" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
