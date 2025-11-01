import React from 'react';
import { WeighbridgeIcon } from './icons';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  const appName = "GMEZZ";

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col justify-center items-center overflow-hidden">
      <div className="splash-bg"></div>
      
      <div className="relative flex flex-col items-center gap-8 z-10">
        <WeighbridgeIcon 
          className="h-32 w-32 text-sky-400"
        />
        <h1 className="text-5xl font-bold text-slate-100 tracking-[0.4em]" dir="ltr">
          {appName.split('').map((char, index) => (
            <span key={index} className="letter-reveal-container">
              <span
                className="animate-letter-reveal"
                style={{ animationDelay: `${1.5 + index * 0.08}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;