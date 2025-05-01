import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

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
 * Uma implementação alternativa de gráfico de pizza para ambiente web
 * usando técnicas de CSS e HTML padrão em vez de SVG
 */
const WebPieChart = ({ data, style }) => {
  // Ref para acessar o elemento DOM do gráfico na web
  const pieChartRef = useRef(null);
  
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
    if (Platform.OS === 'web' && pieChartRef.current) {
      // Aplicar estilos ao gráfico
      if (applyWebStyles) {
        applyWebStyles(pieChartRef.current, conicGradient, pieSize);
      }
      
      // Aplicar animações ao gráfico
      if (initChartAnimation) {
        initChartAnimation(pieChartRef);
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
      
      {/* Renderização de rótulos internos - apenas percentuais */}
      {slices.map((slice, index) => {
        // Calcular a posição do rótulo
        const angle = slice.startAngle + (slice.angle / 2);
        const angleInRadians = (angle - 90) * (Math.PI / 180);
        
        // Ajuste para colocar os rótulos na posição correta dentro do gráfico
        // Reduzir o raio para garantir que todos os rótulos fiquem dentro do gráfico
        const radius = pieSize * 0.3; // 30% do tamanho do gráfico
        const x = radius * Math.cos(angleInRadians);
        const y = radius * Math.sin(angleInRadians);
        
        // Ajuste para fatias menores - ocultar valor para fatias pequenas (menos de 10%)
        // e apenas mostrar no lado externo na legenda
        if (slice.value < 10) {
          return null; // Não mostrar rótulo dentro do gráfico para fatias pequenas
        }
        
        return (
          <Text
            key={index}
            style={[
              styles.label,
              {
                transform: [
                  { translateX: x + (pieSize / 2) - 10 },
                  { translateY: y + (pieSize / 2) - 10 }
                ]
              }
            ]}
          >
            {slice.value}%
          </Text>
        );
      })}
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
  },
  innerCircle: {
    width: '45%',
    height: '45%',
    borderRadius: 9999,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});

export default WebPieChart;