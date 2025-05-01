import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import WebAlternativePieChart from './WebAlternativePieChart';

// Importação condicional para estilos web
let applyWebStyles, initChartAnimation;
if (Platform.OS === 'web') {
  try {
    applyWebStyles = require('./WebPieChartStyles.web').applyWebStyles;
    initChartAnimation = require('./ChartAnimation.web').initChartAnimation;
  } catch (e) {
    console.warn('Estilos web ou animações não encontrados:', e);
  }
}

/**
 * Uma implementação de gráfico de pizza para ambiente web e nativo
 * com fallback para componente alternativo quando necessário
 */
const WebPieChart = ({ data, style }) => {
  // Ref para acessar o elemento DOM do gráfico na web
  const pieChartRef = useRef(null);
  const labelsContainerRef = useRef(null);
  
  // Flag para usar implementação alternativa em ambientes web com problemas de dependência
  const [useAlternative, setUseAlternative] = React.useState(Platform.OS === 'web');
  
  // Se estamos no ambiente web, tentamos usar a implementação alternativa
  // que não depende de react-native-svg
  if (useAlternative && Platform.OS === 'web') {
    return <WebAlternativePieChart data={data} style={style} />;
  }
  
  // Calcular o ângulo total (em graus) de cada seção do gráfico
  const calculateSlices = (dataItems) => {
    const total = dataItems.reduce((sum, item) => sum + item.value, 0);
    
    let startAngle = 0;
    return dataItems.map((item) => {
      const angle = (item.value / total) * 360;
      const slice = {
        ...item,
        startAngle,
        angle,
        percentage: Math.round((item.value / total) * 100)
      };
      startAngle += angle;
      return slice;
    });
  };

  const slices = calculateSlices(data);

  // Função para gerar o background com gradiente conic para o gráfico de pizza
  const generateConicGradient = (slices) => {
    let gradient = '';
    let currentAngle = 0;
    
    slices.forEach((slice) => {
      const color = slice.svg?.fill || '#cccccc';
      gradient += `${color} ${currentAngle}deg ${currentAngle + slice.angle}deg, `;
      currentAngle += slice.angle;
    });
    
    // Remover a vírgula final e espaço
    return gradient.slice(0, -2);
  };

  const conicGradient = generateConicGradient(slices);
  const pieSize = style?.height || 200;
  const pieWidth = style?.width || pieSize;
  
  // Efeito para aplicar os estilos web e animações quando o componente for montado
  useEffect(() => {
    // Se estamos no web e temos refs válidos, tentamos aplicar estilos
    if (Platform.OS === 'web' && pieChartRef.current) {
      try {
        // Aplicar estilos ao gráfico
        if (applyWebStyles) {
          applyWebStyles(pieChartRef.current, conicGradient, pieSize);
        }
        
        // Aplicar animações ao gráfico
        if (initChartAnimation) {
          initChartAnimation(pieChartRef);
        }
      } catch (e) {
        console.error('Erro ao aplicar estilos web:', e);
        // Se falhar, usamos a implementação alternativa
        setUseAlternative(true);
      }
    }
  }, [conicGradient, pieSize]);
  
  return (
    <View style={[styles.container, { height: pieSize, width: pieWidth }]}>
      <View 
        ref={pieChartRef}
        style={[
          styles.pieChart, 
          { 
            height: pieSize,
            width: pieSize,
          }
        ]} 
      >
        <View style={styles.innerCircle}>
          {/* Círculo central */}
        </View>
      </View>
      
      {/* Container separado para os rótulos para evitar problemas com a rotação */}
      <View 
        ref={labelsContainerRef}
        style={[
          styles.labelsContainer,
          {
            height: pieSize,
            width: pieSize,
          }
        ]}
      >
        {/* Renderização de rótulos internos - apenas percentuais para fatias grandes o suficiente */}
        {slices.map((slice, index) => {
          // Calcular a posição do rótulo
          // Ajuste do ângulo para compensar a rotação de -90 graus do gráfico
          const midAngle = slice.startAngle + (slice.angle / 2);
          const angleInRadians = ((midAngle) * (Math.PI / 180));
          
          // Ajustar o raio para posicionar os rótulos corretamente
          // Quanto maior a fatia, mais para fora posicionamos o rótulo
          const radiusAdjustment = slice.angle < 30 ? 0.35 : 0.4;
          const radius = pieSize * radiusAdjustment;
          
          // Cálculo da posição com ajuste para a rotação do gráfico
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);
          
          // Não mostrar rótulo para fatias pequenas (menos de 5%)
          if (slice.percentage < 5) {
            return null;
          }
          
          return (
            <View
              key={index}
              style={[
                styles.labelContainer,
                {
                  transform: [
                    { translateX: x + (pieSize / 2) - 20 },
                    { translateY: y + (pieSize / 2) - 15 }
                  ]
                }
              ]}
            >
              <Text style={styles.label}>
                {slice.percentage}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChart: {
    borderRadius: 9999,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  innerCircle: {
    width: '45%',
    height: '45%',
    borderRadius: 9999,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 2,
  },
  labelsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
    pointerEvents: 'none',
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
    padding: 2,
    minWidth: 36,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});

export default WebPieChart;