import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from './src/styles/globalStyles';

// Importação das telas
import HomeScreen from './src/screens/HomeScreen';
import Chapter1Screen from './src/screens/Chapter1Screen';
import Chapter2Screen from './src/screens/Chapter2Screen';

// Criação do stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
      
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primaryDark,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Investindo com Sabedoria',
            headerShown: false, // Oculta o header na tela inicial
          }} 
        />
        
        <Stack.Screen 
          name="Chapter1" 
          component={Chapter1Screen} 
          options={{ 
            title: 'Capítulo 1',
            headerBackTitle: 'Voltar',
          }} 
        />
        
        <Stack.Screen 
          name="Chapter2" 
          component={Chapter2Screen} 
          options={{ 
            title: 'Capítulo 2',
            headerBackTitle: 'Voltar',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
