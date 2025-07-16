import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { isTotemMode } from './totemMode';
import { useGeolocation } from './hooks/useGeolocation';
import { useInactivityTimeout } from './hooks/useInactivityTimeout';
import { unitsData, UnitInfo } from './data/unitsData';
import { clientOptions, visitorOptions } from './data/optionsData';
import { DynamicIcon } from './utils/iconUtils';
import { Step, OptionInfo } from './types';
import { 
  ExternalLink, 
  X,
  ChevronLeft,
  Copy,
  QrCode,
  Smartphone,

  ArrowRight,
  AlertCircle,
  Star,
  ArrowLeft,
  Building,
  User,
  MapPin,
  Home
} from 'lucide-react';

// Função para trocar o manifesto para o modo totem
const setTotemManifest = () => {
  // Remover manifesto existente
  const existingManifest = document.querySelector('link[rel="manifest"]');
  if (existingManifest) {
    existingManifest.remove();
  }
  
  // Adicionar manifesto do totem
  const manifestLink = document.createElement('link');
  manifestLink.rel = 'manifest';
  manifestLink.href = '/manifest-totem.json';
  document.head.appendChild(manifestLink);
  
  console.log('[PWA] Manifesto do totem configurado - PWA será instalado com acesso rápido');
};

const AcessoRapido = () => {
  // Estado para controlar em qual etapa estamos
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  // Estado para controlar o embed
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  // Estado para armazenar a etapa anterior antes de abrir o embed
  const [previousStep, setPreviousStep] = useState<Step>('initial');
  // Estado para controlar a visualização em tela cheia
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Estado para mostrar o modal de QR Code e detalhes
  const [showingQrDetails, setShowingQrDetails] = useState<OptionInfo | null>(null);
  // Estado para mostrar feedback de cópia
  const [copyFeedback, setCopyFeedback] = useState(false);
  // Estado para mostrar o popup de seleção de opções
  const [showingOptionSelection, setShowingOptionSelection] = useState<OptionInfo | null>(null);
  // Ref para cálculo de posição da animação
  const qrModalRef = useRef<HTMLDivElement>(null);

  const [selectedUnitUrl, setSelectedUnitUrl] = useState<string | null>(null);
  // Estado para armazenar a ação do visitante que requer seleção de endereço
  const [visitorAction, setVisitorAction] = useState<Omit<OptionInfo, 'url'> | null>(null);

  // Estado para controlar se o usuário cancelou a geolocalização
  const [geolocationCancelled, setGeolocationCancelled] = useState(false);

  // Estados para timeout de inatividade
  const [showInactivityWarning, setShowInactivityWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(5);
  const countdownIntervalRef = useRef<number | null>(null);

  // Usar hook de geolocalização
  const {
    sortedUnits,
    locationError,
    closestUnitId,
    isLoading: isLoadingLocation
  } = useGeolocation(unitsData, {}, geolocationCancelled);

  // Configurar timeout de inatividade para voltar à tela inicial
  const { resetTimer } = useInactivityTimeout({
    timeout: 45000, // 45 segundos total
    warningTime: 5000, // Aviso nos últimos 5 segundos
    enabled: isTotemMode() && currentStep !== 'initial', // Só ativo em modo totem E fora da tela inicial
    onWarning: () => {
      console.log("[DEBUG] Iniciando aviso de inatividade");
      
      // Limpa countdown anterior se existir
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      
      setShowInactivityWarning(true);
      setWarningCountdown(5);
      
      // Countdown de 5 segundos
      let count = 5;
      countdownIntervalRef.current = window.setInterval(() => {
        count--;
        setWarningCountdown(count);
        if (count <= 0) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
        }
      }, 1000);
    },
    onTimeout: () => {
      console.log("[DEBUG] Timeout de inatividade atingido - executando reset completo");
      
      // Limpa countdown se ainda estiver rodando
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      
      // Reset completo do estado
      setShowInactivityWarning(false);
      setWarningCountdown(5);
      setCurrentStep('initial');
      setShowingQrDetails(null);
      setShowingOptionSelection(null);
      setEmbedUrl('');
      setVisitorAction(null);
      setSelectedUnitUrl(null);
      setGeolocationCancelled(false);
      
      console.log("[DEBUG] Reset completo realizado - voltando para tela inicial");
    }
  });

  // Configurar manifesto do totem quando componente é montado
  useEffect(() => {
    setTotemManifest();
    
    // Se é modo totem, garantir que não há persistência
    if (isTotemMode()) {
      try {
        localStorage.clear();
        sessionStorage.clear();
        console.log("[DEBUG] Storage limpo no AcessoRapido - totem sempre fresh");
      } catch (e) {
        console.log("[DEBUG] Storage não disponível no AcessoRapido");
      }
    }
  }, []);

  // Cleanup do countdown interval quando componente é desmontado
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);



  // Função para voltar à etapa inicial
  const goBack = () => {
    // Se estiver em modo totem, permanecer na tela inicial de acesso rápido
    if (isTotemMode()) {
      setCurrentStep('initial');
    } else {
      setCurrentStep('initial');
    }
  };

  // Função para voltar à etapa anterior
  const goToPreviousStep = () => {
    setEmbedUrl(null);
    setIsFullScreen(false);
    // No modo totem, garantir que não saia da tela de acesso rápido
    if (isTotemMode()) {
      setCurrentStep(previousStep === 'initial' ? 'initial' : previousStep);
    } else {
      setCurrentStep(previousStep);
    }
  };

  // Função para ir ao menu inicial
  const goToInitialMenu = () => {
    setEmbedUrl(null);
    setIsFullScreen(false);
    setCurrentStep('initial');
  };

  // Função para abrir URL no embed em tela cheia
  const openInEmbed = (url: string) => {
    setPreviousStep(currentStep);
    setEmbedUrl(url);
    // Ativar modo tela cheia automaticamente
    setIsFullScreen(true);
  };

  // Função para alternar entre modo normal e tela cheia
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Função para mostrar detalhes e QR code
  const showQrDetails = (option: OptionInfo) => {
    setShowingQrDetails(option);
  };

  // Função para fechar o modal de QR code
  const closeQrDetails = () => {
    setShowingQrDetails(null);
  };

  // Função para mostrar popup de seleção de opções
  const showOptionSelection = (option: OptionInfo) => {
    setShowingOptionSelection(option);
  };

  // Função para fechar o popup de seleção
  const closeOptionSelection = () => {
    setShowingOptionSelection(null);
  };

  // Função para tratar clique em item (verificar se tem múltiplas opções)
  const handleItemClick = (option: OptionInfo) => {
    // Verificar quantas opções o item tem
    const hasQrOption = option.url && option.url.trim() !== ''; // Só tem QR Code se tiver URL válida
    const hasDirectAction = !option.qrCodeOnly && option.actionType !== 'navigateToAddressSelection' && option.url && option.url.trim() !== '';
    const hasAddressSelection = option.actionType === 'navigateToAddressSelection';
    
    const optionsCount = (hasQrOption ? 1 : 0) + (hasDirectAction ? 1 : 0) + (hasAddressSelection ? 1 : 0);
    
    if (optionsCount > 1) {
      // Mostrar popup de seleção se tem múltiplas opções
      showOptionSelection(option);
    } else {
      // Ação direta se tem apenas uma opção
      if (hasAddressSelection) {
        handleVisitorOptionClick(option);
      } else if (hasDirectAction) {
        openInEmbed(option.url);
      } else if (hasQrOption) {
        showQrDetails(option);
      }
    }
  };

  // Função para copiar URL para clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  const handleVisitorOptionClick = (option: OptionInfo) => {
    if (option.actionType === 'navigateToAddressSelection') {
      const { url, ...actionDetails } = option; // eslint-disable-line @typescript-eslint/no-unused-vars
      setVisitorAction(actionDetails);
      setPreviousStep(currentStep); 
      setCurrentStep('visitorAddressSelection');
    } else if (option.url.startsWith('/')) {
      // Navegação interna (ex: /reservar-sala)
      if (isTotemMode()) {
        // No modo totem, navegar diretamente ao invés de embed para evitar "totem dentro de totem"
        window.location.href = option.url;
      } else {
        // Fora do modo totem, usar redirect normal
        window.location.href = option.url;
      }
    } else {
      // Ação direta para URLs externas que NÃO SÃO formulários de visita (ex: WhatsApp)
      // ou links que explicitamente devem abrir em embed/QR.
      // Se for QR code only, showQrDetails cuidará disso.
      if (option.qrCodeOnly) {
        showQrDetails(option);
      } else {
        openInEmbed(option.url); 
      }
    }
  };

  const handleUnitSelection = (unitFormUrl: string) => {
    setSelectedUnitUrl(unitFormUrl);
    if (visitorAction) {
      // Criar ação completa com URL da unidade selecionada
      const completeAction: OptionInfo = {
        ...visitorAction,
        url: unitFormUrl,
        // Remove qrCodeOnly para permitir escolha entre QR Code e navegador
        qrCodeOnly: false,
        // Remove actionType para que não mostre mais a opção "Selecionar Unidade"
        actionType: undefined
      };

      console.log("[DEBUG] Unidade selecionada, mostrando APENAS opções QR Code e Navegador:", completeAction);
      
      // Mostrar modal para usuário escolher: QR Code ou Abrir no navegador
      showOptionSelection(completeAction);
    } else {
      // Caso inesperado, apenas voltar para a seleção de visitante ou inicial
      setCurrentStep('visitor');
    }
  };

  return (
    <div className={`h-screen flex flex-col ${embedUrl ? 'p-0 overflow-hidden' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'} text-white relative`}>
      {/* Efeito de partículas de fundo */}
      {!embedUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500 opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-purple-500 opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-teal-500 opacity-10 animate-blob animation-delay-4000"></div>
        </div>
      )}

      <head>
        <title>Acesso Rápido | GOWORK</title>
        <meta name="description" content="Acesso rápido às funcionalidades da GOWORK" />
        <style>
          {`
            @keyframes blob {
              0% { transform: scale(1) translate(0px, 0px); }
              33% { transform: scale(1.1) translate(30px, -20px); }
              66% { transform: scale(0.9) translate(-20px, 30px); }
              100% { transform: scale(1) translate(0px, 0px); }
            }
            .animate-blob {
              animation: blob 12s infinite alternate;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
            .glass-card {
              backdrop-filter: blur(16px);
              background: rgba(255, 255, 255, 0.08);
              border: 1px solid rgba(255, 255, 255, 0.15);
            }
            .hover-glow:hover {
              box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
            }
          `}
        </style>
      </head>

      {/* Header com logo - oculto quando embed está ativo OU na seleção de unidade */}
      {!embedUrl && currentStep !== 'visitorAddressSelection' && (
        <header className="w-full py-2 px-4 flex justify-center items-center z-10 relative glass-card">
          <img 
            src="/gowork.png" 
            alt="GOWORK" 
            className="h-12 object-contain drop-shadow-lg" 
          />
        </header>
      )}

      {/* Modal de QR Code */}
      {showingQrDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div 
            ref={qrModalRef}
            className="bg-gray-900 rounded-2xl p-6 max-w-md w-full text-white border border-gray-700 shadow-2xl animate-fadeIn" 
            style={{
              boxShadow: `0 0 40px rgba(${showingQrDetails.bgColor === 'bg-gradient-to-br from-red-400 to-red-600' ? '239, 68, 68' : 
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-purple-400 to-purple-600' ? '147, 51, 234' : 
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-sky-400 to-sky-600' ? '14, 165, 233' : 
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-green-400 to-green-600' ? '74, 222, 128' :
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-emerald-400 to-emerald-600' ? '52, 211, 153' :
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-blue-400 to-blue-600' ? '59, 130, 246' :
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-violet-400 to-violet-600' ? '139, 92, 246' :
                          showingQrDetails.bgColor === 'bg-gradient-to-br from-amber-400 to-amber-600' ? '245, 158, 11' : '236, 72, 153'}, 0.4)`
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-white">{showingQrDetails.title}</h3>
              <button 
                onClick={closeQrDetails}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
              >
                <X className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                <QRCode value={showingQrDetails.url} size={220} />
              </div>
            </div>
            
            <div className="mb-5">
              <p className="text-sm text-gray-300 mb-2">Link de acesso:</p>
              <div className="flex items-center">
                <div className="bg-gray-800 rounded-lg p-3 text-sm flex-1 truncate border border-gray-700 text-gray-300">
                  {showingQrDetails.url}
                </div>
                <button 
                  onClick={() => copyToClipboard(showingQrDetails.url)}
                  className="ml-2 p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
                  title="Copiar link"
                >
                  <Copy className="h-5 w-5 text-white" />
                </button>
              </div>
              {copyFeedback && (
                <p className="text-sm text-green-400 mt-2 animate-pulse">✓ Link copiado para a área de transferência!</p>
              )}
            </div>
            
            {showingQrDetails.additionalInfo && (
              <div className="mb-5 flex items-center bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-800">
                <Smartphone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-sm text-blue-200">{showingQrDetails.additionalInfo}</span>
              </div>
            )}
            

            
            <div className="flex justify-between mt-4">
              {!showingQrDetails.qrCodeOnly && (
                <button 
                  onClick={() => {
                    openInEmbed(showingQrDetails.url);
                    closeQrDetails();
                  }}
                  className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Abrir no navegador
                </button>
              )}
              <button 
                onClick={closeQrDetails}
                className={`px-5 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 transform hover:scale-105 ${showingQrDetails.qrCodeOnly ? 'w-full' : ''}`}
              >
                Fechar
              </button>
            </div>
          </div>
          

          

        </div>
      )}

      {/* Modal de Seleção de Opções */}
      {showingOptionSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full text-white border border-gray-700 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">{showingOptionSelection.title}</h3>
              <button 
                onClick={closeOptionSelection}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
              >
                <X className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-6">{showingOptionSelection.description}</p>
            </div>
            
            <div className="space-y-3">
              {/* Opção QR Code - só se tiver URL válida */}
              {showingOptionSelection.url && showingOptionSelection.url.trim() !== '' && (
                <button
                  onClick={() => {
                    showQrDetails(showingOptionSelection);
                    closeOptionSelection();
                  }}
                  className="w-full flex items-center p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white mr-4">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-medium">Mostrar QR Code</h4>
                    <p className="text-gray-400 text-sm">Escaneie com seu celular</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              )}

              {/* Opção Abrir no Navegador - se disponível */}
              {!showingOptionSelection.qrCodeOnly && showingOptionSelection.actionType !== 'navigateToAddressSelection' && showingOptionSelection.url && showingOptionSelection.url.trim() !== '' && (
                <button
                  onClick={() => {
                    openInEmbed(showingOptionSelection.url);
                    closeOptionSelection();
                  }}
                  className="w-full flex items-center p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-600 text-white mr-4">
                    <ExternalLink className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-medium">Abrir no Navegador</h4>
                    <p className="text-gray-400 text-sm">Acessar diretamente na tela</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              )}

              {/* Opção Selecionar Unidade - se disponível */}
              {showingOptionSelection.actionType === 'navigateToAddressSelection' && (
                <button
                  onClick={() => {
                    handleVisitorOptionClick(showingOptionSelection);
                    closeOptionSelection();
                  }}
                  className="w-full flex items-center p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-102"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-600 text-white mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-medium">Selecionar Unidade</h4>
                    <p className="text-gray-400 text-sm">Escolher localização</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      {embedUrl ? (
        <>
          {/* Barra de navegação minimalista quando embed está ativo */}
          <div className="flex items-center justify-between bg-gray-900 py-1 px-2 border-b border-gray-700 shadow-md">
            <div className="flex items-center">
              <button 
                onClick={goToPreviousStep}
                className="mr-2 flex items-center text-white bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded-lg transition-colors text-sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Voltar</span>
              </button>
              <button 
                onClick={goToInitialMenu}
                className="flex items-center text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-lg transition-colors text-sm"
              >
                <Home className="h-4 w-4 mr-1" />
                <span>Início</span>
              </button>
            </div>
            <button 
              onClick={() => setEmbedUrl(null)}
              className="flex items-center justify-center h-7 w-7 rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Iframe em tela cheia */}
          <div className="w-full h-[calc(100vh-33px)] bg-white">
            <iframe 
              src={embedUrl} 
              title="Conteúdo embutido" 
              className="w-full h-full border-0" 
              frameBorder="0"
            />
          </div>
        </>
      ) : currentStep === 'visitorAddressSelection' ? (
        <main className="flex-1 flex flex-col w-full z-10 relative overflow-hidden"> 
          {/* Fundo estilo Apple com gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 opacity-90 z-0"></div>
          <div className="absolute inset-0 bg-[url('/pattern-dot.png')] opacity-5 z-0"></div>
          
          {/* Conteúdo principal com estilo Apple */}
          <div className="relative z-10 flex flex-col h-full px-6 py-8 md:px-10 md:py-12">
            {/* Cabeçalho */}
            <header className="flex items-center mb-10">
              <button 
                onClick={() => {
                  setCurrentStep('visitor');
                  setVisitorAction(null);
                  setSelectedUnitUrl(null);
                }} 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <h1 className="ml-6 text-2xl md:text-4xl font-light text-white tracking-tight">
                Em qual unidade você está?
              </h1>
            </header>
            
            {/* Alerta de localização */}
            {locationError && (
              <div className="mb-8 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white/90">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-3 text-yellow-300 flex-shrink-0"/> 
                  <span className="text-sm font-light">{locationError}</span>
                </div>
              </div>
            )}
            
            {/* Loading da geolocalização */}
            {isLoadingLocation && (
              <div className="mb-8 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white/90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-300 mr-3"></div>
                    <span className="text-sm font-light">Detectando sua localização...</span>
                  </div>
                  <button 
                    onClick={() => {
                      setGeolocationCancelled(true);
                    }}
                    className="text-xs text-blue-300 hover:text-blue-200 underline"
                  >
                    Pular
                  </button>
                </div>
              </div>
            )}
            
            {/* Lista de unidades estilo Apple */}
            <div className="flex-1 overflow-y-auto px-1 pb-6 -mx-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedUnits.map((unit) => {
                  const isClosest = unit.id === closestUnitId;
                  return (
                    <button 
                      key={unit.id}
                      onClick={() => handleUnitSelection(unit.formUrl)}
                      className={`relative overflow-hidden group p-6 md:p-7 rounded-3xl transition-all duration-400 ease-out transform hover:-translate-y-1 focus:outline-none focus:ring focus:ring-opacity-40
                                ${isClosest 
                                  ? 'bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg focus:ring-blue-400/50' 
                                  : 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-md hover:bg-white/15 focus:ring-white/30'}`}
                    >
                      {/* Fundo com gradiente para os mais próximos */}
                      {isClosest && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-500/20 opacity-70 z-0"></div>
                      )}
                      
                      <div className="relative z-10">
                        {/* Cabeçalho do card */}
                        <div className="flex items-center justify-between mb-3">
                          {isClosest && (
                            <div className="flex items-center px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/20">
                              <Star className="h-3.5 w-3.5 text-blue-300 mr-1.5" fill="#93c5fd" />
                              <span className="text-xs text-blue-100 font-medium">Mais próxima</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Endereço */}
                        <div className="mt-2">
                          <p className={`text-lg md:text-xl font-medium text-white ${isClosest ? 'tracking-wide' : ''}`}>
                            {unit.address}
                          </p>
                        </div>
                        
                        {/* Informação de distância */}
                        {isClosest && unit.distance !== undefined && unit.distance !== Infinity && (
                          <div className="mt-5 flex items-center text-blue-200/90">
                            <MapPin className="w-4 h-4 mr-2 stroke-blue-200" />
                            <span className="text-sm">Aprox. {unit.distance.toFixed(1)} km de você</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 flex items-center justify-center w-full z-10 relative px-3 py-2">
          <div className="w-full h-full max-w-5xl glass-card rounded-xl shadow-2xl p-4 transition-all duration-500 overflow-auto">
            {/* Etapa Inicial - Seleção de tipo de usuário */}
            {currentStep === 'initial' && (
              <div className="flex flex-col items-center h-full justify-center">
                <div className="text-center mb-5">
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">
                    SEJA BEM-VINDO!
                  </h1>
                  <p className="text-lg text-blue-200">
                    Selecione uma opção para continuar
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
                  <button
                    onClick={() => setCurrentStep('client')} 
                    className="flex flex-col items-center justify-center p-5 rounded-xl glass-card hover-glow shadow-xl transition-all duration-500 transform hover:scale-105 hover:border-blue-400 border border-gray-700"
                  >
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white mb-3 shadow-lg transition-all duration-500 transform hover:rotate-6">
                      <Building className="h-10 w-10" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Sou cliente da GoWork</h2>
                    <p className="text-center text-blue-100">Acesse serviços exclusivos para clientes</p>
                  </button>

                  <button
                    onClick={() => setCurrentStep('visitor')} 
                    className="flex flex-col items-center justify-center p-5 rounded-xl glass-card hover-glow shadow-xl transition-all duration-500 transform hover:scale-105 hover:border-indigo-400 border border-gray-700"
                  >
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white mb-3 shadow-lg transition-all duration-500 transform hover:rotate-6">
                      <User className="h-10 w-10" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Sou visitante</h2>
                    <p className="text-center text-blue-100">Vim fazer uma reunião, visitar, conhecer ou alugar um espaço</p>
                  </button>
                </div>
              </div>
            )}

            {/* Etapa Cliente - Opções para clientes */}
            {currentStep === 'client' && (
              <>
                <div className="flex items-center mb-4">
                  <button 
                    onClick={goBack}
                    className="mr-3 flex items-center justify-center h-9 w-9 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                  >
                    <ArrowLeft className="h-5 w-5 text-white" />
                  </button>
                  <h1 className="text-2xl font-bold text-white tracking-wider">
                    OPÇÕES PARA CLIENTES
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {clientOptions.map((option, index) => (
                    <button 
                      key={index}
                      onClick={() => handleItemClick(option)}
                      className="flex items-start p-4 rounded-xl glass-card hover-glow hover:border-blue-400 border border-gray-700 transition-all duration-500 transform hover:scale-105 cursor-pointer text-left w-full"
                    >
                      <div className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl ${option.bgColor} ${option.textColor} mr-4 shadow-lg`}>
                        <DynamicIcon name={option.iconName} className="h-7 w-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white tracking-wide mb-1">{option.title}</h3>
                        <p className="text-sm text-blue-200 line-clamp-2">{option.description}</p>
                      </div>
                      <div className="flex items-center ml-2">
                        <ArrowRight className="h-5 w-5 text-blue-300" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Etapa Visitante - Opções para visitantes */}
            {currentStep === 'visitor' && (
              <>
                <div className="flex items-center mb-4">
                  <button 
                    onClick={goBack}
                    className="mr-3 flex items-center justify-center h-9 w-9 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                  >
                    <ArrowLeft className="h-5 w-5 text-white" />
                  </button>
                  <h1 className="text-2xl font-bold text-white tracking-wider">
                    O QUE VOCÊ DESEJA?
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {visitorOptions.map((option, index) => (
                    <button 
                      key={index}
                      onClick={() => handleItemClick(option)}
                      className="flex items-start p-4 rounded-xl glass-card hover-glow hover:border-blue-400 border border-gray-700 transition-all duration-500 transform hover:scale-105 cursor-pointer text-left w-full"
                    >
                      <div className={`flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl ${option.bgColor} ${option.textColor} mr-4 shadow-lg`}>
                        <DynamicIcon name={option.iconName} className="h-7 w-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white tracking-wide mb-1">{option.title}</h3>
                        <p className="text-sm text-blue-200 line-clamp-2">{option.description}</p>
                      </div>
                      <div className="flex items-center ml-2">
                        <ArrowRight className="h-5 w-5 text-blue-300" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      )}

      {/* Footer - oculto quando embed está ativo OU na seleção de unidade */}
      {!embedUrl && currentStep !== 'visitorAddressSelection' && (
        <footer className="py-2 glass-card border-t border-gray-700 z-10 text-center">
          <p className="text-sm text-blue-200">
            &copy; {new Date().getFullYear()} GOWORK - Todos os direitos reservados.
          </p>
        </footer>
      )}

      {/* Modal de Aviso de Inatividade */}
      {showInactivityWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-8 max-w-md w-full text-white border-2 border-yellow-400 shadow-2xl animate-pulse">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-10 w-10 text-yellow-200" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {warningCountdown}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">⚠️ Atenção!</h3>
              <p className="text-lg mb-6">
                Por inatividade, o sistema voltará à tela inicial em{' '}
                <span className="font-bold text-yellow-200 text-xl">
                  {warningCountdown} segundo{warningCountdown !== 1 ? 's' : ''}
                </span>
              </p>
              
              <button 
                onClick={() => {
                  console.log("[DEBUG] Usuário clicou em 'Continuar Usando'");
                  
                  // Limpa countdown
                  if (countdownIntervalRef.current) {
                    clearInterval(countdownIntervalRef.current);
                    countdownIntervalRef.current = null;
                  }
                  
                  setShowInactivityWarning(false);
                  setWarningCountdown(5);
                  resetTimer(); // Reset do timer de inatividade
                }}
                className="w-full px-6 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Continuar Usando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcessoRapido; 