import React from 'react';
import { BACKGROUNDS } from '../constants';
import { Background } from '../types';

interface BackgroundSelectorProps {
  onSelect: (background: Background | null) => void;
  onCustomChange: (text: string) => void;
  selectedId: string | null;
  customValue: string;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ onSelect, onCustomChange, selectedId, customValue }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
        <span>2. Arka Plan Seçin</span>
        <span className="text-sm bg-purple-600 px-2 py-0.5 rounded text-white font-normal">Zorunlu</span>
      </h2>

      {/* Custom Input */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2 ml-1">Veya istediğiniz bir mekanı arayın/yazın:</label>
        <div className="relative">
          <input
            type="text"
            value={customValue}
            onChange={(e) => {
              onCustomChange(e.target.value);
              if (e.target.value) onSelect(null); // Deselect preset if typing
            }}
            placeholder="Örn: Mars yüzeyi, karlı bir dağ zirvesi..."
            className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
          />
          <div className="absolute right-3 top-3 text-gray-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => {
              onSelect(bg);
              onCustomChange(''); // Clear custom input
            }}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 h-24
              ${selectedId === bg.id 
                ? 'bg-purple-600/20 border-purple-500 ring-1 ring-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]' 
                : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-500'
              }
            `}
          >
            <div className={`mb-1 ${selectedId === bg.id ? 'text-purple-400' : 'text-gray-400'}`}>
              {bg.icon}
            </div>
            <span className={`text-xs text-center font-medium ${selectedId === bg.id ? 'text-white' : 'text-gray-300'}`}>
              {bg.name}
            </span>
            
            {selectedId === bg.id && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;