import React from 'react';
import { Text, View } from 'react-native';
import Containter from '../Container';

export const Schedule = ({ navigation, route }) => {
  return (
    <Containter>
      <View>
        <Text>This is {route.params.name} page</Text>
      </View>
    </Containter>
  );
};