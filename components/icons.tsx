import React from 'react';

export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639l4.418-5.58a1.012 1.012 0 011.273-.247l.218.082a1.012 1.012 0 001.196 0l.218-.082a1.012 1.012 0 011.273.247l4.418 5.58a1.012 1.012 0 010 .639l-4.418 5.58a1.012 1.012 0 01-1.273.247l-.218-.082a1.012 1.012 0 00-1.196 0l-.218.082a1.012 1.012 0 01-1.273-.247l-4.418-5.58z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const EyeSlashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
  </svg>
);

export const WeighbridgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <style>
        {`
            .truck-body {
                animation: slide-in 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                opacity: 0;
                transform: translateX(-50px);
            }
            .platform {
                animation: rise-up 1s ease-out 0.5s forwards;
                opacity: 0;
                transform-origin: bottom;
                transform: scaleY(0);
            }
            .glow-effect {
                animation: pulse-glow 3s ease-in-out 1.5s infinite;
                color: currentColor;
            }
            @keyframes slide-in {
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes rise-up {
                to {
                    opacity: 1;
                    transform: scaleY(1);
                }
            }
            @keyframes pulse-glow {
                0%, 100% { filter: drop-shadow(0 0 6px currentColor); }
                50% { filter: drop-shadow(0 0 16px currentColor); }
            }
        `}
        </style>
        <g className="glow-effect">
            {/* Platform */}
            <path d="M 5 85 H 95 L 90 95 H 10 Z" fill="currentColor" className="platform" />
            
            {/* Truck */}
            <g className="truck-body">
                {/* Wheels */}
                <circle cx="25" cy="77" r="8" fill="rgba(0,0,0,0.5)" />
                <circle cx="75" cy="77" r="8" fill="rgba(0,0,0,0.5)" />
                <circle cx="25" cy="75" r="8" fill="currentColor" opacity="0.5" />
                <circle cx="75" cy="75" r="8" fill="currentColor" opacity="0.5" />
                
                {/* Body */}
                <path d="M 10 75 V 40 H 50 V 20 H 80 V 75 H 10 Z" fill="currentColor" />
                {/* Window */}
                <path d="M 55 30 H 75 V 40 H 55 Z" fill="rgba(255,255,255,0.3)" />
            </g>
        </g>
    </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.125-2.036-2.125h-4.928c-1.126 0-2.036.945-2.036 2.125v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 00-1.875 1.875v17.25a1.875 1.875 0 001.875 1.875h12.75a1.875 1.875 0 001.875-1.875V11.25a1.875 1.875 0 00-1.875-1.875h-1.5A1.125 1.125 0 0113.5 7.125v-1.5" />
  </svg>
);

export const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);