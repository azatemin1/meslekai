import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ProfessionGrid from './components/ProfessionGrid';
import BackgroundSelector from './components/BackgroundSelector';
import ResultModal from './components/ResultModal';
import { transformImage } from './services/geminiService';
import { Profession, Background, AppState } from './types';

function App() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  
  // Profession State
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [customProfession, setCustomProfession] = useState<string>('');

  // Background State
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);
  const [customBackground, setCustomBackground] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageSelect = (base64: string) => {
    setCurrentImage(base64);
    setAppState(AppState.IDLE);
    setGeneratedImage(null);
    setErrorMsg(null);
  };

  const handleTransform = async () => {
    if (!currentImage) {
      setErrorMsg("Lütfen önce bir fotoğraf yükleyin.");
      return;
    }

    const finalProfession = customProfession || selectedProfession?.promptName;
    const finalBackground = customBackground || selectedBackground?.promptName;

    if (!finalProfession) {
        setErrorMsg("Lütfen bir meslek seçin veya yazın.");
        return;
    }

    if (!finalBackground) {
        setErrorMsg("Lütfen bir arka plan seçin veya yazın.");
        return;
    }

    setAppState(AppState.LOADING);
    setErrorMsg(null);

    // Display string for the loading screen
    const professionDisplay = customProfession || selectedProfession?.name;

    try {
      const result = await transformImage(currentImage, finalProfession, finalBackground);
      setGeneratedImage(result);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setAppState(AppState.ERROR);
      setErrorMsg("İşlem başarısız oldu. Lütfen tekrar deneyin.");
    }
  };

  const closeModal = () => {
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col font-sans">
      {/* Header */}
      <header className="p-8 text-center bg-gray-900/50 backdrop-blur-md sticky top-0 z-30 border-b border-gray-800">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
          Meslek Dönüştürücü AI
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Kendinizi istediğiniz meslekte, istediğiniz yerde hayal edin.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center gap-8 pb-32">
        
        {/* Step 0: Upload */}
        <section className="w-full flex flex-col items-center animate-fade-in-up">
          <ImageUploader onImageSelected={handleImageSelect} />
        </section>

        {currentImage && (
          <>
            {/* Step 1: Select Profession */}
            <section className="w-full animate-fade-in-up delay-100">
               <ProfessionGrid 
                  onSelect={setSelectedProfession} 
                  onCustomChange={setCustomProfession}
                  selectedId={selectedProfession?.id || null}
                  customValue={customProfession}
               />
            </section>

            {/* Step 2: Select Background */}
            <section className="w-full animate-fade-in-up delay-200">
               <BackgroundSelector
                  onSelect={setSelectedBackground}
                  onCustomChange={setCustomBackground}
                  selectedId={selectedBackground?.id || null}
                  customValue={customBackground}
               />
            </section>

             {/* Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-900/90 backdrop-blur-lg border-t border-gray-700 flex justify-center z-40 animate-slide-up">
                <button
                    onClick={handleTransform}
                    disabled={appState === AppState.LOADING}
                    className={`
                        px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3
                        ${appState === AppState.LOADING 
                            ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white ring-2 ring-purple-500/50'
                        }
                    `}
                >
                    {appState === AppState.LOADING ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            İşleniyor...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            Fotoğrafı Dönüştür
                        </>
                    )}
                </button>
            </div>
          </>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500 text-red-200 px-6 py-3 rounded-lg mt-4 animate-shake">
            {errorMsg}
          </div>
        )}

        {/* Loading Overlay */}
        {appState === AppState.LOADING && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-t-4 border-purple-500 border-solid rounded-full animate-spin reverse"></div>
            </div>
            <p className="text-2xl font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 text-center px-4">
              Yapay Zeka Seni Dönüştürüyor...
            </p>
            <div className="mt-4 text-gray-400 text-sm flex flex-col items-center gap-1">
                <span>Meslek: {customProfession || selectedProfession?.name}</span>
                <span>Konum: {customBackground || selectedBackground?.name}</span>
            </div>
          </div>
        )}
      </main>

      {/* Result Modal */}
      <ResultModal 
        isOpen={appState === AppState.SUCCESS}
        onClose={closeModal}
        originalImage={currentImage}
        generatedImage={generatedImage}
        professionName={customProfession || selectedProfession?.name || 'Yeni Görünüm'}
      />
    </div>
  );
}

export default App;