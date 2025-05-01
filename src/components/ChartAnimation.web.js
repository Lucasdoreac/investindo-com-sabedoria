/**
 * Animações para o gráfico de pizza na web
 * Estas funções aplicam transições CSS para uma experiência mais fluida
 */

export const applyChartAnimations = (pieChart) => {
  if (!pieChart) return;
  
  // Adicionar transições suaves
  pieChart.style.transition = 'all 0.8s ease-in-out';
  
  // Animar a entrada do gráfico com um fade e scale
  setTimeout(() => {
    pieChart.style.opacity = '1';
    pieChart.style.transform = 'rotate(-90deg) scale(1)';
  }, 100);
  
  // Animar as legendas
  const labels = document.querySelectorAll('[class*="pieLabelRow"]');
  if (labels && labels.length) {
    labels.forEach((label, index) => {
      label.style.transition = 'all 0.3s ease-in-out';
      label.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
      label.style.opacity = '0';
      label.style.transform = 'translateX(-10px)';
      
      setTimeout(() => {
        label.style.opacity = '1';
        label.style.transform = 'translateX(0)';
      }, 200);
    });
  }
};

// Aplicar esta animação quando o gráfico for carregado
export const initChartAnimation = (pieChartRef) => {
  if (pieChartRef?.current && typeof window !== 'undefined') {
    // Iniciar com opacidade 0
    pieChartRef.current.style.opacity = '0';
    pieChartRef.current.style.transform = 'rotate(-90deg) scale(0.9)';
    
    // Aguardar renderização completa antes de animar
    setTimeout(() => {
      applyChartAnimations(pieChartRef.current);
    }, 50);
  }
};