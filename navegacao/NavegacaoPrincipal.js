import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from '../telas/TelaInicial';
import TelaListarMangas from '../telas/TelaListarMangas';
import TelaDetalhePet from '../telas/TelaDetalhePet';
import TelaFormularioAdocao from '../telas/TelaFormularioAdocao';

const Stack = createStackNavigator();

// Paleta de cores do tema escuro
const cores = {
  fundo: '#121212',
  fundoSecundario: '#1E1E1E',
  texto: '#FFFFFF',
  textoSecundario: '#B3B3B3',
  accent: '#BB86FC',
  borda: '#3D3D3D',
};

const NavegacaoPrincipal = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: {
          backgroundColor: cores.fundoSecundario,
          borderBottomWidth: 1,
          borderBottomColor: cores.borda,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: cores.texto,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: cores.fundo,
        },
      }}
    >
      <Stack.Screen 
        name="Inicio" 
        component={TelaInicial} 
        options={{ 
          title: 'MangaForFree',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: cores.accent,
          },
        }} 
      />
      <Stack.Screen 
        name="MangaList" 
        component={TelaListarMangas} 
        options={{ 
          title: 'Mangás Disponíveis',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: cores.texto,
          },
        }} 
      />
      <Stack.Screen 
        name="DetalhePet" 
        component={TelaDetalhePet} 
        options={{ 
          title: 'Detalhes do Mangá',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: cores.texto,
          },
        }} 
      />
      <Stack.Screen 
        name="FormularioAdocao" 
        component={TelaFormularioAdocao} 
        options={{ 
          title: 'Favoritar Mangá',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: cores.texto,
          },
        }} 
      />
    </Stack.Navigator>
  );
};

export default NavegacaoPrincipal;

