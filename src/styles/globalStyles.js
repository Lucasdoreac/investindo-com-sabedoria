import { StyleSheet, Platform } from 'react-native';

// Estilos específicos para versão web
if (Platform.OS === 'web') {
  // Aplica estilos globais ao documento HTML
  document.body.style.overflow = 'auto';
  document.body.style.height = '100%';
  document.body.style.margin = '0';
  document.documentElement.style.height = '100%';
}

// Paleta de cores conforme especificado no Prompt Master
export const COLORS = {
  primaryLight: '#b4e0e8', // Azul claro
  primaryDark: '#2c3e50',  // Azul marinho
  white: '#ffffff',
  black: '#000000',
  gray: '#f0f0f0',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
};

// Estilos globais para manter consistência na aplicação
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 24,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  button: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  gridItem: {
    width: '48%',
    marginVertical: 5,
  },
});
