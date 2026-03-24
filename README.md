# 🏢 GoWork Totem - Sistema de Acesso Rápido

![GoWork Logo](public/gowork.png)

## 📝 Descrição

Sistema de totem para acesso rápido da **GoWork**, desenvolvido como uma Progressive Web App (PWA) otimizada para tablets e dispositivos de autoatendimento. Oferece uma interface intuitiva para clientes e visitantes acessarem serviços da GoWork de forma rápida e eficiente.

## ✨ Funcionalidades

### 🎯 **Para Clientes**
- **Suporte Técnico**: Acesso direto ao WhatsApp de suporte
- **Reserva de Salas**: Acesso ao sistema NetworkGo
- **Cadastro de Biometria**: Formulário HubSpot para autorização

### 👥 **Para Visitantes**
- **Check-in de Reuniões**: Formulário específico por unidade
- **Visita a Empresas**: Sistema de registro de visitantes
- **Aluguel de Salas**: Redirecionamento para reservas por hora

### 🌍 **Recursos Avançados**
- **Geolocalização**: Detecção automática da unidade mais próxima
- **QR Code**: Geração automática para acesso mobile
- **PWA**: Instalação como aplicativo nativo
- **Modo Fullscreen**: Interface otimizada para tablets
- **Multi-unidades**: Suporte a 18+ unidades da GoWork

## 🏗️ Arquitetura Técnica

```
Totem/
├── public/                     # Arquivos estáticos
│   ├── gowork.png             # Logo da empresa
│   ├── favicongowork.jpg      # Ícone do aplicativo PWA
│   ├── manifest-totem.json    # Manifesto PWA
│   └── totem.html            # HTML específico do totem
├── src/
│   ├── components/           # Componentes React (futuro)
│   ├── data/                # Dados estruturados
│   │   ├── unitsData.ts     # Informações das unidades
│   │   └── optionsData.ts   # Opções de cliente/visitante
│   ├── hooks/               # Hooks personalizados
│   │   └── useGeolocation.ts # Geolocalização
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts         # Interfaces centralizadas
│   ├── AcessoRapido.tsx     # Componente principal
│   ├── totemMode.ts         # Utilitários do modo totem
│   ├── main.tsx             # Ponto de entrada React
│   └── index.css            # Estilos globais
├── package.json             # Dependências
├── vite.config.ts          # Configuração Vite
├── tsconfig.json           # Configuração TypeScript
└── tailwind.config.js      # Configuração Tailwind
```

## 🚀 Tecnologias

- **React 18** + **TypeScript** - Framework frontend
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework de estilos
- **PWA** - Progressive Web App com Service Worker
- **React Router** - Navegação entre páginas
- **Lucide React** - Biblioteca de ícones
- **React QR Code** - Geração de códigos QR
- **Geolocation API** - Detecção de localização

## 📋 Atualizações Recentes

### ✅ URLs dos Formulários HubSpot Atualizados
Todos os URLs dos formulários do HubSpot foram atualizados para as versões corretas:

- **Paulista 302**: `https://share.hsforms.com/2U5wutuhySQS2FyAUKdvkfwe4grb`
- **Paulista 475**: `https://share.hsforms.com/2E9yx7Oe3SeS4a6ZJgu5csge4grb`
- **Alameda Santos**: `https://share.hsforms.com/2woP3OkXaSUW5K521je16nAe4grb`
- **Consolação**: `https://share.hsforms.com/2zhbaq6rFTZyXdG8Q7aLMEge4grb`
- **Ministro**: `https://share.hsforms.com/2XzOImLAGQAqEYQg9ctm8jge4grb`
- **Joaquim Antunes**: `https://share.hsforms.com/2LTF6OnXhSUaxFtbK292d0Ae4grb`
- **Butanta**: `https://share.hsforms.com/2dNNp40veRCWXP9HSV2zuqAe4grb`
- **Pinheiros**: `https://share.hsforms.com/23AkXRiU8Ti-ioJ-Z4Ew7QAe4grb`
- **Campus 1**: `https://share.hsforms.com/2IPszyYV6QuaAOu4A4uJFKAe4grb`
- **Campus 2**: `https://share.hsforms.com/22wbAO2VjS0qSZkxAbtfG0Ae4grb`
- **Amauri 2**: `https://share.hsforms.com/2vNuBDKfUSIaSGWiB2B9sbwe4grb`
- **Funchal 2**: `https://share.hsforms.com/2_MOMR__sREGD3AJxVbGeFQe4grb`

## 📦 Instalação

### Pré-requisitos
- **Node.js** >= 16.0.0
- **npm** ou **yarn**

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd Totem
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **⚠️ ADICIONE O ÍCONE DO APLICATIVO**
   - Coloque o arquivo `favicongowork.jpg` na pasta `public/`
   - Consulte o arquivo `SETUP_ICONS.md` para mais detalhes

