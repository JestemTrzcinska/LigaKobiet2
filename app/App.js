import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/HomeScreen';
import { Schedule } from './src/schedule/Schedule';
import { Stats } from './src/stats/Stats';
import { News } from './src/news/News';

import { Login } from './src/loginRegister/Login';
import { Register } from './src/loginRegister/Register';

import { Profile } from './src/profile/Profile';
import { EditProfile } from './src/profile/EditProfile';

import { menu } from './src/consts/strings';

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
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen name={menu.title} component={HomeScreen} />
        <Stack.Screen name={menu.schedule} component={Schedule} />
        <Stack.Screen name={menu.stats} component={Stats} />
        <Stack.Screen name={menu.news} component={News} />

        <Stack.Screen name={menu.login} component={Login} />
        <Stack.Screen name={menu.register} component={Register} />

        <Stack.Screen name={menu.profile} component={Profile} />
        <Stack.Screen name={menu.editProfile} component={EditProfile} />
      </Stack.Navigator>
      {/* </ImageBackground> */}
    </NavigationContainer>
  );
};

export default App;
