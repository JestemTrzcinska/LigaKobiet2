import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageBackground, TouchableOpacity } from 'react-native';

import { HomeScreen } from './src/HomeScreen';
import { LoginRegister } from './src/loginRegister/LoginRegister';
import { News } from './src/news/News';
import { Stats } from './src/stats/Stats';
import { Schedule } from './src/schedule/Schedule';
import { menu } from './src/consts/Strings';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TextButton } from './src/consts/Buttons';

const Stack = createNativeStackNavigator();

const stackOptions = {
  headerTitleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 2,
  },
  // headerShown: false,
};

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ddd',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      {/* <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('./src/hardCodingDb/bg-img.png')}
        resizeMode="cover"> */}
      <Stack.Navigator>
        <Stack.Screen name={menu.title} component={HomeScreen} options={stackOptions} />
        <Stack.Screen name={menu.schedule} component={Schedule} options={stackOptions} />
        <Stack.Screen name={menu.stats} component={Stats} options={stackOptions} />

        <Stack.Screen name={menu.news} component={News} options={stackOptions} />
        <Stack.Screen name={menu.loginRegister} component={LoginRegister} options={stackOptions} />
      </Stack.Navigator>
      {/* </ImageBackground> */}
    </NavigationContainer>
  );
};

export default App;
