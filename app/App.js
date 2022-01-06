import React, { useContext } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/AuthContext';

import { HomeScreen } from './src/HomeScreen';
import { Schedule } from './src/schedule/Schedule';
import { Stats } from './src/stats/Stats';
import { News } from './src/news/News';

import { Login } from './src/loginRegister/Login';
import { Register } from './src/loginRegister/Register';

import { Profile } from './src/profile/Profile';
import { EditProfile } from './src/profile/EditProfile';
import { CreateProfile } from './src/profile/CreateProfile';

import { game, menu, single } from './src/consts/strings';
import { NewsItem } from './src/news/NewsItem';
import { Game } from './src/game/Game';

const Stack = createNativeStackNavigator();

const stackOptions = {
  headerTransparent: true,
  headerTitleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
};

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={stackOptions}>
          <Stack.Screen name={menu.title} component={HomeScreen} />
          <Stack.Screen name={menu.schedule} component={Schedule} />
          <Stack.Screen name={menu.stats} component={Stats} />
          <Stack.Screen name={menu.news} component={News} />

          <Stack.Screen name={menu.profile} component={Profile} />
          <Stack.Screen name={menu.editProfile} component={EditProfile} />
          <Stack.Screen name={menu.createProfile} component={CreateProfile} />

          <Stack.Screen name={menu.login} component={Login} />
          <Stack.Screen name={menu.register} component={Register} />

          <Stack.Screen name={single.newsItem} component={NewsItem} />
          <Stack.Screen name={game.game} component={Game} options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
