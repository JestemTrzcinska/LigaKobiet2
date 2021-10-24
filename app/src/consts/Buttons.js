import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const TextButton = ({ text, navigation, dir, style }) => {
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
