import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

const Containter = ({ children }) => {
  return (
    <ImageBackground style={styles.image} source={require('./hardCodingDb/bg-img.png')} resizeMode="cover">
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </ImageBackground>
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
