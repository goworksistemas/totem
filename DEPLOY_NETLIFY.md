# 🚀 Deploy GoWork Totem no Netlify

## 📋 **Pré-requisitos**

- ✅ Conta no [Netlify](https://netlify.com)
- ✅ Repositório no GitHub/GitLab
- ✅ Arquivo `favicongowork.jpg` na pasta `public/`

## 🎯 **Configuração Automática**

### **1. Conectar Repositório**
1. Acesse [Netlify Dashboard](https://app.netlify.com)
2. Clique em **"Add new site"** > **"Import an existing project"**
3. Conecte seu **GitHub/GitLab**
4. Selecione o repositório **gowork-totem**

### **2. Configurações de Build**
O Netlify detectará automaticamente:
```
Build command: npm run build
Publish directory: dist
```

### **3. Deploy Automático**
- ✅ **Auto-deploy**: A cada push no repositório
- ✅ **Preview URLs**: Para branches de feature
- ✅ **HTTPS**: Certificado SSL automático

## ⚙️ **Configurações Avançadas**

### **Environment Variables** (se necessário)
```
VITE_APP_TITLE=GoWork Totem
VITE_DEBUG_MODE=false
```

### **Domain Settings**
```
Primary domain: gowork-totem.netlify.app
Custom domain: totem.gowork.com.br (opcional)
```

## 🌐 **URLs de Acesso**

### **Após Deploy:**
- **App Principal**: `https://gowork-totem.netlify.app`
- **Modo Totem**: `https://gowork-totem.netlify.app/totem.html`
- **PWA Install**: Funciona automaticamente via HTTPS

## 📱 **Funcionalidades PWA no Netlify**

### **✅ Totalmente Compatível:**
- **Service Worker**: Auto-gerado pelo Vite
- **Manifesto PWA**: Configurado para totem
- **HTTPS**: Obrigatório e automático no Netlify
- **Cache**: Headers otimizados no `netlify.toml`
- **Offline**: Funciona sem internet

### **🎯 Instalação como App:**
1. Acesse via navegador mobile
2. Banner "Adicionar à tela inicial" aparece automaticamente
3. App instalado com ícone `favicongowork.jpg`
4. Funciona como app nativo

## 🚀 **Deploy Manual via CLI** (alternativo)

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Login no Netlify
netlify login

# 3. Deploy inicial
netlify deploy

# 4. Deploy para produção
netlify deploy --prod
```

## 🔧 **Configurações Otimizadas**

### **Performance:**
- ✅ **Compressão Gzip**: Automática
- ✅ **CDN Global**: 188 locations
- ✅ **Cache Headers**: Configurados no `netlify.toml`
- ✅ **Minificação**: CSS/JS otimizados

### **SEO & PWA:**
- ✅ **Meta tags**: Configuradas
- ✅ **Lighthouse Score**: 90+ esperado
- ✅ **Manifesto válido**: ✓
- ✅ **Service Worker**: ✓

## 🐛 **Troubleshooting**

### **Problemas Comuns:**

1. **Build falha**
   ```bash
   # Teste local primeiro
   npm run build:netlify
   ```

2. **PWA não instala**
   - Verificar HTTPS ✓
   - Verificar manifesto válido ✓
   - Arquivo `favicongowork.jpg` presente ✓

3. **Rotas não funcionam**
   - `_redirects` file ✓
   - SPA redirect configurado ✓

## 💰 **Pricing Netlify**

### **Free Tier** (suficiente para o projeto):
- ✅ **100GB/mês** bandwidth
- ✅ **300 build minutes/mês**
- ✅ **HTTPS** incluído
- ✅ **Deploy automático**

### **Pro** (se necessário):
- 📊 **Analytics avançados**
- 🔐 **Password protection**
- 📞 **Suporte prioritário**

## 📊 **Vantagens do Netlify para PWA**

| **Recurso** | **Netlify** | **Outros** |
|-------------|-------------|------------|
| **HTTPS** | ✅ Automático | ⚠️ Manual |
| **CDN** | ✅ Global | ❌ Limitado |
| **Deploy** | ✅ Git-based | ⚠️ Manual |
| **Previews** | ✅ Auto | ❌ Não |
| **Analytics** | ✅ Built-in | ⚠️ Pago |
| **Forms** | ✅ Grátis | ❌ Não |

## ✅ **Checklist Final**

Antes do deploy, verificar:
- [ ] `favicongowork.jpg` na pasta `public/`
- [ ] Build local funciona: `npm run build`
- [ ] Testes PWA: Lighthouse 90+
- [ ] Repositório no GitHub
- [ ] Conta Netlify criada

## 🎉 **Resultado Final**

Após o deploy você terá:
- 📱 **App instalável** em qualquer dispositivo
- 🚀 **Performance otimizada** com CDN
- 🔄 **Updates automáticos** via Git
- 📊 **Analytics** de uso
- 🛡️ **HTTPS** e segurança
- 🌍 **Acesso global** via CDN

---

**O GoWork Totem estará pronto para uso em tablets em qualquer lugar do mundo! 🌟** 