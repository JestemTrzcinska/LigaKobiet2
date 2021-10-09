import * as React from 'react';
import { Text } from 'react-native';

export const News = ({ navigation, route }) => {
  return <Text>This is {route.params.name} page</Text>;
};
