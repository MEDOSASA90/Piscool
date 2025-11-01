import React from 'react';

interface GridOverlayProps {
  isVisible: boolean;
  spacing?: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ isVisible, spacing = 10 }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <defs>
            <pattern id="smallGrid" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
                <path d={`M ${spacing} 0 L 0 0 0 ${spacing}`} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width={spacing * 5} height={spacing * 5} patternUnits="userSpaceOnUse">
                <rect width={spacing * 5} height={spacing * 5} fill="url(#smallGrid)"/>
                <path d={`M ${spacing * 5} 0 L 0 0 0 ${spacing * 5}`} fill="none" stroke="rgba(0,0,255,0.2)" strokeWidth="1"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default GridOverlay;
