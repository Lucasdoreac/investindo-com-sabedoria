/**
 * Configurações específicas para ambiente web
 * Este arquivo é usado para ajustar o comportamento do aplicativo quando rodando no navegador
 */

// Detectar se estamos no ambiente GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Base URL para recursos do aplicativo
export const getBaseUrl = () => {
  if (isGitHubPages) {
    // No GitHub Pages, o app está em um subdiretório correspondente ao nome do repositório
    return '/investindo-com-sabedoria/';
  }
  // Localmente ou em outro ambiente, assume a raiz
  return '/';
};

// Função para lidar com caminhos de assets
export const getAssetUrl = (assetPath) => {
  const baseUrl = getBaseUrl();
  // Remove barras duplicadas se houver
  return `${baseUrl}${assetPath.startsWith('/') ? assetPath.substring(1) : assetPath}`;
};

// Ajustes para rotas de navegação
export const adjustRoutePath = (routePath) => {
  const baseUrl = getBaseUrl();
  // Garantir que rotas funcionem em ambos os ambientes
  if (isGitHubPages && !routePath.startsWith(baseUrl)) {
    return `${baseUrl}${routePath.startsWith('/') ? routePath.substring(1) : routePath}`;
  }
  return routePath;
};

// Configurações específicas para ambiente web
export const webConfig = {
  isGitHubPages,
  baseUrl: getBaseUrl(),
  
  // Cores do tema para manter consistência visual
  theme: {
    primaryColor: '#b4e0e8',
    secondaryColor: '#2c3e50',
    accentColor: '#3498db',
    backgroundColor: '#f5f5f5',
    textColor: '#2c3e50',
  },
  
  // Tamanhos padrão para gráficos e elementos visuais
  sizes: {
    defaultChartHeight: 250,
    defaultChartWidth: 350,
    pieChartRadius: 120,
  }
};

export default webConfig;