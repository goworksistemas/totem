import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { ChevronLeft } from 'lucide-react';

interface LanguageSelectorProps {
  onBack: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onBack }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    {
      code: 'pt' as Language,
      name: 'Português (Brasil)',
      flag: '🇧🇷'
    },
    {
      code: 'en' as Language,
      name: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'es' as Language,
      name: 'Español',
      flag: '🇪🇸'
    },
    {
      code: 'fr' as Language,
      name: 'Français',
      flag: '🇫🇷'
    }
  ];

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    onBack(); // Volta para a tela inicial após selecionar idioma
  };

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="flex items-center mb-8 w-full max-w-3xl">
        <button 
          onClick={onBack}
          className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-3xl font-bold text-white tracking-wider">
          {t('select_language')}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`flex items-center justify-center p-8 rounded-2xl glass-card hover-glow shadow-xl transition-all duration-500 transform hover:scale-105 border-2 ${
              language === lang.code 
                ? 'border-blue-400 bg-blue-500/20' 
                : 'border-gray-700 hover:border-blue-400'
            }`}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">
                {lang.flag}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-wide">
                {lang.name}
              </h2>
              {language === lang.code && (
                <div className="flex items-center justify-center mt-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="ml-2 text-blue-300 text-sm font-medium">Selecionado</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
