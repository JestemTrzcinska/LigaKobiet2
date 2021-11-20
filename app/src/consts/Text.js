import React from 'react';
import { Text, TextInput } from 'react-native';

export const TextName = ({ children, style }) => {
  return (
    <Text style={[{ color: 'white' }, style]} numberOfLines={1}>
      {children}
    </Text>
  );
};

export const TextWhite = ({ children, style, numberOfLines = null }) => {
  return (
    <Text style={[{ color: 'white' }, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const TextInputWhite = ({ style, onChangeText, value, placeholder, multiline = false }) => {
  return (
    <TextInput
      style={[style, { color: 'white', borderColor: 'white' }]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      placeholderTextColor="white"
      multiline={multiline}
    />
  );
};
