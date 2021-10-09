import * as React from 'react';
import { Text } from 'react-native';

export const Stats = ({ navigation, route }) => {
  return <Text>This is {route.params.name} page</Text>;
};
