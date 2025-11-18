import React, { useState, useEffect, useRef } from 'react';
import { X, Delete, Space, CornerDownLeft } from 'lucide-react';

interface VirtualKeyboardProps {
  isVisible: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  targetInput?: HTMLInputElement | HTMLTextAreaElement | null;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  isVisible,
  onClose,
  onKeyPress,
  onBackspace,
  onEnter,
  onSpace,
  targetInput
}) => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [currentLayout, setCurrentLayout] = useState<'letters' | 'numbers' | 'symbols'>('letters');
  const keyboardRef = useRef<HTMLDivElement>(null);

  // Layout das teclas
  const layouts = {
    letters: [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ],
    numbers: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
      ['.', ',', '?', '!', "'", '"', '+', '=', '*']
    ],
    symbols: [
      ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
      ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
      ['.', ',', '?', '!', "'", '"', '`', '´', '¨']
    ]
  };

  // Fechar teclado quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (keyboardRef.current && !keyboardRef.current.contains(event.target as Node)) {
        // Não fechar se clicar no input
        if (targetInput && targetInput.contains(event.target as Node)) {
          return;
        }
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose, targetInput]);

  // Resetar shift após usar
  useEffect(() => {
    if (isShiftActive) {
      const timer = setTimeout(() => {
        setIsShiftActive(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isShiftActive]);

  const handleKeyPress = (key: string) => {
    let finalKey = key;
    
    if (currentLayout === 'letters') {
      finalKey = isShiftActive ? key.toUpperCase() : key.toLowerCase();
    }
    
    onKeyPress(finalKey);
    
    // Resetar shift após usar (exceto para caps lock)
    if (isShiftActive) {
      setIsShiftActive(false);
    }
  };

  const toggleShift = () => {
    setIsShiftActive(!isShiftActive);
  };

  const switchLayout = (layout: 'letters' | 'numbers' | 'symbols') => {
    setCurrentLayout(layout);
    setIsShiftActive(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-end justify-center">
      <div 
        ref={keyboardRef}
        className="w-full max-w-4xl bg-gray-800 rounded-t-2xl p-4 shadow-2xl border-t border-gray-600 animate-slideUp"
        style={{ maxHeight: '50vh' }}
      >
        {/* Header do teclado */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => switchLayout('letters')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentLayout === 'letters' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ABC
            </button>
            <button
              onClick={() => switchLayout('numbers')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentLayout === 'numbers' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              123
            </button>
            <button
              onClick={() => switchLayout('symbols')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentLayout === 'symbols' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              #+=
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Teclas */}
        <div className="space-y-2">
          {layouts[currentLayout].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-1">
              {row.map((key, keyIndex) => (
                <button
                  key={`${rowIndex}-${keyIndex}`}
                  onClick={() => handleKeyPress(key)}
                  className="min-w-[40px] h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-lg flex items-center justify-center"
                  style={{ minWidth: '40px', flex: '1', maxWidth: '60px' }}
                >
                  {currentLayout === 'letters' && isShiftActive ? key.toUpperCase() : key}
                </button>
              ))}
            </div>
          ))}
          
          {/* Linha de controles */}
          <div className="flex justify-center space-x-1 mt-4">
            {currentLayout === 'letters' && (
              <button
                onClick={toggleShift}
                className={`h-12 px-4 rounded-lg transition-colors font-medium flex items-center justify-center ${
                  isShiftActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                ⇧ Shift
              </button>
            )}
            
            <button
              onClick={onSpace}
              className="h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center px-8"
              style={{ flex: '3' }}
            >
              <Space className="h-5 w-5 mr-2" />
              Espaço
            </button>
            
            <button
              onClick={onBackspace}
              className="h-12 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              <Delete className="h-5 w-5" />
            </button>
            
            <button
              onClick={onEnter}
              className="h-12 px-4 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              <CornerDownLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
