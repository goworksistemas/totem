import { useState, useEffect, useCallback, useRef } from 'react';

interface UseVirtualKeyboardOptions {
  enabled?: boolean;
}

export const useVirtualKeyboard = (options: UseVirtualKeyboardOptions = {}) => {
  const { enabled = true } = options;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [targetInput, setTargetInput] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const currentInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Detectar foco em inputs
  useEffect(() => {
    if (!enabled) return;

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      
      // Verificar se é um input ou textarea
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const inputElement = target as HTMLInputElement | HTMLTextAreaElement;
        
        // Verificar se não é um input de tipo que não precisa de teclado
        if (inputElement.tagName === 'INPUT') {
          const inputType = (inputElement as HTMLInputElement).type;
          if (['checkbox', 'radio', 'submit', 'button', 'reset', 'file', 'hidden'].includes(inputType)) {
            return;
          }
        }
        
        setTargetInput(inputElement);
        currentInputRef.current = inputElement;
        setIsKeyboardVisible(true);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Pequeno delay para permitir cliques no teclado virtual
      setTimeout(() => {
        const activeElement = document.activeElement;
        
        // Se o foco não está em um input, fechar o teclado
        if (!activeElement || (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA')) {
          setIsKeyboardVisible(false);
          setTargetInput(null);
          currentInputRef.current = null;
        }
      }, 100);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [enabled]);

  // Funções do teclado
  const handleKeyPress = useCallback((key: string) => {
    if (!currentInputRef.current) return;

    const input = currentInputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;

    // Inserir o caractere na posição do cursor
    const newValue = value.substring(0, start) + key + value.substring(end);
    input.value = newValue;

    // Mover cursor para após o caractere inserido
    const newPosition = start + key.length;
    input.setSelectionRange(newPosition, newPosition);

    // Disparar evento de input para frameworks como React
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  }, []);

  const handleBackspace = useCallback(() => {
    if (!currentInputRef.current) return;

    const input = currentInputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;

    let newValue: string;
    let newPosition: number;

    if (start === end) {
      // Nenhuma seleção, deletar caractere anterior
      if (start > 0) {
        newValue = value.substring(0, start - 1) + value.substring(start);
        newPosition = start - 1;
      } else {
        return; // Não há nada para deletar
      }
    } else {
      // Há seleção, deletar texto selecionado
      newValue = value.substring(0, start) + value.substring(end);
      newPosition = start;
    }

    input.value = newValue;
    input.setSelectionRange(newPosition, newPosition);

    // Disparar evento de input
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  }, []);

  const handleEnter = useCallback(() => {
    if (!currentInputRef.current) return;

    const input = currentInputRef.current;
    
    // Se for textarea, inserir quebra de linha
    if (input.tagName === 'TEXTAREA') {
      handleKeyPress('\n');
    } else {
      // Se for input, simular submit do formulário ou fechar teclado
      const form = input.closest('form');
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
      
      // Fechar teclado e remover foco
      input.blur();
      setIsKeyboardVisible(false);
    }
  }, [handleKeyPress]);

  const handleSpace = useCallback(() => {
    handleKeyPress(' ');
  }, [handleKeyPress]);

  const closeKeyboard = useCallback(() => {
    setIsKeyboardVisible(false);
    setTargetInput(null);
    if (currentInputRef.current) {
      currentInputRef.current.blur();
      currentInputRef.current = null;
    }
  }, []);

  const openKeyboard = useCallback((input: HTMLInputElement | HTMLTextAreaElement) => {
    if (!enabled) return;
    
    setTargetInput(input);
    currentInputRef.current = input;
    setIsKeyboardVisible(true);
    input.focus();
  }, [enabled]);

  return {
    isKeyboardVisible,
    targetInput,
    handleKeyPress,
    handleBackspace,
    handleEnter,
    handleSpace,
    closeKeyboard,
    openKeyboard
  };
};