4. **Execute em desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse o projeto**
   - Desenvolvimento: `http://localhost:3000`
   - Modo Totem: `http://localhost:3000/totem.html`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor de desenvolvimento

# Build
npm run build         # Gera build de produção
npm run preview       # Preview do build de produção

# Qualidade de Código
npm run lint          # Executa ESLint
npm run type-check    # Verifica tipos TypeScript
```

## 🎨 Configuração do Totem

### PWA (Progressive Web App)

O sistema é otimizado para funcionar como PWA:

1. **Instalação no Tablet**
   - Acesse `http://[seu-servidor]/totem.html`
   - Clique em "Adicionar à Tela Inicial"
   - O app será instalado em modo fullscreen

2. **Configurações Automáticas**
   - Detecção de modo standalone
   - Prevenção de zoom e seleção de texto
   - Desabilitação de menu de contexto
   - Bloqueio de teclas de desenvolvedor

### Modo Totem

```typescript
// Detecção automática
isTotemMode()         // Verifica se está em modo totem
setTotemMode()        // Ativa configurações do totem
isPWAStandalone()     // Verifica se é PWA standalone
```

## 🌍 Configuração de Unidades

### Adicionar Nova Unidade

Em `src/data/unitsData.ts`:

```typescript
{
  id: 'nova-unidade',
  name: 'Nome da Unidade',
  address: 'Endereço completo',
  formUrl: 'https://share.hsforms.com/[ID]',
  latitude: -23.000000,  // Opcional para geolocalização
  longitude: -46.000000  // Opcional para geolocalização
}
```

### Configurar Geolocalização

```typescript
// Hook personalizado
const { 
  sortedUnits,      // Unidades ordenadas por distância
  locationError,    // Erro de localização
  closestUnitId,    // ID da unidade mais próxima
  isLoading        // Status de carregamento
} = useGeolocation(unitsData);
```

## 🎯 Personalização

### Cores e Temas

Em `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* cores personalizadas */ },
      glass: { /* efeitos glass */ }
    }
  }
}
```

### Ícones e Opções

Em `src/data/optionsData.ts`:

```typescript
{
  title: "Nova Opção",
  description: "Descrição da funcionalidade",
  url: "https://example.com",
  iconName: 'icon-name',  // Nome do ícone Lucide
  bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
  qrCodeOnly: true,       // Apenas QR Code
  actionType: 'openEmbed' // Tipo de ação
}
```

## 🔐 Segurança e Privacidade

- **Geolocalização**: Solicitada apenas quando necessário
- **Dados**: Nenhum dado pessoal armazenado localmente
- **URLs**: Todas as integrações usam HTTPS
- **PWA**: Cache seguro com Service Worker

## 📱 Integração com Serviços

### HubSpot Forms
- Formulários de cadastro de biometria
- Check-in de visitantes por unidade
- Integração automática com CRM

### WhatsApp Business
- Suporte técnico direto
- Link formatado com contexto

### Sistemas Externos
- **NetworkGo**: Reserva de salas

## 🐛 Troubleshooting

### Problemas Comuns

1. **Geolocalização não funciona**
   - Verificar permissões do navegador
   - Garantir HTTPS em produção
   - Verificar configurações do dispositivo

2. **PWA não instala**
   - Confirmar manifesto válido
   - Verificar Service Worker
   - Testar em HTTPS
   - **Verificar se o arquivo `favicongowork.jpg` existe**

3. **QR Code não aparece**
   - Verificar URL válida
   - Testar biblioteca react-qr-code
   - Confirmar dados das opções

4. **Erro no build/deploy Netlify (TS6305)**
   - Certificar que `vite.config.ts` não está no `include` do `tsconfig.json`
   - Usar apenas `vite build` no script de build
   - Configuração correta dos arquivos TypeScript

5. **Geolocalização não funciona no computador/desktop**
   - A geolocalização funciona melhor em tablets e dispositivos móveis
   - Alguns navegadores desktop bloqueiam GPS por padrão
   - No tablet (ambiente de produção), a funcionalidade será completa
   - Em caso de falha, o sistema mostra todas as unidades normalmente

6. **Sistema de geolocalização travando (CORRIGIDO)**
   - ✅ Eliminado loop infinito que causava múltiplas execuções
   - ✅ Implementado controle de execução única com useRef
   - ✅ Adicionado botão "Pular" para cancelar detecção manual
   - ✅ Timeout de segurança de 6 segundos para evitar travamentos
   - ✅ Logs detalhados para debug e monitoramento

