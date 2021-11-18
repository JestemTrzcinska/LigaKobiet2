import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Containter = ({ children }) => {
  return (
    // <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#222831', '#393E46']} style={styles.image}>
    <LinearGradient colors={['#222831', '#393E46']} style={styles.image}>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </LinearGradient>
    // <ImageBackground style={styles.image} source={require('./hardCodingDb/img1.jpg')} resizeMode="cover">
    //   <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    // </ImageBackground>
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
