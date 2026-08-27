import React from 'react';

interface SuperFriedLogoProps {
  className?: string;
  size?: number | string;
  withBadge?: boolean;
}

export const SuperFriedLogo: React.FC<SuperFriedLogoProps> = ({
  className = '',
  size = 48,
  withBadge = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        <defs>
          <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- Background / Subtle Halo if requested --- */}
        {withBadge && (
          <circle cx="250" cy="250" r="235" fill="#FFFFFF" stroke="#F0ECE4" strokeWidth="6" />
        )}

        <g id="super-fried-emblem">
          {/* ================= 1. FRENCH FRIES (Top Cluster) ================= */}
          
          {/* Far Left Fry */}
          <path
            d="M125 105 L165 145 L150 250 L115 155 Z"
            fill="#FBBF24"
            stroke="#18181B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M125 105 L155 125 L165 145 L135 120 Z"
            fill="#FDE68A"
            stroke="#18181B"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Left-Middle Fry */}
          <path
            d="M195 100 L230 115 L215 240 L180 230 Z"
            fill="#F59E0B"
            stroke="#18181B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M180 140 L210 120 L230 115 L195 100 L180 140 Z"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          {/* Side Facet */}
          <path
            d="M180 140 L210 120 L195 245 L180 230 Z"
            fill="#D97706"
            stroke="#18181B"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Center Tall Fry */}
          <path
            d="M245 110 L285 130 L270 230 L235 225 Z"
            fill="#FBBF24"
            stroke="#18181B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M245 110 L270 120 L285 130 L260 115 Z"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* Front Center Square Fry */}
          <path
            d="M225 160 L248 152 L250 205 L225 210 Z"
            fill="#FDE047"
            stroke="#18181B"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M225 160 L238 145 L248 152 Z"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* Right Tall Fry */}
          <path
            d="M290 108 L325 155 L300 230 L275 220 Z"
            fill="#F59E0B"
            stroke="#18181B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M290 108 L310 130 L325 155 L305 140 Z"
            fill="#FEF08A"
            stroke="#18181B"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Far Right Fries */}
          <path
            d="M320 150 L345 165 L325 220 L305 215 Z"
            fill="#FBBF24"
            stroke="#18181B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M320 150 L335 158 L345 165 L330 155 Z"
            fill="#FEF9C3"
            stroke="#18181B"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path
            d="M342 165 L360 215 L335 225 L325 180 Z"
            fill="#F59E0B"
            stroke="#18181B"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Front Yellow Fill Base for fries */}
          <path
            d="M152 188 L170 248 L185 245 L165 180 Z"
            fill="#EAB308"
            stroke="#18181B"
            strokeWidth="6"
          />

          {/* ================= 2. ORANGE FRY BOX ================= */}
          
          {/* Left Box Side Wing / Flap */}
          <path
            d="M150 245 L175 240 L188 300 L160 290 Z"
            fill="#EA580C"
            stroke="#18181B"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* Main Orange Container Front */}
          <path
            d="M172 235 L362 178 L330 425 L190 425 Z"
            fill="#F97316"
            stroke="#18181B"
            strokeWidth="9"
            strokeLinejoin="round"
          />

          {/* Subtle Box Shading Edge */}
          <path
            d="M330 425 L190 425 L186 395 L334 395 Z"
            fill="#EA580C"
            opacity="0.25"
          />

          {/* ================= 3. "SUPER FRIED" LOGO TEXT ================= */}
          {/* We render high-contrast, bold outlined typographic paths for maximum crispness */}
          
          {/* "SUPER" Line */}
          <g id="text-super">
            {/* S */}
            <path
              d="M 198 252 C 190 252 178 245 178 232 C 178 218 190 212 205 208 C 218 205 226 200 226 193 C 226 186 218 182 208 182 C 196 182 188 188 186 198 L 172 196 C 175 180 188 170 208 170 C 226 170 240 180 240 195 C 240 210 228 216 214 220 C 200 224 192 228 192 235 C 192 242 200 245 210 245 C 224 245 232 238 234 228 L 248 230 C 245 246 230 258 208 258 Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="6"
              strokeLinejoin="round"
              transform="translate(8, 28) scale(0.92)"
            />
          </g>

          {/* Authentic stylized text overlay inside the orange box matching the logo font */}
          <text
            x="264"
            y="298"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="68"
            letterSpacing="-0.03em"
            fill="#FFFFFF"
            stroke="#18181B"
            strokeWidth="10"
            paintOrder="stroke fill"
            style={{ fontStretch: 'condensed' }}
          >
            Super
          </text>

          <text
            x="260"
            y="385"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="78"
            letterSpacing="-0.03em"
            fill="#FFFFFF"
            stroke="#18181B"
            strokeWidth="11"
            paintOrder="stroke fill"
            style={{ fontStretch: 'condensed' }}
          >
            Fried
          </text>
        </g>
      </svg>
    </div>
  );
};
