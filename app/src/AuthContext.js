import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create a context
const AuthContext = createContext();

const configureAxiosHeaders = (token) => {
  axios.defaults.headers['x-auth-token'] = token;
};

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(undefined);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      const authData = JSON.parse(authDataString || {});
      // Configure axios headers
      configureAxiosHeaders(authData.token);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
      await AsyncStorage.setItem('auth', JSON.stringify(auth));
      // Configure axios headers
      configureAxiosHeaders(auth.token);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