7. **Limpeza de funcionalidades desnecessárias (REMOVIDO)**
   - ✅ Removida mensagem "Precisa de ajuda" com referência a chat inexistente
   - ✅ Removido caminho de luz animado (SVG + CSS) desnecessário
   - ✅ Removidas animações CSS não utilizadas
   - ✅ Reduzido bundle size e melhorada performance
   - ✅ Código mais limpo e focado apenas no essencial

8. **Sistema de timeout por inatividade (IMPLEMENTADO)**
   - ✅ Hook useInactivityTimeout para controle automático
   - ✅ Timeout de 45 segundos após inatividade
   - ✅ Aviso visual com countdown de 5 segundos
   - ✅ Volta automática para tela inicial
   - ✅ Detecta mouse, toque, teclado e scroll
   - ✅ Apenas ativo em modo totem
   - ✅ Botão "Continuar Usando" para cancelar

9. **Correção opções visitantes (CORRIGIDO)**
   - ✅ "Alugar sala de reunião" agora tem QR Code E botão navegador
   - ✅ Visitantes podem escolher entre escanear ou abrir direto
   - ✅ Mesma funcionalidade das outras opções

10. **Orientação PWA (CORRIGIDO)**
    - ✅ Corrigido de "portrait" para "any" no manifest e vite.config
    - ✅ PWA agora segue orientação do tablet (vertical/horizontal)
    - ✅ Funciona perfeitamente em ambas orientações

11. **Bug timeout inatividade (CORRIGIDO)**
    - ✅ Corrigido modal travado após countdown terminar
    - ✅ useRef para gerenciar countdown interval corretamente
    - ✅ Limpeza adequada de intervals em todas situações
    - ✅ Reset completo do estado no timeout
    - ✅ Botão "Continuar Usando" funciona perfeitamente
    - ✅ Logs detalhados para debug
    - ✅ Timeout NÃO inicia mais na tela inicial (só quando usuário navegar)

12. **Fluxo visitantes com seleção de unidade (CORRIGIDO)**
    - ✅ Corrigido QR Code em branco nas opções "Vim fazer reunião" e "Visitar empresa"
    - ✅ Fluxo correto: clique → seleção unidade → modal escolha (QR/navegador)
    - ✅ URLs sempre válidas quando QR Code é mostrado
    - ✅ Modal só mostra opções se URL estiver preenchida
    - ✅ Experiência de usuário mais lógica e intuitiva

13. **ELIMINAÇÃO TOTAL DE PERSISTÊNCIA (IMPLEMENTADO)**
    - ✅ Removido TODOS localStorage.setItem do projeto
    - ✅ totemMode.ts: detecção dinâmica sem storage
    - ✅ setTotemMode(): limpa localStorage/sessionStorage automaticamente
    - ✅ Meta tags no-cache em index.html e totem.html
    - ✅ Cache PWA mínimo: fontes 7 dias, HubSpot 2h, pages 5min
    - ✅ Workbox com skipWaiting e cleanupOutdatedCaches
    - ✅ Totem sempre fresh - sem dados persistentes entre usos

### Debug Mode

```typescript
// Ativar logs detalhados
localStorage.setItem('debug-mode', 'true');

// Forçar modo totem
localStorage.setItem('totem-mode', 'true');
```

## 🚀 Deploy em Produção

### Build e Otimização

```bash
# Gerar build otimizado
npm run build

# Arquivos gerados em dist/
ls dist/
```

### Configurações de URLs

**Reserva de Salas**:
- **Para CLIENTES**: `https://networkgo.com.br/login` (Reservar sala de reunião)
- **Para VISITANTES**: `https://networkgo.com.br/reservar-sala` (Alugar sala de reunião por hora)

**Formulários HubSpot**: Configurados por unidade no arquivo `src/data/unitsData.ts`

### Deploy no Netlify

1. **Configuração automática via `netlify.toml`**
2. **Comandos de build otimizados**
3. **Headers e cache configurados para PWA**
4. **Redirects para SPA funcionando**

O deploy é automático via GitHub. Em caso de erro TS6305:
- Verificar se `vite.config.ts` não está duplicado no tsconfig
- Confirmar script de build usando apenas `vite build`

### Configurações do Servidor

```nginx
# Nginx - configuração para PWA
location / {
    try_files $uri $uri/ /index.html;
    add_header Cache-Control "public, immutable, max-age=31536000";
}

location /sw.js {
    add_header Cache-Control "no-cache";
}
```

### Variáveis de Ambiente

```bash
# .env.production
VITE_APP_TITLE="GoWork Totem"
VITE_API_URL="https://api.gowork.com"
VITE_DEBUG_MODE=false
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da **GoWork** e está sob licença MIT para fins de desenvolvimento.

## 📞 Suporte

- **Email**: suporte@gowork.com.br
- **WhatsApp**: (11) 99339-7841
- **Site**: https://gowork.com.br

---

*Desenvolvido com ❤️ para a **GoWork** - Transformando espaços de trabalho* 