# Configuração do Google AdSense

## Problemas Identificados e Soluções

### 1. Script do AdSense não estava carregado
**Problema:** O script do Google AdSense não estava sendo carregado na aplicação.
**Solução:** Adicionado o script no componente Layout.js:

```javascript
<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5495811870853736"
  strategy="afterInteractive"
  crossOrigin="anonymous"
/>
```

### 2. AdSlot incorreto
**Problema:** O `adSlot` estava sendo configurado com o Client ID ao invés do Slot ID específico.
**Solução:** Alterado para usar um slot ID placeholder ("1234567890") que deve ser substituído pelos IDs reais.

### 3. Melhorias no componente AdSenseCard
- Adicionado tratamento de erros
- Melhor feedback visual (loading state)
- Verificação se o script foi carregado
- Suporte ao modo escuro
- Validação de props obrigatórias

## Como configurar corretamente

### 1. Obter os Slot IDs corretos
1. Acesse o [Google AdSense](https://www.google.com/adsense/)
2. Vá em "Anúncios" > "Por unidade de anúncio"
3. Crie ou selecione uma unidade de anúncio
4. Copie o `data-ad-slot` (será algo como "1234567890")

### 2. Substituir os placeholders
Substitua "1234567890" pelos IDs reais nos seguintes arquivos:
- `src/components/tabs/TopProducts.js`
- `src/components/tabs/FeaturedProducts.js`
- `src/components/tabs/NewsProducts.js`
- `pages/categoria/[slug]/[id].js`
- `pages/buscar/[term].js`

### 3. Verificar o Client ID
Confirme se o Client ID "ca-pub-5495811870853736" está correto no:
- `src/components/Layout.js` (script src)
- `src/components/tabs/AdSenseCard.js` (prop padrão)

## Debugging

O componente agora inclui logs no console para ajudar no debugging:
- "Inicializando anúncio para slot: [ID]"
- "Script do AdSense ainda não carregado, tentando novamente..."
- "Erro ao carregar anúncio AdSense: [erro]"

Verifique o console do navegador para identificar problemas.

## Notas importantes

1. **Teste em produção:** AdSense pode não funcionar em desenvolvimento local
2. **Aprovação:** Certifique-se de que o site está aprovado no AdSense
3. **Políticas:** Verifique se o conteúdo está em conformidade com as políticas do AdSense
4. **Tempo de carregamento:** Os anúncios podem levar alguns segundos para aparecer