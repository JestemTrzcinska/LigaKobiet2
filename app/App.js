import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/HomeScreen';
import { LoginRegister } from './src/loginRegister/LoginRegister';
import { News } from './src/news/News';
import { Stats } from './src/stats/Stats';
import { Schedule } from './src/schedule/Schedule';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Liga Kobiet" component={HomeScreen} />
        <Stack.Screen name="Harmonogram" component={Schedule} />
        <Stack.Screen name="Statystyki" component={Stats} />
        <Stack.Screen name="Aktualności" component={News} />
        <Stack.Screen name="Login Rejestracja" component={LoginRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
