import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { COLORS } from '../styles/globalStyles';

// Componente simples de slider compatível com todas as plataformas
const UniversalSlider = ({ value, onValueChange, minimumValue, maximumValue }) => {
  // Calculando a largura da barra baseada no valor atual
  const fillWidth = `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%`;
  
  // Função para lidar com toques na barra
  const handleTouch = (evt) => {
    const { locationX, target } = evt.nativeEvent;
    
    // Obtendo medidas do elemento para calcular a posição relativa
    target.measure((x, y, width, height, pageX, pageY) => {
      // Calculando o valor baseado na posição do toque
      const newValue = minimumValue + ((locationX / width) * (maximumValue - minimumValue));
      
      // Arredondando para o step mais próximo (assumindo step de 5)
      const step = 5;
      const roundedValue = Math.round(newValue / step) * step;
      
      // Limitando aos valores mínimo e máximo
      const clampedValue = Math.max(minimumValue, Math.min(maximumValue, roundedValue));
      
      // Atualizando o valor
      onValueChange(clampedValue);
    });
  };
  
  return (
    <TouchableOpacity 
      style={styles.sliderTrack}
      onPress={handleTouch}
      activeOpacity={0.8}
    >
      <View 
        style={[
          styles.sliderFill,
          { width: fillWidth }
        ]} 
      />
      <View 
        style={[
          styles.sliderThumb,
          { left: fillWidth }
        ]} 
      />
    </TouchableOpacity>
  );
};

