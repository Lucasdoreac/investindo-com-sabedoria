/**
 * Estilos específicos para web do WebPieChart
 * Este arquivo é carregado apenas no ambiente web
 */

export const applyWebStyles = (pieChart, conicGradient, pieSize) => {
  if (!pieChart) return;

  // Aplicar o gradiente cônico com precisão
  pieChart.style.background = `conic-gradient(${conicGradient})`;
  pieChart.style.height = `${pieSize}px`;
  pieChart.style.width = `${pieSize}px`;
  pieChart.style.borderRadius = '50%';
  pieChart.style.display = 'flex';
  pieChart.style.justifyContent = 'center';
  pieChart.style.alignItems = 'center';
  pieChart.style.position = 'relative';
  pieChart.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  pieChart.style.transform = 'rotate(-90deg)'; // Rotacionar para iniciar do topo
  
  // Garantir que o conteúdo interno não rotacione
  const innerCircle = pieChart.querySelector('div');
  if (innerCircle) {
    innerCircle.style.transform = 'rotate(90deg)'; // Contrarrotar o círculo interno
  }
};