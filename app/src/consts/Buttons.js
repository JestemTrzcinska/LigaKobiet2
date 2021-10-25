import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const TextButtonNav = ({ text, navigation, dir, style }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(dir, { name: text });
      }}>
      <Text style={[styles.textStyle, style.optionButton]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
});

export const TextButton = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.textStyle, style.button]}>{text}</Text>
    </TouchableOpacity>
  );
};