const RiskReturnLiquidity = () => {
  // Estados para os valores de cada dimensão
  const [risk, setRisk] = useState(30);
  const [return_, setReturn] = useState(30);
  const [liquidity, setLiquidity] = useState(70);
  
  // Estados para armazenar a classe de investimento recomendada
  const [recommendedClass, setRecommendedClass] = useState(null);
  const [otherOptions, setOtherOptions] = useState([]);
  
  // Classes de investimentos com seus perfis característicos
  const investmentClasses = [
    {
      name: "Poupança",
      risk: 10,
      return_: 15,
      liquidity: 90,
      description: "Investimento tradicional com segurança e liquidez, mas baixo retorno."
    },
    {
      name: "Tesouro Selic",
      risk: 15,
      return_: 30,
      liquidity: 85,
      description: "Título público de baixíssimo risco com retorno atrelado à taxa básica."
    },
    {
      name: "CDB de banco grande",
      risk: 20,
      return_: 35,
      liquidity: 75,
      description: "Certificados de depósito bancário com garantia do FGC até R$250 mil."
    },
    {
      name: "Tesouro IPCA+",
      risk: 25,
      return_: 45,
      liquidity: 60,
      description: "Título público que protege contra inflação, ideal para longo prazo."
    },
    {
      name: "Fundos DI",
      risk: 20,
      return_: 30,
      liquidity: 80,
      description: "Fundos que investem em títulos pós-fixados com baixa volatilidade."
    },
    {
      name: "Fundos Multimercado",
      risk: 50,
      return_: 60,
      liquidity: 55,
      description: "Fundos diversificados que investem em diferentes classes de ativos."
    },
    {
      name: "Fundos Imobiliários",
      risk: 60,
      return_: 65,
      liquidity: 60,
      description: "Investimento em empreendimentos imobiliários com distribuição de rendimentos."
    },
    {
      name: "ETFs de ações",
      risk: 65,
      return_: 75,
      liquidity: 85,
      description: "Fundos negociados em bolsa que acompanham índices de ações."
    },
    {
      name: "Ações Blue Chips",
      risk: 70,
      return_: 80,
      liquidity: 90,
      description: "Ações de empresas grandes e consolidadas no mercado."
    },
    {
      name: "Ações Small Caps",
      risk: 85,
      return_: 90,
      liquidity: 75,
      description: "Ações de empresas menores com maior potencial de crescimento e risco."
    }
  ];
  
  // Atualiza a recomendação quando os valores são alterados
  useEffect(() => {
    updateRecommendation();
  }, [risk, return_, liquidity]);
  
  // Encontra a classe de investimento mais adequada baseada nos valores do triângulo
  const updateRecommendation = () => {
    // Calcula a "distância" entre as preferências do usuário e cada classe de investimento
    const distances = investmentClasses.map(investClass => {
      const riskDiff = Math.abs(risk - investClass.risk);
      const returnDiff = Math.abs(return_ - investClass.return_);
      const liquidityDiff = Math.abs(liquidity - investClass.liquidity);
      
      // Pontuação total (menor é melhor)
      const totalDistance = riskDiff + returnDiff + liquidityDiff;
      
      return {
        ...investClass,
        distance: totalDistance
      };
    });
    
    // Ordena por distância (do menor para o maior)
    const sortedOptions = [...distances].sort((a, b) => a.distance - b.distance);
    
    // Define a classe mais adequada e outras opções
    setRecommendedClass(sortedOptions[0]);
    setOtherOptions(sortedOptions.slice(1, 4)); // Próximas 3 opções
  };
  
  // Templates pré-definidos para diferentes perfis
  const applyTemplate = (template) => {
    switch(template) {
      case 'conservador':
        setRisk(20);
        setReturn(30);
        setLiquidity(80);
        break;
      case 'moderado':
        setRisk(50);
        setReturn(60);
        setLiquidity(50);
        break;
      case 'arrojado':
        setRisk(80);
        setReturn(90);
        setLiquidity(40);
        break;
      default:
        break;
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔄 Triângulo Risco-Retorno-Liquidez</Text>
      <Text style={styles.description}>
        Ajuste os controles abaixo para encontrar investimentos que combinem com suas preferências.
      </Text>
      
      <View style={styles.templateButtons}>
        <TouchableOpacity 
          style={[styles.templateButton, styles.conservativeButton]} 
          onPress={() => applyTemplate('conservador')}
        >
          <Text style={styles.templateButtonText}>Conservador</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.templateButton, styles.moderateButton]} 
          onPress={() => applyTemplate('moderado')}
        >
          <Text style={styles.templateButtonText}>Moderado</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.templateButton, styles.aggressiveButton]} 
          onPress={() => applyTemplate('arrojado')}
        >
          <Text style={styles.templateButtonText}>Arrojado</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Risco: <Text style={styles.sliderValue}>{risk}%</Text>
        </Text>
        <UniversalSlider
          minimumValue={0}
          maximumValue={100}
          value={risk}
          onValueChange={setRisk}
        />
        <View style={styles.sliderLegend}>
          <Text>Menor</Text>
          <Text>Maior</Text>
        </View>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Retorno Potencial: <Text style={styles.sliderValue}>{return_}%</Text>
        </Text>
        <UniversalSlider
          minimumValue={0}
          maximumValue={100}
          value={return_}
          onValueChange={setReturn}
        />
        <View style={styles.sliderLegend}>
          <Text>Menor</Text>
          <Text>Maior</Text>
        </View>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Liquidez: <Text style={styles.sliderValue}>{liquidity}%</Text>
        </Text>
        <UniversalSlider
          minimumValue={0}
          maximumValue={100}
          value={liquidity}
          onValueChange={setLiquidity}
        />
        <View style={styles.sliderLegend}>
          <Text>Menor</Text>
          <Text>Maior</Text>
        </View>
      </View>
      
      {recommendedClass && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>Investimento Recomendado:</Text>
          <Text style={styles.recommendedClass}>{recommendedClass.name}</Text>
          <Text style={styles.recommendationDescription}>{recommendedClass.description}</Text>
          
          <Text style={styles.otherOptionsTitle}>Outras Opções Compatíveis:</Text>
          {otherOptions.map((option, index) => (
            <Text key={index} style={styles.otherOption}>• {option.name}</Text>
          ))}
        </View>
      )}
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Entendendo o Triângulo</Text>
        <Text style={styles.infoText}>
          <Text style={styles.highlight}>Risco:</Text> Chance de perder parte do capital investido{'\n'}
          <Text style={styles.highlight}>Retorno:</Text> Potencial de ganho financeiro{'\n'}
          <Text style={styles.highlight}>Liquidez:</Text> Facilidade de resgatar o investimento
        </Text>
        <Text style={styles.infoNote}>
          Geralmente, não é possível maximizar as três dimensões simultaneamente.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  templateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  templateButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  conservativeButton: {
    backgroundColor: '#e6f7ff',
    borderWidth: 1,
    borderColor: '#91d5ff',
  },
  moderateButton: {
    backgroundColor: '#fff7e6',
    borderWidth: 1,
    borderColor: '#ffd591',
  },
  aggressiveButton: {
    backgroundColor: '#fff1f0',
    borderWidth: 1,
    borderColor: '#ffa39e',
  },
  templateButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.primaryDark,
  },
  sliderValue: {
    fontWeight: 'bold',
  },
  sliderTrack: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    height: '100%',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
  },
  sliderThumb: {
    position: 'absolute',
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
    transform: [{ translateX: -13 }],
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sliderLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  recommendationContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  recommendedClass: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  recommendationDescription: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  otherOptionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
    marginTop: 5,
  },
  otherOption: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
    padding: 15,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
  infoNote: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  }
});

export default RiskReturnLiquidity;