import React from 'react';
import { PROFESSIONS } from '../constants';
import { Profession } from '../types';

interface ProfessionGridProps {
  onSelect: (profession: Profession | null) => void;
  onCustomChange: (text: string) => void;
  selectedId: string | null;
  customValue: string;
}

const ProfessionGrid: React.FC<ProfessionGridProps> = ({ onSelect, onCustomChange, selectedId, customValue }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
        <span>1. Meslek Seçin</span>
        <span className="text-sm bg-blue-600 px-2 py-0.5 rounded text-white font-normal">Zorunlu</span>
      </h2>
      
      {/* Custom Input */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2 ml-1">Veya istediğiniz bir mesleği yazın:</label>
        <div className="relative">
          <input
            type="text"
            value={customValue}
            onChange={(e) => {
              onCustomChange(e.target.value);
              if (e.target.value) onSelect(null); // Deselect preset if typing
            }}
            placeholder="Örn: Uzaylı bir rock yıldızı..."
            className="w-full bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          {customValue && (
            <div className="absolute right-3 top-3 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {PROFESSIONS.map((prof) => (
          <button
            key={prof.id}
            onClick={() => {
              onSelect(prof);
              onCustomChange(''); // Clear custom input if preset selected
            }}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 h-28
              ${selectedId === prof.id 
                ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-500'
              }
            `}
          >
            <div className={`mb-2 ${selectedId === prof.id ? 'text-blue-400' : 'text-gray-400'}`}>
              {prof.icon}
            </div>
            <span className={`text-sm text-center font-medium ${selectedId === prof.id ? 'text-white' : 'text-gray-300'}`}>
              {prof.name}
            </span>
            
            {selectedId === prof.id && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfessionGrid;