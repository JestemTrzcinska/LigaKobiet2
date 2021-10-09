import * as React from 'react';
import { Button } from 'react-native';

export const TextButton = ({ text, navigation, dir }) => {
  return (
    <Button
      onPress={() => {
        navigation.navigate(dir, { name: text });
      }}
      title={text}
    />
  );
};
