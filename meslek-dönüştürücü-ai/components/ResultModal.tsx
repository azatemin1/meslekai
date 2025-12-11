import React from 'react';

interface ResultModalProps {
  originalImage: string | null;
  generatedImage: string | null;
  isOpen: boolean;
  onClose: () => void;
  professionName: string;
}

const ResultModal: React.FC<ResultModalProps> = ({ originalImage, generatedImage, isOpen, onClose, professionName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl max-w-5xl w-full p-6 border border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {professionName} Olarak Siz
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 mb-2 font-medium">Orijinal</p>
            {originalImage && (
              <img 
                src={originalImage} 
                alt="Original" 
                className="rounded-xl border border-gray-700 w-full max-h-[400px] object-cover" 
              />
            )}
          </div>
          
          <div className="flex flex-col items-center">
             <p className="text-blue-400 mb-2 font-medium">Dönüşüm</p>
            {generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="rounded-xl border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] w-full max-h-[400px] object-cover" 
              />
            ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-800 rounded-xl">
                    <span className="text-gray-500">Görüntü yüklenemedi</span>
                </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
            <a 
                href={generatedImage || '#'} 
                download={`meslek-donusturucu-${professionName}.png`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                İndir
            </a>
            <button 
                onClick={onClose}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-semibold transition-colors"
            >
                Kapat
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;