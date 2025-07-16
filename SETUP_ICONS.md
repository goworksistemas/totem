# 📱 Configuração de Ícones - GoWork Totem

## 🎯 Ícone do Aplicativo PWA

Para completar a configuração do projeto, você precisa adicionar o arquivo de ícone:

### **Arquivo Necessário:**
- **Nome**: `favicongowork.jpg`
- **Localização**: `public/favicongowork.jpg`
- **Formato**: JPEG
- **Tamanhos sugeridos**: 512x512px (mínimo)

### **Onde o ícone é usado:**
- ✅ **Favicon** do navegador
- ✅ **Ícone PWA** quando instalado
- ✅ **Apple Touch Icon** para iOS
- ✅ **Manifesto** do aplicativo

### **Configurações já aplicadas:**

#### **1. Manifestos PWA**
```json
// public/manifest-totem.json
{
  "icons": [
    {
      "src": "favicongowork.jpg",
      "sizes": "512x512",
      "type": "image/jpeg",
      "purpose": "any maskable"
    }
  ]
}
```

#### **2. HTML Principal**
```html
<!-- index.html -->
<link rel="icon" type="image/jpeg" href="/favicongowork.jpg" />

<!-- public/totem.html -->
<link rel="apple-touch-icon" href="/favicongowork.jpg">
```

#### **3. Configuração Vite**
```typescript
// vite.config.ts
includeAssets: ['favicongowork.jpg'],
icons: [
  {
    src: 'favicongowork.jpg',
    sizes: '512x512',
    type: 'image/jpeg',
    purpose: 'any maskable'
  }
]
```

### **🔧 Como Adicionar:**

1. **Coloque o arquivo** `favicongowork.jpg` na pasta `public/`
2. **Execute o build** para testar:
   ```bash
   npm run build
   npm run preview
   ```
3. **Teste a instalação PWA** em um dispositivo mobile

### **📝 Observações:**

- ✅ **Logo frontend** mantida (`public/gowork.png`)
- ✅ **Opção "Reservar posição"** removida
- ✅ **Todas as configurações** atualizadas
- ⚠️ **Falta apenas** adicionar o arquivo `favicongowork.jpg`

### **🎨 Recomendações para o Ícone:**

- **Formato**: JPG/JPEG
- **Tamanho**: 512x512px ou maior
- **Qualidade**: Alta resolução
- **Design**: Limpo e reconhecível em tamanhos pequenos
- **Cores**: Consistente com a marca GoWork

---

*Após adicionar o arquivo, o projeto estará 100% configurado! 🚀* 