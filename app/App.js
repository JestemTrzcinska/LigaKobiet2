import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';

import { HomeScreen } from './src/HomeScreen';
import { LoginRegister } from './src/loginRegister/LoginRegister';
import { News } from './src/news/News';
import { Stats } from './src/stats/Stats';
import { Schedule } from './src/schedule/Schedule';
import { menu } from './src/consts/Strings';

const Stack = createNativeStackNavigator();

const stackOptions = {
  headerStyle: {
    backgroundColor: 'red',
  },
  headerTitleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 2,
  },
  // headerLeft: () => {<GoBackButton onPress={NavigationContainer.goBack}/>}
  // safeAreaInsets: { top: getStatusBarHeight() },
  // headerStatusBarHeight: 0,
};

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'blue',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator>
        <Stack.Screen name={menu.title} component={HomeScreen} options={stackOptions} />
        <Stack.Screen name={menu.schedule} component={Schedule} options={stackOptions} />
        <Stack.Screen name={menu.stats} component={Stats} options={stackOptions} />
        <Stack.Screen name={menu.news} component={News} options={stackOptions} />
        <Stack.Screen name={menu.loginRegister} component={LoginRegister} options={stackOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
