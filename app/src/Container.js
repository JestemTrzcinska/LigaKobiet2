import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Containter = ({ children }) => {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#1C0C5B', '#3D2C8D']} style={styles.image}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default Containter;
