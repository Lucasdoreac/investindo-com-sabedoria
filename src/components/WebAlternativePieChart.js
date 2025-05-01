import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

/**
 * Uma implementação alternativa do gráfico de pizza para casos 
 * onde react-native-svg-charts não funciona no ambiente web
 */
const WebAlternativePieChart = ({ data, style }) => {
  // Se não estamos no ambiente web, não renderiza nada
  if (Platform.OS !== 'web') {
    return null;
  }

  // Calcular o total para porcentagens
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Gerar cores se não especificadas
  const ensureColors = (items) => {
    return items.map(item => {
      if (!item.svg || !item.svg.fill) {
        // Gerar uma cor aleatória mas consistente baseada no valor
        const hue = (item.value * 137.5) % 360;
        return {
          ...item,
          svg: {
            ...(item.svg || {}),
            fill: `hsl(${hue}, 70%, 60%)`
          }
        };
      }
      return item;
    });
  };

  const coloredData = ensureColors(data);
  
  // Gerar o estilo CSS para o gradiente cônico
  const generateConicGradient = () => {
    let gradient = '';
    let currentAngle = 0;
    
    coloredData.forEach(item => {
      const percentage = (item.value / total) * 100;
      const nextAngle = currentAngle + percentage;
      gradient += `${item.svg.fill} ${currentAngle}% ${nextAngle}%, `;
      currentAngle = nextAngle;
    });
    
    // Remover a vírgula final e espaço
    return gradient.slice(0, -2);
  };
  
  return (
    <View style={[styles.container, style]}>
      <div style={{
        width: style?.width || 200,
        height: style?.height || 200,
        borderRadius: '50%',
        background: `conic-gradient(${generateConicGradient()})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }} />
      </div>
      
      {/* Legenda do gráfico */}
      <View style={styles.legend}>
        {coloredData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.svg.fill }]} />
            <Text style={styles.legendText}>
              {item.key || `Item ${index + 1}`}: {Math.round((item.value / total) * 100)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  legend: {
    marginTop: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  }
});

export default WebAlternativePieChart;