import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/HomeScreen';
import { LoginRegister } from './src/loginRegister/LoginRegister';
import { News } from './src/news/News';
import { Stats } from './src/stats/Stats';
import { Schedule } from './src/schedule/Schedule';
import { menu } from './src/consts/Strings';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={menu.title} component={HomeScreen} />
        <Stack.Screen name={menu.schedule} component={Schedule} />
        <Stack.Screen name={menu.stats} component={Stats} />
        <Stack.Screen name={menu.news} component={News} />
        <Stack.Screen name={menu.loginRegister} component={LoginRegister} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
