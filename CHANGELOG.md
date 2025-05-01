# Registro de Alterações (Changelog)

## Versão 1.0.1 - 01/05/2025

### Correções e Melhorias

1. **Correção do Gráfico de Pizza (Pie Chart)**
   - Substituído o gráfico customizado baseado em View por um componente SVG profissional
   - Implementado usando a biblioteca `react-native-svg-charts`
   - Adicionados rótulos no interior do gráfico para melhor visualização de percentuais
   - Melhor proporção visual entre os segmentos do gráfico

2. **Substituição do Slider Customizado**
   - Removido o componente UniversalSlider implementado manualmente
   - Implementado o componente Slider da biblioteca `@react-native-community/slider`
   - Melhor usabilidade e consistência entre plataformas
   - Estilo ajustado para manter a identidade visual do aplicativo

3. **Correção da Formatação de Moeda**
   - Ajustada a formatação para incluir centavos (2 casas decimais) em:
     - CompoundInterestCalculator.js
     - AutomatedInvestmentSimulator.js
     - InvestmentGrowthChart.js
   - Melhor representação de valores monetários conforme padrões brasileiros

4. **Atualização de Conteúdo e Documentação**
   - Removida a referência ao diretório `utils/` no README.md que não existe no projeto
   - Removida a mensagem sobre capítulos em desenvolvimento no Chapter3Screen.js
   - Atualizada a listagem de dependências no README.md

### Novas Dependências
- `react-native-svg`: ^12.1.1
- `react-native-svg-charts`: ^5.4.0
- `@react-native-community/slider`: 4.4.2

---

Estas correções melhoram a experiência do usuário, corrigem inconsistências visuais e aprimoram a fidelidade das visualizações financeiras.