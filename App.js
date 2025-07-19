import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import TelaInicial from './screens/TelaInicial';

import TelaListaPets from './screens/TelaListarMangas';
import TelaDetalheManga from './screens/TelaDetalheManga';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={TelaInicial} options={{ title: 'Mangás com a Melhor qualidade' }} />
        <Stack.Screen name="MangaList" component={TelaListaPets} options={{ title: 'Mangás Disponíveis' }} />
        <Stack.Screen name="DetalheManga" component={TelaDetalheManga} options={{ title: "Sinopse" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;