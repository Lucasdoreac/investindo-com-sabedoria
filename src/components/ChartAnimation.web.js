/**
 * Animações para o gráfico de pizza na web
 * Estas funções aplicam transições CSS para uma experiência mais fluida
 */

export const applyChartAnimations = (pieChart) => {
  if (!pieChart || typeof document === 'undefined') return;
  
  // Adicionar transições suaves
  pieChart.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  // Animar a entrada do gráfico com um fade e scale
  setTimeout(() => {
    pieChart.style.opacity = '1';
    pieChart.style.transform = 'rotate(-90deg) scale(1)';
  }, 100);
  
  // Animar os rótulos com atraso sequencial
  // Buscamos o container de labels que é o irmão adjacente do gráfico
  const labelsContainer = pieChart.parentNode.querySelector('[class*="labelsContainer"]');
  
  if (labelsContainer) {
    const labels = labelsContainer.querySelectorAll('[class*="labelContainer"]');
    if (labels && labels.length) {
      labels.forEach((label, index) => {
        // Configurar animação
        label.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        label.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
        label.style.opacity = '0';
        label.style.transform = 'scale(0.8)';
        
        // Aplicar animação com atraso
        setTimeout(() => {
          label.style.opacity = '1';
          label.style.transform = 'scale(1)';
        }, 300);
      });
    }
  }
};

// Aplicar esta animação quando o gráfico for carregado
export const initChartAnimation = (pieChartRef) => {
  if (pieChartRef?.current && typeof window !== 'undefined') {
    // Iniciar com opacidade 0
    pieChartRef.current.style.opacity = '0';
    pieChartRef.current.style.transform = 'rotate(-90deg) scale(0.8)';
    
    // Aguardar renderização completa antes de animar
    setTimeout(() => {
      applyChartAnimations(pieChartRef.current);
    }, 100);
  }
};