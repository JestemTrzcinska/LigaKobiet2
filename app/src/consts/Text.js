import React from 'react';
import { Text } from 'react-native';

export const TextName = ({ children, styles }) => {
  return (
    <Text style={styles} numberOfLines={1}>
      {children}
    </Text>
  );
};
