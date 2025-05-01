# Compatibilidade Web do Aplicativo "Investindo com Sabedoria"

Este documento descreve as adaptações feitas para que o aplicativo "Investindo com Sabedoria" funcione corretamente no ambiente web, além dos dispositivos móveis.

## 💡 Visão Geral

O aplicativo foi projetado originalmente para dispositivos móveis utilizando React Native, mas agora inclui adaptações que permitem executá-lo também em navegadores web utilizando React Native Web. As principais adaptações focam na substituição de componentes e bibliotecas que não possuem compatibilidade nativa com o ambiente web.

## 📊 Componentes Adaptados

### 1. Gráfico de Pizza (Pie Chart)

- **Mobile**: Utiliza a biblioteca `react-native-svg-charts` para renderização de gráficos SVG.
- **Web**: Implementa um componente customizado (`WebPieChart.js`) que utiliza CSS com gradientes cônicos.

### 2. Slider de Ajuste

- Utiliza o componente `@react-native-community/slider` que possui compatibilidade web.

## 🔧 Implementação Técnica

A implementação utiliza detecção de plataforma para carregar os componentes adequados:

```javascript
if (Platform.OS === 'web') {
  // Utiliza versão web do componente
} else {
  // Utiliza versão mobile do componente
}
```

## 🧩 Arquivos Específicos para Web

1. **WebPieChart.js** - Implementação alternativa do gráfico de pizza usando CSS.
2. **WebPieChartStyles.web.js** - Estilos específicos para web que são aplicados via refs.

## 📋 Limitações Conhecidas

1. **Animações** - As animações podem ter comportamentos ligeiramente diferentes na web em comparação com dispositivos nativos.
2. **Performance** - Alguns componentes podem ter performance reduzida na web em comparação com a implementação nativa, especialmente em navegadores mais antigos.
3. **Compatibilidade de Navegadores** - As implementações foram testadas em navegadores modernos (Chrome, Firefox, Safari). Navegadores mais antigos podem apresentar inconsistências, especialmente com gradientes cônicos.

## 🚀 Como Executar na Web

```bash
# Instalar dependências
npm install

# Executar versão web
npm run web
```

## 🛠️ Depuração e Resolução de Problemas

Se você encontrar problemas ao executar no ambiente web:

1. Verifique o console do navegador para mensagens de erro
2. Certifique-se de que todas as dependências foram instaladas corretamente
3. Tente limpar o cache do navegador

## 🔄 Atualizações Futuras

- Melhor integração com bibliotecas gráficas compatíveis com web
- Otimização de desempenho nos componentes web
- Melhorias na acessibilidade